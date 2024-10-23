'use client';

import LanguageFlag from '#/components/LanguageFlag';
import Pagination from '#/components/Pagination';
import StatusBadge from '#/components/StatusBadge';
import { imgProfilePicture } from '#/constants/general';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Dropdown, Input, Table, TableProps, Tooltip } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;
  const { data: bookingLists, isLoading } =
    bookingRepository.hooks.useTranslatorBookings(page, 10, statusParam);

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      minWidth: 150,
      fixed: 'left',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      minWidth: 200,
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      minWidth: 100,
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
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
      align: 'center',
      width: 150,
      render: (text) => (
        <div className='w-fit m-auto'>
          <StatusBadge text={capitalizeFirstLetter(text)} status={text} />
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      minWidth: 200,
      render: (text) => (
        <Tooltip title={text} placement='topLeft'>
          <p className='text-xs 2xl:text-sm line-clamp-1'>{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      minWidth: 120,
      align: 'right',
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-semibold'>Rp{text}</p>
      ),
    },
  ];

  const data = bookingLists?.data?.map((booking: Booking) => ({
    key: booking?.id,
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
          <p className='font-medium text-sm line-clamp-1'>
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
    bookingStatus: booking?.bookingStatus,
    bookingDate: booking?.bookingDate,
    location: booking?.location,
    price: booking?.serviceFee.toLocaleString('id-ID'),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/booking?page=${page}`);
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

  const handleSelect = (value: string) => {
    router.push(
      `/dashboard/translator/booking?status=${value}&page=${bookingLists?.page}`
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
        <Dropdown
          menu={{
            items: statusOptions,
            selectable: true,
            onClick: ({ key }) => handleSelect(key),
            selectedKeys: [status],
          }}
          trigger={['click']}
          className='cursor-pointer h-12 bg-zinc-100 px-4 py-2 rounded-xl text-sm 2xl:text-base text-zinc-400 font-medium hover:bg-zinc-200 transition-all duration-500'
          placement='bottomRight'
        >
          <div className='flex items-center justify-between gap-4'>
            <p>Status</p>
            <Icon
              icon='weui:arrow-outlined'
              height={24}
              className='rotate-90'
            />
          </div>
        </Dropdown>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 768 }}
        rowClassName={'cursor-pointer'}
        onRow={(row) => ({
          onClick: () => {
            router.push(`/dashboard/translator/booking/${row.key}`);
          },
        })}
        loading={isLoading}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{bookingLists?.page}</span> of{' '}
              {bookingLists?.totalPages} from {bookingLists?.total} result
            </p>
            <Pagination
              current={bookingLists?.page}
              total={bookingLists?.total}
              pageSize={bookingLists?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default TranslatorBooking;
