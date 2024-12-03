import { Icon } from '@iconify-icon/react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const translatorItems = [
  {
    key: '/dashboard/translator',
    label: <Link href={'/dashboard/translator'}>Dashboard</Link>,
    icon: <Icon icon='streamline:dashboard-circle' height={24} />,
  },
  {
    key: '/dashboard/translator/profile',
    label: <Link href={'/dashboard/translator/profile'}>Profile</Link>,
    icon: <Icon icon='solar:user-linear' height={24} />,
  },
  {
    key: '/dashboard/translator/service-request',
    label: (
      <Link href={'/dashboard/translator/service-request'}>
        Service Request
      </Link>
    ),
    icon: <Icon icon='proicons:mail' height={24} />,
  },
  {
    key: '/dashboard/translator/booking',
    label: <Link href={'/dashboard/translator/booking'}>Booking</Link>,
    icon: <Icon icon='fluent:calendar-edit-32-regular' height={24} />,
  },
  {
    key: '/dashboard/translator/service',
    label: <Link href={'/dashboard/translator/service'}>Service</Link>,
    icon: <Icon icon='cuida:translate-outline' height={24} />,
  },
  {
    key: '/dashboard/translator/payment',
    label: <Link href={'/dashboard/translator/payment'}>Payment</Link>,
    icon: <Icon icon='proicons:credit-card' height={24} />,
  },
  {
    key: '/dashboard/translator/review',
    label: <Link href={'/dashboard/translator/review'}>Review</Link>,
    icon: <Icon icon='iconamoon:comment-dots-light' height={24} />,
  },
];

const TranslatorMenu = () => {
  const pathname = usePathname();

  return (
    <Menu
      theme='light'
      style={{ borderRight: 0 }}
      mode='inline'
      selectedKeys={[pathname || '']}
      items={translatorItems}
      className='flex flex-col gap-[10px]'
    />
  );
};

export default TranslatorMenu;
