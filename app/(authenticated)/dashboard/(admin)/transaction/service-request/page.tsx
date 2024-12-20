'use client';

import CustomDropdown from '#/components/CustomDropdown';
import LanguageFlag from '#/components/LanguageFlag';
import ServiceRequestDetailModal from '#/components/Modal/ServiceRequestDetail';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { imgProfilePicture } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, TableProps, Tooltip } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AdminServiceRequest = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;

  const [selectedRequest, setSelectedRequest] = useState<Booking | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { data: listServiceRequests, isLoading } =
    serviceRequestRepository.hooks.useGetServiceRequests(
      'admin',
      statusParam,
      page,
      10
    );

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'Translator',
      dataIndex: 'translator',
      key: 'translator',
      ellipsis: true,
      fixed: 'left',
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
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) =>
        dayjs(a.bookingDate).unix() - dayjs(b.bookingDate).unix(),
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(text).format('DD MMMM YYYY')}
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      render: (_, record) => (
        <Tooltip title='View Detail'>
          <div
            className='text-gray-500 cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500 flex items-center justify-center w-fit'
            onClick={() => {
              setSelectedRequest(
                listServiceRequests?.data?.find(
                  (sr: Booking) => sr?.id === record.key
                )
              );
              setOpenDetailModal(true);
            }}
          >
            <Icon
              icon={'solar:eye-linear'}
              className='text-xl 2xl:text-2xl text-blue-600'
            />
          </div>
        </Tooltip>
      ),
    },
  ];

  const data = listServiceRequests?.data?.map((sr: Booking) => ({
    key: sr?.id,
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
    translator: (
      <div className='flex gap-3 items-center'>
        <div className='relative w-[40px] h-[40px] hidden 2xl:block'>
          <Image
            src={
              sr?.translator?.user?.userDetail.profilePicture
                ? imgProfilePicture(
                    sr?.translator?.user?.userDetail.profilePicture
                  )
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
            {sr?.translator?.user?.userDetail?.fullName}
          </p>
          <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
            {sr?.translator?.user?.email}
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
    bookingDate: sr?.bookingDate,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/transaction/service-request?page=${page}`);
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

  const onStatusChange = (value: string) => {
    router.push(
      `/dashboard/transaction/service-request?status=${value}&page=${listServiceRequests?.page}`
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
        <CustomDropdown
          label='Status'
          placement='bottomRight'
          useBackground={true}
          items={statusOptions}
          selectedKey={status}
          onSelect={onStatusChange}
        />
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listServiceRequests?.limit}
        currentPage={listServiceRequests?.page}
        totalData={listServiceRequests?.total}
        totalPage={listServiceRequests?.totalPages}
        handlePageChange={handlePageChange}
      />
      <ServiceRequestDetailModal
        open={openDetailModal}
        onCancel={() => setOpenDetailModal(false)}
        serviceRequest={selectedRequest}
      />
    </main>
  );
};

export default AdminServiceRequest;
