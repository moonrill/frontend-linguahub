import { specializationRepository } from '#/repository/specialization';
import Link from 'next/link';
import SpecializationCard from './SpecializationCard';

const SpecializationSection = () => {
  const { data: specializations, isLoading } =
    specializationRepository.hooks.useAllSpecializations(5, 1);

  return (
    <section className='mt-36'>
      <div className='flex justify-between items-end'>
        <h2 className='text-[28px] 2xl:text-4xl font-bold text-blue-950'>
          Explore by Specialization
        </h2>
        <Link
          href={'/specialization'}
          className='text-sm 2xl:text-lg text-blue-600 font-medium'
        >
          View All
        </Link>
      </div>

      <div className='grid grid-cols-5 gap-4 2xl:gap-6 mt-6 2xl:mt-8'>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          specializations.data.map((s: any) => (
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
