import DashboardCard from '#/components/Dashboard/DashboardCard';
import { Card, Col, Row } from 'antd';

const TranslatorDashboard = () => {
  return (
    <main className='grid grid-rows-2 gap-4 h-full'>
      <Row gutter={16}>
        <Col span={12}>
          <div className='grid grid-cols-2 gap-4'>
            <DashboardCard
              icon='mdi:credit-card-outline'
              title='Total Payment'
              value='Rp1.000.000'
            />
            <DashboardCard
              icon='mdi:credit-card-outline'
              title='Total Payment'
              value='Rp1.000.000'
            />
            <DashboardCard
              icon='mdi:credit-card-outline'
              title='Total Payment'
              value='Rp1.000.000'
            />
            <DashboardCard
              icon='mdi:credit-card-outline'
              title='Total Payment'
              value='Rp1.000.000'
            />
          </div>
        </Col>
        <Col span={12}>
          <Card>Translator Dashboard</Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card className='h-full'>Translator Dashboard</Card>
        </Col>
        <Col span={8}>
          <Card>Translator Dashboard</Card>
        </Col>
      </Row>
    </main>
  );
};

export default TranslatorDashboard;
