import { eventRepository } from '#/repository/event';
import { Event } from '#/types/EventTypes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardSkeleton from './CardSkeleton';
import EventCard from './EventCard';

const EventSection = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default ke 3 event

  useEffect(() => {
    // Cek ukuran layar dan sesuaikan jumlah event yang diambil
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setItemsPerPage(4); // Tampilkan 4 event di 2xl
      } else {
        setItemsPerPage(3); // Default ke 3 event
      }
    };

    // Panggil saat komponen pertama kali mount
    handleResize();

    // Panggil saat ukuran layar berubah
    window.addEventListener('resize', handleResize);

    // Bersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Panggil hook dengan jumlah event sesuai ukuran layar
  const { data: events, isLoading } = eventRepository.hooks.useAllEvents(
    itemsPerPage,
    1,
    'ongoing'
  );

  return (
    <section>
      <div className='flex justify-between items-end'>
        <h1
          className='text-[28px] 2xl:text-4xl font-bold text-blue-950'
          data-aos='fade-right'
        >
          Events for you
        </h1>
        <Link
          href={'/event'}
          className='text-sm 2xl:text-lg text-blue-600 font-medium'
          data-aos='fade-left'
        >
          View All
        </Link>
      </div>

      <div className='grid lg:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-10 mt-4 2xl:mt-8'>
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : events?.data?.map((e: Event, index: number) => (
              <EventCard
                event={e}
                key={e.id}
                animation='zoom-in'
                delay={index}
              />
            ))}
      </div>
    </section>
  );
};

export default EventSection;
