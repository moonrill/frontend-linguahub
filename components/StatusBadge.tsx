import { Tag } from 'antd';

type Props = {
  status: string;
  text: string;
};

const StatusBadge = ({ status, text }: Props) => {
  const getColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'unpaid':
        return 'bg-amber-50 text-amber-600';
      case 'approved':
      case 'completed':
      case 'paid':
      case 'Active':
        return 'bg-green-50 text-green-600';
      case 'in_progress':
      case 'translator':
        return 'bg-blue-50 text-blue-600';
      case 'rejected':
      case 'cancelled':
      case 'failed':
      case 'Inactive':
        return 'bg-red-50 text-red-600';
      case 'refund':
      case 'client':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <Tag
      className={`rounded-full px-3 py-0.5 2xl:px-4 text-xs 2xl:text-sm font-medium flex items-center justify-center border-none m-0 ${getColor(
        status
      )}`}
    >
      {text}
    </Tag>
  );
};

export default StatusBadge;
