'use client';

import Pagination from '#/components/Pagination';
import { imgProfilePicture } from '#/constants/general';
import { reviewRepository } from '#/repository/review';
import { Review } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Dropdown, Input, Table, TableProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const TranslatorReviews = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;

  const defaultRatings = ['1', '2', '3', '4', '5'];
  const urlRatings = searchParams?.get('ratings')?.split(',') || defaultRatings;

  const { data: listReviews, isLoading } =
    reviewRepository.hooks.useGetTranslatorReviews(
      10,
      page,
      'desc',
      urlRatings.join(',')
    );

  const ratingOptions: MenuItemType[] = [
    {
      label: (
        <div className='flex gap-2'>
          <Icon
            icon={'ant-design:star-filled'}
            className='text-2xl text-yellow-400'
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
            className='text-2xl text-yellow-400'
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
            className='text-2xl text-yellow-400'
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
            className='text-2xl text-yellow-400'
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
            className='text-2xl text-yellow-400'
          />
          <p className={'font-medium'}>1</p>
        </div>
      ),
      key: '1',
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/review?page=${page}`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      minWidth: 250,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      minWidth: 250,
      align: 'center',
      sortDirections: ['descend', 'ascend'],
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
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      width: 100,
    },
  ];

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
          <p className='font-medium text-sm line-clamp-1'>
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
      <p className='text-xs 2xl:text-sm line-clamp-2'>
        {review.comment || '-'}
      </p>
    ),
    rating: review.rating,
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
            // onClick: ({ key }) => handleSelect(key),
            // selectedKeys: [status],
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 768 }}
        loading={isLoading}
        footer={() => (
          <div className='flex justify-between items-center'>
            <p className='text-xs 2xl:text-sm'>
              <span className='font-bold'>{listReviews?.page}</span> of{' '}
              {listReviews?.totalPages} from {listReviews?.total} result
            </p>
            <Pagination
              current={listReviews?.page}
              total={listReviews?.total}
              pageSize={listReviews?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default TranslatorReviews;
