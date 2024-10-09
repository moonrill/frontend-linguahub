import { Avatar } from 'antd';

interface HeaderComponentProps {
  title: string;
  role: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, role }) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='mb-0 text-4xl text-blue-950 font-semibold'>{title}</h1>
      <div className='flex items-center justify-center gap-4'>
        <div className='flex flex-col items-end'>
          <p className='text-base m-0 font-semibold'>Kim Da Mi</p>
          <p className='text-xs font-semibold text-zinc-400 m-0 w-fit'>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </p>
        </div>
        <div
          className='flex items-center p-[2px] rounded-full'
          style={{ cursor: 'pointer', border: '2px solid #2563eb' }}
        >
          <Avatar className='w-12 h-12'>W</Avatar>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
