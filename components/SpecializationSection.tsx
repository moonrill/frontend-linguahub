import { specializationRepository } from '#/repository/specialization';
import { Skeleton } from 'antd';
import Link from 'next/link';
import SpecializationCard from './SpecializationCard';

const SpecializationSection = () => {
  const { data: specializations, isLoading } =
    specializationRepository.hooks.useAllSpecializations(5, 1);

  return (
    <section className='mt-36'>
      <div className='flex justify-between items-end'>
        <h1
          className='text-[28px] 2xl:text-4xl font-bold text-blue-950'
          data-aos='fade-right'
        >
          Explore by Specialization
        </h1>
        <Link
          href={'/specialization'}
          className='text-sm 2xl:text-lg text-blue-600 font-medium'
          data-aos='fade-left'
        >
          View All
        </Link>
      </div>

      <div className='grid grid-cols-5 gap-4 2xl:gap-6 mt-4 2xl:mt-8'>
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton.Node
                active
                className='!w-full !h-[180px] 2xl:!h-[240px] !rounded-3xl 2xl:!rounded-4xl'
                key={index}
              ></Skeleton.Node>
            ))}
          </>
        ) : (
          specializations?.data?.map((s: any) => (
            <SpecializationCard
              key={s.id}
              name={s.name}
              logo={s.logo}
              href={`/specialization?name=${s.name}`}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SpecializationSection;
