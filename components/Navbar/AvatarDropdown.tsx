import { Icon } from '@iconify-icon/react';
import { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import Link from 'next/link';

type DropdownLabelProps = {
  link: string;
  name: string;
  icon: string;
};

export const DropdownLabel = ({ link, name, icon }: DropdownLabelProps) => (
  <Link href={link} className='flex items-center gap-1.5'>
    <Icon icon={icon} className='text-xl' />
    {name}
  </Link>
);

const clientDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <DropdownLabel link='/profile' name='Profile' icon='hugeicons:user' />
    ),
  },
  {
    key: '2',
    label: (
      <DropdownLabel
        link='/profile/coupons'
        name='Coupons'
        icon='hugeicons:coupon-percent'
      />
    ),
  },
  {
    key: '3',
    label: (
      <DropdownLabel
        link='/profile/service-requests'
        name='Service Requests'
        icon='hugeicons:mail-upload-01'
      />
    ),
  },
  {
    key: '4',
    label: (
      <DropdownLabel
        link='/profile/bookings'
        name='Bookings'
        icon='hugeicons:customer-service-01'
      />
    ),
  },
  {
    key: '5',
    label: (
      <DropdownLabel
        link='/profile/payments'
        name='Payments'
        icon='hugeicons:credit-card'
      />
    ),
  },
  {
    key: '6',
    label: (
      <DropdownLabel link='/logout' name='Logout' icon='hugeicons:logout-02' />
    ),
    danger: true,
  },
];

const adminDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <DropdownLabel
        link='/dashboard'
        name='Dashboard'
        icon='hugeicons:dashboard-speed-02'
      />
    ),
  },
  {
    key: '2',
    label: (
      <DropdownLabel link='/logout' name='Logout' icon='hugeicons:logout-02' />
    ),
    danger: true,
  },
];

const translatorDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <DropdownLabel
        link='/dashboard/translator'
        name='Dashboard'
        icon='hugeicons:dashboard'
      />
    ),
  },
  {
    key: '2',
    label: (
      <DropdownLabel
        link='/dashboard/profile'
        name='Profile'
        icon='hugeicons:user'
      />
    ),
  },
  {
    key: '3',
    label: (
      <DropdownLabel link='/logout' name='Logout' icon='hugeicons:logout-02' />
    ),
    danger: true,
  },
];

type AvatarDropdownProps = {
  children: React.ReactNode;
  role: string;
};

const AvatarDropdown = ({ children, role }: AvatarDropdownProps) => {
  const items = {
    client: clientDropdownItems,
    admin: adminDropdownItems,
    translator: translatorDropdownItems,
  };
  return (
    <Dropdown
      menu={{ items: items[role as keyof typeof items] }}
      trigger={['click']}
      className='cursor-pointer'
    >
      {children}
    </Dropdown>
  );
};

export default AvatarDropdown;
