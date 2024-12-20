'use client';

import { paymentRepository } from '#/repository/payment';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ThanksPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order_id');

  const { data, isLoading } = paymentRepository.hooks.useGetPaymentById(
    orderId!
  );

  const payment = data?.data;

  useEffect(() => {
    if (!orderId || (!isLoading && !payment)) {
      router.push('/');
    }
  }, [orderId, router, payment, isLoading]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    !isLoading &&
    data && (
      <main className='flex justify-between 2xl:justify-center items-center h-screen 2xl:gap-52'>
        <div className='flex items-center justify-center' data-aos='zoom-in-up'>
          <div className='relative w-[500px] h-[500px] 2xl:w-[600px] 2xl:h-[600px]'>
            <Image src={'/images/calendar.svg'} alt='Calendar' fill priority />
          </div>
        </div>

        <div
          className='flex flex-col gap-4'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <h1 className='font-bold text-7xl text-blue-700' data-aos='fade-down'>
            Payment Successful
          </h1>
          <h2 className='font-medium text-gray-600' data-aos='fade-left'>
            Thank you for your payment! Your booking has been confirmed.
          </h2>
          <p
            className='text-gray-600 max-w-[600px]'
            data-aos='fade-right'
            data-aos-delay='400'
          >
            We've added your booking schedule to your Google Calendar to help
            keep you organized.
          </p>
          <p
            className='text-gray-600 max-w-[600px]'
            data-aos='fade-up'
            data-aos-delay='600'
          >
            Please remember to check the details, and we'll be ready to serve
            you at the scheduled time. Should you need to adjust your
            appointment, feel free to reach out to us.
          </p>

          <div className='flex gap-4' data-aos='zoom-in' data-aos-delay='800'>
            <Link
              href={'/profile/payment'}
              className='px-6 py-4 rounded-2xl focus:ring-0 font-medium bg-blue-600 text-center text-white hover:text-white hover:bg-blue-700 transition-all duration-300 w-fit flex gap-2'
            >
              See my payments
            </Link>
            <Link
              href={'https://calendar.google.com'}
              target='_blank'
              className='px-6 py-4 rounded-2xl focus:ring-0 font-medium border border-gray-300 hover:border-blue-600 text-gray-500 text-center hover:text-blue-600 transition-all duration-300 flex gap-2'
            >
              <CalendarDays />
              See my calendar
            </Link>
          </div>
        </div>
      </main>
    )
  );
};

export default ThanksPage;
