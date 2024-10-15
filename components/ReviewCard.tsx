import { imgProfilePicture } from '#/constants/general';
import { Review } from '#/types/TranslatorTypes';
import formatDate from '#/utils/formatDate';
import { Icon } from '@iconify-icon/react';
import { Card } from 'antd';
import Image from 'next/image';

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className='rounded-2xl review-card'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <div className='relative w-10 h-10 2xl:w-12 2xl:h-12 rounded-full'>
            <Image
              src={
                review?.user?.userDetail.profilePicture
                  ? imgProfilePicture(review?.user?.userDetail.profilePicture)
                  : '/images/avatar-placeholder.png'
              }
              alt={'profile-picture'}
              fill
              sizes='(max-width: 60px)'
              className='object-cover rounded-full'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold text-xs 2xl:text-sm'>
              {review?.user?.userDetail.fullName}
            </p>
            <p className='font-semibold text-gray-400 text-[10px] 2xl:text-xs'>
              {formatDate(review?.createdAt).split(',')[0]}
            </p>
          </div>
        </div>
        <div>
          {Array.from({ length: review?.rating }).map((_, index) => (
            <Icon
              key={index}
              icon={'tabler:star-filled'}
              className='text-yellow-400 text-lg 2xl:text-2xl'
            />
          ))}
        </div>
      </div>
      <p className='mt-3 2xl:mt-4 text-xs 2xl:text-sm font-light'>
        {review?.comment}
      </p>
    </Card>
  );
};

export default ReviewCard;
