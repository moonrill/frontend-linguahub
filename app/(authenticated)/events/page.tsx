"use client";
import { Pagination, Button, Row, Col, Card } from 'antd'; 
import Navbar from '#/components/Navbar/Navbar'
import Footer from '#/components/Footer/Footer'
import React from "react";
import Image from "next/image";


const Homee = () => {
    return (
<>       


        <Navbar />

  <div className="bg-white text-slate-800">


<section className="flex flex-col md:flex-row justify-between items-center px-10 py-20">
  <div className="max-w-xl mb-6 md:mb-0">
    <h1 className="text-5xl font-bold mb-4 text-blue-800">
      LinguaHub Events
    </h1>
    <p className="text-gray-600 mb-6">
      Discover exciting events and claim exclusive coupons to enhance your translation experience.
    </p>
  </div>

  <Image
    src="/images/2.png"
    alt="Translator"
    width={650}
    height={350}
    className="max-w-full h-auto"
  />
</section>

<section className="px-10 py-20 bg-gray-50">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <h2 className="text-2xl font-bold mb-6">Discover Events</h2>

    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 bg-gray-100 rounded-lg p-3 justify-evenly">
      <Button type="primary">On going</Button>
      <Button>Upcoming</Button>
      <Button>Past</Button>
    </div>
  </div>

  <Row gutter={[16, 16]} className="p-4">
    {[...Array(15)].map((_, idx) => (
      <Col key={idx} xs={24} sm={12} md={8} lg={6}>
        <Card hoverable className="bg-white shadow rounded-md">
          <Image
            src="/images/4.png"
            alt="Event"
            width={350}
            height={200}
            className="w-full"
          />
          <div className="p-3">
            <h3 className="text-lg font-bold mt-4">Event Title</h3>
            <p className="text-gray-600">Ends at 27 November 2024</p>
            <p className="text-gray-500 mt-2 line-clamp-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <a href="#" className="text-blue-600 mt-4 block">View event</a>
          </div>
        </Card>
      </Col>
    ))}
  </Row>

  <div className="flex justify-center md:justify-end">
    <Pagination defaultCurrent={1} total={50} />
  </div>
</section>


        </div>

      {/* Footer */}
          
          <Footer />
  
        </>


    )
}

export default Homee