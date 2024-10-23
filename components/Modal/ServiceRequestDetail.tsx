import { imgProfilePicture } from '#/constants/general';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import LanguageFlag from '../LanguageFlag';
import StatusBadge from '../StatusBadge';

type Props = {
  open: boolean;
  onCancel: () => void;
  serviceRequest?: Booking | null;
};

const ServiceRequestDetailModal = ({
  open,
  onCancel,
  serviceRequest,
}: Props) => {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onCancel}
      closeIcon={null}
      centered
    >
      {serviceRequest && (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between gap-6 items-start rounded-lg w-full'>
            <div className='flex gap-4'>
              <div className='relative w-[65px] h-[65px] 2xl:w-[80px] 2xl:h-[80px]'>
                <Image
                  src={
                    serviceRequest?.user?.userDetail.profilePicture
                      ? imgProfilePicture(
                          serviceRequest?.user?.userDetail.profilePicture
                        )
                      : '/images/avatar-placeholder.png'
                  }
                  alt={'Translator Profile Picture'}
                  fill
                  sizes='(max-width: 400px)'
                  className='object-cover rounded-xl'
                  priority
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div>
                  <h1 className='font-medium text-lg 2xl:text-xl'>
                    {serviceRequest?.user?.userDetail.fullName}
                  </h1>
                  <p className='text-xs 2xl:text-sm font-semibold text-gray-400'>
                    {serviceRequest?.user?.email}
                  </p>
                </div>
                <div className='flex gap-1 items-center text-zinc-500'>
                  <Icon
                    icon={'mdi:map-marker'}
                    className='text-base 2xl:text-xl'
                  />
                  <p className='text-xs 2xl:text-sm font-medium'>
                    {serviceRequest?.user?.userDetail.city},{' '}
                    {serviceRequest?.user?.userDetail.province}
                  </p>
                </div>
              </div>
            </div>
            <StatusBadge
              status={serviceRequest?.requestStatus}
              text={capitalizeFirstLetter(serviceRequest?.requestStatus)}
            />
          </div>
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
            <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
          <section className='flex flex-col gap-2 border p-4 rounded-xl'>
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
            <section className='flex flex-col gap-2 border p-4 rounded-xl'>
              <p className='text-xs 2xl:text-sm font-medium'>
                Rejection Reason
              </p>
              <p className='text-sm 2xl:text-base'>
                {serviceRequest?.rejectionReason}
              </p>
            </section>
          )}
          <Button
            type='primary'
            className='py-3 px-5 w-full h-fit text-sm rounded-xl'
            onClick={onCancel}
          >
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ServiceRequestDetailModal;
