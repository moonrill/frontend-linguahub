import { BestTranslator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Card, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import LanguageFlag from '../LanguageFlag';

const Languages = () => {
  return (
    <div>
      <p className='text-xs 2xl:text-sm font-medium'>Languages Proficiency</p>
      <div className='flex gap-1 2xl:gap-2 mt-2'>
        <div className='relative w-[32px] h-[32px] md:w-[42px] md:h-[42px]'></div>
        <Icon
          icon={'emojione:flag-for-united-kingdom'}
          className='text-2xl 2xl:text-3xl'
        />
        <Icon
          icon={'emojione:flag-for-indonesia'}
          className='text-2xl 2xl:text-3xl'
        />
        <Icon
          icon={'emojione:flag-for-russia'}
          className='text-2xl 2xl:text-3xl'
        />
        <Icon
          icon={'emojione:flag-for-spain'}
          className='text-2xl 2xl:text-3xl'
        />
      </div>
    </div>
  );
};

const Specializations = () => {
  return (
    <div className='flex gap-y-2 flex-wrap mt-2'>
      <Tag
        color='blue'
        className='border-none text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium'
      >
        General
      </Tag>
      <Tag
        color='blue'
        className='border-none text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium'
      >
        Tech
      </Tag>
      <Tag
        color='blue'
        className='border-none text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium'
      >
        Tech
      </Tag>
      <Tag
        color='blue'
        className='border-none text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium'
      >
        Medical
      </Tag>
    </div>
  );
};

const BestTranslatorCard = ({ translator }: { translator: BestTranslator }) => {
  const {
    user: { userDetail },
    completedBookingsCount,
    rating,
    reviewsCount,
  } = translator;
  return (
    <Card className='my-card'>
      <div className='relative w-full h-52 2xl:h-64'>
        <Image
          src={'/images/event-placeholder.svg'}
          alt={'slide-2'}
          fill
          sizes='(max-width: 400px)'
          className='object-cover'
        />
      </div>
      <div className='p-6 flex flex-col gap-4'>
        <div>
          <h1 className='text-2xl 2xl:text-3xl font-bold'>
            {userDetail.fullName}
          </h1>
          <div className='flex gap-1 items-center'>
            <Icon
              icon={'mdi:book-open-variant'}
              className='text-blue-600 text-xl'
            />
            <p className='text-xs font-light mt-0.5'>
              {completedBookingsCount} |
            </p>
            <Icon
              icon={'tabler:star-filled'}
              className='text-yellow-400 text-base 2xl:text-xl'
            />
            <p className='text-sm font-semibold'>{rating}</p>
            <p className='text-xs font-light'>{reviewsCount} reviews</p>
          </div>
        </div>
        <LanguageFlag language={translator.languages[0]} />
        <Specializations />
        <Link href={'/'} className='flex w-full'>
          <Button
            type='primary'
            className='text-sm py-5 2xl:py-6 mt-4 rounded-xl font-medium flex-grow'
          >
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default BestTranslatorCard;
