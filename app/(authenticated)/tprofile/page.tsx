"use client";

import { useState } from "react";
import { Layout, Row, Col, Button, Form, Input, Table } from "antd";
import Navbar from '#/components/Navbar/Navbar';
import Sidebartranslator, { SidebarProvider } from "#/components/Sidebartranslator/Sidebartranslator";

const { Content } = Layout;

export default function Dashboard() {
  const [profile, setProfile] = useState({
    fullName: "Kim Da Mi",
    gender: "Female",
    dateOfBirth: "24 October 1996",
    email: "damikim@gmail.com",
    phonenumber: "+62 123456789",
    street: "Jl. Bintara 7 No.29",
    subdistrict: "Bintara",
    district: "Bekasi Barat",
    city: "Bekasi",
    province: "Jawa Barat"
  });

  const columnsProfile = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
  ];

  // label profile
  const dataProfile = [
    {
      key: "1",
      fullName: profile.fullName,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
    },
  ];

  return (
    <SidebarProvider>
      <Layout className="min-h-screen ">
        {/* <Navbar /> */}
        <Layout>
          <Sidebartranslator />

          <Layout className="site-layout !bg-white">
            <Content style={{ margin: "16px" }}>
              <h2 className="text-2xl font-bold mb-4">My Profile</h2>

              {/* About Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <Row justify="space-between" align="middle">
                  <h4 className="font-semibold text-lg">About</h4>
                  <Button type="link">Edit</Button>
                </Row>
                <Table columns={columnsProfile} dataSource={dataProfile} pagination={false} />

              {/* Contact Section */}
                <Row justify="space-between" align="middle">
                  <h4 className="font-semibold text-lg">Contact</h4>
                  {/* <Button type="link">Edit</Button> */}
                </Row>
                <Table
                  columns={[
                    { title: "Email", dataIndex: "email", key: "email" },
                    { title: "Phone Number", dataIndex: "phonenumber", key: "phonenumber" },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      email: profile.email,
                      phonenumber: profile.phonenumber,
                    },
                  ]}
                  pagination={false}
                />

              {/* Address Section */}
                <Row justify="space-between" align="middle">
                  <h4 className="font-semibold text-lg">Address</h4>
                  {/* <Button type="link">Edit</Button> */}
                </Row>
                <Table
                  columns={[
                    { title: "Street", dataIndex: "street", key: "street" },
                    { title: "Sub District", dataIndex: "subdistrict", key: "subdistrict" },
                    { title: "District", dataIndex: "district", key: "district" },
                    { title: "City", dataIndex: "city", key: "city" },
                    { title: "Province", dataIndex: "province", key: "province" },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      street: profile.street,
                      subdistrict: profile.subdistrict,
                      district: profile.district,
                      city: profile.city,
                      province: profile.province,
                    },
                  ]}
                  pagination={false}
                />
          </div>


              {/* Password Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Row justify="space-between" align="middle">
                  <h4 className="font-semibold text-lg">Password</h4>
                </Row>
                <Form layout="vertical" className="mt-4">
                  <Form.Item label="Old Password" name="oldPassword">
                    <Input.Password placeholder="Old Password" />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="New Password" name="newPassword">
                        <Input.Password placeholder="New Password" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Re-enter New Password" name="reEnterNewPassword">
                        <Input.Password placeholder="Re-enter New Password" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit">
                    Update Password
                  </Button>
                </Form>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </SidebarProvider>
  );
}
