'use client';

import LanguageFlag from '#/components/LanguageFlag';
import LanguageModal from '#/components/Modal/LanguageModal';
import CustomTable from '#/components/Tables/CustomTable';
import { languagesRepository } from '#/repository/language';
import { Language } from '#/types/LanguageTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Input, TableProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const DashboardLanguage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const {
    data: listLanguages,
    isLoading,
    mutate,
  } = languagesRepository.hooks.useAllLanguages(10, page);

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/expertise/language?page=${page}`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Flag',
      dataIndex: 'flag',
      key: 'flag',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      render: (_, record) => <p className='uppercase'>{record.code}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <p>{record.name}</p>,
    },
    {
      title: 'Total Services',
      dataIndex: 'serviceCount',
      key: 'serviceCount',
      align: 'center',
      render: (_, record) => <p>{record.serviceCount}</p>,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.serviceCount - b.serviceCount,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const data = listLanguages?.data?.map((language: Language) => ({
    key: language.id,
    flag: <LanguageFlag language={language} />,
    action: (
      <div
        className='p-2 flex justify-center items-center hover:bg-zinc-200 w-fit cursor-pointer rounded-lg transition-all duration-500'
        onClick={() => handleEdit(language)}
      >
        <Icon
          icon={'hugeicons:pencil-edit-01'}
          className='text-2xl text-blue-600'
        />
      </div>
    ),
    ...language,
  }));

  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setIsModalOpen(true);
  };

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        {/* TODO: handle search */}
        <Input
          type='text'
          placeholder='Search...'
          prefix={
            <Icon
              icon={'iconamoon:search-light'}
              height={24}
              className='text-zinc-400'
            />
          }
          className='h-12 w-fit'
        />
        <Button
          type='primary'
          className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
          onClick={() => setIsModalOpen(true)}
        >
          Add new
          <Icon icon={'ph:plus'} className='text-xl' />
        </Button>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listLanguages?.limit}
        currentPage={listLanguages?.page}
        totalData={listLanguages?.total}
        totalPage={listLanguages?.totalPages}
        handlePageChange={handlePageChange}
      />
      <LanguageModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedLanguage(null);
        }}
        language={selectedLanguage}
        mutate={mutate}
      />
    </main>
  );
};

export default DashboardLanguage;
