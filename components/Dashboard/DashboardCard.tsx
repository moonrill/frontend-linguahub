import { Icon } from '@iconify-icon/react';
import { Card } from 'antd';

type DashboardCardProps = {
  icon: string;
  title: string;
  value: string;
};

const DashboardCard = ({ icon, title, value }: DashboardCardProps) => {
  return (
    <Card
      style={{
        border: 'none',
      }}
      className='rounded-2xl 2xl:rounded-3xl group hover:bg-blue-600 hover:shadow-[0px_10px_40px_0px_#2563EB80] transition duration-300'
    >
      <div className='flex flex-col gap-4'>
        <div className='bg-blue-50 group-hover:bg-white group-hover:bg-opacity-25 2xl:rounded-2xl xl:p-2.5 xl:rounded-lg 2xl:p-4 w-fit flex justify-center items-center'>
          <Icon
            icon={icon}
            className='xl:text-2xl 2xl:text-[32px] text-blue-600 group-hover:text-white'
          />
        </div>
        <div className='flex flex-col xl:gap-0 2xl:gap-1'>
          <h1 className='text-sm 2xl:text-xl font-normal 2xl:font-medium group-hover:text-white'>
            {title}
          </h1>
          <p className='text-blue-950 text-lg 2xl:text-2xl font-semibold group-hover:text-white'>
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
