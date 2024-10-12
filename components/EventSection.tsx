import { eventRepository } from '#/repository/event';
import { Event } from '#/types/EventType';
import Link from 'next/link';
import EventCard from './EventCard';

const EventSection = () => {
  const { data: events, isLoading } = eventRepository.hooks.useAllEvents(3, 1);

  return (
    <section>
      <div className='flex justify-between items-end'>
        <h2 className='text-[28px] 2xl:text-4xl font-bold text-blue-950'>
          Events for you
        </h2>
        <Link
          href={'/specialization'}
          className='text-sm 2xl:text-lg text-blue-600 font-medium'
        >
          View All
        </Link>
      </div>

      <div className='grid grid-cols-3 gap-6 2xl:gap-10 mt-4 2xl:mt-8'>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          events.data.map((e: Event) => <EventCard event={e} key={e.id} />)
        )}
      </div>
    </section>
  );
};

export default EventSection;
