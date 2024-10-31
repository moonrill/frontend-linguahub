'use client';

import Pagination from '#/components/Pagination';
import { imgProfilePicture } from '#/constants/general';
import { userRepository } from '#/repository/user';
import { User } from '#/types/UserType';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const ClientAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const { data: listUsers, isLoading } =
    userRepository.hooks.useGetAllUsers(page);

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
                record?.userDetail.profilePicture
                  ? imgProfilePicture(record?.userDetail.profilePicture)
                  : '/images/avatar-placeholder.png'
              }
              alt={'translator-profile-picture'}
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <div>
            <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>
              {record?.userDetail?.fullName}
            </p>
            <p className='font-semibold text-gray-500 text-xs 2xl:text-sm line-clamp-1'>
              {record?.email}
            </p>
          </div>
        </div>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) =>
        a.user.userDetail.fullName.localeCompare(b.user.userDetail.fullName),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <div className='flex items-center gap-1 text-xs 2xl:text-sm'>
          <Icon
            icon={
              record?.userDetail?.gender === 'male'
                ? 'mdi:gender-male'
                : 'mdi:gender-female'
            }
            width={20}
            height={20}
            className='text-zinc-400'
          />
          <p>{capitalizeFirstLetter(record?.userDetail?.gender)}</p>
        </div>
      ),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 180,
      render: (_, record) => (
        <p className='font-medium text-xs 2xl:text-sm'>
          {dayjs(record?.userDetail?.dateOfBirth).format('DD MMMM YYYY')}
        </p>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) =>
        dayjs(a.userDetail.dateOfBirth).unix() -
        dayjs(b.userDetail.dateOfBirth).unix(),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <p className='font-semibold text-xs 2xl:text-sm'>
          {record?.userDetail?.phoneNumber}
        </p>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      minWidth: 200,
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm'>
          {record?.userDetail?.street}, {record?.userDetail?.subDistrict},{' '}
          {record?.userDetail?.city}, {record?.userDetail?.province}
        </p>
      ),
    },
    // {
    //   title: 'Created at',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    //   render: (_, record) => (
    //     <p className='font-semibold text-xs 2xl:text-sm'>
    //       {dayjs(record?.createdAt).format('DD MMMM YYYY')}
    //     </p>
    //   ),
    // },
  ];

  const data = listUsers?.data?.map((user: User) => ({
    key: user.id,
    ...user,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/account/user?page=${page}`);
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
        loading={isLoading}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{listUsers?.page}</span> of{' '}
              {listUsers?.totalPages} from {listUsers?.total} result
            </p>
            <Pagination
              current={listUsers?.page}
              total={listUsers?.total}
              pageSize={listUsers?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default ClientAccount;
