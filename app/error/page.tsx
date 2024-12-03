'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams?.get('message');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (message) {
      setErrorMessage(decodeURIComponent(message as string));
    }
  }, [message]);

  return (
    <main className='flex justify-between 2xl:justify-center items-center h-[calc(100vh-140px)] 2xl:gap-52'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-bold text-7xl text-blue-700'> Ooops ! </h1>
        <h2 className='font-medium text-3xl'>Something went wrong here</h2>
        <p className='text-red-600 whitespace-pre-wrap'>
          {errorMessage || 'An error occurred while processing your request.'}
        </p>
        <Link
          href={'/'}
          className='px-6 py-4 rounded-2xl focus:ring-0 font-medium bg-blue-600 text-center text-white hover:text-white hover:bg-blue-700 transition-all duration-300'
        >
          Back to Home
        </Link>
      </div>
      <div className='flex items-center justify-center'>
        <div className='relative w-[500px] h-[500px] 2xl:w-[600px] 2xl:h-[600px]'>
          <Image src={'/images/error.svg'} alt='error' fill />
        </div>
      </div>
    </main>
  );
}
