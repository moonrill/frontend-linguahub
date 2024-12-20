'use client';

import CustomDropdown from '#/components/CustomDropdown';
import LanguageFlag from '#/components/LanguageFlag';
import ConfirmModal from '#/components/Modal/ConfirmModal';
import ServiceRequestDetailModal from '#/components/Modal/ServiceRequestDetail';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { imgProfilePicture } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  TableProps,
  Tooltip,
} from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TranslatorServiceRequest = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;
  const sortBy = searchParams?.get('sortBy') || 'newest';

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] = useState<Booking | null>(null);
  const [openApprove, setOpenApprove] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: serviceRequests,
    mutate,
    isLoading,
  } = serviceRequestRepository.hooks.useGetServiceRequests(
    'translator',
    statusParam,
    page,
    10,
    sortBy
  );

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      ellipsis: true,
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      ellipsis: true,
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.bookingDate).format('DD MMMM YYYY')},{' '}
          {record.startAt.slice(0, 5)}
        </p>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      ellipsis: true,
      render: (text) => (
        <div className='w-fit'>
          <StatusBadge text={capitalizeFirstLetter(text)} status={text} />
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <p className='text-xs 2xl:text-sm truncate max-w-[120px] 2xl:max-w-[150px]'>
            {text}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      fixed: 'right',
    },
  ];

  const handleAccept = async () => {
    if (!selectedRequestId) return;
    setLoading(true);
    try {
      await serviceRequestRepository.api.approveRequest(selectedRequestId);
      setOpenApprove(false);
      message.success('Service request approved successfully');
      mutate();
    } catch (error) {
      message.error('Failed to approve service request');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (values: any) => {
    if (!selectedRequestId) return;
    setLoading(true);
    try {
      await serviceRequestRepository.api.rejectRequest(
        selectedRequestId,
        values
      );
      setOpenRejectModal(false);
      message.success('Service request rejected successfully');
      mutate();
    } catch (error) {
      message.error('Failed to reject service request');
    } finally {
      setLoading(false);
    }
  };

  const actionDropdownItem = (sr: Booking): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div className='flex items-center'>
            <Icon icon={'solar:eye-linear'} className='text-lg 2xl:text-xl' />
            <span className='ml-2 text-xs 2xl:text-sm '>View Detail</span>
          </div>
        ),
        onClick: () => {
          setSelectedRequest(sr);
          setOpenDetailModal(true);
        },
      },
    ];

    if (sr?.requestStatus === 'pending') {
      items.push({
        key: '2',
        label: (
          <div className='flex items-center text-green-600'>
            <Icon
              icon={'solar:check-read-line-duotone'}
              className='text-lg 2xl:text-xl '
            />
            <span className='ml-2 text-xs 2xl:text-sm '>Accept</span>
          </div>
        ),
        onClick: () => {
          setSelectedRequestId(sr?.id);
          setOpenApprove(true);
        },
      });

      items.push({
        key: '3',
        label: (
          <div className='flex items-center'>
            <Icon icon={'oui:cross'} className='text-lg 2xl:text-xl' />
            <span className='ml-2 text-xs 2xl:text-sm '>Reject</span>
          </div>
        ),
        danger: true,
        onClick: () => {
          setSelectedRequestId(sr?.id);
          setOpenRejectModal(true);
        },
      });
    }

    return items;
  };

  const data = serviceRequests?.data?.map((sr: Booking) => ({
    key: sr?.id,
    ...sr,
    client: (
      <div className='flex gap-3 items-center'>
        <div className='relative w-[40px] h-[40px] hidden 2xl:block'>
          <Image
            src={
              sr?.user?.userDetail.profilePicture
                ? imgProfilePicture(sr?.user?.userDetail.profilePicture)
                : '/images/avatar-placeholder.png'
            }
            alt={'translator-profile-picture'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover rounded-lg'
            priority
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='font-medium text-xs 2xl:text-sm line-clamp-1'>
            {sr?.user?.userDetail?.fullName}
          </p>
          <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
            {sr?.user?.email}
          </p>
        </div>
      </div>
    ),
    service: (
      <div className='flex flex-col gap-1'>
        <p className='text-xs 2xl:text-sm font-medium'>{sr?.service?.name}</p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <LanguageFlag language={sr?.service?.sourceLanguage} size='sm' />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {sr?.service?.sourceLanguage?.code}
            </span>
          </div>
          -
          <div className='flex items-center gap-1'>
            <LanguageFlag language={sr?.service?.targetLanguage} size='sm' />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {sr?.service?.targetLanguage?.code}
            </span>
          </div>
        </div>
      </div>
    ),
    requestStatus: sr?.requestStatus,
    location: sr?.location,
    action: (
      <Dropdown
        trigger={['click']}
        menu={{
          items: actionDropdownItem(sr),
        }}
      >
        <Icon
          icon={'tabler:dots'}
          className='text-gray-500 text-2xl cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500'
        />
      </Dropdown>
    ),
  }));

  const handlePageChange = (page: number) => {
    router.push(
      `/dashboard/translator/service-request?page=${page}&status=${status}&sortBy=${sortBy}`
    );
  };

  const statusOptions: MenuItemType[] = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'pending',
      label: 'Pending',
    },
    {
      key: 'approved',
      label: 'Approved',
    },
    {
      key: 'rejected',
      label: 'Rejected',
    },
    {
      key: 'cancelled',
      label: 'Cancelled',
    },
  ];

  const sortByItems: MenuProps['items'] = [
    {
      key: 'newest',
      label: 'Newest',
    },
    {
      key: 'bookingDate',
      label: 'Booking Date',
    },
  ];

  const onSortByChange = (e: any) => {
    router.push(
      `/dashboard/translator/service-request?status=${status}&sortBy=${e}`
    );
  };

  const onStatusChange = (value: string) => {
    router.push(
      `/dashboard/translator/service-request?status=${value}&sortBy=${sortBy}`
    );
  };

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        {/* TODO: handle search */}
        <Input
          type='text'
          placeholder='Search...'
          prefix={
            <Icon
              icon={'iconamoon:search-light'}
              height={24}
              className='text-zinc-400'
            />
          }
          className='h-12 w-fit'
        />
        <div className='flex gap-2'>
          <CustomDropdown
            label='Status'
            placement='bottomRight'
            useBackground={true}
            items={statusOptions}
            selectedKey={status}
            onSelect={onStatusChange}
          />
          <CustomDropdown
            label='Sort By'
            placement='bottomRight'
            useBackground={true}
            items={sortByItems}
            selectedKey={sortBy}
            onSelect={onSortByChange}
          />
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={serviceRequests?.limit}
        currentPage={serviceRequests?.page}
        totalData={serviceRequests?.total}
        totalPage={serviceRequests?.totalPages}
        handlePageChange={handlePageChange}
      />
      <ConfirmModal
        open={openApprove}
        onCancel={() => setOpenApprove(false)}
        onConfirm={handleAccept}
        type='success'
        title='Approve Request?'
        description='Are you sure you want to approve this request?'
        cancelText='No, cancel'
        confirmText="Yes, I'm sure"
        isLoading={loading}
      />
      <Modal
        open={openRejectModal}
        onCancel={() => setOpenRejectModal(false)}
        centered
        footer={null}
      >
        <div className='flex items-center gap-2'>
          <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
            <Icon icon={'lucide:mail-x'} className='text-2xl' />
          </div>
          <h1 className='text-lg 2xl:text-xl font-semibold'>Reject Request</h1>
        </div>
        <Form className='mt-2 text-black flex flex-col' onFinish={handleReject}>
          <Form.Item
            name='reason'
            rules={[
              {
                required: true,
                message: 'Please provide reason for rejection',
              },
            ]}
          >
            <Input.TextArea
              rows={6}
              className='mt-4 text-sm focus:!border-none border-none !bg-zinc-100 focus:!ring-0 p-3 rounded-xl'
              placeholder='Please provide reason for rejection'
            />
          </Form.Item>
          <div className='flex justify-between w-full gap-4'>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='default'
              htmlType='button'
              onClick={() => setOpenRejectModal(false)}
            >
              Cancel
            </Button>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='primary'
              htmlType='submit'
              loading={loading}
            >
              Send
            </Button>
          </div>
        </Form>
      </Modal>
      <ServiceRequestDetailModal
        open={openDetailModal}
        onCancel={() => setOpenDetailModal(false)}
        serviceRequest={selectedRequest}
      />
    </main>
  );
};

export default TranslatorServiceRequest;
