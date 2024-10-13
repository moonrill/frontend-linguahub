'use client';

import HeaderComponent from '#/components/Dashboard/Header';
import SidebarComponent from '#/components/Dashboard/Sidebar';
import { Payload } from '#/types/UserType';
import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [user, setUser] = useState<Payload | null>(null);

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

  return (
    <Layout
      style={{ minHeight: '100vh' }}
      className='p-6 flex gap-6 bg-slate-100'
    >
      <SidebarComponent user={user} />
      <Layout className='bg-transparent'>
        <HeaderComponent title={getTitle()} user={user} />
        {!isDashboardPage && <Breadcrumb items={getBreadcrumbItems()} />}
        <Content className='mt-4 2xl:mt-6'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
