import DashboardCard from '#/components/Dashboard/DashboardCard';
import { getUser } from '#/utils/auth';
import { Col, Row } from 'antd';

const AdminDashboard = async () => {
  const user = await getUser();

  return (
    <main>
      <Row gutter={16}>
        <Col span={6}>
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}></Col>
        <Col span={8}></Col>
      </Row>
      <Row gutter={16}></Row>
    </main>
  );
};

export default AdminDashboard;
