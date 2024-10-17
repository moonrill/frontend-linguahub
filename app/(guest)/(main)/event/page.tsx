'use client';

import EventCard from '#/components/EventCard';
import Pagination from '#/components/Pagination';
import { eventRepository } from '#/repository/event';
import { Event as EventType } from '#/types/EventTypes';
import { Segmented } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Event = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || 'Ongoing';
  const page = Number(searchParams?.get('page')) || 1;

  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setLimit(12);
      } else {
        setLimit(15);
      }
    };

    // Call once to set initial limit
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: events, isLoading } = eventRepository.hooks.useAllEvents(
    limit,
    page,
    status.toLowerCase()
  );

  const items = ['Ongoing', 'Upcoming', 'Past'];
  const onChange = (e: any) => {
    router.push(`/event?status=${e}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/event?status=${status}&page=${page}`);
  };

  return (
    <>
      <div className='bg-white text-slate-800 mt-6'>
        {/* <section className='flex flex-col md:flex-row justify-between items-center py-20'>
          <div className='max-w-xl mb-6 md:mb-0'>
            <h1 className='text-5xl font-bold mb-4 text-blue-800'>
              LinguaHub Events
            </h1>
            <p className='text-gray-600 mb-6'>
              Discover exciting events and claim exclusive coupons to enhance
              your translation experience.
            </p>
          </div>

          <Image
            src='/images/2.png'
            alt='Translator'
            width={650}
            height={350}
            className='max-w-full h-auto'
          />
        </section> */}

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <h2 className='2xl:text-xl font-semibold'>Discover Events</h2>

            <Segmented
              options={items}
              onChange={onChange}
              defaultValue={status}
            />
          </div>

          <section className='grid grid-cols-4 2xl:grid-cols-5 gap-4'>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              events?.data?.map((e: EventType) => (
                <EventCard event={e} key={e.id} />
              ))
            )}
          </section>

          {!isLoading && (
            <Pagination
              total={events?.total}
              pageSize={events?.limit}
              current={currentPage}
              onChange={handlePageChange}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default Event;
