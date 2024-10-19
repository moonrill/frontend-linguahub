import { imgProfilePicture } from '#/constants/general';
import { Translator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import LanguageFlag from '../LanguageFlag';

const TranslatorCard = ({ translator }: { translator: Translator }) => {
  return (
    <Link href={`/translator/${translator.id}`} key={translator.id}>
      <Card className='my-card overflow-hidden'>
        <div className='relative w-full h-[200px] 2xl:h-[300px]'>
          <Image
            src={
              translator.user.userDetail.profilePicture
                ? imgProfilePicture(translator.user.userDetail.profilePicture)
                : '/images/avatar-placeholder.png'
            }
            alt={'Translator Profile Picture'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover'
          />
        </div>
        <div className='p-3 2xl:p-4 flex flex-col justify-between flex-1'>
          <div className='flex flex-col gap-3 2xl:gap-4'>
            <div className='flex flex-col 2xl:gap-1'>
              <h1 className='text-base 2xl:text-2xl font-semibold'>
                {translator.user.userDetail.fullName}
              </h1>
              <div className='flex gap-1 items-center'>
                <Icon
                  icon={'tabler:star-filled'}
                  className='text-yellow-400 text-xs 2xl:text-lg'
                />
                <p className='text-[10px] 2xl:text-sm font-semibold'>
                  {translator.rating}
                </p>
                <p className='text-[10px] 2xl:text-sm font-light'>
                  ({translator.reviewsCount} reviews)
                </p>
              </div>
            </div>
            <p className='text-xs 2xl:text-sm font-light line-clamp-2'>
              {translator.bio}
            </p>
            <div className='flex gap-1 2xl:gap-2'>
              {translator.languages?.map((language, index) => (
                <LanguageFlag key={index} language={language} />
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <Icon
                icon={'streamline:industry-innovation-and-infrastructure-solid'}
                className='text-base 2xl:text-xl text-blue-900'
              />
              <p className='text-xs 2xl:text-sm line-clamp-1'>
                {translator.specializations?.map((s) => s.name).join(', ')}
              </p>
            </div>
          </div>
          <div className='flex justify-between mt-4'>
            <p className='text-blue-950 font-semibold text-xs 2xl:text-sm'>
              From Rp
              {translator.lowestServicePrice?.toLocaleString('ID-id')}
              /hr
            </p>
            <p className='flex gap-1.5 items-center text-xs 2xl:text-sm font-medium text-blue-600 mt-auto'>
              View
              <Icon icon={'weui:arrow-outlined'} height={18} />
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TranslatorCard;
