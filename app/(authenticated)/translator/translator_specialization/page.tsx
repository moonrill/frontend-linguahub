"use client";
import React from "react";
import { Card, Rate, Button, Row, Col, Pagination } from "antd";
import { GlobalOutlined, HeartOutlined, ShopOutlined, BuildOutlined, CreditCardOutlined, LaptopOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import Image from "next/image";
import Navbarlog from '#/components/Navbarlog/Navbarlog';
import Footer from '#/components/Footer/Footer';

const Translatorp2 = () => {
  const translators = [...Array(15)];

  return (
    <div className="bg-white text-slate-800">
      <Navbarlog />

      {/* Specialization Section */}
      <section className="px-10 py-20">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">Search Translator by Their Specialization</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
          <Button
            type="primary"
            icon={<GlobalOutlined />}
            className="flex items-center justify-center py-3"
          >
            General
          </Button>

          <Button
            icon={<HeartOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Health
          </Button>

          <Button
            icon={<ShopOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Business
          </Button>

          <Button
            icon={<CreditCardOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Finance
          </Button>

          <Button
            icon={<LaptopOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Tech
          </Button>

          <Button
            icon={<UserOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Sign Language
          </Button>

          <Button
            icon={<ShopOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Marketing
          </Button>

          <Button
            icon={<ReadOutlined />}
            className="border border-gray-300 shadow-sm hover:shadow-md py-3"
          >
            Education
          </Button>
        </div>
      </section>

      {/* Translator Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Our Best Translators</h2>

        <Row gutter={[24, 24]}>
          {translators.map((_, idx) => (
            <Col xs={24} sm={12} md={6} key={idx}>
              <Card
                hoverable
                cover={
                  <Image
                    src="/images/4.png"
                    alt="Translator"
                    width={250}
                    height={200}
                    className="rounded-md mx-auto"
                  />
                }
                bordered={false}
                bodyStyle={{ padding: '16px 24px' }}
              >
                <h3 className="text-lg font-bold mb-2">Kim Da Mi</h3>

                <div className="flex items-center mb-2">
                  <Rate allowHalf defaultValue={4.9} disabled className="mr-2" />
                  <p className="text-gray-600">4.9 (432 reviews)</p>
                </div>

                <p className="line-clamp-1 text-gray-600 mb-3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum odit dolores quidem enim, quam quaerat.
                </p>

                <div className="flex space-x-3 mb-2">
                  <Image src="/icons/korea.png" alt="flagk" width={20} height={20} className="rounded-full" />
                  <Image src="/icons/jerman.png" alt="flagj" width={20} height={20} className="rounded-full" />
                  <Image src="/icons/indonesia.png" alt="flagi" width={20} height={20} className="rounded-full" />
                </div>

                <div className="flex items-center mb-3">
                  <BuildOutlined />
                  <p className="text-sm text-gray-600 line-clamp-1 ml-2">
                    General, Finance, Business, Tech
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-md font-bold">From Rp20K/hr</p>
                  <Button type="primary">View Profile</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Section */}
        <div className="flex justify-center md:justify-end mt-8">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Translatorp2;
