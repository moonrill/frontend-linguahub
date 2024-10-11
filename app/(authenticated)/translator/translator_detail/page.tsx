"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal, Card, Table, Typography, Rate, Avatar, List } from "antd";
import { PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import FormModal from '#/components/Formmodal/FormModal';
import Navbarlog from '#/components/Navbarlog/Navbarlog';
import Footer from '#/components/Footer/Footer';
import Tabletranslator from "#/components/Tabletranslator/Tabletranslator";
import Reviewtranslator from "#/components/Reviewtranslator/Reviewtranslator";

const { Title, Text } = Typography;

const Translatorp3 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Business Meeting',
      sourcelanguage: 'China',
      targetlanguage: 'China',
      priceperhour: 'Rp100.000',
    },
    {
      key: '2',
      name: 'Business Meeting',
      sourcelanguage: 'Germany',
      targetlanguage: 'Germany',
      priceperhour: 'Rp100.000',
    },
    {
      key: '3',
      name: 'Business Meeting',
      sourcelanguage: 'India',
      targetlanguage: 'India',
      priceperhour: 'Rp100.000',
    },
    {
      key: '4',
      name: 'Business Meeting',
      sourcelanguage: 'India',
      targetlanguage: 'India',
      priceperhour: 'Rp100.000',
    },
  ];

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SOURCE LANGUAGE',
      dataIndex: 'sourcelanguage',
      key: 'sourcelanguage',
    },
    {
      title: 'TARGET LANGUAGE',
      dataIndex: 'targetlanguage',
      key: 'targetlanguage',
    },
    {
      title: 'PRICE PER HOUR',
      dataIndex: 'priceperhour',
      key: 'priceperhour',
    },
  ];

  const reviews = [
    {
      name: "Kim Yu Jeong",
      date: "24 October 2024",
      avatar: "/images/1.png",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rating: "4",
    },
    {
      name: "Lee Min Ho",
      date: "15 September 2024",
      avatar: "/images/4.png",
      review: "Great service and very professional. Highly recommended!",
      rating:"3",
    },
    {
      name: "Lee Min Ho2",
      date: "15 September 2024",
      avatar: "/images/4.png",
      review: "Great service and very professional. Highly recommended!",
      rating:"2",
    },
    {
      name: "Lee Min Ho3",
      date: "15 September 2024",
      avatar: "/images/4.png",
      review: "Great service and very professional. Highly recommended!",
      rating:"1",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Navbarlog />

      <section className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8">


          {/* Sidebar */}
          <Card className="w-full md:w-64 h-1/3">
            <div className="text-center mb-4">
              <Avatar src="/images/3.png" size={120} />
            </div>
            <div>
              <Title level={5}>Languages offered:</Title>
              <div className="flex flex-wrap gap-3 mb-4">
                <Avatar src="/icons/korea.png" size={30} />
                <Avatar src="/icons/jerman.png" size={30} />
                <Avatar src="/icons/indonesia.png" size={30} />
              </div>
              <Title level={5}>Specialization:</Title>
              <div className="flex flex-wrap gap-3">
                <Button type="dashed">Business</Button>
                <Button type="dashed">Health</Button>
                <Button type="dashed">Tech</Button>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex gap-2 items-center">
                <PhoneOutlined className="text-lg text-blue-600" />
                <p className="text-blue-600">+62 12345678</p>
              </div>

              <div className="flex gap-2 items-center">
                <EnvironmentOutlined className="text-lg text-blue-600" />
                <p className="text-blue-600">Semarang, Jawa Tengah</p>
              </div>

              <Button onClick={showModal} type="primary" block>
                Request Service
              </Button>
              <Modal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
                <p>Form untuk permintaan layanan</p>
              </Modal>
              <FormModal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} />
            </div>
          </Card>


          <Card className="flex-1">
            <div className="">
              <Title level={3}>Kim Da Mi</Title>
              <div className="text-yellow-500 flex items-center space-x-1">
                <Rate disabled defaultValue={4.9} />
                <span>432 reviews</span>
              </div>
            </div>

          <div className="mt-2">
          <Text>5 Years Experience</Text>
          </div>
          
            <div className="mt-2">
          <a href="https://my-portfolio-link.com" className="text-blue-600">https://my-portfolio-link.com</a>
          </div>

        <div className="my-8">
          <hr className="text-gray-400 text-md" />
        </div>

            <div className="mb-6">
              <Title level={4}>Profile Description</Title>
              <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, tempore distinctio. Minima, rem dolor. Officiis mollitia natus, iusto ut, nisi praesentium voluptas veritatis autem tempore molestiae ipsum ex impedit consectetur, odit error cumque dolore id labore aperiam deleniti maxime eveniet!</Text>
            </div>

            <div className="my-8">
          <hr className="text-gray-400 text-md" />
        </div>


            {/* Services Section */}
            <Tabletranslator dataSource={dataSource} columns={columns} />


            <div className="my-8">
          <hr className="text-gray-400 text-md" />
        </div>


            {/* Reviews Section */}
            <Reviewtranslator reviews={reviews} />

          </Card>
        </div>
      </section>

      <Footer/>

    </div>



  );
};

export default Translatorp3;
