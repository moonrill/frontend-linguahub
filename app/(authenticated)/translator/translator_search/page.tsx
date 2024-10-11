"use client";
import React from "react";
import { Card, Rate, Button, Row, Col, Select, Pagination } from "antd";
import { SearchOutlined, GlobalOutlined, HeartOutlined, BuildOutlined, CreditCardOutlined, LaptopOutlined, StarOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import Image from "next/image";
import Navbarlog from '#/components/Navbarlog/Navbarlog';
import Footer from '#/components/Footer/Footer';




const { Option } = Select;


const Translatorp = () => {
  const translators = [...Array(15)];

  return (
    <div className="bg-white text-slate-800">
      <Navbarlog />



 {/* Language Filter */}
 <div className="bg-white shadow-md p-6 rounded-xl relative z-10 w-full md:w-3/4 mx-auto mt-6">
  <Row gutter={[16, 16]} justify="center" align="middle">   
    <Col xs={24} md={6}>
      <label className="text-gray-600">Source Language</label>
      <Select defaultValue="English" className="w-full">
        <Option value="English">English</Option>
      </Select>
    </Col>
    <Col xs={24} md={6}>
      <label className="text-gray-600">Target Language</label>
      <Select defaultValue="Indonesia" className="w-full">
        <Option value="Indonesia">Indonesia</Option>
      </Select>
    </Col>
    <Col xs={24} md={6}>
      <label className="text-gray-600">Sort By</label>
      <Select defaultValue="Rating" className="w-full">
        <Option value="Rating">Rating</Option>
      </Select>
    </Col>
    <Col xs={24} md={6}>
      <Button type="primary" icon={<SearchOutlined />} className="w-full !mt-5">
        Search
      </Button>
    </Col>
  </Row>
</div>



            {/* translator */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-start">Our Best Translators</h2>
        
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
                className="mx-auto"
                bordered={false}
                bodyStyle={{ padding: '16px 24px' }}
              >
                <h3 className="text-lg font-bold mb-2">Kim Da Mi</h3>
                
                <div className="flex items-center mt-1 mb-2">
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
                  <i className="fas fa-industry text-lg"></i>
                  <p className="text-sm text-gray-600 line-clamp-1 ml-2">
                    General, Finance, Business, Tech
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-md font-bold">From Rp20K/hr</p>
                  <Button type="primary">
                    View Profile
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="flex justify-center md:justify-end">
    <Pagination defaultCurrent={1} total={50} />
  </div>

      </section>

      <Footer />
    </div>
  );
};

export default Translatorp;
