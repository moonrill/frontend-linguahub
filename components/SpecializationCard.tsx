import { imgSpecialization } from '#/constants/general';
import { Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

type SpecializationCardProps = {
  name: string;
  logo: string;
  href: string;
};

const SpecializationCard = ({ name, logo, href }: SpecializationCardProps) => {
  return (
    <Link href={href} data-aos='flip-left' data-aos-duration='800'>
      <Card className='!rounded-3xl 2xl:!rounded-4xl group hover:bg-blue-600 transition-all duration-500 p-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border-none hover:shadow-[0px_40px_40px_-30px_#2563EB]'>
        <div className='flex flex-col justify-center items-center gap-4 2xl:gap-6'>
          <div className='rounded-full w-fit p-4 bg-gray-50 group-hover:bg-white group-hover:bg-opacity-25 flex items-center justify-center'>
            <div className='relative w-8 h-8 2xl:w-12 2xl:h-12'>
              <Image
                src={imgSpecialization(logo) || '/images/logo-sample.svg'}
                fill
                sizes='(max-width: 40px)'
                alt='Specialization logo'
                className='!text-blue-600 group-hover:filter group-hover:invert group-hover:opacity-90'
              />
            </div>
          </div>
          <h1 className='text-xl 2xl:text-2xl font-semibold text-blue-950 group-hover:text-white'>
            {name}
          </h1>
        </div>
      </Card>
    </Link>
  );
};

export default SpecializationCard;
