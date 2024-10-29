import { reviewRepository } from '#/repository/review';
import { Empty } from 'antd';
import ReviewCard from '../ReviewCard';

const RecentReviews = () => {
  const { data: reviews, isLoading } =
    reviewRepository.hooks.useGetTranslatorReviews(6, 1, 'desc');
  return (
    <div className='flex flex-col gap-5'>
      {isLoading ? (
        <div>Loading</div>
      ) : reviews?.data?.length === 0 ? (
        <Empty />
      ) : (
        reviews?.data?.map((review: any) => (
          <ReviewCard
            key={review.id}
            review={review}
            border={false}
            comment={false}
          />
        ))
      )}
    </div>
  );
};

export default RecentReviews;
