import { Icon } from '@iconify-icon/react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

interface BreadcrumbComponentProps {
  items: Array<{ href: string; title: string; icon: string }>;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  return (
    <Breadcrumb
      items={items.map((item) => ({
        title: (
          <Link href={item.href} className='flex items-center'>
            <Icon icon={item.icon} className='mr-1' />
            {item.title}
          </Link>
        ),
      }))}
    />
  );
};

export default BreadcrumbComponent;
