import AdminMenu from '#/components/Menu/AdminMenu';
import TranslatorMenu from '#/components/Menu/TranslatorMenu';
import { Layout } from 'antd';
import Image from 'next/image';

const { Sider } = Layout;

interface SidebarComponentProps {
  role: 'admin' | 'translator';
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ role }) => {
  return (
    <div className='relative w-[280px]'>
      <Sider
        width={'280px'}
        className='rounded-3xl flex-1 p-6 bg-white fixed'
        style={{ height: 'calc(100vh - 48px)' }}
      >
        <div className='w-[118px] h-[28px] md:w-[177px] md:h-[43px] relative mb-16'>
          <Image
            src={'/images/logo.png'}
            alt={'logo'}
            className='object-cover'
            fill
            sizes='(max-width: 177px)'
          />
        </div>
        {role === 'admin' ? <AdminMenu /> : <TranslatorMenu />}
      </Sider>
    </div>
  );
};

export default SidebarComponent;
