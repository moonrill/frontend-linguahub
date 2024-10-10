import { Icon } from '@iconify-icon/react';
import { Card, Space } from 'antd';

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
      className='rounded-3xl group hover:bg-blue-600 hover:shadow-[0px_10px_40px_0px_#2563EB80] transition duration-300'
    >
      <div className='flex flex-col gap-4'>
        <div className='bg-blue-50 group-hover:bg-white group-hover:bg-opacity-25 rounded-2xl p-4 w-fit flex justify-center items-center'>
          <Icon
            icon={icon}
            className='text-[32px] text-blue-600 group-hover:text-white'
          />
        </div>
        <Space direction='vertical' size={8}>
          <h1 className='text-xl font-medium text-blue-950 group-hover:text-white'>
            {title}
          </h1>
          <p className='text-blue-950 text-2xl font-semibold group-hover:text-white'>
            {value}
          </p>
        </Space>
      </div>
    </Card>
  );
};

export default DashboardCard;
