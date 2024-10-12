// import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Icon } from '@iconify-icon/react';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className='bg-blue-950 flex justify-between h-fit'>
      <div className='flex flex-col gap-2 max-w-[300px]'>
        <Link href={'/'} className='relative w-[177px] h-[43px]'>
          <Image
            src={'/images/logo-light.png'}
            alt={'logo'}
            className='object-cover'
            fill
            quality={100}
            sizes='(max-width: 177px)'
          />
        </Link>
        <p className='text-xs 2xl:text-sm font-medium text-gray-400'>
          LinguaHub connects you with professional translators for events,
          travel, and document translation. Discover expert translators tailored
          to your needs.
        </p>
      </div>
      <div className='flex text-gray-300 text-sm gap-8'>
        <div>
          <h3 className='font-medium underline underline-offset-8 decoration-blue-600 decoration-2'>
            Languages
          </h3>
          <ul className='text-gray-400 mt-3'>
            <li>English</li>
            <li>Indonesia</li>
            <li>Spain</li>
            <li>Arabic</li>
            <li>Japanese</li>
          </ul>
        </div>
        <div>
          <h3 className='font-medium underline underline-offset-8 decoration-blue-600 decoration-2'>
            Specialization
          </h3>
          <ul className='text-gray-400 mt-3'>
            <li>General</li>
            <li>Medical</li>
            <li>Tech</li>
            <li>Finance</li>
            <li>Business</li>
          </ul>
        </div>
        <div>
          <h3 className='font-medium underline underline-offset-8 decoration-blue-600 decoration-2'>
            Social Media
          </h3>
          <ul className='text-gray-400 mt-3 flex gap-2'>
            <li>
              <Link href={'/'} className='hover:text-gray-500'>
                <Icon
                  icon={'mdi:instagram'}
                  className='text-2xl 2xl:text-3xl'
                />
              </Link>
            </li>
            <li>
              <Link href={'/'} className='hover:text-gray-500'>
                <Icon icon={'mdi:twitter'} className='text-2xl 2xl:text-3xl' />
              </Link>
            </li>
            <li>
              <Link href={'/'} className='hover:text-gray-500'>
                <Icon icon={'mdi:facebook'} className='text-2xl 2xl:text-3xl' />
              </Link>
            </li>
            <li>
              <Link href={'/'} className='hover:text-gray-500'>
                <Icon icon={'mdi:youtube'} className='text-2xl 2xl:text-3xl' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
