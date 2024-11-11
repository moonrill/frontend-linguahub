'use client';

import AdminLineChart from '#/components/Chart/AdminLineChart';
import AdminPieChart from '#/components/Chart/AdminPieChart';
import DashboardCard from '#/components/Dashboard/DashboardCard';
import UnpaidTranslatorTable from '#/components/Tables/UnpaidTranslatorTable';
import { dashboardRepository } from '#/repository/dashboard';
import { paymentRepository } from '#/repository/payment';
import { Col, Row } from 'antd';
import Link from 'next/link';

const AdminDashboard = () => {
  const { data: response } = dashboardRepository.hooks.useGetAdminDashboard();
  const {
    data: payments,
    mutate,
    isLoading,
  } = paymentRepository.hooks.useGetPayments(
    'admin',
    'pending',
    1,
    5,
    'date',
    'desc',
    'translator'
  );
  return (
    <main className='flex flex-col gap-4 h-full'>
      <Row gutter={16}>
        <Col span={6}>
          <DashboardCard
            icon='proicons:credit-card'
            title='Client Payment'
            href='/dashboard/transaction/payment?type=Client'
            value={`Rp${response?.data?.totalClientPayments.toLocaleString(
              'id-ID'
            )}`}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='mdi:account-tie-voice'
            title='Translators Payment'
            href='/dashboard/transaction/payment?type=Translator'
            value={`Rp${response?.data?.totalTranslatorPayments.toLocaleString(
              'id-ID'
            )}`}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='fa6-solid:sack-dollar'
            title='Total Earnings'
            href='/dashboard/transaction/payment'
            value={`Rp${response?.data?.totalEarnings.toLocaleString('id-ID')}`}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='fluent:calendar-edit-32-regular'
            title='Total Bookings'
            value={response?.data?.totalBookings}
            href='/dashboard/transaction/booking'
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <AdminLineChart data={response?.data?.monthlyPayment} />
        </Col>
        <Col span={8}>
          <AdminPieChart
            system={response?.data?.totalEarnings}
            translator={response?.data?.totalTranslatorPayments}
            coupon={response?.data?.couponTotal}
          />
        </Col>
      </Row>
      <Row gutter={24} style={{ margin: 0 }}>
        <Col span={24} className='bg-white rounded-2xl 2xl:rounded-3xl'>
          <div className='p-4'>
            <div className='mb-2 2xl:mb-4 flex items-center justify-between'>
              <h1 className='m-0 text-base 2xl:text-lg font-semibold'>
                Unpaid Translator
              </h1>
              <Link
                href={'/dashboard/transaction/payment?type=Translator'}
                className='text-xs 2xl:text-sm text-blue-600 font-medium'
              >
                View All
              </Link>
            </div>
            {!isLoading && (
              <UnpaidTranslatorTable data={payments?.data} mutate={mutate} />
            )}
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default AdminDashboard;
