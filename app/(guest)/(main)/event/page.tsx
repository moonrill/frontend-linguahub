'use client';

import CardSkeleton from '#/components/CardSkeleton';
import EventCard from '#/components/EventCard';
import Pagination from '#/components/Pagination';
import { eventRepository } from '#/repository/event';
import { Event as EventType } from '#/types/EventTypes';
import { Empty, Segmented } from 'antd';
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
    <div className='bg-white text-slate-800 mt-6 min-h-screen'>
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
            Array.from({ length: limit }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : events?.data?.length === 0 ? (
            <Empty className='m-auto col-span-4 2xl:col-span-5' />
          ) : (
            events?.data?.map((e: EventType) => (
              <EventCard
                event={e}
                key={e.id}
                isUpcoming={status === 'Upcoming'}
              />
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
  );
};

export default Event;
