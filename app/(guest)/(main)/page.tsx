'use client';
import Banner from '#/components/Banner';
import BestTranslatorSection from '#/components/BestTranslatorSection';
import EventSection from '#/components/EventSection';
import SpecializationSection from '#/components/SpecializationSection';
import StepSection from '#/components/StepSection';
import TranslatorSearchBar from '#/components/TranslatorSearchBar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <main className='bg-white text-gray-900'>
        {/* Hero Section */}
        <section className='grid grid-cols-2 gap-12 2xl:gap-16 bg-slate-50 mx-[-120px] relative items-center'>
          <div
            data-aos='fade-right'
            className='relative w-full md:h-[400px] xl:h-[500px] 2xl:h-[720px]'
          >
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

          <div data-aos='fade-left' className='w-full pe-[120px] mt-[-2rem]'>
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
          <div
            className='absolute px-[120px] w-full bottom-[-80px]'
            data-aos='zoom-in-up'
          >
            <TranslatorSearchBar isHome={true} />
          </div>
        </section>
        {/* End of Hero */}

        <div className='flex flex-col gap-10 2xl:gap-12'>
          <SpecializationSection />
          <EventSection />
          <Banner />
          <StepSection />
          <BestTranslatorSection />
        </div>
      </main>
    </>
  );
};

export default Home;
