'use client';

import Layout from '#/app/(guest)/(main)/layout';
import { imgProfilePicture } from '#/constants/general';
import { authRepository } from '#/repository/auth';
import { User } from '#/types/UserType';
import { TokenUtil } from '#/utils/token';
import { Icon } from '@iconify-icon/react';
import { Divider, Menu, Skeleton } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const profileItems = [
  {
    key: '/profile',
    label: <Link href={'/profile'}>Profile</Link>,
    icon: <Icon icon='hugeicons:user' height={24} />,
  },
  {
    key: '/profile/coupon',
    label: <Link href={'/profile/coupon'}>Coupon</Link>,
    icon: <Icon icon='hugeicons:coupon-percent' height={24} />,
  },
  {
    key: '/profile/service-request',
    label: <Link href={'/profile/service-request'}>Service Request</Link>,
    icon: <Icon icon='hugeicons:mail-01' height={24} />,
  },
  {
    key: '/profile/booking',
    label: <Link href={'/profile/booking'}>Booking</Link>,
    icon: <Icon icon='hugeicons:customer-service-01' height={24} />,
  },
  {
    key: '/profile/payment',
    label: <Link href={'/profile/payment'}>Payment</Link>,
    icon: <Icon icon='hugeicons:credit-card' height={24} />,
  },
];

TokenUtil.loadToken();

const ClientProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { data: result, isLoading } = authRepository.hooks.useProfile();
  const user: User = result?.data;

  return (
    <Layout>
      <div className='flex gap-6 2xl:min-h-[700px]'>
        <Sider
          width={280}
          className='bg-white rounded-2xl border p-6 profile-sider h-fit'
        >
          {isLoading ? (
            <Skeleton.Image
              active
              className='!rounded-full !w-[160px] !h-[160px]'
            />
          ) : (
            <div
              className='flex items-center p-1 rounded-full w-fit'
              style={{ border: '2px solid #2563eb' }}
            >
              <div className='relative w-[160px] h-[160px] border rounded-full'>
                <Image
                  src={
                    user?.userDetail?.profilePicture
                      ? imgProfilePicture(user?.userDetail?.profilePicture)
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
          )}
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
