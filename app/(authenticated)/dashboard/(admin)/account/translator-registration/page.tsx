'use client';

import LanguageFlag from '#/components/LanguageFlag';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, Segmented, TableProps, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorRegistration = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);
  const status = searchParams?.get('status') || 'Pending';

  const { data: listRegisters, isLoading } =
    translatorRepository.hooks.useGetRegistrations(
      page,
      10,
      status.toLowerCase()
    );

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      fixed: 'left',
      render: (_, record) => (
        <p className='font-semibold text-xs 2xl:text-sm'>
          {record?.user?.userDetail?.fullName}
        </p>
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      render: (_, record) => (
        <div className='w-fit m-auto'>
          <StatusBadge
            text={capitalizeFirstLetter(record?.status)}
            status={record?.status}
          />
        </div>
      ),
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
      title: 'Application Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      render: (_, record) => (
        <p className='font-semibold text-xs 2xl:text-sm'>
          {dayjs(record?.createdAt).format('DD MMMM YYYY, HH:mm')}
        </p>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => dayjs(a?.createdAt).unix() - dayjs(b?.createdAt).unix(),
    },
  ];

  const data = listRegisters?.data?.map((register: Translator) => ({
    key: register.id,
    ...register,
  }));

  const handlePageChange = (page: number) => {
    router.push(
      `/dashboard/account/translator-registration?page=${page}&status=${status}`
    );
  };

  const statusItems = ['Pending', 'Approved', 'Rejected'];
  const onChange = (e: any) => {
    router.push(`/dashboard/account/translator-registration?status=${e}`);
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
        <Segmented
          options={statusItems}
          onChange={onChange}
          defaultValue={status}
        />
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listRegisters?.limit}
        currentPage={listRegisters?.page}
        totalData={listRegisters?.total}
        totalPage={listRegisters?.totalPages}
        handlePageChange={handlePageChange}
        onClick={({ id }) => router.push(`/dashboard/account/translator/${id}`)}
      />
    </main>
  );
};

export default TranslatorRegistration;
