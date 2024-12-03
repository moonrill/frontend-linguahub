'use client';
import { eventPoster } from '#/constants/general';
import { eventRepository } from '#/repository/event';
import { Coupon } from '#/types/CouponTypes';
import { Event } from '#/types/EventTypes';
import { TokenUtil } from '#/utils/token';
import { Button, Result, Skeleton } from 'antd';
import SkeletonImage from 'antd/es/skeleton/Image';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

TokenUtil.loadToken();

const EventDetail = ({ params }: { params: { id: string } }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { data, isLoading } = eventRepository.hooks.useGetEventById(params.id);

  const event: Event = data?.data;

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

  return (
    <section className='bg-white text-slate-800 flex flex-col gap-6 p-8 rounded-3xl'>
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
                {event?.coupons?.map((coupon: Coupon) => (
                  <div
                    key={coupon?.id}
                    className='bg-white border rounded-md flex justify-between transition-transform transform gap-8'
                  >
                    <div className='flex gap-4'>
                      <div className='flex justify-center items-center p-3 border-r-2 border-gray-500 border-dashed'>
                        <div
                          className={`bg-blue-600 text-white p-3 w-[100px] 2xl:w-[120px] h-full rounded-lg flex flex-col items-center justify-center`}
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
