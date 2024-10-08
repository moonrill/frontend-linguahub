import { Icon } from '@iconify-icon/react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

const translatorItems: MenuItem[] = [
  {
    key: 't1',
    label: <Link href={'/dashboard/translator'}>Dashboard</Link>,
    icon: <Icon icon='bxs:dashboard' height={24} />,
  },
  {
    key: 't2',
    label: (
      <Link href={'/dashboard/translator/service-request'}>
        Service Request
      </Link>
    ),
    icon: <Icon icon='mdi:email-newsletter' height={24} />,
  },
  {
    key: 't3',
    label: <Link href={'/dashboard/translator/booking'}>Booking</Link>,
    icon: <Icon icon='mdi:book-open-variant' height={24} />,
  },
  {
    key: 't4',
    label: <Link href={'/dashboard/translator/service'}>Service</Link>,
    icon: <Icon icon='mingcute:service-fill' height={24} />,
  },
  {
    key: 't5',
    label: <Link href={'/dashboard/translator/payment'}>Payment</Link>,
    icon: <Icon icon='mdi:credit-card-outline' height={24} />,
  },
  {
    key: 't6',
    label: <Link href={'/dashboard/translator/review'}>Review</Link>,
    icon: <Icon icon='mingcute:comment-2-fill' height={24} />,
  },
];

const TranslatorMenu = () => {
  return (
    <Menu
      theme='light'
      defaultSelectedKeys={['t1']}
      items={translatorItems}
      className='flex flex-col gap-[10px]'
    />
  );
};

export default TranslatorMenu;
