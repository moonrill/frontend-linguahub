"use client";

import { useState } from 'react';
import { Layout, Card, Button, Typography, Row, Col } from 'antd';
import Sidebartranslator, { SidebarProvider } from "#/components/Sidebartranslator/Sidebartranslator";

const { Content } = Layout;
const { Title } = Typography;

export default function MyCoupons() {
  const [activeTab, setActiveTab] = useState('All'); // Default tab is 'All'
  const tabs = ['All', 'Available', 'Used', 'Expired'];

  // Simulasi data kupon
  const coupons = [
    { id: 1, title: '50% Discount', description: 'Exclusive Summer Sale', expires: '30 September 2024', status: 'Available' },
    { id: 2, title: '20% Discount', description: 'Winter Collection Sale', expires: '15 October 2024', status: 'Used' },
    { id: 3, title: '30% Discount', description: 'Spring Sale', expires: '5 November 2024', status: 'Expired' },
    { id: 4, title: '10% Discount', description: 'Autumn Sale', expires: '12 December 2024', status: 'Available' },
    // Tambahkan lebih banyak kupon sesuai kebutuhan
  ];

  // Filter kupon berdasarkan tab aktif
  const filteredCoupons = coupons.filter((coupon) => 
    activeTab === 'All' || coupon.status === activeTab
  );

  return (
    <SidebarProvider>
      <Layout className="min-h-screen">
        {/* Sidebar Translator */}
        <Sidebartranslator />

        {/* Main Layout */}
        <Layout className="site-layout !bg-white">
          <Content style={{ margin: '16px' }}>
            <Title level={2} className="mb-6">My Coupons</Title>

            {/* Tabs Section */}
            <div className="flex space-x-4 mb-6">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  type={activeTab === tab ? 'primary' : 'default'}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Coupons List */}
            <Row gutter={[24, 24]}>
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon, idx) => (
                  <Col xs={24} md={12} key={coupon.id}>
                    <Card
                      hoverable
                      className="rounded-md shadow-md transition-transform transform hover:scale-105"
                      bodyStyle={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-600 p-4 rounded-lg shadow-md">
                          <div className="text-xl font-bold text-white">{coupon.title}</div>
                        </div>
                        <div className="ml-4 text-gray-600 border-l-2 border-dashed border-gray-500 pl-4 h-full">
                          <p className="font-bold mb-1">{coupon.description}</p>
                          <p className="text-sm">
                            Enjoy an extra discount on all collections. Use this coupon to get amazing deals before it expires!
                          </p>
                          <p className="text-xs text-red-400 mt-1">Expires on: {coupon.expires}</p>
                        </div>
                      </div>
                      <Button
                        type={coupon.status === 'Used' || coupon.status === 'Expired' ? 'default' : 'primary'}
                        disabled={coupon.status === 'Used' || coupon.status === 'Expired'}
                        className={
                          coupon.status === 'Used' || coupon.status === 'Expired'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : ''
                        }
                      >
                        {coupon.status === 'Used' ? 'Used' : coupon.status === 'Expired' ? 'Expired' : 'Claim'}
                      </Button>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No coupons available in this category.</p>
              )}
            </Row>

          </Content>
        </Layout>
      </Layout>
    </SidebarProvider>
  );
}
