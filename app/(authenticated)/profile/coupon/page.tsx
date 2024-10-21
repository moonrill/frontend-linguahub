'use client';

import Pagination from '#/components/Pagination';
import { couponRepository } from '#/repository/coupon';
import { UserCoupon } from '#/types/CouponTypes';
import { Segmented, Skeleton } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfileCoupon = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || 'Available';
  const page = Number(searchParams?.get('page')) || 1;

  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(8);

  const items = ['Available', 'Used', 'Expired', 'Unavailable'];

  const { data: coupons, isLoading } = couponRepository.hooks.useGetUserCoupons(
    status.toLowerCase(),
    1,
    limit
  );

  // Effect to update limit based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setLimit(8);
      } else {
        setLimit(10);
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

  const onChange = (e: any) => {
    router.push(`/profile/coupon?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/profile/coupons?status=${status}&page=${page}`);
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>My Coupons</h1>
        <Segmented options={items} defaultValue={status} onChange={onChange} />
      </div>
      {!isLoading && coupons?.data?.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-4 h-full'>
          <div className='relative w-[150px] h-[150px]'>
            <Image
              src={'/images/no-coupon.svg'}
              alt={'No Coupon'}
              fill
              sizes='(max-width: 400px)'
            />
          </div>
          <p className='text-base'>No coupons found</p>
        </div>
      )}
      <div className='grid grid-cols-2 gap-3 2xl:gap-4'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div className='flex gap-2 border p-3 rounded-xl' key={index}>
                <Skeleton.Button active shape='default' className='!h-full' />
                <Skeleton active />
              </div>
            ))
          : coupons?.data?.map((uc: UserCoupon) => (
              <CouponCard key={uc?.id} userCoupon={uc} status={status} />
            ))}
      </div>
      {!isLoading && (
        <Pagination
          total={coupons?.total}
          pageSize={coupons?.limit}
          current={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

const CouponCard = ({
  userCoupon,
  status,
}: {
  userCoupon: UserCoupon;
  status: string;
}) => {
  const { coupon } = userCoupon;
  const active = status === 'Available';

  return (
    <div className='p-2 2xl:p-3 border rounded-xl flex gap-3'>
      <div
        className={`${
          active ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-400 italic'
        } w-24 2xl:w-28 py-3 2xl:py-4 h-full rounded-lg flex flex-col items-center justify-center`}
      >
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>
          {coupon?.discountPercentage}%
        </h1>
        <p className='text-sm 2xl:text-base'>OFF</p>
      </div>
      <div
        className={`flex flex-col 2xl:gap-1 flex-1 ${
          active ? '' : 'text-zinc-400 italic'
        }`}
      >
        <p className={`text-[10px] 2xl:text-xs ${active && 'text-blue-600'}`}>
          {coupon?.event?.name}
        </p>
        <p className='text-sm 2xl:text-xl font-semibold'>{coupon?.name}</p>
        <p className='text-[10px] 2xl:text-sm line-clamp-2'>
          {coupon?.description}
        </p>
        <p
          className={`text-[10px] 2xl:text-sm font-medium ${
            active && 'text-rose-500'
          }`}
        >
          {dayjs(coupon?.expiredAt).format('DD MMMM YYYY, HH:mm')}
        </p>
      </div>
    </div>
  );
};

export default ProfileCoupon;
