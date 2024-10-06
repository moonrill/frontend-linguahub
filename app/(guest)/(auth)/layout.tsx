import ImageSlider from '#/components/ImageSlider';
import Image from 'next/image';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen p-8 gap-8 bg-white'>
      {/* Left side */}
      <div className='w-[756px] flex flex-col'>
        <nav className='flex justify-between items-center mb-8'>
          <div>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              width={177}
              height={43}
            />
          </div>

          <div className='flex gap-7'>
            <Link href={'/'} className='font-medium text-blue-600 text-base'>
              Home
            </Link>
            <Link href={'/'} className='font-medium text-blue-600 text-base'>
              Event
            </Link>
          </div>
        </nav>

        {/* Wrapper for children to take remaining height */}
        <div className='flex-grow overflow-hidden'>{children}</div>
      </div>

      {/* Right side */}
      <div className='w-3/5 relative lg:block hidden'>
        <div className='sticky top-8' style={{ height: 'calc(100vh - 64px)' }}>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
