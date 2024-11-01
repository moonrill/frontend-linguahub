import { Icon } from '@iconify-icon/react';
import { MenuProps, message } from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

const clientDropdownItems = (
  handleLogout: () => void,
  loading: boolean
): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <DropdownLabel link='/profile' name='Profile' icon='solar:user-linear' />
    ),
    disabled: loading,
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
    disabled: loading,
  },
  {
    key: '3',
    label: (
      <DropdownLabel
        link='/profile/service-request'
        name='Service Request'
        icon='proicons:mail'
      />
    ),
    disabled: loading,
  },
  {
    key: '4',
    label: (
      <DropdownLabel
        link='/profile/booking'
        name='Booking'
        icon='fluent:calendar-edit-32-regular'
      />
    ),
    disabled: loading,
  },
  {
    key: '5',
    label: (
      <DropdownLabel
        link='/profile/payment'
        name='Payment'
        icon='proicons:credit-card'
      />
    ),
    disabled: loading,
  },
  {
    key: '6',
    label: (
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='solar:logout-2-outline'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
    disabled: loading,
  },
];

const adminDropdownItems = (
  handleLogout: () => void,
  loading: boolean
): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <DropdownLabel
        link='/dashboard'
        name='Dashboard'
        icon='hugeicons:dashboard-speed-02'
      />
    ),
    disabled: loading,
  },
  {
    key: '2',
    label: (
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='solar:logout-2-outline'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
    disabled: loading,
  },
];

const translatorDropdownItems = (
  handleLogout: () => void,
  loading: boolean
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
    disabled: loading,
  },
  {
    key: '2',
    label: (
      <DropdownLabel
        link='/dashboard/translator/profile'
        name='Profile'
        icon='solar:user-linear'
      />
    ),
    disabled: loading,
  },
  {
    key: '3',
    label: (
      <DropdownLabel
        link='#' // Prevent default link behavior
        name='Logout'
        icon='solar:logout-2-outline'
        onClick={handleLogout} // Call handleLogout
      />
    ),
    danger: true,
    disabled: loading,
  },
];

type AvatarDropdownProps = {
  children: React.ReactNode;
  role: string;
};

const AvatarDropdown = ({ children, role }: AvatarDropdownProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.clear();
        router.push('/login');
      } else {
        // Optionally handle error here
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const items = {
    client: clientDropdownItems(handleLogout, loading),
    admin: adminDropdownItems(handleLogout, loading),
    translator: translatorDropdownItems(handleLogout, loading),
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
