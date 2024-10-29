import AdminePieChart from '#/components/Chart/AdminePieChart';
import AdminLineChart from '#/components/Chart/AdminLineChart';
import DashboardCard from '#/components/Dashboard/DashboardCard';
import { getUser } from '#/utils/auth';
import { Col, Row } from 'antd';

const AdminDashboard = async () => {
  const user = await getUser();

  return (
    <main className='flex flex-col gap-4 h-full'>
      <Row gutter={16}>
        <Col span={6}>
          <DashboardCard
            icon='proicons:credit-card'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='fa6-solid:sack-dollar'
            title='Total Earnings'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='fluent:calendar-edit-32-regular'
            title='Total Bookings'
            value='872'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='mdi:account-tie-voice'
            title='Translators'
            value='123'
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <AdminLineChart />
        </Col>
        <Col span={8}>
          <AdminePieChart />
        </Col>
      </Row>
      <Row gutter={16}></Row>
    </main>
  );
};

export default AdminDashboard;
