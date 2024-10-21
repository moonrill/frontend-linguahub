import { imgProfilePicture } from '#/constants/general';
import { Review } from '#/types/TranslatorTypes';
import { Avatar, Rate } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

const ReviewCard = ({
  review,
  border = true,
}: {
  review: Review;
  border?: boolean;
}) => {
  return (
    <div
      className={`rounded-xl flex flex-col justify-center gap-3 review-card ${
        border && 'border p-3'
      }`}
    >
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {review?.user?.userDetail?.profilePicture ? (
            <div className='relative w-10 h-10 2xl:w-12 2xl:h-12 rounded-full'>
              <Image
                src={imgProfilePicture(review?.user?.userDetail.profilePicture)}
                alt={'user avatar'}
                fill
                sizes='(max-width: 50px)'
                className='object-cover rounded-full'
                quality={100}
              />
            </div>
          ) : (
            <Avatar className='w-10 h-10 2xl:w-12 2xl:h-12'>
              {review?.user?.userDetail?.fullName?.charAt(0).toUpperCase() ||
                review?.user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          )}
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
      {review?.comment && (
        <p className='text-xs 2xl:text-sm font-light'>{review?.comment}</p>
      )}
    </div>
  );
};

export default ReviewCard;
