'use client';

import Layout from '#/app/(guest)/(main)/layout';
import { imgProfilePicture } from '#/constants/general';
import { Payload } from '#/types/UserType';
import { Icon } from '@iconify-icon/react';
import { Divider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const profileItems = [
  {
    key: '/profile',
    label: <Link href={'/profile'}>Profile</Link>,
    icon: <Icon icon='hugeicons:user' height={24} />,
  },
  {
    key: '/profile/coupon',
    label: <Link href={'/profile/coupon'}>Coupons</Link>,
    icon: <Icon icon='hugeicons:coupon-percent' height={24} />,
  },
  {
    key: '/profile/service-request',
    label: <Link href={'/profile/service-request'}>Service Requests</Link>,
    icon: <Icon icon='hugeicons:mail-01' height={24} />,
  },
  {
    key: '/profile/booking',
    label: <Link href={'/profile/booking'}>Bookings</Link>,
    icon: <Icon icon='hugeicons:customer-service-01' height={24} />,
  },
  {
    key: '/profile/payment',
    label: <Link href={'/profile/payment'}>Payments</Link>,
    icon: <Icon icon='hugeicons:credit-card' height={24} />,
  },
];

const ClientProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Payload | null>(null);
  const pathname = usePathname();

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
    <Layout>
      <div className='flex gap-6 2xl:min-h-[700px]'>
        <Sider
          width={280}
          className='bg-white rounded-2xl border p-6 profile-sider h-fit'
        >
          <div
            className='flex items-center p-1 rounded-full w-fit'
            style={{ border: '2px solid #2563eb' }}
          >
            <div className='relative w-[160px] h-[160px] border rounded-full'>
              <Image
                src={
                  user?.profilePicture
                    ? imgProfilePicture(user?.profilePicture)
                    : '/images/avatar-placeholder.png'
                }
                alt={'translator-profile-picture'}
                fill
                sizes='(max-width: 400px)'
                className='object-cover rounded-full'
                priority
              />
            </div>
          </div>
          <Divider style={{ margin: 0 }} className='!my-4' />
          <Menu
            items={profileItems}
            mode='inline'
            selectedKeys={[pathname || '']}
            style={{ borderRight: 0 }}
            className='flex flex-col gap-[10px] h-fit'
          />
        </Sider>
        <div className='flex-1 border rounded-2xl p-6'>{children}</div>
      </div>
    </Layout>
  );
};
export default ClientProfileLayout;
