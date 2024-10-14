import { imgProfilePicture } from '#/constants/general';
import { BestTranslator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Card, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import LanguageFlag from '../LanguageFlag';

const BestTranslatorCard = ({ translator }: { translator: BestTranslator }) => {
  const {
    user: { userDetail },
    completedBookingsCount,
    rating,
    reviewsCount,
  } = translator;
  return (
    <Card className='my-card h-full flex flex-col overflow-hidden'>
      <div className='p-4 border-b'>
        <div className='relative w-52 h-52 2xl:w-80 2xl:h-80 rounded-full m-auto'>
          <Image
            src={
              userDetail.profilePicture
                ? imgProfilePicture(userDetail.profilePicture)
                : '/images/avatar-placeholder.png'
            }
            alt={'slide-2'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover rounded-full'
          />
        </div>
      </div>
      <div className='p-6 flex flex-col gap-4 items-center flex-1'>
        <div>
          <h1 className='text-2xl 2xl:text-3xl font-bold text-center'>
            {userDetail.fullName}
          </h1>
          <div className='flex gap-1 items-center justify-center'>
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
            <p className='text-xs font-light'>({reviewsCount} reviews)</p>
          </div>
        </div>
        <div className='flex gap-2'>
          {translator.languages.map((language, index) => (
            <LanguageFlag key={index} language={language} />
          ))}
        </div>
        <div className='flex gap-y-2 flex-wrap justify-center'>
          {translator.specializations.map((specialization, index) => (
            <Tag
              key={index}
              color='blue'
              className='border-none text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium'
            >
              {specialization.name}
            </Tag>
          ))}
        </div>
        <Link href={'/'} className='flex w-full mt-auto'>
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
