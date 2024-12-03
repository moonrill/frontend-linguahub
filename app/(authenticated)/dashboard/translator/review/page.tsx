'use client';

import CustomTable from '#/components/Tables/CustomTable';
import { imgProfilePicture } from '#/constants/general';
import { reviewRepository } from '#/repository/review';
import { Review } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Dropdown, Input, TableProps, Tooltip } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorReviews = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const rating = searchParams?.get('rating') || '';

  const { data: listReviews, isLoading } =
    reviewRepository.hooks.useGetTranslatorReviews(10, page, 'desc', rating);

  const ratingOptions: MenuItemType[] = [
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>5</p>
        </div>
      ),
      key: '5',
    },
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>4</p>
        </div>
      ),
      key: '4',
    },
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>3</p>
        </div>
      ),
      key: '3',
    },
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>2</p>
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-lg 2xl:text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>1</p>
        </div>
      ),
      key: '1',
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/review?page=${page}&rating=${rating}`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.createdAt).format('DD MMMM YYYY, HH:mm')}
        </p>
      ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <p className='text-xs 2xl:text-sm font-medium truncate max-w-[100px] 2xl:max-w-[150px]'>
            {text}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      ellipsis: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title='View Detail'>
          <Link
            href={`/dashboard/translator/booking/${record?.bookingId}`}
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

  const handleSelect = (key: string) => {
    router.push(`/dashboard/translator/review?rating=${key}&page=${page}`);
  };

  const data = listReviews?.data?.map((review: Review) => ({
    key: review.id,
    client: (
      <div className='flex gap-3 items-center'>
        <div className='relative w-[40px] h-[40px] hidden 2xl:block'>
          <Image
            src={
              review?.user?.userDetail.profilePicture
                ? imgProfilePicture(review?.user?.userDetail.profilePicture)
                : '/images/avatar-placeholder.png'
            }
            alt={'translator-profile-picture'}
            fill
            sizes='(max-width: 400px)'
            className='object-cover rounded-lg'
            priority
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='font-medium text-xs 2xl:text-sm line-clamp-1'>
            {review?.user?.userDetail?.fullName}
          </p>
          <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
            {review?.user?.email}
          </p>
        </div>
      </div>
    ),
    createdAt: review.createdAt,
    comment: (
      <Tooltip title={review.comment}>
        <p className='text-xs 2xl:text-sm truncate max-w-[150px] 2xl:max-w-[300px]'>
          {review.comment || '-'}
        </p>
      </Tooltip>
    ),
    rating: (
      <div className='flex items-center gap-2'>
        <Icon
          icon={'ant-design:star-filled'}
          className={'text-lg 2xl:text-2xl text-yellow-400'}
        />{' '}
        {review.rating}
      </div>
    ),
    bookingId: review?.booking?.id,
  }));

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
        <Dropdown
          menu={{
            items: ratingOptions,
            selectable: true,
            onClick: ({ key }) => handleSelect(key),
            selectedKeys: [rating],
          }}
          trigger={['click']}
          className='cursor-pointer h-12 bg-zinc-100 px-4 py-2 rounded-xl text-sm 2xl:text-base text-zinc-500 font-medium hover:bg-zinc-200 transition-all duration-500'
          placement='bottomRight'
        >
          <div className='flex items-center justify-between gap-4'>
            <p>Rating</p>
            <Icon
              icon='weui:arrow-outlined'
              height={24}
              className='rotate-90'
            />
          </div>
        </Dropdown>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listReviews?.limit}
        currentPage={listReviews?.page}
        totalData={listReviews?.total}
        totalPage={listReviews?.totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default TranslatorReviews;
