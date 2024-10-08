import { Icon } from '@iconify-icon/react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

const adminItems: MenuItem[] = [
  {
    key: 'a1',
    label: <Link href={'/dashboard'}>Dashboard</Link>,
    icon: <Icon icon='bxs:dashboard' height={24} />,
  },
  {
    key: 'a2',
    label: 'Account',
    icon: <Icon icon='mdi:users-group' height={24} />,
    children: [
      {
        key: '1',
        label: <Link href={'/dashboard/client'}>Client</Link>,
      },
      {
        key: '2',
        label: <Link href={'/dashboard/translator'}>Translator</Link>,
      },
      {
        key: '3',
        label: (
          <Link href={'/dashboard/translator/approval'}>
            Translator Approval
          </Link>
        ),
      },
    ],
  },
  {
    key: 'a3',
    label: 'Expertise',
    icon: (
      <Icon
        icon='streamline:industry-innovation-and-infrastructure-solid'
        height={24}
      />
    ),
    children: [
      {
        key: '4',
        label: <Link href={'/dashboard/language'}>Language</Link>,
      },
      {
        key: '4',
        label: <Link href={'/dashboard/specialization'}>Specialization</Link>,
      },
    ],
  },
  {
    key: 'a4',
    label: 'Transactions',
    icon: <Icon icon='mdi:credit-card-outline' height={24} />,
    children: [
      {
        key: '5',
        label: <Link href={'/dashboard/service-request'}>Service Request</Link>,
      },
      {
        key: '6',
        label: <Link href={'/dashboard/booking'}>Booking</Link>,
      },
      {
        key: '7',
        label: <Link href={'/dashboard/payment'}>Payment</Link>,
      },
    ],
  },
  {
    key: 'a5',
    label: 'Promotion',
    icon: <Icon icon='mingcute:horn-2-line' height={24} />,
    children: [
      {
        key: '8',
        label: <Link href={'/dashboard/event'}>Event</Link>,
      },
      {
        key: '9',
        label: <Link href={'/dashboard/coupon'}>Coupon</Link>,
      },
    ],
  },
  {
    key: 'a6',
    label: 'Quality',
    icon: <Icon icon='mdi:filter-gear-outline' height={24} />,
    children: [
      {
        key: '10',
        label: <Link href={'/dashboard/service'}>Service</Link>,
      },
      {
        key: '11',
        label: <Link href={'/dashboard/review'}>Review</Link>,
      },
    ],
  },
];

const AdminMenu = () => {
  return (
    <Menu
      mode='inline'
      theme='light'
      defaultSelectedKeys={['a1']}
      style={{ borderRight: 0 }}
      items={adminItems}
      className='flex flex-col gap-[10px] h-fit'
    />
  );
};

export default AdminMenu;
