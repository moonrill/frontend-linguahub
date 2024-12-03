import { Icon } from '@iconify-icon/react';
import { Tag } from 'antd';

type Props = {
  status: string;
  text: string;
  icon?: string;
};

const StatusBadge = ({ status, text, icon }: Props) => {
  const getColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'unpaid':
        return 'bg-amber-100 text-amber-600';
      case 'approved':
      case 'completed':
      case 'paid':
      case 'Active':
        return 'bg-green-100 text-green-600';
      case 'in_progress':
      case 'translator':
        return 'bg-blue-100 text-blue-600';
      case 'rejected':
      case 'cancelled':
      case 'failed':
      case 'Inactive':
        return 'bg-red-100 text-red-600';
      case 'refund':
      case 'client':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Tag
      className={`rounded-full px-3 py-0.5 2xl:px-4 text-xs 2xl:text-sm font-medium flex items-center justify-center border-none m-0 ${getColor(
        status
      )}`}
    >
      {icon && <Icon icon={icon} className='mr-1 text-lg' />}
      {text}
    </Tag>
  );
};

export default StatusBadge;
