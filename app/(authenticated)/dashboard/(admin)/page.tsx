import DashboardCard from '#/components/Dashboard/DashboardCard';
import { getUser } from '#/utils/auth';
import { Col, Row } from 'antd';

const AdminDashboard = async () => {
  const user = await getUser();

  return (
    <>
      <Row gutter={24}>
        <Col span={6}>
          <DashboardCard
            icon='mdi:credit-card-outline'
            title='Total Payment'
            value='Rp1.000.000'
          />
        </Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
