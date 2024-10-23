'use client';
import DashboardCard from '#/components/Dashboard/DashboardCard';
import NewRequest from '#/components/Tables/NewRequest';
import RecentReviews from '#/components/Tables/RecentReviews';
import { Card, Col, Row } from 'antd';
import Link from 'next/link';

const TranslatorDashboard = () => {
  return (
    <main className='flex flex-col gap-3 2xl:gap-4 h-full'>
      <Row gutter={24}>
        <Col span={12} className='grid grid-cols-2 gap-3 2xl:gap-4'>
          <DashboardCard
            icon='solar:wallet-money-bold'
            title='Total Earnings'
            value='Rp1.000.000'
          />
          <DashboardCard icon='mingcute:star-fill' title='Rating' value='4.5' />
          <DashboardCard
            icon='solar:headphones-round-bold-duotone'
            title='Booking Completed'
            value='254'
          />
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Request'
            value='340'
          />
        </Col>
        <Col
          span={12}
          style={{ padding: '0' }}
          className='bg-white rounded-2xl 2xl:rounded-3xl'
        >
          <div className='p-4 2xl:px-5'>
            <div className='mb-2 2xl:mb-4 flex items-center justify-between'>
              <h1 className='m-0 text-base 2xl:text-lg font-semibold'>
                New Service Request
              </h1>
              <Link
                href={'/dashboard/translator/service-request'}
                className='text-xs 2xl:text-sm text-blue-600 font-medium'
              >
                View All
              </Link>
            </div>
            <NewRequest />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={16}>
          <Card className='h-full'>Translator Dashboard</Card>
        </Col>
        <Col
          span={8}
          style={{ padding: '0' }}
          className='h-full bg-white rounded-2xl 2xl:rounded-3xl'
        >
          <div className='p-4 2xl:px-5 h-full'>
            <div className='mb-4 2xl:mb-4 flex items-center justify-between'>
              <h1 className='m-0 text-base 2xl:text-lg font-semibold'>
                Recent Reviews
              </h1>
              <Link
                href={'/dashboard/translator/reviews'}
                className='text-xs 2xl:text-sm text-blue-600 font-medium'
              >
                View All
              </Link>
            </div>
            <RecentReviews />
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default TranslatorDashboard;
