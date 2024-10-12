'use client';
import Footer from '#/components/Footer/Footer';
import Navbar from '#/components/Navbar/Navbar';
import Image from 'next/image';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Banner from '#/components/Banner';
import EventSection from '#/components/EventSection';
import SpecializationSection from '#/components/SpecializationSection';
import TranslatorSearchBar from '#/components/TranslatorSearchBar';
import {
  BuildOutlined,
  GlobalOutlined,
  LaptopOutlined,
  SearchOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card } from 'antd';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className='bg-white text-gray-900 px-[120px]'>
        {/* Hero Section */}
        <section className='grid grid-cols-2 gap-12 2xl:gap-16 bg-slate-50 mx-[-120px] relative items-center'>
          <div className='relative w-full md:h-[400px] xl:h-[500px] 2xl:h-[720px] '>
            <Image
              src='/images/hero.jpg'
              alt='Translator'
              fill
              priority
              quality={100}
              sizes='(max-width: 760px)'
              className='object-cover rounded-e-[28px]'
            />
          </div>

          <div className='w-full pe-[120px] mt-[-2rem]'>
            <h1 className='text-5xl 2xl:text-7xl font-bold mb-4 text-blue-950'>
              Find Your Perfect{' '}
              <span className='decoration-blue-600 text-blue-600'>
                Translator
              </span>
              , Enjoy Seamless Communication.
            </h1>
            <p className='!text-blue-900 mb-6'>
              Unlock Global Communication Effortlessly, with Expert Translators
              at Your Service.
            </p>
          </div>
          <TranslatorSearchBar />
        </section>
        {/* End of Hero */}
        <div className='flex flex-col gap-10 2xl:gap-12'>
          <SpecializationSection />
          <EventSection />
          <Banner />
        </div>

        <section className='bg-white py-8'>
          <div className='container mx-auto px-4'>
            <h2 className='text-2xl font-bold text-center'>
              4 Easy Steps to Get Your Translator
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>
              <Card className=' p-4 rounded-lg shadow-lg' hoverable>
                <div className='bg-blue-100 w-1/5 rounded-lg p-2 text-center'>
                  <GlobalOutlined className='text-2xl text-blue-600' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>Choose Languages</h3>
                <p className='mt-2 text-gray-700'>
                  Select the source and target languages for your translation
                  needs
                </p>
              </Card>
              <Card className=' p-4 rounded-lg shadow-lg' hoverable>
                <div className='bg-blue-100 w-1/5 rounded-lg p-2 text-center'>
                  <SearchOutlined className='text-2xl text-blue-600' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>
                  Find &amp; Select Translator
                </h3>
                <p className='mt-2 text-gray-700'>
                  Use the search filters to find translators according to your
                  language and specialization criteria.
                </p>
              </Card>
              <Card className=' p-4 rounded-lg shadow-lg' hoverable>
                <div className='bg-blue-100 w-1/5 rounded-lg p-2 text-center'>
                  <BuildOutlined className='text-2xl text-blue-600' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>
                  Request &amp; Booking
                </h3>
                <p className='mt-2 text-gray-700'>
                  Send a request to your chosen translator and proceed with the
                  booking once confirmed.
                </p>
              </Card>
              <Card className=' p-4 rounded-lg shadow-lg' hoverable>
                <div className='bg-blue-100 w-1/5 rounded-lg p-2 text-center'>
                  <LaptopOutlined className='text-2xl text-blue-600' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>Start Service</h3>
                <p className='mt-2 text-gray-700'>
                  Begin your translation service with the selected translator.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Translator Section */}
        <section className='px-4 md:px-10 py-20'>
          <h2 className='text-2xl font-bold mb-6'>Our Best Translator</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-blue-50 p-4 md:p-12 lg:p-6'>
            {[...Array(15)].map((_, idx) => (
              <Card
                key={idx}
                className='bg-white shadow p-4 rounded-md mx-auto'
                hoverable
              >
                <Image
                  src='/images/4.png'
                  alt='Translator'
                  width={250}
                  height={200}
                  className='rounded-md mx-auto'
                />
                <h3 className='text-lg font-bold mt-4'>Kim Da Mi</h3>

                <div className='flex space-x-2 items-center mt-1'>
                  <StarOutlined className='text-lg text-yellow-500' />
                  <p className='text-gray-600'>4.9</p>
                  <p className='text-gray-600'>(432 reviews)</p>
                </div>
                <div className='flex space-x-2 items-center mt-1'>
                  <UserOutlined className='text-lg text-slate-800' />
                  <p className='text-gray-500'>637 Booking completed</p>
                </div>

                <div className='flex flex-col space-x-2 mt-1'>
                  <p className='text-gray-500'>Languages offered:</p>
                  <div className='flex gap-2 mt-1'>
                    <Image
                      src='/icons/korea.png'
                      alt='flagk'
                      width={30}
                      height={30}
                      className='rounded-full'
                    />
                    <Image
                      src='/icons/jerman.png'
                      alt='flagj'
                      width={30}
                      height={30}
                      className='rounded-full'
                    />
                    <Image
                      src='/icons/indonesia.png'
                      alt='flagi'
                      width={30}
                      height={30}
                      className='rounded-full'
                    />
                  </div>
                </div>
                <Button className='bg-blue-600 text-white mt-4 w-full'>
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
