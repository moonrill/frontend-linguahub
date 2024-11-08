'use client';

import CustomDropdown from '#/components/CustomDropdown';
import Pagination from '#/components/Pagination';
import PaymentCard from '#/components/PaymentCard';
import { paymentRepository } from '#/repository/payment';
import { Payment } from '#/types/PaymentTypes';
import { Empty, MenuProps, Segmented, Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const ProfilePayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams?.get('status') || 'All';
  const page = Number(searchParams?.get('page')) || 1;
  const items = ['All', 'Pending', 'Paid', 'Failed', 'Refund'];
  const statusParam = status === 'All' ? undefined : status.toLowerCase();
  const sortBy = searchParams?.get('sortBy') || 'date';

  const { data: payments, isLoading } = paymentRepository.hooks.useGetPayments(
    'user',
    statusParam,
    page,
    5,
    sortBy,
    'desc'
  );

  const sortByItems: MenuProps['items'] = [
    {
      key: 'date',
      label: 'Date',
    },
    {
      key: 'price',
      label: 'Price',
    },
  ];

  const onSortByChange = (e: any) => {
    router.push(`/profile/payment?status=${status}&sortBy=${e}`);
  };

  const onChange = (e: any) => {
    router.push(`/profile/payment?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/profile/payment?status=${status}&page=${page}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>Payments</h1>
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
          current={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProfilePayment;
