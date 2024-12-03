import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { Booking } from '#/types/BookingTypes';
import { Payment } from '#/types/PaymentTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { http } from '#/utils/http';
import { Icon } from '@iconify-icon/react';
import { Button, Divider, Drawer, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LanguageFlag from './LanguageFlag';
import StatusBadge from './StatusBadge';

const CardButton = ({
  booking,
  onClick,
}: {
  booking: Booking;
  onClick: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayNow = async () => {
    setIsLoading(true);
    try {
      const response = await http.post(`/payments/client/${booking.id}`);
      const token = response.body.data.token;

      window.snap.pay(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      type='primary'
      onClick={onClick}
      className='text-blue-600 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-sm font-semibold bg-blue-100 py-2.5 px-4 h-fit hover:!text-blue-600 hover:!bg-blue-200 shadow-none'
    >
      Details
    </Button>
  );
};

type Props = {
  payment: Payment;
};

const PaymentCard = ({ payment }: Props) => {
  const { booking } = payment;
  const [open, setOpen] = useState(false);
  const [drawerSize, setDrawerSize] = useState<'default' | 'large'>('large');

  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setDrawerSize('default');
      } else {
        setDrawerSize('large');
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

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/payments/invoice/${payment.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `invoice_${payment.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting payment:', error);
    }
  };

  return (
    <div className='flex flex-col gap-3 pb-4 border-b mb-4'>
      <div className='flex justify-between items-center bg-zinc-50 rounded-lg py-2 px-4 w-full'>
        <p className='text-xs 2xl:text-sm'>
          <span className='font-semibold'>
            {dayjs(payment.updatedAt).format('DD MMMM YYYY, HH:mm')}
          </span>
        </p>
        <StatusBadge
          status={payment.status}
          text={capitalizeFirstLetter(payment.status)}
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
            <Tooltip
              title={new Date(booking?.bookingDate).toLocaleDateString(
                'en-UK',
                {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            >
              <div className='flex gap-1.5 items-center text-gray-500'>
                <Icon icon={'ic:round-date-range'} className='2xl:text-xl' />
                <p className='text-xs 2xl:text-sm font-semibold truncate'>
                  {new Date(booking?.bookingDate).toLocaleDateString('en-UK', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Tooltip>
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
            <Tooltip title={booking?.location}>
              <div className='flex gap-1.5 text-gray-500 items-center'>
                <Icon icon={'mdi:map-marker'} className='2xl:text-xl' />
                <p className='text-xs 2xl:text-sm font-medium truncate'>
                  {booking?.location}
                </p>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className='flex flex-col justify-between items-end'>
          <p className='text-sm 2xl:text-base font-semibold'>
            Rp{booking?.totalPrice.toLocaleString('id-ID')}
          </p>
          <CardButton booking={booking} onClick={showDrawer} />
          <Drawer
            onClose={() => setOpen(false)}
            open={open}
            size={drawerSize}
            title='Payment Details'
            extra={
              <StatusBadge
                status={payment.status}
                text={capitalizeFirstLetter(payment.status)}
              />
            }
          >
            <div>
              <h1 className='text-xl font-semibold'>Booking Summary</h1>
              <div className='text-sm 2xl:text-base mt-2 flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Translator</p>
                  <p className='font-semibold text-blue-950'>
                    {booking.translator?.user.userDetail.fullName}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Service</p>
                  <p className='font-semibold text-blue-950'>
                    {booking.service.name}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Source Language</p>
                  <p className='font-semibold text-blue-950'>
                    {booking.service.sourceLanguage.name}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Target Language</p>
                  <p className='font-semibold text-blue-950'>
                    {booking.service.targetLanguage.name}
                  </p>
                </div>

                <div className='flex justify-between'>
                  <p className='text-slate-500'>Booking Date</p>
                  <p className='font-semibold text-blue-950'>
                    {dayjs(booking.bookingDate).format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Duration</p>
                  <p className='font-semibold text-blue-950'>
                    {booking.duration} Hours
                  </p>
                </div>
              </div>
              <Divider />
              <h1 className='text-xl font-semibold'>Price Details</h1>
              <div className='text-sm 2xl:text-base mt-2 flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Service fee</p>
                  <p className='font-medium text-blue-950'>
                    Rp{booking.serviceFee.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>System fee</p>
                  <p className='font-medium text-blue-950'>
                    Rp{booking.systemFee.toLocaleString('id-ID')}
                  </p>
                </div>
                {booking.discountAmount && (
                  <div className='flex justify-between'>
                    <p className='text-slate-500'>Discount Amount</p>
                    <p className='font-medium text-blue-950'>
                      -Rp{booking.discountAmount.toLocaleString('id-ID')}
                    </p>
                  </div>
                )}
              </div>
              <Divider />
              <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Total</h1>
                <h1 className='text-xl font-semibold'>
                  Rp{booking.totalPrice.toLocaleString('id-ID')}
                </h1>
              </div>
              {payment?.paymentMethod && (
                <div className='flex justify-between text-sm 2xl:text-base mt-4'>
                  <p className='text-slate-500'>Payment Method</p>
                  <p className='font-semibold text-blue-950'>
                    {payment.paymentMethod}
                  </p>
                </div>
              )}
              {payment?.status === 'paid' && (
                <Button
                  type='primary'
                  onClick={handleExport}
                  className='text-white mt-4 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-sm bg-blue-600 py-2.5 px-4 h-fit shadow-none'
                >
                  Export Invoice
                  <Icon icon={'uil:export'} height={18} />
                </Button>
              )}
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
