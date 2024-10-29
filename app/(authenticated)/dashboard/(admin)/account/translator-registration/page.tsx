'use client';

import LanguageFlag from '#/components/LanguageFlag';
import Pagination from '#/components/Pagination';
import StatusBadge from '#/components/StatusBadge';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, Segmented, Table, TableProps, Tag } from 'antd';
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
      render: (_, record) => (
        <p className='font-semibold text-sm line-clamp-1'>
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
      render: (_, record) => (
        <p className='font-semibold text-gray-500 text-sm line-clamp-1'>
          {record?.user?.email}
        </p>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => (
        <div className='flex items-center gap-1 text-sm'>
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
      render: (_, record) => (
        <p className='font-semibold text-sm line-clamp-1'>
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
      align: 'center',
      width: 150,
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
      render: (_, record) => (
        <Link href={record?.portfolioLink}>
          <Tag
            color='blue'
            className='text-xs 2xl:text-base font-medium border-none px-2 py-0.5 hover:bg-blue-100 rounded-lg flex items-center gap-2 w-fit'
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
      title: 'Application Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <p className='font-semibold text-sm line-clamp-1'>
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
              <span className='font-bold'>{listRegisters?.page}</span> of{' '}
              {listRegisters?.totalPages} from {listRegisters?.total} result
            </p>
            <Pagination
              current={listRegisters?.page}
              total={listRegisters?.total}
              pageSize={listRegisters?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default TranslatorRegistration;
