'use client';

import BookingCard from '#/components/BookingCard';
import CustomDropdown from '#/components/CustomDropdown';
import Pagination from '#/components/Pagination';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Empty, MenuProps, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const ProfileServiceRequest = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
  const statusParam = status === 'All' ? undefined : status.toLowerCase();
  const sortBy = searchParams?.get('sortBy') || 'newest';

  const { data: serviceRequest, isLoading } =
    serviceRequestRepository.hooks.useGetServiceRequests(
      'user',
      statusParam,
      page,
      5,
      sortBy
    );

  const onChange = (e: any) => {
    router.push(`/profile/service-request?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/profile/service-request?status=${status}&page=${page}`);
  };

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
    router.push(`/profile/service-request?status=${status}&sortBy=${e}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>
          Service Requests
        </h1>
        <div className='flex gap-2'>
          <Segmented
            options={items}
            onChange={onChange}
            defaultValue={status}
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
          current={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfileServiceRequest;
