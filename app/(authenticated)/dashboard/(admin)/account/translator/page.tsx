'use client';

import LanguageFlag from '#/components/LanguageFlag';
import CustomTable from '#/components/Tables/CustomTable';
import { imgProfilePicture } from '#/constants/general';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, TableProps, Tag, Tooltip } from 'antd';
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
      ellipsis: true,
      fixed: 'left',
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
          <p className='font-semibold text-xs 2xl:text-sm'>
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
      ellipsis: true,
      render: (_, record) => (
        <Tooltip title={record?.user?.email}>
          <p className='font-semibold text-gray-500 text-xs 2xl:text-sm truncate max-w-[100px] 2xl:max-w-[300px]'>
            {record?.user?.email}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      ellipsis: true,
      render: (_, record) => (
        <div className='flex items-center gap-1 text-xs 2xl:text-sm'>
          <p>{capitalizeFirstLetter(record?.user?.userDetail?.gender)}</p>
        </div>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'yearsOfExperience',
      key: 'yearsOfExperience',
      ellipsis: true,
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
      ellipsis: true,
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
      ellipsis: true,
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
      ellipsis: true,
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title='View Detail'>
          <Link
            href={`/dashboard/account/translator/${record?.key}`}
            className='text-gray-500 cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500 flex items-center justify-center w-fit'
          >
            <Icon
              icon={'solar:eye-linear'}
              className='text-xl 2xl:text-2xl text-blue-600'
            />
          </Link>
        </Tooltip>
      ),
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
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listTranslators?.limit}
        currentPage={listTranslators?.page}
        totalData={listTranslators?.total}
        totalPage={listTranslators?.totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default TranslatorAccount;
