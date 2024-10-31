'use client';

import LanguageFlag from '#/components/LanguageFlag';
import Pagination from '#/components/Pagination';
import { imgProfilePicture } from '#/constants/general';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, Table, TableProps, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const { data: listTranslators, isLoading } =
    translatorRepository.hooks.useGetTranslators(page);

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={
                record?.user?.userDetail.profilePicture
                  ? imgProfilePicture(record?.user?.userDetail.profilePicture)
                  : '/images/avatar-placeholder.png'
              }
              alt={'translator-profile-picture'}
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>
            {record?.user?.userDetail?.fullName}
          </p>
        </div>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) =>
        a.user.userDetail.fullName.localeCompare(b.user.userDetail.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => (
        <p className='font-semibold text-gray-500 text-xs 2xl:text-sm line-clamp-1'>
          {record?.user?.email}
        </p>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <div className='flex items-center gap-1 text-xs 2xl:text-sm'>
          <Icon
            icon={
              record?.user?.userDetail?.gender === 'male'
                ? 'mdi:gender-male'
                : 'mdi:gender-female'
            }
            width={20}
            height={20}
            className='text-zinc-400'
          />
          <p>{capitalizeFirstLetter(record?.user?.userDetail?.gender)}</p>
        </div>
      ),
    },
    {
      title: 'Years of experience',
      dataIndex: 'yearsOfExperience',
      key: 'yearsOfExperience',
      align: 'right',
      render: (_, record) => (
        <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>
          {record?.yearsOfExperience} Years
        </p>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.yearsOfExperience - b.yearsOfExperience,
    },
    {
      title: 'Portfolio',
      dataIndex: 'portfolio',
      key: 'portfolio',
      render: (_, record) => (
        <Link href={record?.portfolioLink}>
          <Tag
            color='blue'
            className='text-xs 2xl:text-sm font-medium border-none px-2 py-0.5 hover:bg-blue-100 rounded-lg flex items-center gap-2 w-fit'
          >
            See Portfolio
            <Icon icon={'akar-icons:link-out'} />
          </Tag>
        </Link>
      ),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: (_, record) => (
        <div className='flex gap-1 2xl:gap-2'>
          {record?.languages
            ?.slice(0, 3)
            .map((language: Language, index: number) => (
              <LanguageFlag key={index} language={language} />
            ))}
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (_, record) => (
        <div className='flex gap-2 items-center'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>
            {record?.rating}
          </p>
        </div>
      ),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  const data = listTranslators?.data?.map((register: Translator) => ({
    key: register.id,
    ...register,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/account/translator?page=${page}`);
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
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 768 }}
        rowClassName={'cursor-pointer'}
        onRow={(row) => ({
          onClick: () => {
            router.push(`/dashboard/account/translator/${row.key}`);
          },
        })}
        loading={isLoading}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{listTranslators?.page}</span> of{' '}
              {listTranslators?.totalPages} from {listTranslators?.total} result
            </p>
            <Pagination
              current={listTranslators?.page}
              total={listTranslators?.total}
              pageSize={listTranslators?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default TranslatorAccount;
