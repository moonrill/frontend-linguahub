'use client';

import { Payload } from '#/types/UserType';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AvatarDropdown from './AvatarDropdown';

const { Header } = Layout;

const Navbar = ({ visible }: { visible: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [user, setUser] = useState<Payload | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Header
      className={`flex justify-between items-center px-[120px] h-fit py-4 !bg-white sticky !w-full !z-50 transition-all duration-500 ${
        visible ? 'top-0' : '-top-18'
      }`}
    >
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
          href={'/event'}
          className='font-semibold text-blue-600 text-sm 2xl:text-base'
        >
          Event
        </Link>
        <Link
          href={'/'}
          className='font-semibold text-blue-600 text-sm 2xl:text-base'
        >
          Translator
        </Link>
        <div className='flex gap-2 items-center'>
          {!user && (
            <>
              <Link href={'/register'} className='flex'>
                <Button
                  type='primary'
                  className='text-blue-600 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-base font-semibold bg-blue-100 h-[40px] 2xl:h-[50px] hover:!text-blue-600 hover:!bg-blue-200 shadow-none'
                >
                  Join as Translator
                </Button>
              </Link>
              <Link href={'/login'} className='flex'>
                <Button
                  type='primary'
                  className='bg-blue-600 rounded-[10px] 2xl:rounded-xl text-xs 2xl:text-base font-semibold text-white h-[40px] 2xl:h-[50px]'
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
          {user && (
            <AvatarDropdown role={user?.role}>
              <div
                className='flex items-center p-[2px] rounded-full'
                style={{ border: '2px solid #2563eb' }}
              >
                {user?.profilePicture ? (
                  <div className='relative w-10 h-10 2xl:w-12 2xl:h-12'>
                    <Image
                      src={'/images/4.png'}
                      alt={'user avatar'}
                      fill
                      sizes='(max-width: 50px)'
                      className='object-cover rounded-full'
                      quality={100}
                    />
                  </div>
                ) : (
                  <Avatar className='w-10 h-10 2xl:w-12 2xl:h-12'>
                    {user?.fullName?.charAt(0).toUpperCase() ||
                      user?.email.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </div>
            </AvatarDropdown>
          )}
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
