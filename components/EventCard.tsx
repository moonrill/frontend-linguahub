import { eventPoster } from '#/constants/general';
import { Event } from '#/types/EventTypes';
import { Icon } from '@iconify-icon/react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const { id, name, poster, description, endDate } = event;
  return (
    <Link href={`/event/${id}`}>
      <Card className='my-card event-card overflow-hidden h-full group'>
        <div className='relative w-full h-52 2xl:h-64'>
          <Image
            src={poster ? eventPoster(poster) : '/images/event-placeholder.svg'}
            alt={'slide-2'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover group-hover:scale-105 transition-all duration-500'
          />
        </div>
        <div className='p-4 2xl:p-6 flex flex-col gap-4 flex-1'>
          <div className='flex flex-col gap-4 flex-1'>
            <div className='flex flex-col gap-1.5 2xl:gap-2'>
              <h1 className='font-semibold text-lg 2xl:text-2xl'>{name}</h1>
              <p className='font-medium text-xs 2xl:text-sm text-gray-400'>
                Ends at : {dayjs(endDate).format('DD MMMM YYYY, HH:mm')}
              </p>
            </div>
            <p className='text-sm 2xl:text-base font-light line-clamp-2 2xl:line-clamp-3'>
              {description}
            </p>
          </div>
          <p className='flex gap-1.5 items-center text-sm text-blue-600 mt-auto'>
            View event
            <Icon icon={'weui:arrow-outlined'} height={18} />
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
