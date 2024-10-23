'use client';

import LanguageFlag from '#/components/LanguageFlag';
import Pagination from '#/components/Pagination';
import StatusBadge from '#/components/StatusBadge';
import { imgProfilePicture, statusColor } from '#/constants/general';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Table, TableProps, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const { data: response } = bookingRepository.hooks.useTranslatorBookings(
    page,
    10
  );

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      minWidth: 150,
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
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      align: 'center',
      width: 150,
      render: (text) => (
        <div className='w-fit m-auto'>
          <StatusBadge
            text={capitalizeFirstLetter(text)}
            color={statusColor['request'][text]}
          />
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      minWidth: 200,
      render: (text) => (
        <Tooltip title={text}>
          <p className='text-xs 2xl:text-sm line-clamp-1'>{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      minWidth: 100,
      align: 'right',
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-semibold'>Rp{text}</p>
      ),
    },
  ];

  const data = response?.data?.map((booking: Booking) => ({
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
    requestStatus: booking?.requestStatus,
    bookingDate: booking?.bookingDate,
    location: booking?.location,
    price: booking?.serviceFee.toLocaleString('id-ID'),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/service-request?page=${page}`);
  };

  return (
    <main className='bg-white w-full h-full rounded-3xl p-4 overflow-x-auto'>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 768 }}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{response?.page}</span> of{' '}
              {response?.totalPages} from {response?.total} result
            </p>
            <Pagination
              current={response?.page}
              total={response?.total}
              pageSize={response?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default TranslatorBooking;
