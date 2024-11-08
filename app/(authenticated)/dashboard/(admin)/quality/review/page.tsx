'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { reviewRepository } from '#/repository/review';
import { imgProfilePicture } from '#/constants/general';
import { Input, TableProps } from 'antd';
import { Icon } from '@iconify-icon/react';
import Image from 'next/image';
import CustomTable from '#/components/Tables/CustomTable';
import React, { useState } from 'react';
import { Review } from '#/types/TranslatorTypes';
import dayjs from 'dayjs';

const AdminReviewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: reviews, isLoading, error } = reviewRepository.hooks.useGetTranslatorReviews(10, page);

  if (error) return <div>Error loading data: {error.message}</div>;

  const filteredData = reviews?.data?.filter((review: Review) => {
    const clientName = review.user?.userDetail?.fullName?.toLowerCase();
    return clientName && clientName.includes(searchTerm.toLowerCase());
  }) || [];

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={record.user?.userDetail?.profilePicture ? imgProfilePicture(record.user.userDetail.profilePicture) : '/images/avatar-placeholder.png'}
              alt='client-profile-picture'
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>{record.user.userDetail.fullName}</p>
        </div>
      ),
    },
    {
      title: 'Translator',
      dataIndex: 'translator',
      key: 'translator',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={record.translator?.user?.userDetail?.profilePicture ? imgProfilePicture(record.translator.user.userDetail.profilePicture) : '/images/avatar-placeholder.png'}
              alt='translator-profile-picture'
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>{record.translator.user.userDetail.fullName}</p>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.createdAt).format('DD MMMM YYYY, HH:mm')}
        </p>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
        <div className='flex flex-col gap-2'>
          <p className='text-xs 2xl:text-sm line-clamp-2'>{record.comment ? record.comment : '-'} </p>
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (rating: number) => (
        <p className='text-xs 2xl:text-sm'>{rating ? `${rating} ` : 'N/A'}</p>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/quality/review?page=${page}`);
  };

  const data = filteredData.map((review: Review) => ({
    key: review.id,
    ...review,
  })) || [];

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<Icon icon='iconamoon:search-light' height={24} className='text-zinc-400' />}
          className='h-12 w-fit'
        />
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={reviews?.limit}
        currentPage={reviews?.page}
        totalData={reviews?.total}
        totalPage={reviews?.totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default AdminReviewPage;
