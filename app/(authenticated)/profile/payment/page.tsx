'use client';

import Pagination from '#/components/Pagination';
import PaymentCard from '#/components/PaymentCard';
import { paymentRepository } from '#/repository/payment';
import { Payment } from '#/types/PaymentTypes';
import { Empty, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ProfilePayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Pending', 'Paid', 'Failed', 'Refund'];
  const [currentPage, setCurrentPage] = useState(page);
  const statusParam = status === 'All' ? undefined : status.toLowerCase();

  const { data: payments, isLoading } = paymentRepository.hooks.useGetPayments(
    'client',
    statusParam,
    page,
    5
  );

  const onChange = (e: any) => {
    router.push(`/profile/payment?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/profile/payment?status=${status}&page=${page}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>Payments</h1>
        <Segmented options={items} onChange={onChange} defaultValue={status} />
      </div>
      {payments?.data?.length === 0 && <Empty className='m-auto' />}
      <div className='flex flex-col'>
        {isLoading ? (
          <Skeleton active />
        ) : (
          payments?.data?.map((payment: Payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination
          total={payments?.total}
          pageSize={payments?.limit}
          current={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfilePayment;
