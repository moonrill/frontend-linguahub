'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ConfirmModal from '#/components/Modal/ConfirmModal';
import EditServiceRequestModal from '#/components/Modal/EditServiceRequestModal';
import StatusBadge from '#/components/StatusBadge';
import { imgProfilePicture } from '#/constants/general';
import { serviceRequestRepository } from '#/repository/service-request';
import { Language } from '#/types/LanguageTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Divider, Skeleton, Tag, message } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ServiceRequestDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, mutate } =
    serviceRequestRepository.hooks.useGetServiceRequestById(params.id);
  const serviceRequest = data?.data;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelLoading, setCancelLoading] = useState(false);

  const handleCancelRequest = async () => {
    setCancelLoading(true);
    try {
      await serviceRequestRepository.api.cancelRequest(params.id);
      message.success('Request canceled successfully');
      mutate();
    } catch (error) {
      message.error('Failed to cancel request');
    } finally {
      setCancelLoading(false);
      setIsCancelModalOpen(false);
    }
  };

  if (isLoading) return <Skeleton active />;

  return (
    <>
      <div className='w-full'>
        {/* Header Section */}
        <div className='bg-white rounded-xl p-6 mb-6 border'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>Service Request Details</h1>
            <StatusBadge
              status={serviceRequest?.requestStatus}
              text={capitalizeFirstLetter(serviceRequest?.requestStatus)}
            />
          </div>
          <div className='text-sm text-gray-600'>
            <p>
              Request ID: <span className='font-medium'>{params.id}</span>
            </p>
            <p>
              Created:{' '}
              <span className='font-medium'>
                {dayjs(serviceRequest?.createdAt).format('DD MMMM YYYY, HH:mm')}
              </span>
            </p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-6'>
          {/* Left Column - Main Info */}
          <div className='col-span-8 border rounded-xl'>
            {/* Translator Card */}
            <div className='bg-white rounded-xl p-6'>
              <h2 className='text-lg font-semibold mb-4'>Translator</h2>
              <div className='flex gap-6'>
                <div className='relative w-32 h-32 2xl:w-64 2xl:h-64 flex-shrink-0'>
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
                        {serviceRequest?.translator?.user?.userDetail?.fullName}
                      </h3>
                      <p className='text-gray-500'>
                        {serviceRequest?.translator?.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 flex gap-8'>
                    <div className='flex items-center gap-2'>
                      <Icon
                        icon='tabler:star-filled'
                        className='text-yellow-400 text-lg'
                      />
                      <span className='font-medium'>
                        {serviceRequest?.translator?.rating}
                      </span>
                      <span className='text-gray-500'>
                        ({serviceRequest?.translator?.reviewsCount} reviews)
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Icon
                        icon='solar:square-academic-cap-bold'
                        className='text-lg'
                      />
                      <span>
                        {serviceRequest?.translator?.yearsOfExperience} Years
                        Experience
                      </span>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-col gap-2'>
                    <p className='text-sm'>Languages</p>
                    <div className='flex gap-2'>
                      {serviceRequest?.translator?.languages?.map(
                        (language: Language, index: number) => (
                          <LanguageFlag key={index} language={language} />
                        )
                      )}
                    </div>
                  </div>
                  <div className='flex mt-4 flex-col gap-2'>
                    <p className='text-sm'>Specializations</p>
                    <div className='flex flex-wrap'>
                      {serviceRequest?.translator?.specializations?.map(
                        (specialization: Specialization, index: number) => (
                          <Link
                            key={index}
                            href={`/specialization?name=${specialization.name}`}
                            className='group'
                          >
                            <Tag
                              color='default'
                              className='!bg-white text-xs 2xl:text-sm text-blue-600 py-1 px-5 rounded-full font-medium !border-blue-600 group-hover:!bg-blue-600 group-hover:text-white'
                            >
                              {specialization.name}
                            </Tag>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Divider style={{ margin: 0 }} />

            {/* Service Details */}
            <div className='bg-white rounded-xl p-6'>
              <h2 className='text-lg font-semibold mb-4'>Service Details</h2>
              <div className='space-y-4'>
                <h3 className='text-xl font-medium'>
                  {serviceRequest?.service?.name}
                </h3>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2'>
                      <LanguageFlag
                        language={serviceRequest?.service?.sourceLanguage}
                      />
                      <span>
                        {serviceRequest?.service?.sourceLanguage?.name}
                      </span>
                    </div>
                    <Icon icon='lucide:arrow-right' className='text-xl' />
                    <div className='flex items-center gap-2'>
                      <LanguageFlag
                        language={serviceRequest?.service?.targetLanguage}
                      />
                      <span>
                        {serviceRequest?.service?.targetLanguage?.name}
                      </span>
                    </div>
                  </div>
                  <div className='text-xl font-semibold text-blue-600'>
                    Rp{' '}
                    {serviceRequest?.service?.pricePerHour.toLocaleString(
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
                  <h2 className='text-lg font-semibold mb-4'>Date & Time</h2>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <Icon
                        icon='ic:round-date-range'
                        className='text-blue-600 text-xl'
                      />
                      <span>
                        {dayjs(serviceRequest?.bookingDate).format(
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
                        {serviceRequest?.startAt.slice(0, 5)} -{' '}
                        {serviceRequest?.endAt.slice(0, 5)}
                        <span className='text-gray-500 ml-1'>
                          (
                          {serviceRequest?.duration > 1
                            ? `${serviceRequest?.duration} hrs`
                            : `${serviceRequest?.duration} hr`}
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
                    <span>{serviceRequest?.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <Divider style={{ margin: 0 }} />

            {/* Notes Section */}
            {serviceRequest?.notes && (
              <div className='bg-white rounded-xl p-6'>
                <h2 className='text-lg font-semibold mb-4'>Additional Notes</h2>
                <div className='flex gap-3'>
                  <Icon
                    icon='mdi:file-document-edit-outline'
                    className='text-blue-600 text-xl flex-shrink-0 mt-1'
                  />
                  <p className='text-gray-600'>{serviceRequest?.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Pricing & Actions */}
          <div className='col-span-4 space-y-6'>
            {/* Pricing Card */}
            <div className='bg-white rounded-xl p-6 border'>
              <h2 className='text-lg font-semibold mb-4'>Price Summary</h2>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Service fee</span>
                  <span>
                    Rp {serviceRequest?.serviceFee.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>System fee</span>
                  <span>
                    Rp {serviceRequest?.systemFee.toLocaleString('id-ID')}
                  </span>
                </div>
                {serviceRequest?.discountAmount > 0 && (
                  <div className='flex justify-between text-blue-600'>
                    <span>Discount</span>
                    <span>
                      - Rp{' '}
                      {serviceRequest?.discountAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                <Divider className='my-4' />
                <div className='flex justify-between text-lg font-bold'>
                  <span>Total Price</span>
                  <span>
                    Rp {serviceRequest?.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Coupon Card */}
            {serviceRequest?.coupon && (
              <div className='bg-white rounded-xl p-6 border'>
                <h2 className='text-lg font-semibold mb-4'>Applied Coupon</h2>
                <div className='flex items-center gap-4'>
                  <div className='p-3 flex items-center justify-center bg-blue-600 rounded-lg'>
                    <Icon
                      icon='mdi:ticket-percent'
                      className='text-2xl text-white'
                    />
                  </div>
                  <div className='flex-grow'>
                    <p className='font-semibold text-lg'>
                      {serviceRequest?.coupon?.discountPercentage}% OFF
                    </p>
                    <p className='text-gray-600 text-sm'>
                      {serviceRequest?.coupon?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {serviceRequest?.requestStatus === 'pending' && (
              <div className='flex flex-col gap-3'>
                <Button
                  type='primary'
                  className='w-full h-12 text-base rounded-xl'
                  onClick={() => setEditModalOpen(true)}
                >
                  <Icon
                    icon='hugeicons:pencil-edit-01'
                    className='text-xl mr-2'
                  />
                  Edit Request
                </Button>
                <Button
                  className='w-full h-12 text-base rounded-xl hover:!text-red-600 hover:!border-red-600'
                  onClick={() => setIsCancelModalOpen(true)}
                >
                  Cancel Request
                </Button>
              </div>
            )}

            {/* Rejection Reason */}
            {serviceRequest?.rejectionReason && (
              <div className='bg-white rounded-xl p-6 border-2 border-blue-600'>
                <h2 className='text-lg font-semibold mb-2 text-blue-600'>
                  Rejection Reason
                </h2>
                <p className='text-gray-600'>
                  {serviceRequest?.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
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

      <EditServiceRequestModal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        serviceRequest={serviceRequest}
        mutate={mutate}
      />
    </>
  );
};

export default ServiceRequestDetail;
