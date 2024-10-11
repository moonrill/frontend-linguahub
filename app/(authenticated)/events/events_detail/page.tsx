"use client";
import Navbar from '#/components/Navbar/Navbar';
import Footer from '#/components/Footer/Footer';
import React from 'react';
import Image from 'next/image';
import { Button, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Homee2 = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white text-slate-800">

        {/* Event Details */}
        <section className="px-5 md:px-10 py-10">
          <div className="h-64 rounded-lg shadow-lg mb-8 relative">
            <Image
              src="/images/2.png"
              alt="Banner"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="mt-8">
            <Title level={2} className="mb-4">
              Global Language and Culture Exchange: Bridging Communication Gaps
              Through Translation
            </Title>
            <Paragraph className="text-blue-600 text-lg mb-4">
              Event ends at: 27 September 2024
            </Paragraph>
            <h3 className="text-xl font-bold mb-4">Event Description</h3>
          </div>

          {/* Event Description */}
          <div className="text-gray-600 text-lg text-justify">
            <Paragraph className="mb-4">
              Join us for an exciting event where language enthusiasts,
              professional translators, and clients come together to explore the
              power of translation in bridging cultural divides. Learn from
              expert speakers, engage in interactive workshops, and network with
              fellow professionals.
            </Paragraph>
            <Paragraph className="mb-4">
              Whether youre a seasoned translator or a client looking to
              enhance your global reach, this event offers valuable insights and
              the chance to claim exclusive discounts on translation services.
              Don’t miss this opportunity to expand your knowledge and connect
              with the global community!
            </Paragraph>
            <Paragraph className="mb-4">
              In addition to insightful sessions, attendees will have the
              opportunity to participate in hands-on activities designed to
              improve language skills and translation techniques.
            </Paragraph>
            <Paragraph className="mb-4">
              The event will also feature a special segment on the latest
              translation tools and technologies, providing practical advice on
              how to streamline your translation processes.
            </Paragraph>
          </div>

          {/* Coupon*/}
          <div className="mt-10">
            <Title level={2} className="mb-6">Event Coupons</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg p-4 rounded-md flex justify-between items-center transition-transform duration-300 transform hover:scale-105 mb-4"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 p-3 rounded-lg shadow-md">
                      <div className="text-xl font-bold text-white">
                        50% Discount
                      </div>
                    </div>
                    <div className="ml-4 text-gray-600 border-l-2 border-dashed border-gray-500 pl-4 h-full">
                      <p className="font-bold mb-1">Exclusive Summer Sale</p>
                      <p className="text-sm">
                        Enjoy an extra discount on all summer collections. Use
                        this coupon to get amazing deals before it expires!
                      </p>
                      <p className="text-xs text-red-400 mt-1">
                        Expires on: 30 September 2024
                      </p>
                    </div>
                  </div>
                  <Button
                    type={idx === 3 ? 'default' : 'primary'}
                    disabled={idx === 3}
                    className={idx === 3 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
                  >
                    {idx === 3 ? 'Claimed' : 'Claim'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      
      
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Homee2;
