'use client';

import AdminMenu from '#/components/Menu/AdminMenu';
import { Avatar, Layout } from 'antd';
import Image from 'next/image';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      style={{ minHeight: '100vh' }}
      className='p-6 flex gap-6 bg-slate-100'
    >
      <div className='relative w-[280px]'>
        <Sider
          width={'280px'}
          className='rounded-3xl flex-1 p-6 bg-white fixed'
          style={{ height: 'calc(100vh - 48px)' }}
        >
          <div className='w-[118px] h-[28px] md:w-[177px] md:h-[43px] relative mb-16'>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              className='object-cover'
              fill
              sizes='(max-width: 177px)'
            />
          </div>
          <AdminMenu />
        </Sider>
      </div>

      <Layout className='bg-transparent'>
        <Header style={{ padding: '0', margin: '0' }}>
          <div className='flex items-center justify-between'>
            <h1 className='mb-0 text-4xl text-blue-950 font-semibold'>
              Dashboard
            </h1>
            <div
              className='flex items-center p-[2px] rounded-full'
              style={{ cursor: 'pointer', border: '2px solid #2563eb' }}
            >
              <Avatar className='w-12 h-12'>W</Avatar>
            </div>
          </div>
        </Header>
        <Content style={{ marginTop: '32px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
