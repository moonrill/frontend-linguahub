'use client';
import { Icon } from '@iconify-icon/react';
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
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
        {/* Icon dan Title */}
        <div className='flex flex-col items-center mb-6'>
          <div className='p-4 bg-red-100 rounded-full flex items-center justify-center mb-4'>
            <Icon
              icon={'ion:warning-outline'}
              className='text-red-600 text-5xl'
            />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Oops! Something went wrong
          </h1>
        </div>

        {/* Error Message */}
        <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
          <p className='text-red-800 text-sm whitespace-pre-wrap'>
            {errorMessage || 'An error occurred while processing your request.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <Link
            href='/'
            className='py-4 px-6 text-sm rounded-xl mx-auto bg-blue-600 text-white hover:text-white hover:bg-blue-700 transition-all duration-300'
          >
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            Need help? Contact our support team:{' '}
            <a
              href='mailto:support@example.com'
              className='text-blue-600 hover:text-blue-800'
            >
              linguahub@support.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
