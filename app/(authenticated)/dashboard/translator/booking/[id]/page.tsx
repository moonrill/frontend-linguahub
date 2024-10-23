'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ReviewCard from '#/components/ReviewCard';
import StatusBadge from '#/components/StatusBadge';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { bookingRepository } from '#/repository/booking';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import {
  Image as AntdImage,
  Button,
  Divider,
  message,
  Result,
  Skeleton,
  Upload,
  UploadProps,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import Image from 'next/image';

const BookingDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, mutate } = bookingRepository.hooks.useGetBookingById(
    params.id
  );
  const booking: Booking = data?.data;

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    listType: 'picture-card',
    iconRender: (file) => (
      <Icon
        icon='basil:document-solid'
        height={64}
        className='text-blue-600 mb-4'
      />
    ),
    progress: {
      strokeColor: {
        '0%': '#2563eb',
        '100%': '#2563eb',
      },
    },
    beforeUpload: (file) => {
      if (file.size > 5 * 1024 * 1024) {
        message.error('File too large');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: (
        <Icon icon='mynaui:trash' className='text-red-500' height={24} />
      ),
    },
  };

  const handleUploadProof = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('proof', file);
      await bookingRepository.api.updateProof(params.id, formData);
      message.success('Proof uploaded successfully');
      mutate();
    } catch (error) {
      console.error(error);
      message.error('Error uploading proof');
    }
  };

  const handleRemoveProof = async () => {
    try {
      await bookingRepository.api.removeProof(params.id);
      message.success('Proof removed successfully');
      mutate();
    } catch (error) {
      console.error(error);
      message.error('Error removing proof');
    }
  };

  if (!isLoading && !booking) {
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the booking you visited does not exist.'
        extra={
          <Button
            type='primary'
            href='/profile/booking'
            className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
          >
            Back
          </Button>
        }
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className='flex flex-col gap-4 bg-white p-4 2xl:p-6 rounded-2xl'>
          <div className='flex justify-between items-center bg-zinc-50 rounded-xl py-2 px-4 w-full'>
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
              status={booking?.bookingStatus}
              text={capitalizeFirstLetter(booking?.bookingStatus)}
            />
          </div>
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
            <p className='text-xs 2xl:text-sm font-medium'>Client</p>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <div className='relative w-[100px] h-[100px] 2xl:w-[120px] 2xl:h-[120px]'>
                  <Image
                    src={
                      booking?.user?.userDetail.profilePicture
                        ? imgProfilePicture(
                            booking?.user?.userDetail.profilePicture
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
                      {booking?.user?.userDetail?.fullName}
                    </h1>
                    <p className='text-xs 2xl:text-base font-semibold text-gray-400'>
                      {booking?.user?.email}
                    </p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 items-center text-zinc-500'>
                      <Icon
                        icon={
                          booking?.user?.userDetail.gender === 'male'
                            ? 'mdi:gender-male'
                            : 'mdi:gender-female'
                        }
                        className='text-base 2xl:text-xl'
                      />
                      <p className='text-xs 2xl:text-sm font-medium'>
                        {capitalizeFirstLetter(
                          booking?.user?.userDetail?.gender
                        )}
                      </p>
                    </div>
                    <div className='flex gap-1 items-center text-zinc-500'>
                      <Icon
                        icon={'ic:round-phone'}
                        className='text-base 2xl:text-xl'
                      />
                      <p className='text-xs 2xl:text-sm font-medium'>
                        {booking?.user?.userDetail.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
                {booking?.startAt.slice(0, 5)} - {booking?.endAt.slice(0, 5)} (
                {booking?.duration} hours)
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
            <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
            <section className='flex flex-col gap-2 border p-4 rounded-xl'>
              <p className='text-xs 2xl:text-sm font-medium'>Coupon</p>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
                  <div className='p-3 bg-blue-600 flex justify-center items-center rounded-xl'>
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

          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
            <p className='text-xs 2xl:text-sm font-medium'>Proof</p>
            {booking?.proof ? (
              <>
                <AntdImage
                  width={500}
                  height={300}
                  className='object-cover rounded-xl'
                  src={`${config.baseUrl}/images/proof/${booking?.proof}`}
                />
                {booking?.bookingStatus === 'in_progress' && (
                  <Button
                    className='w-fit py-6 font-medium rounded-xl hover:!border-rose-600 hover:!text-rose-600'
                    type='default'
                    htmlType='button'
                    onClick={handleRemoveProof}
                  >
                    Remove Proof
                  </Button>
                )}
              </>
            ) : (
              booking?.bookingStatus === 'in_progress' && (
                <Dragger
                  {...uploadProps}
                  style={{ width: 300, padding: '3rem 0' }}
                  onChange={(info: UploadChangeParam<UploadFile>) => {
                    const { file } = info;
                    if (file.status !== 'removed') {
                      handleUploadProof(file);
                    }
                  }}
                >
                  <div className='flex flex-col justify-center items-center'>
                    <Icon
                      icon={'iwwa:upload'}
                      height={64}
                      className=' text-blue-600'
                    />
                    <p className='text-sm text-zinc-500'>
                      Drag & drop or click to upload
                    </p>
                  </div>
                </Dragger>
              )
            )}
          </section>
          {booking?.review && (
            <section className='flex flex-col gap-2 border p-4 rounded-xl'>
              <p className='text-xs 2xl:text-sm font-medium'>Review</p>
              <ReviewCard border={false} review={booking?.review} />
            </section>
          )}
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
        </div>
      )}
    </>
  );
};

export default BookingDetail;
