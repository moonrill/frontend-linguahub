'use client';

import CustomDropdown from '#/components/CustomDropdown';
import LanguageFlag from '#/components/LanguageFlag';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { imgProfilePicture } from '#/constants/general';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, MenuProps, TableProps, Tooltip } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;
  const sortBy = searchParams?.get('sortBy') || 'newest';

  const { data: bookingLists, isLoading } =
    bookingRepository.hooks.useGetBookings(
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
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.bookingDate).format('DD MMMM YYYY')},{' '}
          {record.startAt.slice(0, 5)}
        </p>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
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
          <p className='text-xs 2xl:text-sm truncate max-w-[100px] 2xl:max-w-[150px]'>
            {text}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-semibold'>Rp{text}</p>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title='View Detail'>
          <Link
            href={`/dashboard/translator/booking/${record?.key}`}
            className='text-gray-500 cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500 flex items-center justify-center w-fit'
          >
            <Icon
              icon={'solar:eye-linear'}
              className='text-xl 2xl:text-2xl text-blue-600'
            />
          </Link>
        </Tooltip>
      ),
    },
  ];

  const data = bookingLists?.data?.map((booking: Booking) => ({
    key: booking?.id,
    ...booking,
    client: (
      <div className='flex gap-3 items-center'>
        <div className='relative w-[40px] h-[40px] hidden 2xl:block'>
          <Image
            src={
              booking?.user?.userDetail.profilePicture
                ? imgProfilePicture(booking?.user?.userDetail.profilePicture)
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
            {booking?.user?.userDetail?.fullName}
          </p>
          <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
            {booking?.user?.email}
          </p>
        </div>
      </div>
    ),
    service: (
      <div className='flex flex-col gap-1'>
        <p className='text-xs 2xl:text-sm font-medium'>
          {booking?.service?.name}
        </p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <LanguageFlag
              language={booking?.service?.sourceLanguage}
              size='sm'
            />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {booking?.service?.sourceLanguage?.code}
            </span>
          </div>
          -
          <div className='flex items-center gap-1'>
            <LanguageFlag
              language={booking?.service?.targetLanguage}
              size='sm'
            />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {booking?.service?.targetLanguage?.code}
            </span>
          </div>
        </div>
      </div>
    ),
    price: booking?.serviceFee.toLocaleString('id-ID'),
  }));

  const handlePageChange = (page: number) => {
    router.push(
      `/dashboard/translator/booking?page=${page}&status=${status}&sortBy=${sortBy}`
    );
  };

  const statusOptions: MenuItemType[] = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'unpaid',
      label: 'Unpaid',
    },
    {
      key: 'in_progress',
      label: 'In Progress',
    },
    {
      key: 'completed',
      label: 'Completed',
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
    {
      key: 'price',
      label: 'Price',
    },
  ];

  const onSortByChange = (e: any) => {
    router.push(`/dashboard/translator/booking?status=${status}&sortBy=${e}`);
  };

  const onStatusChange = (value: string) => {
    router.push(
      `/dashboard/translator/booking?status=${value}&sortBy=${sortBy}`
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
        pageSize={bookingLists?.limit}
        currentPage={bookingLists?.page}
        totalData={bookingLists?.total}
        totalPage={bookingLists?.totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default TranslatorBooking;
