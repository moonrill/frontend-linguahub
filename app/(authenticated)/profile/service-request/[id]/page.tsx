'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ConfirmModal from '#/components/Modal/ConfirmModal';
import EditServiceRequestModal from '#/components/Modal/EditServiceRequestModal';
import StatusBadge from '#/components/StatusBadge';
import { imgProfilePicture, statusColor } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Language } from '#/types/LanguageTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Divider, message, Skeleton } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

const ServiceRequestDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, mutate } =
    serviceRequestRepository.hooks.useGetServiceRequestById(params.id);
  const serviceRequest: Booking = data?.data;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelLoading, setCancelLoading] = useState(false);

  const handleCancelRequest = async () => {
    setCancelLoading(true);
    try {
      await serviceRequestRepository.manipulateData.cancelRequest(params.id);
      message.success('Request canceled successfully');
      mutate();
    } catch (error) {
      message.error('Failed to cancel request');
    } finally {
      setCancelLoading(false);
      setIsCancelModalOpen(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center bg-zinc-50 rounded-lg py-2 px-4 w-full'>
            <div>
              <p className='text-xs 2xl:text-sm'>
                Request ID : <span className='font-semibold'>{params.id}</span>
              </p>
              <p className='text-xs 2xl:text-sm'>
                Requested at :{' '}
                <span className='font-semibold'>
                  {dayjs(serviceRequest?.createdAt).format(
                    'DD MMMM YYYY, HH:mm'
                  )}
                </span>
              </p>
            </div>
            <StatusBadge
              color={statusColor['request'][serviceRequest?.requestStatus]}
              text={capitalizeFirstLetter(serviceRequest?.requestStatus)}
            />
          </div>
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Translator</p>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <div className='relative w-[100px] h-[100px] 2xl:w-[120px] 2xl:h-[120px]'>
                  <Image
                    src={
                      serviceRequest?.translator?.user?.userDetail
                        .profilePicture
                        ? imgProfilePicture(
                            serviceRequest?.translator?.user?.userDetail
                              .profilePicture
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
                      {serviceRequest?.translator?.user?.userDetail?.fullName}
                    </h1>
                    <p className='text-xs 2xl:text-base font-semibold text-gray-400'>
                      {serviceRequest?.translator?.user?.email}
                    </p>
                  </div>
                  <div>
                    <div className='flex gap-1 items-center'>
                      <Icon
                        icon={'tabler:star-filled'}
                        className='text-yellow-400 text-sm 2xl:text-lg'
                      />
                      <p className='text-xs 2xl:text-sm font-semibold'>
                        {serviceRequest?.translator?.rating}
                      </p>
                      <p className='text-xs 2xl:text-sm font-light'>
                        ({serviceRequest?.translator?.reviewsCount} reviews)
                      </p>
                    </div>
                    <div className='flex gap-1 items-center text-zinc-500'>
                      <Icon
                        icon={'solar:square-academic-cap-bold'}
                        className='text-base 2xl:text-xl'
                      />
                      <p className='text-xs 2xl:text-sm font-medium'>
                        {serviceRequest?.translator?.yearsOfExperience} Years of
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <div className='flex gap-1'>
                  {serviceRequest?.translator?.languages?.map(
                    (language: Language, index: number) => (
                      <LanguageFlag key={index} language={language} />
                    )
                  )}
                </div>
                <Button
                  type='link'
                  href={`/translator/${serviceRequest?.translator?.id}`}
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
              {serviceRequest?.service?.name}
            </h1>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <LanguageFlag
                    language={serviceRequest?.service?.sourceLanguage}
                  />
                  <span className='text-sm'>
                    {serviceRequest?.service?.sourceLanguage?.name}
                  </span>
                </div>
                <Icon icon={'lucide:arrow-right'} className='text-lg' />
                <div className='flex items-center gap-2'>
                  <LanguageFlag
                    language={serviceRequest?.service?.targetLanguage}
                  />
                  <span className='text-sm'>
                    {serviceRequest?.service?.targetLanguage?.name}
                  </span>
                </div>
              </div>
              <h3 className='text-lg font-semibold text-blue-600'>
                Rp
                {serviceRequest?.service?.pricePerHour.toLocaleString('id-ID')}
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
                {new Date(serviceRequest?.bookingDate).toLocaleString('en-UK', {
                  weekday: 'long',
                })}
                , {dayjs(serviceRequest?.bookingDate).format('DD MMMM YYYY')}
              </p>
            </div>
            <div className='flex gap-1 2xl:gap-2'>
              <Icon
                icon='mdi:clock-outline'
                className='text-xl 2xl:text-2xl text-blue-600'
              />
              <p className='text-sm 2xl:text-base font-medium'>
                {serviceRequest?.startAt.slice(0, 5)} -{' '}
                {serviceRequest?.endAt.slice(0, 5)} ({serviceRequest?.duration}{' '}
                hours)
              </p>
            </div>
            <p className='text-xs 2xl:text-sm font-medium mt-2'>Location</p>
            <div className='flex gap-1 2xl:gap-2'>
              <Icon
                icon='mdi:map-marker'
                className='text-xl 2xl:text-2xl text-blue-600'
              />
              <p className='text-sm 2xl:text-base font-medium'>
                {serviceRequest?.location}
              </p>
            </div>
          </section>
          {serviceRequest?.notes && (
            <section className='flex flex-col gap-2 border p-4 rounded-lg'>
              <p className='text-xs 2xl:text-sm font-medium'>Notes</p>
              <div className='flex gap-1'>
                <Icon
                  icon='mdi:file-document-edit-outline'
                  className='text-xl 2xl:text-2xl text-blue-600'
                />
                <p className='text-sm 2xl:text-base'>{serviceRequest?.notes}</p>
              </div>
            </section>
          )}
          {serviceRequest?.coupon && (
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
                      {serviceRequest?.coupon?.discountPercentage} % OFF
                    </p>
                    <p className='text-sm font-medium'>
                      {serviceRequest?.coupon?.name}
                    </p>
                  </div>
                </div>
                <p className='text-sm text-rose-600'>
                  Exp:{' '}
                  {dayjs(serviceRequest?.coupon?.expiredAt).format(
                    'DD MMM YYYY'
                  )}
                </p>
              </div>
            </section>
          )}
          <section className='flex flex-col gap-2 border p-4 rounded-lg'>
            <p className='text-xs 2xl:text-sm font-medium'>Pricing</p>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between text-sm 2xl:text-base'>
                <p>Service fee</p>
                <p>Rp{serviceRequest?.serviceFee.toLocaleString('id-ID')}</p>
              </div>
              <div className='flex justify-between text-sm 2xl:text-base'>
                <p>System fee</p>
                <p>Rp{serviceRequest?.systemFee.toLocaleString('id-ID')}</p>
              </div>
              {serviceRequest?.discountAmount && (
                <div className='flex justify-between text-sm 2xl:text-base'>
                  <p>Discount Amount</p>
                  <p>
                    -Rp{serviceRequest?.discountAmount.toLocaleString('id-ID')}
                  </p>
                </div>
              )}
              <Divider style={{ margin: 0 }} className='!my-2' />
              <div className='flex justify-between text-base 2xl:text-xl font-semibold'>
                <p>Total price</p>
                <p>Rp{serviceRequest?.totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </section>
          {serviceRequest?.rejectionReason && (
            <section className='flex flex-col gap-2 border-2 p-4 border-blue-600 rounded-lg'>
              <p className='text-xs 2xl:text-sm font-medium'>
                Rejection Reason
              </p>
              <p className='text-sm 2xl:text-base'>
                {serviceRequest?.rejectionReason}
              </p>
            </section>
          )}
          {serviceRequest?.requestStatus === 'pending' && (
            <section className='flex justify-end gap-3'>
              <Button
                type='default'
                className='py-3 px-5 w-fit h-fit text-sm rounded-xl hover:!border-rose-600 hover:!text-rose-600'
                onClick={() => setIsCancelModalOpen(true)}
              >
                Cancel Request
              </Button>
              <ConfirmModal
                type='danger'
                title='Cancel Request'
                description='Are you sure you want to cancel this request? This action cannot be undone.'
                confirmText='Yes, cancel it'
                cancelText='No, keep it'
                open={isCancelModalOpen}
                onCancel={() => setIsCancelModalOpen(false)}
                onConfirm={handleCancelRequest}
                isLoading={isCancelLoading}
              />
              <Button
                type='primary'
                className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
                onClick={() => setEditModalOpen(true)}
              >
                <Icon icon={'hugeicons:pencil-edit-01'} className='text-xl' />
                Edit
              </Button>
            </section>
          )}
          <EditServiceRequestModal
            open={editModalOpen}
            onCancel={() => setEditModalOpen(false)}
            serviceRequest={serviceRequest}
            mutate={mutate}
          />
        </div>
      )}
    </>
  );
};

export default ServiceRequestDetail;
