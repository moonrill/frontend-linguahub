import { Payload } from '#/types/UserType';
import { Avatar } from 'antd';
import { Header } from 'antd/es/layout/layout';

interface HeaderComponentProps {
  title: string;
  user: Payload | null;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, user }) => {
  return (
    <Header style={{ padding: 0, margin: 0 }}>
      <div className='flex items-center justify-between'>
        <h1 className='mb-0 text-4xl text-blue-950 font-semibold'>{title}</h1>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-end'>
            <p className='text-base font-semibold m-0'>
              {user?.fullName || user?.email}
            </p>
            <p className='text-xs font-semibold text-zinc-400 m-0'>
              {user?.role ? capitalizeFirstLetter(user.role) : 'Loading...'}
            </p>
          </div>
          <div
            className='flex items-center p-[2px] rounded-full'
            style={{ border: '2px solid #2563eb' }}
          >
            <Avatar className='w-10 h-10 2xl:w-12 2xl:h-12'>
              {user?.fullName?.charAt(0).toUpperCase() ||
                user?.email.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
