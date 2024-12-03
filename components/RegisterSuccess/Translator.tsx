import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const TranslatorSuccess = () => {
  return (
    <div className='m-auto flex flex-col items-center gap-6'>
      <div className='relative w-[200px] h-[200px] ml-6'>
        <Image
          src={'/images/translator-success.svg'}
          alt={'translator-success'}
          fill
          sizes='(max-width: 400px)'
        />
      </div>
      <h1 className='text-3xl font-semibold'>
        Registration Submitted Successfully!
      </h1>
      <p className='text-center w-[500px] text-sm'>
        Thank you for applying to become a translator with us. Your application
        has been received, and we are currently reviewing your submission.
      </p>
      <p className='text-center w-[500px] text-sm'>
        Please keep an eye on your email for further updates regarding the
        status of your application. We will notify you once the review process
        is complete.
      </p>
      <p className='text-center w-[500px] text-sm'>
        Thank you for your patience!
      </p>

      <Link href={'/'}>
        <Button
          type='primary'
          className='text-base font-medium rounded-full py-6 px-14'
        >
          Home
        </Button>
      </Link>
    </div>
  );
};

export default TranslatorSuccess;
