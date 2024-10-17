'use client';
import CardSkeleton from '#/components/CardSkeleton';
import Pagination from '#/components/Pagination';
import TranslatorCard from '#/components/TranslatorCard';
import { imgSpecialization } from '#/constants/general';
import { specializationRepository } from '#/repository/specialization';
import { Specialization } from '#/types/SpecializationTypes';
import { Translator } from '#/types/TranslatorTypes';
import { Button, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Specializations = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get specialization name and page from the URL
  const name = searchParams?.get('name') || 'general';
  const page = Number(searchParams?.get('page')) || 1;

  // State for managing current page and limit
  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(10);

  // Fetch all specializations
  const { data: specializations, isLoading } =
    specializationRepository.hooks.useAllSpecializations(15, 1);

  // Fetch specialization details and translators for current page
  const { data: specialization, isLoading: loadingSpecialization } =
    specializationRepository.hooks.useSpecialization(name, limit, currentPage);

  const handleClick = (key: string) => {
    setCurrentPage(1);
    router.push(`/specialization?name=${key}&page=1`);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/specialization?name=${name}&page=${page}`);
  };

  // Effect to update limit based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setLimit(12);
      } else {
        setLimit(15);
      }
    };

    // Call once to set initial limit
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className='min-h-screen mt-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-medium text-xl 2xl:text-2xl'>
          Search Translator by Their Specialization
        </h1>
        <div className='flex flex-wrap gap-4'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Skeleton.Button active size='large' className='rounded-lg' />
                </div>
              ))
            : specializations?.data?.map((s: Specialization) => (
                <Button
                  type='default'
                  onClick={() => handleClick(s.name)}
                  key={s.id}
                  className={`shadow-none h-fit border-zinc-300 rounded-lg font-medium py-2.5 px-6 hover:!text-white hover:border-blue-600 hover:!bg-blue-600 group ${
                    name === s.name
                      ? 'bg-blue-600 text-white border-none'
                      : 'bg-white'
                  }`}
                >
                  <div className='relative w-6 h-6 2xl:w-8 2xl:h-8'>
                    <Image
                      src={imgSpecialization(s.logo)}
                      alt='Specialization logo'
                      fill
                      sizes='(max-width: 40px)'
                      className={`object-cover group-hover:filter group-hover:invert ${
                        name === s.name && 'filter invert'
                      }`}
                    />
                  </div>
                  {s.name}
                </Button>
              ))}
        </div>
        <div className='grid grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-6'>
          {loadingSpecialization
            ? Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : specialization?.data?.translators.map(
                (translator: Translator) => (
                  <TranslatorCard translator={translator} key={translator.id} />
                )
              )}
        </div>
        {!isLoading && (
          <Pagination
            total={specialization?.total}
            onChange={handlePageChange}
            current={currentPage}
            pageSize={limit}
          />
        )}
      </div>
    </div>
  );
};

export default Specializations;