import { Tag } from 'antd';

type Props = {
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  text: string;
  icon?: string;
};

const StatusBadge = ({ color, text, icon }: Props) => {
  const variants = {
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <Tag
      className={`rounded-full px-3 py-0.5 2xl:px-4 text-xs 2xl:text-sm font-medium flex items-center justify-center border-none ${variants[color]}`}
    >
      {text}
    </Tag>
  );
};

export default StatusBadge;
