"use client";

import Image from "next/image";
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
    <Card hoverable className="mb-4 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography.Text type="secondary">Requested at: Sunday, 10 September 2024</Typography.Text>
        <Typography.Text strong style={{ color: statusColor }}>{status}</Typography.Text>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Avatar dan Informasi User */}
        <div className="flex items-center border-r border-gray-200 pr-4">
          <Image src="/images/4.png" alt="logo" width={90} height={90} className="rounded-lg" />
          <div className="ml-3">
            <p className="font-semibold">Kim da mi</p>
            <p className="text-sm text-gray-500">10 September 2024</p>
            <p className="text-sm text-gray-500">09:00 - 11:00</p>
          </div>
        </div>

        {/* Detail Service */}
        <div className="px-4">
          <Typography.Title level={5}>Business Meeting Translation</Typography.Title>
          <p className="text-sm text-gray-600">English - Indonesia</p>
          <p className="text-sm text-gray-500">Jl. Juanda No. 7, Bintara, Bekasi Barat, Kota Bekasi, Jawa Barat</p>
        </div>

        {/* Harga dan Aksi */}
        <div className="text-right">
          <Typography.Title level={5} className="text-lg">Rp{price}</Typography.Title>
          <Button type={status === "Approved" ? "primary" : "default"} className="mt-2">
            {status === "Approved" ? "Pay Now" : "Details"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function Service() {
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
            <Title level={2} className="mb-6">Service Requests</Title>

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
                <Typography.Text>No Service Requests found for this category.</Typography.Text>
              )}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </SidebarProvider>
  );
}
