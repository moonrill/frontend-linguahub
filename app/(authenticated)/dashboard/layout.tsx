'use client';

import AdminMenu from '#/components/Menu/AdminMenu';
import TranslatorMenu from '#/components/Menu/TranslatorMenu';
import { User } from '#/types/UserType';
import { Avatar, Breadcrumb, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data?.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  const isDashboardPage =
    pathSegments.length === 1 ||
    (pathSegments[0] === 'dashboard' && pathSegments.length === 2);

  const formatTitle = (segment: string) =>
    segment
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const getTitle = () =>
    isDashboardPage
      ? 'Dashboard'
      : formatTitle(pathSegments[pathSegments.length - 1] || 'Dashboard');

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [
      { title: <Link href={'/dashboard'}>Dashboard</Link> },
    ];

    pathSegments.slice(1).forEach((segment, index) => {
      if (segment === 'translator') return;

      const href = `/dashboard/${pathSegments.slice(1, index + 2).join('/')}`;
      breadcrumbItems.push({
        title: <Link href={href}>{formatTitle(segment)}</Link>,
      });
    });

    return breadcrumbItems;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Layout
      style={{ minHeight: '100vh' }}
      className='p-6 flex gap-6 bg-slate-100'
    >
      <div className='relative w-[280px]'>
        <Sider
          width={280}
          className='rounded-3xl p-6 bg-white fixed'
          style={{ height: 'calc(100vh - 48px)' }}
        >
          <div className='w-[118px] h-[28px] md:w-[177px] md:h-[43px] relative mb-16'>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              className='object-cover'
              fill
              sizes='(max-width: 177px)'
              priority
            />
          </div>

          {user?.role === 'admin' ? <AdminMenu /> : <TranslatorMenu />}
        </Sider>
      </div>

      <Layout className='bg-transparent'>
        <Header style={{ padding: 0, margin: 0 }}>
          <div className='flex items-center justify-between'>
            <h1 className='mb-0 text-4xl text-blue-950 font-semibold'>
              {getTitle()}
            </h1>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col items-end'>
                <p className='text-base font-semibold m-0'>
                  {user?.fullName || user?.email}
                </p>
                <p className='text-xs font-semibold text-zinc-400 m-0'>
                  {user?.role ? capitalizeFirstLetter(user.role) : 'Loading...'}
                </p>
              </div>
              <div
                className='flex items-center p-[2px] rounded-full'
                style={{ border: '2px solid #2563eb' }}
              >
                <Avatar className='w-12 h-12'>
                  {user?.fullName?.charAt(0).toUpperCase() ||
                    user?.email.charAt(0).toUpperCase()}
                </Avatar>
              </div>
            </div>
          </div>
        </Header>

        {!isDashboardPage && <Breadcrumb items={getBreadcrumbItems()} />}

        <Content style={{ marginTop: '32px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
