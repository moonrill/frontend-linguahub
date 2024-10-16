'use client';

import CardSkeleton from '#/components/CardSkeleton';
import Pagination from '#/components/Pagination';
import TranslatorCard from '#/components/TranslatorCard';
import TranslatorSearchBar from '#/components/TranslatorSearchBar';
import { translatorRepository } from '#/repository/translator';
import { Translator } from '#/types/TranslatorTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TranslatorPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sourceLanguage = searchParams?.get('sourceLanguage') || 'English';
  const targetLanguage = searchParams?.get('targetLanguage') || 'Indonesian';
  const sortBy = searchParams?.get('sortBy') || 'mostReviewed';
  const page = Number(searchParams?.get('page')) || 1;

  // State for managing current page and limit
  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(10); // Default limit is 10

  const { data: translators, isLoading } =
    translatorRepository.hooks.useSearchTranslatorByService(
      sourceLanguage,
      targetLanguage,
      sortBy,
      page,
      limit
    );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      `/translator?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}&sortBy=${sortBy}&page=${page}`
    );
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
    <div className='mt-6'>
      <TranslatorSearchBar
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        sortBy={sortBy}
      />
      <div className='mt-6 grid grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-6'>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : translators?.data?.length === 0 ? (
          <div>No translators found</div>
        ) : null}
        {translators?.data?.map((translator: Translator) => (
          <TranslatorCard key={translator.id} translator={translator} />
        ))}
      </div>
      <Pagination
        total={translators?.total}
        onChange={handlePageChange}
        current={currentPage}
        pageSize={limit}
      />
    </div>
  );
};

export default TranslatorPage;
