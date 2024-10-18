import { imgProfilePicture } from '#/constants/general';
import { Review } from '#/types/TranslatorTypes';
import { Card, Rate } from 'antd';
import dayjs from 'dayjs';
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
              {dayjs(review?.createdAt).format('DD MMMM YYYY')}
            </p>
          </div>
        </div>
        <div>
          <Rate disabled defaultValue={review.rating} />
        </div>
      </div>
      <p className='mt-3 2xl:mt-4 text-xs 2xl:text-sm font-light'>
        {review?.comment}
      </p>
    </Card>
  );
};

export default ReviewCard;
