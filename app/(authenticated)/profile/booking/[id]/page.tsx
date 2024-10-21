'use client';

import LanguageFlag from '#/components/LanguageFlag';
import StatusBadge from '#/components/StatusBadge';
import { config } from '#/config/app';
import { imgProfilePicture, statusColor } from '#/constants/general';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { Language } from '#/types/LanguageTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Image as AntdImage, Button, Divider, Skeleton } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

const BookingDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = bookingRepository.hooks.useGetBookingById(
    params.id
  );
  const booking: Booking = data?.data;

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center bg-zinc-50 rounded-lg py-2 px-4 w-full'>
            <div>
              <p className='text-xs 2xl:text-sm'>
                Booking ID : <span className='font-semibold'>{params.id}</span>
              </p>
              <p className='text-xs 2xl:text-sm'>
                Requested at :{' '}
                <span className='font-semibold'>
                  {dayjs(booking?.createdAt).format('DD MMMM YYYY, HH:mm')}
                </span>
              </p>
            </div>
            <StatusBadge
              color={statusColor['booking'][booking?.bookingStatus]}
              text={capitalizeFirstLetter(booking?.bookingStatus)}
            />
          </div>
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Translator</p>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <div className='relative w-[100px] h-[100px] 2xl:w-[120px] 2xl:h-[120px]'>
                  <Image
                    src={
                      booking?.translator?.user?.userDetail.profilePicture
                        ? imgProfilePicture(
                            booking?.translator?.user?.userDetail.profilePicture
                          )
                        : '/images/avatar-placeholder.png'
                    }
                    alt={'Translator Profile Picture'}
                    fill
                    sizes='(max-width: 400px)'
                    className='object-cover rounded-2xl'
                    priority
                  />
                </div>
                <div className='flex flex-col justify-between'>
                  <div>
                    <h1 className='font-bold text-xl 2xl:text-3xl'>
                      {booking?.translator?.user?.userDetail?.fullName}
                    </h1>
                    <p className='text-xs 2xl:text-base font-semibold text-gray-400'>
                      {booking?.translator?.user?.email}
                    </p>
                  </div>
                  <div>
                    <div className='flex gap-1 items-center'>
                      <Icon
                        icon={'tabler:star-filled'}
                        className='text-yellow-400 text-sm 2xl:text-lg'
                      />
                      <p className='text-xs 2xl:text-sm font-semibold'>
                        {booking?.translator?.rating}
                      </p>
                      <p className='text-xs 2xl:text-sm font-light'>
                        ({booking?.translator?.reviewsCount} reviews)
                      </p>
                    </div>
                    <div className='flex gap-1 items-center text-zinc-500'>
                      <Icon
                        icon={'solar:square-academic-cap-bold'}
                        className='text-base 2xl:text-xl'
                      />
                      <p className='text-xs 2xl:text-sm font-medium'>
                        {booking?.translator?.yearsOfExperience} Years of
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <div className='flex gap-1'>
                  {booking?.translator?.languages?.map(
                    (language: Language, index: number) => (
                      <LanguageFlag key={index} language={language} />
                    )
                  )}
                </div>
                <Button
                  type='link'
                  href={`/translator/${booking?.translator?.id}`}
                  className='text-blue-600 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-sm font-semibold bg-blue-100 py-2.5 px-4 h-fit hover:!text-blue-600 hover:!bg-blue-200 shadow-none'
                >
                  Details
                </Button>
              </div>
            </div>
          </section>
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Service</p>
            <h1 className='font-semibold text-xl 2xl:text-2xl'>
              {booking?.service?.name}
            </h1>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <LanguageFlag language={booking?.service?.sourceLanguage} />
                  <span className='text-sm'>
                    {booking?.service?.sourceLanguage?.name}
                  </span>
                </div>
                <Icon icon={'lucide:arrow-right'} className='text-lg' />
                <div className='flex items-center gap-2'>
                  <LanguageFlag language={booking?.service?.targetLanguage} />
                  <span className='text-sm'>
                    {booking?.service?.targetLanguage?.name}
                  </span>
                </div>
              </div>
              <h3 className='text-lg font-semibold text-blue-600'>
                Rp
                {booking?.service?.pricePerHour.toLocaleString('id-ID')}
                /hr
              </h3>
            </div>
          </section>
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Date & Time</p>
            <div className='flex gap-1 2xl:gap-2'>
              <Icon
                icon='ic:round-date-range'
                className='text-xl 2xl:text-2xl text-blue-600'
              />
              <p className='text-sm 2xl:text-base font-medium'>
                {new Date(booking?.bookingDate).toLocaleString('en-UK', {
                  weekday: 'long',
                })}
                , {dayjs(booking?.bookingDate).format('DD MMMM YYYY')}
              </p>
            </div>
            <div className='flex gap-1 2xl:gap-2'>
              <Icon
                icon='mdi:clock-outline'
                className='text-xl 2xl:text-2xl text-blue-600'
              />
              <p className='text-sm 2xl:text-base font-medium'>
                {booking?.startAt.slice(0, 5)} - {booking?.endAt.slice(0, 5)}
              </p>
            </div>
            <p className='text-xs 2xl:text-sm font-medium mt-2'>Location</p>
            <div className='flex gap-1 2xl:gap-2'>
              <Icon
                icon='mdi:map-marker'
                className='text-xl 2xl:text-2xl text-blue-600'
              />
              <p className='text-sm 2xl:text-base font-medium'>
                {booking?.location}
              </p>
            </div>
          </section>
          {booking?.notes && (
            <section className='flex flex-col gap-2 border p-4 rounded-lg'>
              <p className='text-xs 2xl:text-sm font-medium'>Notes</p>
              <div className='flex gap-1'>
                <Icon
                  icon='mdi:file-document-edit-outline'
                  className='text-xl 2xl:text-2xl text-blue-600'
                />
                <p className='text-sm 2xl:text-base'>{booking?.notes}</p>
              </div>
            </section>
          )}
          {booking?.coupon && (
            <section className='flex flex-col gap-2 border p-4 rounded-lg'>
              <p className='text-xs 2xl:text-sm font-medium'>Coupon</p>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
                  <div className='p-3 bg-blue-600 flex justify-center items-center rounded-lg'>
                    <Icon
                      icon='mdi:ticket-percent'
                      className='text-2xl text-white'
                    />
                  </div>
                  <div className='flex flex-col justify-between'>
                    <p className='text-base font-semibold'>
                      {booking?.coupon?.discountPercentage} % OFF
                    </p>
                    <p className='text-sm font-medium'>
                      {booking?.coupon?.name}
                    </p>
                  </div>
                </div>
                <p className='text-sm text-rose-600'>
                  Exp: {dayjs(booking?.coupon?.expiredAt).format('DD MMM YYYY')}
                </p>
              </div>
            </section>
          )}
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Pricing</p>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between text-sm 2xl:text-base'>
                <p>Service fee</p>
                <p>Rp{booking?.serviceFee.toLocaleString('id-ID')}</p>
              </div>
              <div className='flex justify-between text-sm 2xl:text-base'>
                <p>System fee</p>
                <p>Rp{booking?.systemFee.toLocaleString('id-ID')}</p>
              </div>
              {booking?.discountAmount && (
                <div className='flex justify-between text-sm 2xl:text-base'>
                  <p>Discount Amount</p>
                  <p>-Rp{booking?.discountAmount.toLocaleString('id-ID')}</p>
                </div>
              )}
              <Divider style={{ margin: 0 }} className='!my-2' />
              <div className='flex justify-between text-base 2xl:text-xl font-semibold'>
                <p>Total price</p>
                <p>Rp{booking?.totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </section>
          {booking?.proof && (
            <section className='flex flex-col gap-2 border p-4 rounded-lg'>
              <p className='text-xs 2xl:text-sm font-medium'>Proof</p>
              <AntdImage
                width={300}
                height={300}
                className='object-cover rounded-xl'
                src={`${config.baseUrl}/images/proof/${booking?.proof}`}
              />
            </section>
          )}
          {booking?.bookingStatus === 'in_progress' && (
            <section className='flex justify-end gap-3'>
              <Button
                type='default'
                className='py-3 px-5 w-fit h-fit text-sm rounded-xl hover:!border-rose-600 hover:!text-rose-600'
              >
                Cancel Booking
              </Button>
              <Button
                type='primary'
                className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
              >
                Complete Booking
              </Button>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default BookingDetail;
