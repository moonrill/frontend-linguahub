'use client';
import { imgProfilePicture } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const columns: TableProps['columns'] = [
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    align: 'right',
    render: (text) => (
      <p className='font-semibold text-xs 2xl:text-sm'>{text}</p>
    ),
  },
];

const NewRequest = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(5);
  const { data: response } =
    serviceRequestRepository.hooks.useGetServiceRequests(
      'translator',
      'pending',
      1,
      limit,
      'date',
      'desc'
    );

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
    requestDate: dayjs(sr?.bookingDate).format('DD MMM YYYY'),
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(record) => ({
        onClick: () =>
          router.push(`/dashboard/translator/service-request/${record.key}`),
      })}
      rowClassName={
        'cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out'
      }
    />
  );
};

export default NewRequest;
