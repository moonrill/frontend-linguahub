'use client';

import BookingCard from '#/components/BookingCard';
import CustomDropdown from '#/components/CustomDropdown';
import Pagination from '#/components/Pagination';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { Empty, MenuProps, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const ProfileBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Unpaid', 'In Progress', 'Completed', 'Cancelled'];
  const statusParam = status === 'All' ? undefined : status.toLowerCase();
  const sortBy = searchParams?.get('sortBy') || 'newest';

  const { data: bookings, isLoading } = bookingRepository.hooks.useGetBookings(
    'user',
    statusParam,
    page,
    5,
    sortBy
  );

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
    router.push(`/profile/booking?status=${status}&sortBy=${e}`);
  };

  const onChange = (e: any) => {
    let status = e;

    if (status === 'In Progress') {
      status = 'in_progress';
    }
    router.push(`/profile/booking?status=${status}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/profile/booking?status=${status}&page=${page}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>Bookings</h1>
        <div className='flex gap-2'>
          <Segmented
            options={items}
            onChange={onChange}
            defaultValue={status === 'in_progress' ? 'In Progress' : status}
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
      {bookings?.data?.length === 0 && <Empty className='m-auto' />}
      <div className='flex flex-col'>
        {isLoading ? (
          <Skeleton active />
        ) : (
          bookings?.data?.map((sr: Booking) => (
            <BookingCard key={sr.id} booking={sr} type='booking' />
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination
          total={bookings?.total}
          pageSize={bookings?.limit}
          current={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfileBooking;
