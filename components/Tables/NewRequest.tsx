'use client';
import { imgProfilePicture } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Table,
  TableProps,
} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import ServiceRequestDetailModal from '../Modal/ServiceRequestDetail';

const NewRequest = () => {
  const router = useRouter();

  const [limit, setLimit] = useState(5);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] = useState<Booking | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: response, mutate } =
    serviceRequestRepository.hooks.useGetServiceRequests(
      'translator',
      'pending',
      1,
      limit,
      'newest'
    );

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      ellipsis: true,
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      ellipsis: true,
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      ellipsis: true,
      render: (text) => (
        <p className='font-semibold text-xs 2xl:text-sm'>{text}</p>
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setLimit(3);
      } else {
        setLimit(4);
      }
    };

    // Call once to set initial limit
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const data = response?.data?.map((sr: Booking) => ({
    key: sr?.id,
    client: (
      <div className='flex gap-2 items-center'>
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

        <p className='font-medium text-xs 2xl:text-sm'>
          {sr?.user?.userDetail?.fullName}
        </p>
      </div>
    ),
    service: (
      <div className='flex flex-col'>
        <p className='text-xs 2xl:text-sm font-medium'>{sr?.service?.name}</p>
        <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500 uppercase'>
          {sr?.service?.sourceLanguage?.code} -{' '}
          {sr?.service?.targetLanguage?.code}
        </p>
      </div>
    ),
    requestDate: dayjs(sr?.bookingDate).format('DD MMMM YYYY'),
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 'max-content' }}
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
    </>
  );
};

export default NewRequest;
