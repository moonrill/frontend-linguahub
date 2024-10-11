import AdminMenu from '#/components/Menu/AdminMenu';
import TranslatorMenu from '#/components/Menu/TranslatorMenu';
import { User } from '#/types/UserType';
import { Icon } from '@iconify-icon/react';
import { Button, Layout } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Sider } = Layout;

interface SidebarComponentProps {
  user: User | null;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state for logout

  const handleLogout = async () => {
    setLoading(true); // Start loading when the logout process starts
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      localStorage.clear();
      router.push('/login');
    } else {
      // Optionally handle error here
    }

    setLoading(false); // Stop loading after the process completes
  };

  return (
    <div className='relative w-[280px]'>
      <Sider
        width={280}
        className='rounded-3xl p-6 bg-white fixed dashboard-sidebar w-full flex-grow'
        style={{
          height: 'calc(100vh - 48px)',
          width: '100%',
        }}
      >
        <div>
          <div className='w-[177px] h-[43px] xl:w-[120px] xl:h-[30px] relative mb-16'>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              className='object-cover'
              fill
              sizes='(max-width: 177px)'
              priority
            />
          </div>

          {user?.role === 'admin' ? <AdminMenu /> : <TranslatorMenu />}
        </div>
        <Button
          className='w-full flex justify-start h-[56px] px-4 rounded-[0.75rem]'
          type='primary'
          danger
          onClick={handleLogout}
          loading={loading} // Show loading spinner when logging out
          disabled={loading}
        >
          {loading ? (
            'Logging out...'
          ) : (
            <div className='flex items-center gap-2'>
              <Icon icon='mdi:logout' height={24} /> Logout
            </div>
          )}
        </Button>
      </Sider>
    </div>
  );
};

export default SidebarComponent;
