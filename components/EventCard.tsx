import { Event } from '#/types/EventTypes';
import formatDate from '#/utils/formatDate';
import { Icon } from '@iconify-icon/react';
import { Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const { id, name, poster, description, endDate } = event;
  return (
    <Link href={`/events/${id}`}>
      <Card className='my-card event-card overflow-hidden h-full'>
        <div className='relative w-full h-52 2xl:h-64'>
          <Image
            src={'/images/event-placeholder.svg'}
            alt={'slide-2'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover'
          />
        </div>
        {/* Bagian ini menggunakan flex-1 untuk mengisi ruang yang tersisa */}
        <div className='p-4 2xl:p-6 flex flex-col gap-4 flex-1'>
          <div className='flex flex-col gap-4 flex-1'>
            <div className='flex flex-col gap-1.5 2xl:gap-2'>
              <h1 className='font-semibold text-lg 2xl:text-2xl'>{name}</h1>
              <p className='font-medium text-xs 2xl:text-sm text-gray-400'>
                Ends at : {formatDate(endDate)}
              </p>
            </div>
            <p className='text-sm 2xl:text-base font-light line-clamp-2 2xl:line-clamp-3'>
              {description}
            </p>
          </div>
          {/* Menambahkan mt-auto agar tombol selalu berada di bawah */}
          <Link
            href={`/events/${id}`}
            className='flex gap-1.5 items-center text-sm text-blue-600 mt-auto'
          >
            <p>View event</p>
            <Icon icon={'weui:arrow-outlined'} height={18} />
          </Link>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
