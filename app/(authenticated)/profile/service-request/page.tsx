'use client';

import BookingCard from '#/components/BookingCard';
import Pagination from '#/components/Pagination';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Empty, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfileServiceRequest = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
  const [currentPage, setCurrentPage] = useState(page);
  const statusParam = status === 'All' ? undefined : status.toLowerCase();

  const { data: serviceRequest, isLoading } =
    serviceRequestRepository.hooks.useUserServiceRequest(statusParam, page, 5);

  const onChange = (e: any) => {
    router.push(`/profile/service-request?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/profile/service-request?status=${status}&page=${page}`);
  };

  useEffect(() => {
    document.title = 'Service Requests';
  }, []);

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>
          Service Requests
        </h1>
        <Segmented options={items} onChange={onChange} defaultValue={status} />
      </div>
      {serviceRequest?.data?.length === 0 && <Empty className='m-auto' />}
      <div className='flex flex-col'>
        {isLoading ? (
          <Skeleton active />
        ) : (
          serviceRequest?.data?.map((sr: Booking) => (
            <BookingCard key={sr.id} booking={sr} type='request' />
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination
          total={serviceRequest?.total}
          pageSize={serviceRequest?.limit}
          current={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfileServiceRequest;
