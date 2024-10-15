import { Card, Skeleton } from 'antd';

const CardSkeleton = () => {
  return (
    <Card className='my-card overflow-hidden'>
      <Skeleton.Image active className='!w-full !h-[200px] 2xl:!h-[300px]' />
      <div className='p-4'>
        <Skeleton active />
      </div>
    </Card>
  );
};

export default CardSkeleton;
