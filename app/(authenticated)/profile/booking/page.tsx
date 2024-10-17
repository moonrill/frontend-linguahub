'use client';

import BookingCard from '#/components/BookingCard';
import Pagination from '#/components/Pagination';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { Empty, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ProfileBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Unpaid', 'In Progress', 'Completed', 'Cancelled'];
  const [currentPage, setCurrentPage] = useState(page);
  const statusParam = status === 'All' ? undefined : status.toLowerCase();

  const { data: bookings, isLoading } = bookingRepository.hooks.useUserBookings(
    statusParam,
    page,
    5
  );

  const onChange = (e: any) => {
    let status = e;

    if (status === 'In Progress') {
      status = 'in_progress';
    }
    router.push(`/profile/booking?status=${status}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/profile/booking?status=${status}&page=${page}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>Bookings</h1>
        <Segmented
          options={items}
          onChange={onChange}
          defaultValue={status === 'in_progress' ? 'In Progress' : status}
        />
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
          current={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfileBooking;
