import { Icon } from '@iconify-icon/react';
import { Button } from 'antd';

const Banner = () => {
  return (
    <section className='bg-blue-600 py-8 mx-[-120px] flex justify-center text-white'>
      <div className='flex items-center gap-12'>
        <Icon icon={'el:mic-alt'} height={90} data-aos='fade-right' />
        <div className='flex flex-col justify-start'>
          <h1 className='font-bold text-2xl' data-aos='fade-down'>
            Need a Translator for your Next Event ?
          </h1>
          <p className='font-light text-sm' data-aos='fade-left'>
            Whether it&apos;s a conference or a business meeting, find the
            perfect translator for your event.
          </p>
          <Button
            className='mt-2 bg-white text-blue-600 h-9 text-xs rounded-full w-fit font-medium py-5 px-6'
            type='primary'
            data-aos='fade-up'
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
