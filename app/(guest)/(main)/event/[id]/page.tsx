'use client';
import { eventPoster } from '#/constants/general';
import { authRepository } from '#/repository/auth';
import { couponRepository } from '#/repository/coupon';
import { eventRepository } from '#/repository/event';
import { Coupon, UserCoupon } from '#/types/CouponTypes';
import { Event } from '#/types/EventTypes';
import { http } from '#/utils/http';
import { TokenUtil } from '#/utils/token';
import { Button, message, Result, Skeleton } from 'antd';
import SkeletonImage from 'antd/es/skeleton/Image';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';

TokenUtil.loadToken();

const EventDetail = ({ params }: { params: { id: string } }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { data, isLoading } = eventRepository.hooks.useGetEventById(params.id);

  const isLoggedIn = TokenUtil.accessToken;
  const { data: uc, mutate } = useSWR(
    isLoggedIn ? couponRepository.url.getUserCouponsByEvent(params.id) : null,
    http.fetcher
  );
  const { data: user } = useSWR(
    isLoggedIn ? authRepository.url.profile() : null,
    http.fetcher
  );

  const event: Event = data?.data;
  const userCoupons: UserCoupon[] = uc?.data;

  const claimedCoupons = userCoupons?.map((uc) => uc?.coupon?.id);

  const handleClaimCoupon = async (couponId: string) => {
    if (!TokenUtil.accessToken) {
      message.warning('You need to login to claim the coupon.');
      return;
    }

    setIsClaiming(true);
    try {
      await couponRepository.api.claimCoupon(couponId);
      mutate();
      message.success('Coupon claimed successfully!');
    } catch (error) {
      message.error('Failed to claim the coupon. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  const isCouponClaimable = (startDate: string, endDate: string) => {
    const now = dayjs();
    const eventStart = dayjs(startDate);
    const eventEnd = dayjs(endDate);
    return now.isAfter(eventStart) && now.isBefore(eventEnd);
  };

  if (!isLoading && !event) {
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the event you visited does not exist.'
        extra={
          <Button
            type='primary'
            href='/event'
            className='py-3 px-8 w-fit h-fit text-sm rounded-xl'
          >
            Back
          </Button>
        }
      />
    );
  }

  // Set claimed coupon to end of array
  const sortedCoupons = event?.coupons?.slice().sort((a: Coupon, b: Coupon) => {
    const isClaimedA = claimedCoupons?.includes(a?.id);
    const isClaimedB = claimedCoupons?.includes(b?.id);
    return isClaimedA === isClaimedB ? 0 : isClaimedA ? 1 : -1; // Kupon yang diklaim di akhir
  });

  return (
    <section className='bg-white text-slate-800 flex flex-col gap-6 mt-6'>
      {isLoading ? (
        <div className='flex flex-col gap-4'>
          <SkeletonImage active className='!w-full !h-[250px]' />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <>
          {event?.poster && (
            <div className='h-[250px] 2xl:h-[500px] h rounded-lg shadow-lg relative'>
              <Image
                src={
                  event?.poster
                    ? eventPoster(event?.poster)
                    : '/images/event-placeholder.svg'
                }
                alt='Poster'
                fill
                quality={100}
                priority
                className='rounded-lg object-cover'
              />
            </div>
          )}

          <h1 className='text-3xl font-bold'>{event?.name}</h1>
          <p className='text-blue-600 text-lg'>
            {dayjs().isAfter(event?.startDate)
              ? `Event ends at: ${dayjs(event?.endDate).format(
                  'DD MMMM YYYY, HH:mm'
                )}`
              : `Event starts at: ${dayjs(event?.startDate).format(
                  'DD MMMM YYYY, HH:mm'
                )}`}
          </p>
          <h3 className='text-xl font-bold'>Event Description</h3>

          {/* Event Description */}
          <div className='text-gray-600 text-lg'>{event?.description}</div>

          {event?.coupons?.length > 0 && (
            <>
              <h3 className='text-xl font-bold'>Event Coupons</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-xl'>
                {sortedCoupons?.map((coupon: Coupon) => (
                  <div
                    key={coupon?.id}
                    className='bg-white border rounded-md flex justify-between transition-transform transform gap-8'
                  >
                    <div className='flex gap-4'>
                      <div className='flex justify-center items-center p-3 border-r-2 border-gray-500 border-dashed'>
                        <div
                          className={`${
                            isCouponClaimable(
                              event?.startDate,
                              event?.endDate
                            ) || coupon?.status === 'Inactive'
                              ? 'bg-blue-600 text-white'
                              : 'bg-zinc-100 text-zinc-300'
                          } p-3 w-[100px] 2xl:w-[120px] h-full rounded-lg flex flex-col items-center justify-center`}
                        >
                          <p className='text-2xl 2xl:text-4xl font-bold tracking-tight'>
                            {coupon?.discountPercentage} %
                          </p>
                          <p className='text-sm'>Discount</p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 py-3 h-fit'>
                        <h2 className='text-xl font-semibold text-slate-800 line-clamp-1'>
                          {coupon?.name}
                        </h2>
                        <p className='text-sm line-clamp-3'>
                          {coupon?.description}
                        </p>
                        <p className='text-rose-600 text-sm'>
                          Expires On:{' '}
                          {dayjs(coupon?.expiredAt).format('DD MMMM YYYY')}
                        </p>
                      </div>
                    </div>
                    {user?.data?.role?.name === 'client' && (
                      <Button
                        type='primary'
                        className='mt-3 mr-3 text-sm'
                        disabled={
                          !isLoggedIn ||
                          claimedCoupons?.includes(coupon?.id) ||
                          !isCouponClaimable(
                            event?.startDate,
                            event?.endDate
                          ) ||
                          coupon?.status === 'Inactive'
                        }
                        loading={isClaiming}
                        onClick={() => handleClaimCoupon(coupon?.id)}
                      >
                        {claimedCoupons?.includes(coupon?.id)
                          ? 'Claimed'
                          : 'Claim'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default EventDetail;
