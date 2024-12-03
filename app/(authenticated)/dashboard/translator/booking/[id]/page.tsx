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
        booking && (
          <div className='flex flex-col gap-4 bg-white p-4 2xl:p-6 rounded-2xl'>
            <div className='flex flex-col gap-6'>
              <div className='bg-white rounded-xl p-6 border'>
                <div className='flex justify-between items-center mb-4'>
                  <h1 className='text-2xl font-bold'>Booking Details</h1>
                  <StatusBadge
                    status={booking?.bookingStatus}
                    text={capitalizeFirstLetter(booking?.bookingStatus)}
                  />
                </div>
                <div className='text-sm text-gray-600'>
                  <p>
                    Request ID: <span className='font-medium'>{params.id}</span>
                  </p>
                  <p>
                    Created:{' '}
                    <span className='font-medium'>
                      {dayjs(booking?.createdAt).format('DD MMMM YYYY, HH:mm')}
                    </span>
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-6'>
                {/* Left Column - Main Info */}
                <div className='col-span-8 border rounded-xl'>
                  {/* Client Card */}
                  <div className='bg-white rounded-xl p-6'>
                    <h2 className='text-lg font-semibold mb-4'>Client</h2>
                    <div className='flex gap-6'>
                      <div className='relative w-36 h-36 flex-shrink-0'>
                        <Image
                          src={
                            booking?.user?.userDetail.profilePicture
                              ? imgProfilePicture(
                                  booking?.user?.userDetail.profilePicture
                                )
                              : '/images/avatar-placeholder.png'
                          }
                          alt='Translator Profile'
                          fill
                          className='object-cover rounded-xl'
                          priority
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h3 className='text-3xl font-bold mb-1'>
                              {booking?.user?.userDetail?.fullName}
                            </h3>
                            <p className='text-gray-500'>
                              {booking?.user?.email}
                            </p>
                          </div>
                        </div>
                        <div className='mt-4 flex flex-col gap-4'>
                          <div className='flex items-center gap-2'>
                            <Icon
                              icon={'ic:round-phone'}
                              className='text-xl 2xl:text-2xl text-gray-500'
                            />
                            <p className='text-sm 2xl:text-base text-gray-500'>
                              {booking?.user?.userDetail?.phoneNumber}
                            </p>
                          </div>
                          <div className='flex gap-2'>
                            <Icon
                              icon={'mdi:map-marker'}
                              className='text-xl 2xl:text-2xl text-gray-500'
                            />
                            <p className='text-sm 2xl:text-base text-gray-500'>
                              {booking?.user?.userDetail?.city},{' '}
                              {booking?.user?.userDetail?.province}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider style={{ margin: 0 }} />

                  {/* Service Details */}
                  <div className='bg-white rounded-xl p-6'>
                    <h2 className='text-lg font-semibold mb-4'>
                      Service Details
                    </h2>
                    <div className='space-y-4'>
                      <h3 className='text-xl font-medium'>
                        {booking?.service?.name}
                      </h3>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-6'>
                          <div className='flex items-center gap-2'>
                            <LanguageFlag
                              language={booking?.service?.sourceLanguage}
                            />
                            <span>
                              {booking?.service?.sourceLanguage?.name}
                            </span>
                          </div>
                          <Icon icon='lucide:arrow-right' className='text-xl' />
                          <div className='flex items-center gap-2'>
                            <LanguageFlag
                              language={booking?.service?.targetLanguage}
                            />
                            <span>
                              {booking?.service?.targetLanguage?.name}
                            </span>
                          </div>
                        </div>
                        <div className='text-xl font-semibold text-blue-600'>
                          Rp{' '}
                          {booking?.service?.pricePerHour.toLocaleString(
                            'id-ID'
                          )}
                          /hr
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider style={{ margin: 0 }} />

                  {/* Schedule & Location */}
                  <div className='bg-white rounded-xl p-6'>
                    <div className='grid grid-cols-2 gap-8'>
                      <div>
                        <h2 className='text-lg font-semibold mb-4'>
                          Date & Time
                        </h2>
                        <div className='space-y-4'>
                          <div className='flex items-center gap-3'>
                            <Icon
                              icon='ic:round-date-range'
                              className='text-blue-600 text-xl'
                            />
                            <span>
                              {dayjs(booking?.bookingDate).format(
                                'dddd, DD MMMM YYYY'
                              )}
                            </span>
                          </div>
                          <div className='flex items-center gap-3'>
                            <Icon
                              icon='mdi:clock-outline'
                              className='text-blue-600 text-xl'
                            />
                            <span>
                              {booking?.startAt.slice(0, 5)} -{' '}
                              {booking?.endAt.slice(0, 5)}
                              <span className='text-gray-500 ml-1'>
                                (
                                {booking?.duration > 1
                                  ? `${booking?.duration} hrs`
                                  : `${booking?.duration} hr`}
                                )
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className='text-lg font-semibold mb-4'>Location</h2>
                        <div className='flex items-start gap-3'>
                          <Icon
                            icon='mdi:map-marker'
                            className='text-blue-600 text-xl mt-1'
                          />
                          <span>{booking?.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider style={{ margin: 0 }} />

                  {/* Notes Section */}
                  {booking?.notes && (
                    <>
                      <div className='bg-white rounded-xl p-6'>
                        <h2 className='text-lg font-semibold mb-4'>
                          Additional Notes
                        </h2>
                        <div className='flex gap-3'>
                          <Icon
                            icon='mdi:file-document-edit-outline'
                            className='text-blue-600 text-xl flex-shrink-0 mt-1'
                          />
                          <p className='text-gray-600'>{booking?.notes}</p>
                        </div>
                      </div>
                      <Divider style={{ margin: 0 }} />
                    </>
                  )}

                  {/* Proof Section */}
                  <div className='bg-white rounded-xl p-6'>
                    <h2 className='text-lg font-semibold mb-4'>
                      Booking Proof
                    </h2>
                    {booking?.proof ? (
                      <div className='flex flex-col gap-4'>
                        <AntdImage
                          width={'100%'}
                          height={350}
                          className='object-cover rounded-xl'
                          src={`${config.baseUrl}/images/proof/booking/${booking?.proof}`}
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
                      </div>
                    ) : (
                      booking?.bookingStatus === 'in_progress' && (
                        <Dragger
                          {...uploadProps}
                          style={{ width: '100%', padding: '3rem 0' }}
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
                  </div>
                </div>

                {/* Right Column - Pricing & Actions */}
                <div className='col-span-4 space-y-6'>
                  {/* Pricing Card */}
                  <div className='bg-white rounded-xl p-6 border'>
                    <h2 className='text-lg font-semibold mb-4'>
                      Price Summary
                    </h2>
                    <div className='space-y-4'>
                      <div className='flex justify-between'>
                        <span>Service fee</span>
                        <span>
                          Rp {booking?.serviceFee.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>System fee</span>
                        <span>
                          Rp {booking?.systemFee.toLocaleString('id-ID')}
                        </span>
                      </div>
                      {booking?.discountAmount &&
                        booking?.discountAmount > 0 && (
                          <div className='flex justify-between text-blue-600'>
                            <span>Discount</span>
                            <span>
                              - Rp{' '}
                              {booking?.discountAmount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        )}
                      <Divider className='my-4' />
                      <div className='flex justify-between text-lg font-bold'>
                        <span>Total Price</span>
                        <span>
                          Rp {booking?.totalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Card */}
                  {booking?.coupon && (
                    <div className='bg-white rounded-xl p-6 border'>
                      <h2 className='text-lg font-semibold mb-4'>
                        Applied Coupon
                      </h2>
                      <div className='flex items-center gap-4'>
                        <div className='p-3 flex items-center justify-center bg-blue-600 rounded-lg'>
                          <Icon
                            icon='mdi:ticket-percent'
                            className='text-2xl text-white'
                          />
                        </div>
                        <div className='flex-grow'>
                          <p className='font-semibold text-lg'>
                            {booking?.coupon?.discountPercentage}% OFF
                          </p>
                          <p className='text-gray-600 text-sm'>
                            {booking?.coupon?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Card */}
                  {booking?.review && (
                    <div className='rounded-xl p-6 border'>
                      <h2 className='text-lg font-semibold mb-4'>Review</h2>
                      <ReviewCard border={false} review={booking?.review} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default BookingDetail;
