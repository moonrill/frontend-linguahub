import { imgProfilePicture, statusColor } from '#/constants/general';
import { Booking } from '#/types/BookingTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { http } from '#/utils/http';
import { Icon } from '@iconify-icon/react';
import { Button, Divider } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import LanguageFlag from './LanguageFlag';
import StatusBadge from './StatusBadge';

const CardButton = ({ booking, type }: { booking: Booking; type: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayNow = async () => {
    setIsLoading(true);
    try {
      const response = await http.post(`/payments/client/${booking.id}`);
      const token = response.body.data.token;

      window.snap.pay(token);
    } catch (error) {
      console.log(error);
    }
  };

  if (booking?.bookingStatus === 'unpaid') {
    if (booking?.requestStatus === 'approved') {
      return (
        <Button
          type='primary'
          onClick={handlePayNow}
          loading={isLoading}
          className='text-white rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-sm font-semibold bg-blue-600 py-2.5 px-4 h-fit shadow-none'
        >
          Pay Now
        </Button>
      );
    }
  }

  return (
    <Button
      type='link'
      href={`/profile/${type === 'request' ? 'service-request' : 'booking'}/${
        booking.id
      }`}
      className='text-blue-600 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-sm font-semibold bg-blue-100 py-2.5 px-4 h-fit hover:!text-blue-600 hover:!bg-blue-200 shadow-none'
    >
      Details
    </Button>
  );
};

type Props = {
  booking: Booking;
  type: 'request' | 'booking';
};

const BookingCard = ({ booking, type }: Props) => {
  const status = {
    request: booking.requestStatus,
    booking: booking.bookingStatus,
  };

  const badgeColor = statusColor[type][status[type]];

  return (
    <div className='flex flex-col gap-3 pb-4 border-b mb-4'>
      <div className='flex justify-between items-center bg-zinc-50 rounded-lg py-2 px-4 w-full'>
        <p className='text-xs 2xl:text-sm'>
          Requested at :{' '}
          <span className='font-semibold'>
            {dayjs(booking?.createdAt).format('DD MMMM YYYY, HH:mm')}
          </span>
        </p>
        <StatusBadge
          color={badgeColor}
          text={
            status[type] !== null
              ? capitalizeFirstLetter(status[type])
              : 'Unknown status'
          }
        />
      </div>
      <div className='flex justify-between gap-6 px-4'>
        <div className='flex gap-6'>
          <div className='relative w-[70px] h-[70px] 2xl:w-[80px] 2xl:h-[80px]'>
            <Image
              src={
                booking?.translator?.user?.userDetail.profilePicture
                  ? imgProfilePicture(
                      booking?.translator?.user?.userDetail.profilePicture
                    )
                  : '/images/avatar-placeholder.png'
              }
              alt={'translator-profile-picture'}
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-xl 2xl:rounded-2xl'
              priority
            />
          </div>
          <div className='flex flex-col gap-2 justify-between'>
            <div className='flex gap-1.5 items-center text-gray-500'>
              <Icon icon={'mdi:account-tie-voice'} className='2xl:text-xl' />
              <p className='text-xs 2xl:text-sm font-semibold'>
                {booking?.translator?.user?.userDetail?.fullName}
              </p>
            </div>
            <div className='flex gap-1.5 items-center text-gray-500'>
              <Icon icon={'ic:round-date-range'} className='2xl:text-xl' />
              <p className='text-xs 2xl:text-sm font-semibold'>
                {new Date(booking?.createdAt).toLocaleDateString('en-UK', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className='flex gap-1.5 items-center text-gray-500'>
              <Icon icon={'mdi:clock-outline'} className='2xl:text-xl' />
              <p className='text-xs 2xl:text-sm font-semibold'>
                {booking?.startAt.slice(0, 5)} - {booking?.endAt.slice(0, 5)}
              </p>
            </div>
          </div>
          <Divider style={{ margin: 0 }} type='vertical' className='h-full' />
          <div className='flex flex-col gap-2 justify-between'>
            <p className='text-sm 2xl:text-base font-semibold line-clamp-1'>
              {booking?.service?.name}
            </p>
            <div className='flex items-center gap-1 text-gray-500 font-semibold text-xs'>
              <LanguageFlag
                language={booking?.service?.sourceLanguage}
                size='sm'
              />
              <p>{booking?.service?.sourceLanguage.code.toUpperCase()}</p>
              {' - '}
              <LanguageFlag
                language={booking?.service?.targetLanguage}
                size='sm'
              />
              <p>{booking?.service?.targetLanguage.code.toUpperCase()}</p>
            </div>
            <div className='flex gap-1.5 text-gray-500 w-[300px] items-center'>
              <Icon icon={'mdi:map-marker'} className='2xl:text-xl' />
              <p className='text-xs 2xl:text-sm font-medium line-clamp-1'>
                {booking?.location}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between items-end'>
          <p className='text-sm 2xl:text-base font-semibold'>
            Rp{booking?.totalPrice.toLocaleString('id-ID')}
          </p>
          <CardButton booking={booking} type={type} />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
