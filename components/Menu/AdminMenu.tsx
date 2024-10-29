import { Icon } from '@iconify-icon/react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const adminItems = [
  {
    key: '/dashboard',
    label: <Link href={'/dashboard'}>Dashboard</Link>,
    icon: <Icon icon='streamline:dashboard-circle' height={24} />,
  },
  {
    key: '/dashboard/account',
    label: 'Account',
    icon: <Icon icon='ph:users' height={24} />,
    children: [
      {
        key: '/dashboard/account/client',
        label: <Link href={'/dashboard/account/client'}>Client</Link>,
      },
      {
        key: '/dashboard/account/translator',
        label: <Link href={'/dashboard/account/translator'}>Translator</Link>,
      },
      {
        key: '/dashboard/account/translator-registration',
        label: (
          <Link href={'/dashboard/account/translator-registration'}>
            Translator Registration
          </Link>
        ),
      },
    ],
  },
  {
    key: '/dashboard/expertise',
    label: 'Expertise',
    icon: (
      <Icon
        icon='streamline:industry-innovation-and-infrastructure'
        height={24}
      />
    ),
    children: [
      {
        key: '/dashboard/expertise/language',
        label: <Link href={'/dashboard/expertise/language'}>Language</Link>,
      },
      {
        key: '/dashboard/expertise/specialization',
        label: (
          <Link href={'/dashboard/expertise/specialization'}>
            Specialization
          </Link>
        ),
      },
    ],
  },
  {
    key: '/dashboard/transaction',
    label: 'Transaction',
    icon: <Icon icon='proicons:credit-card' height={24} />,
    children: [
      {
        key: '/dashboard/transaction/service-request',
        label: (
          <Link href={'/dashboard/transaction/service-request'}>
            Service Request
          </Link>
        ),
      },
      {
        key: '/dashboard/transaction/booking',
        label: <Link href={'/dashboard/transaction/booking'}>Booking</Link>,
      },
      {
        key: '/dashboard/transaction/payment',
        label: <Link href={'/dashboard/transaction/payment'}>Payment</Link>,
      },
    ],
  },
  {
    key: '/dashboard/promotion',
    label: 'Promotion',
    icon: <Icon icon='carbon:bullhorn' height={24} />,
    children: [
      {
        key: '/dashboard/promotion/event',
        label: <Link href={'/dashboard/promotion/event'}>Event</Link>,
      },
      {
        key: '/dashboard/promotion/coupon',
        label: <Link href={'/dashboard/promotion/coupon'}>Coupon</Link>,
      },
    ],
  },
  {
    key: '/dashboard/quality',
    label: 'Quality',
    icon: <Icon icon='bi:person-gear' height={24} />,
    children: [
      {
        key: '/dashboard/quality/service',
        label: <Link href={'/dashboard/quality/service'}>Service</Link>,
      },
      {
        key: '/dashboard/quality/review',
        label: <Link href={'/dashboard/quality/review'}>Review</Link>,
      },
    ],
  },
];

const AdminMenu = () => {
  const pathname = usePathname();

  const selectedKey = adminItems
    .flatMap((item) =>
      item?.children ? item.children.map((child) => child.key) : item.key
    )
    .filter((key) => pathname && pathname.endsWith(key));

  return (
    <Menu
      mode='inline'
      theme='light'
      selectedKeys={selectedKey}
      style={{ borderRight: 0 }}
      items={adminItems}
      className='flex flex-col gap-[10px] h-fit'
    />
  );
};

export default AdminMenu;
