'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const slides = [
  {
    src: '/images/slide-1.jpg',
    alt: 'Slide 1',
    title: 'Professional Translation Services for Any Language',
    description:
      'We offer skilled and experienced translators for all your needs, from business documents to everyday conversations. Find the right translator for any language you require.',
  },
  {
    src: '/images/slide-2.jpg',
    alt: 'Slide 2',
    title: 'Expert Translators at Your Fingertips',
    description:
      'With just a click, you can book top translators from around the globe. We connect you with professionals ready to provide accurate and reliable translation services.',
  },
  {
    src: '/images/slide-3.jpg',
    alt: 'Slide 3',
    title: 'Fast and Easy Translation Solutions',
    description:
      'Need quick, high-quality translations? We make cross-language communication simple. Book a translator tailored to your needs instantly through our platform.',
  },
];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-full'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={`Slider image ${index + 1}`}
            layout='fill'
            sizes='100%'
            objectFit='cover'
            className='rounded-[28px]'
          />
          <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)] rounded-[28px]'></div>
          <div className='absolute bottom-8 left-8 right-8 text-white z-10'>
            <h2 className='text-3xl font-bold mb-2'>{slide.title}</h2>
            <p className='text-base font-light'>{slide.description}</p>
          </div>
        </div>
      ))}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20'>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
