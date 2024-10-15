import ImageSlider from '#/components/ImageSlider';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen p-6 md:p-8 gap-8 bg-white'>
      {/* Left side */}
      <div className='w-[756px] flex flex-col'>
        <nav className='flex justify-between items-center 2xl:mb-8'>
          <Link href={'/'}>
            <div className='w-[118px] h-[28px] md:w-[177px] md:h-[43px] relative'>
              <Image
                src={'/images/logo.png'}
                alt={'logo'}
                className='object-cover'
                fill
                sizes='(max-width: 177px)'
              />
            </div>
          </Link>

          <div className='flex gap-7'>
            <Link
              href={'/'}
              className='font-medium text-blue-600 text-sm md:text-base'
            >
              Home
            </Link>
            <Link
              href={'/'}
              className='font-medium text-blue-600 text-sm md:text-base'
            >
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

export default Layout;
