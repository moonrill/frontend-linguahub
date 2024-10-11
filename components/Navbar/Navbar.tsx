import { ArrowUpOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Header } = Layout;

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Header className='flex justify-between items-center px-[120px] h-fit py-5 !bg-white sticky !w-full !z-50'>
      <Link
        href={'/'}
        className='relative w-[148px] h-[32px] 2xl:w-[177px] 2xl:h-[43px]'
      >
        <Image
          src={'/images/logo.png'}
          alt={'logo'}
          className='object-cover'
          fill
          quality={100}
          sizes='(max-width: 177px)'
        />
      </Link>
      <div className='flex items-center gap-8 2xl:gap-12'>
        <Link
          href={'/'}
          className='font-semibold text-blue-600 text-sm 2xl:text-base'
        >
          Home
        </Link>
        <Link
          href={'/'}
          className='font-semibold text-blue-600 text-sm 2xl:text-base'
        >
          Events
        </Link>
        <Link
          href={'/'}
          className='font-semibold text-blue-600 text-sm 2xl:text-base'
        >
          Translator
        </Link>
        <div className='flex gap-2'>
          <Button
            type='primary'
            className='text-blue-600 text-sm 2xl:text-base font-semibold bg-blue-100 h-[40px] 2xl:h-[50px] hover:!text-blue-600 hover:!bg-blue-50'
          >
            Join as Translator
          </Button>
          <Button
            type='primary'
            className='bg-blue-600 text-sm 2xl:text-base font-semibold text-white h-[40px] 2xl:h-[50px]'
          >
            Sign in
          </Button>
        </div>
      </div>
      <Button
        className='fixed bottom-4 right-4'
        onClick={scrollToTop}
        icon={<ArrowUpOutlined />}
        type='primary'
      />
    </Header>
  );
};

export default Navbar;
