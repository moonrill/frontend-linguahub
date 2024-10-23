import { Icon } from '@iconify-icon/react';
import { MenuProps } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type DropdownLabelProps = {
  link: string;
  name: string;
  icon: string;
  onClick?: () => void; // Tambahkan onClick optional
};

export const DropdownLabel = ({
  link,
  name,
  icon,
  onClick,
}: DropdownLabelProps) => (
  <Link href={link} className='flex items-center gap-1.5' onClick={onClick}>
    <Icon icon={icon} className='text-xl' />
    {name}
  </Link>
);

const clientDropdownItems = (handleLogout: () => void): MenuProps['items'] => [
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
        link='/profile/coupon'
        name='Coupon'
        icon='hugeicons:coupon-percent'
      />
    ),
  },
  {
    key: '3',
    label: (
      <DropdownLabel
        link='/profile/service-request'
        name='Service Request'
        icon='hugeicons:mail-01'
      />
    ),
  },
  {
    key: '4',
    label: (
      <DropdownLabel
        link='/profile/booking'
        name='Booking'
        icon='hugeicons:customer-service-01'
      />
    ),
  },
  {
    key: '5',
    label: (
      <DropdownLabel
        link='/profile/payment'
        name='Payment'
        icon='hugeicons:credit-card'
      />
    ),
  },
  {
    key: '6',
    label: (
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='hugeicons:logout-02'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
  },
];

const adminDropdownItems = (handleLogout: () => void): MenuProps['items'] => [
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
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='hugeicons:logout-02'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
  },
];

const translatorDropdownItems = (
  handleLogout: () => void
): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <DropdownLabel
        link='/dashboard/translator'
        name='Dashboard'
        icon='hugeicons:dashboard-speed-02'
      />
    ),
  },
  {
    key: '2',
    label: (
      <DropdownLabel
        link='/dashboard/translator/profile'
        name='Profile'
        icon='hugeicons:user'
      />
    ),
  },
  {
    key: '3',
    label: (
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='hugeicons:logout-02'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
  },
];

type AvatarDropdownProps = {
  children: React.ReactNode;
  role: string;
};

const AvatarDropdown = ({ children, role }: AvatarDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      localStorage.clear();
      router.push('/login');
    } else {
      // Optionally handle error here
    }
  };

  const items = {
    client: clientDropdownItems(handleLogout),
    admin: adminDropdownItems(handleLogout),
    translator: translatorDropdownItems(handleLogout),
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
