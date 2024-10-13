"use client";

import { useState } from 'react';
import { Layout, Button, Card, Typography, Row, Col } from 'antd';
import Sidebartranslator, { SidebarProvider } from "#/components/Sidebartranslator/Sidebartranslator";

const { Content } = Layout;
const { Title } = Typography;

// ServiceRequest Component
const ServiceRequest = ({ status, price }: { status: string; price: string }) => {
  // Warna status berdasarkan kondisi
  const statusColor =
    status === "Approved"
      ? "green"
      : status === "Pending"
      ? "yellow"
      : "red";

  return (
    <Card hoverable className="mb-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <Typography.Title level={4}>Business Meeting Translation</Typography.Title>
          <Typography.Text type="secondary">Requested at: Sunday, 10 September 2024</Typography.Text>
          <p>09:00 - 11:00 | Bekasi, Jawa Barat</p>
        </div>
        <div className="text-right">
          <Typography.Text strong style={{ color: statusColor }}>{status}</Typography.Text>
          <Typography.Title level={5} className="mt-2">Rp{price}</Typography.Title>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {status === "Approved" ? (
          <Button type="primary">Pay Now</Button>
        ) : (
          <Button>Details</Button>
        )}
      </div>
    </Card>
  );
};

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

  // Simulated request data
  const requests = [
    { id: 1, status: "Approved", price: "500.000" },
    { id: 2, status: "Rejected", price: "500.000" },
    { id: 3, status: "Pending", price: "500.000" },
    { id: 4, status: "Rejected", price: "500.000" },
  ];

  // Filter requests based on the active tab
  const filteredRequests = requests.filter((request) =>
    activeTab === 'All' || request.status === activeTab
  );

  return (
    <SidebarProvider>
      <Layout className="min-h-screen">
        {/* Sidebar Translator */}
        <Sidebartranslator />

        {/* Main Layout */}
        <Layout className="site-layout !bg-white">
          <Content style={{ margin: '16px' }}>
            <Title level={2} className="mb-6">Bookings</Title>

            {/* Tabs Section */}
            <div className="mb-6">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  type={activeTab === tab ? 'primary' : 'default'}
                  onClick={() => setActiveTab(tab)}
                  className="mr-2"
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Requests List */}
            <Row gutter={[16, 16]}>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <Col xs={24} md={24} key={request.id}>
                    <ServiceRequest status={request.status} price={request.price} />
                  </Col>
                ))
              ) : (
                <Typography.Text>No bookings found for this category.</Typography.Text>
              )}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </SidebarProvider>
  );
}
