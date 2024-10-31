'use client';

import LanguageFlag from '#/components/LanguageFlag';
import LanguageModal from '#/components/Modal/LanguageModal';
import Pagination from '#/components/Pagination';
import { languagesRepository } from '#/repository/language';
import { Language } from '#/types/LanguageTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Input, Table, TableProps } from 'antd';
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'right',
    },
  ];

  const data = listLanguages?.data?.map((language: Language) => ({
    key: language.id,
    flag: <LanguageFlag language={language} />,
    action: (
      <div
        className='px-2 py-1 hover:bg-zinc-200 w-fit cursor-pointer rounded-lg transition-all duration-500 ml-auto'
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 768 }}
        loading={isLoading}
        style={{ backgroundColor: 'unset' }}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{listLanguages?.page}</span> of{' '}
              {listLanguages?.totalPages} from {listLanguages?.total} result
            </p>
            <Pagination
              current={listLanguages?.page}
              total={listLanguages?.total}
              pageSize={listLanguages?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
      <LanguageModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        language={selectedLanguage}
        mutate={mutate}
      />
    </main>
  );
};

export default DashboardLanguage;
