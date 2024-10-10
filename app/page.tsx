"use client";   
import Navbar from '#/components/Navbar/Navbar'
import Footer from '#/components/Footer/Footer'
import React, { useState } from "react";
import Image from "next/image";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { Layout, Row, Col, Select, Button, Card, Modal } from "antd";
import { SearchOutlined, GlobalOutlined, HeartOutlined, BuildOutlined, CreditCardOutlined, LaptopOutlined, StarOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Content } = Layout;



const Home = () => { 
    
    return (

        <>
        

        <div className="bg-white text-gray-900">
          <Navbar />
        

{/* Hero Section */}
<section className="flex flex-col md:flex-row justify-between items-center py-20">

<Image
    src="/images/3.png" 
    alt="Translator" 
    width={750} 
    height={600} 
    className="" 
  />

  <div className="max-w-xl ml-10 lg:max-w-full">
    <h1 className="text-5xl font-bold mb-4">
      Find Your Perfect <span className="decoration-blue-600 text-blue-600">Translator</span>, 
      Enjoy Seamless Communication.
    </h1>
    <p className="!text-blue-900 mb-6">
      Unlock Global Communication Effortlessly, with Expert Translators at Your Service.
    </p>
  </div>
</section>

 {/* Language Filter */}
 <div className="bg-white shadow-md p-6 rounded-xl relative z-10 w-full md:w-3/4 mx-auto -mt-40">
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
      

      <section className="px-4 md:px-10 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Explore by Specialization</h2>
        <a href="#" className="text-blue-600">View all</a>
        </div>

        <div className ="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 text-center">
        
     <Card className="p-4 rounded-lg shadow-lg" hoverable>
      <div className="bg-gray-100 w-1/3 mx-auto rounded-full p-2 text-center">
      <GlobalOutlined className="text-2xl text-slate-800 rounded-full font-bold" />
      </div>
      <h3 className="mt-4 text-xl font-bold">
       General
      </h3>
     </Card>

     <Card className="p-4 rounded-lg shadow-lg" hoverable>
     <div className="bg-gray-100 w-1/3 mx-auto rounded-full p-2 text-center">
      <HeartOutlined className="text-2xl text-slate-800 rounded-full font-bold" />
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Health
      </h3>
     </Card>

     <Card className="p-4 rounded-lg shadow-lg" hoverable>
     <div className="bg-gray-100 w-1/3 mx-auto rounded-full p-2 text-center">
      <BuildOutlined className="text-2xl rounded-full text-slate-800 font-bold" />
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Business
      </h3>
     </Card>

     <Card className ="p-4 rounded-lg shadow-lg" hoverable>
            <div className="bg-gray-100 w-1/3 mx-auto rounded-full p-2 text-center">
      <CreditCardOutlined className="text-2xl rounded-full text-slate-800 font-bold" />
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Finance
      </h3>
     </Card>

     <Card className ="p-4 rounded-lg shadow-lg" hoverable>
     <div className="bg-gray-100 w-1/3 mx-auto rounded-full p-2 text-center">
      <LaptopOutlined className="text-2xl rounded-full text-slate-800 font-bold" />
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Tech
      </h3>
     </Card>

    </div>
    
      </section>

      {/* Events Section */}
      <section className="px-4 md:px-10 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">Events for You</h2>
          <a href="#" className="text-blue-600">View all</a>
        </div>
        <Row gutter={[16, 16]} className="p-4">
          {[...Array(15)].map((_, idx) => (
            <Col key={idx} xs={24} sm={12} md={8}>
              <Card hoverable className="bg-white shadow rounded-md" >
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
                  <p className="text-gray-500 mt-2 line-clamp-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="text-blue-600 mt-4 block">View event</a>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>


      
      <section className="bg-blue-600 py-8">

    <div className="flex text-white justify-evenly">
       
        <div className="bg-white w-32 rounded-full text-center">
          <AudioOutlined className="fas fa-microphone text-6xl text-blue-500 mt-7" />
        </div>

        <div className="">
        <h2 className="text-2xl font-bold">
          Need a Translator for Your Next Event?
        </h2>
        <p className="mt-2">
          Whether its a conference or a business meeting, find the perfect translator for your event.
        </p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg mt-4">
          Book Now
        </button>
        </div>



      </div>
    </section>
  
  <section className="bg-white py-8">
   <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-center">
     4 Easy Steps to Get Your Translator
    </h2>
    <div className ="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
     <Card className=" p-4 rounded-lg shadow-lg" hoverable>
      <div className="bg-blue-100 w-1/5 rounded-lg p-2 text-center">
      <GlobalOutlined className="text-2xl text-blue-600" /> 
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Choose Languages
      </h3>
      <p className="mt-2 text-gray-700">
       Select the source and target languages for your translation needs
      </p>
     </Card>
     <Card className=" p-4 rounded-lg shadow-lg"hoverable>
     <div className="bg-blue-100 w-1/5 rounded-lg p-2 text-center">
      <SearchOutlined className="text-2xl text-blue-600" /> 
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Find &amp; Select Translator
      </h3>
      <p className="mt-2 text-gray-700">
       Use the search filters to find translators according to your language and specialization criteria.
      </p>
     </Card>
     <Card className=" p-4 rounded-lg shadow-lg"hoverable>
     <div className="bg-blue-100 w-1/5 rounded-lg p-2 text-center">
      <BuildOutlined className="text-2xl text-blue-600" /> 
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Request &amp; Booking
      </h3>
      <p className="mt-2 text-gray-700">
       Send a request to your chosen translator and proceed with the booking once confirmed.
      </p>
     </Card>
     <Card className =" p-4 rounded-lg shadow-lg"hoverable>
     <div className="bg-blue-100 w-1/5 rounded-lg p-2 text-center">
      <LaptopOutlined className="text-2xl text-blue-600" /> 
      </div>
      <h3 className="mt-4 text-xl font-bold">
       Start Service
      </h3>
      <p className="mt-2 text-gray-700">
       Begin your translation service with the selected translator.
      </p>
     </Card>
    </div>
   </div>
  </section>



      {/* Best Translator Section */}
      <section className="px-4 md:px-10 py-20">
        <h2 className="text-2xl font-bold mb-6">Our Best Translator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-blue-50 p-4 md:p-12 lg:p-6">
          {[...Array(15)].map((_, idx) => (
            <Card key={idx} className="bg-white shadow p-4 rounded-md mx-auto" hoverable>
              <Image 
              src="/images/4.png" 
              alt="Translator" 
              width={250} 
              height={200} 
              className="rounded-md mx-auto"
                />
              <h3 className="text-lg font-bold mt-4">Kim Da Mi</h3>

              <div className="flex space-x-2 items-center mt-1">
                <StarOutlined className="text-lg text-yellow-500" />
                <p className="text-gray-600">4.9</p>
                <p className="text-gray-600">(432 reviews)</p>
              </div>
              <div className="flex space-x-2 items-center mt-1">
                <UserOutlined className="text-lg text-slate-800" />
                <p className="text-gray-500">637 Booking completed</p>
              </div>

              <div className="flex flex-col space-x-2 mt-1">
                <p className="text-gray-500">Languages offered:</p>
                <div className="flex gap-2 mt-1">
                  <Image src="/icons/korea.png" alt="flagk" width={30} height={30} className="rounded-full"/>
                  <Image src="/icons/jerman.png" alt="flagj" width={30} height={30} className="rounded-full"/>
                  <Image src="/icons/indonesia.png" alt="flagi" width={30} height={30} className="rounded-full"/>
                </div>
              </div>
              <Button className="bg-blue-600 text-white mt-4 w-full">View Profile</Button>
            </Card>
          ))}
        </div>
      </section>


   </div>  


   <Footer />


  </>


);
};


export default Home;
