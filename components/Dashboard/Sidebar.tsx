import AdminMenu from '#/components/Menu/AdminMenu';
import TranslatorMenu from '#/components/Menu/TranslatorMenu';
import { TokenUtil } from '#/utils/token';
import { Icon } from '@iconify-icon/react';
import { Button, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Sider } = Layout;

interface SidebarComponentProps {
  role: string | undefined;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ role }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        TokenUtil.clearAccessToken();
        TokenUtil.persistToken();
        window.location.href = '/login';
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className='relative w-[280px]'>
      <Sider
        width={280}
        className='rounded-3xl fixed p-6 bg-white dashboard-sidebar w-full'
        style={{
          height: 'calc(100vh - 48px)',
          width: '100%',
        }}
      >
        {/* Logo section */}
        <div className='mb-8'>
          <Link href={'/'}>
            <div className='w-[177px] h-[43px] xl:w-[130px] xl:h-[30px] relative'>
              <Image
                src={'/images/logo.png'}
                alt={'logo'}
                className='object-cover'
                fill
                sizes='(max-width: 177px)'
                priority
              />
            </div>
          </Link>
        </div>

        {/* Scrollable menu section */}
        <div
          className='overflow-y-auto'
          style={{
            height: 'calc(100% - 180px)', // Adjust based on logo + logout button + padding
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 #f1f1f1',
          }}
        >
          {/* Custom scrollbar styling */}
          <style jsx global>{`
            .overflow-y-auto::-webkit-scrollbar {
              width: 6px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 3px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>

          {role === 'admin' ? <AdminMenu /> : <TranslatorMenu />}
        </div>

        {/* Logout button - absolute positioned at bottom */}
        <div className='absolute bottom-6 left-6 right-6'>
          <Button
            className='w-full flex justify-start h-[56px] px-3.5 rounded-[0.75rem]'
            type='primary'
            danger
            onClick={handleLogout}
            loading={loading}
            disabled={loading}
          >
            {loading ? (
              'Logging out...'
            ) : (
              <div className='flex items-center gap-2.5'>
                <Icon icon='solar:logout-2-outline' height={24} /> Logout
              </div>
            )}
          </Button>
        </div>
      </Sider>
    </div>
  );
};

export default SidebarComponent;
