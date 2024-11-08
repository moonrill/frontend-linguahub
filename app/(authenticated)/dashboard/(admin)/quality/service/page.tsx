'use client';

import StatusBadge from '#/components/StatusBadge';
import LanguageFlag from '#/components/LanguageFlag';
import CustomTable from '#/components/Tables/CustomTable';
import { imgProfileTranslator } from '#/constants/general';
import { serviceRepository } from '#/repository/service';
import { Service } from '#/types/ServiceTypes';
import { Icon } from '@iconify-icon/react';
import { Input, Dropdown, TableProps, Tooltip, message } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { MenuItemType } from 'antd/es/menu/interface';
import { useState } from 'react';

const AdminService = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;

  const { data: listServices, isLoading, mutate } = serviceRepository.hooks.useGetAllServices(page, 10, statusParam);

  const toggleStatus = async (id: string) => {
    try {
      await serviceRepository.api.toggleStatus(id);
      mutate();
      message.success('Service status updated successfully');
    } catch (error: any) {
      message.error(error.response?.body?.message || 'Error toggling service status', 5);
    }
  };

  const actionDropdownItem = (service: Service) => [
    {
      key: '1',
      label: (
        <div className='flex items-center'>
          <Icon icon={'hugeicons:pencil-edit-01'} className='text-lg 2xl:text-xl' />
          <span className='ml-2 text-xs 2xl:text-sm'>Edit</span>
        </div>
      ),
      onClick: () => {
        // Define the edit action here
      },
    },
    {
      key: '2',
      label: (
        <div className='flex items-center'>
          <Icon
            icon={'tabler:circle-filled'}
            className={`text-lg 2xl:text-xl ${service.status !== 'Active' ? 'text-green-500' : 'text-rose-500'}`}
          />
          <span className='ml-2 text-xs 2xl:text-sm'>
            {service.status !== 'Active' ? 'Activate' : 'Deactivate'}
          </span>
        </div>
      ),
      onClick: () => toggleStatus(service.id),
    },
  ];

  const columns: TableProps['columns'] = [
    {
      title: 'Translator',
      dataIndex: 'translator',
      key: 'translator',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={
                record?.translator?.user?.userDetail?.profilePicture
                  ? imgProfileTranslator(record?.translator?.user?.userDetail?.profilePicture)
                  : '/images/avatar-placeholder.png'
              }
              fill
              alt='translator-profile-picture'
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <p className='font-semibold text-xs 2xl:text-sm'>{record?.translator?.user?.userDetail?.fullName || 'N/A'}</p>
        </div>
      ),
    },
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p className='font-medium'>{text}</p>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Source Language',
      dataIndex: 'sourceLanguage',
      key: 'sourceLanguage',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <LanguageFlag language={record.sourceLanguage} />
          <span>{record.sourceLanguage.name}</span>
        </div>
      ),
    },
    {
      title: 'Target Language',
      dataIndex: 'targetLanguage',
      key: 'targetLanguage',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <LanguageFlag language={record.targetLanguage} />
          <span>{record.targetLanguage.name}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (text) => (
        <div className='w-fit m-auto'>
          <StatusBadge text={text} status={text} />
        </div>
      ),
    },
    {
      title: 'Price per hour',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      render: (text) => <p className='font-semibold'>Rp{text.toLocaleString('id-ID')}</p>,
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
  ];

  const data = listServices?.data?.map((service: Service) => ({
    key: service.id,
    ...service,
  }));

  const statusOptions: MenuItemType[] = [
    { key: 'all', label: 'All' },
    { key: 'Active', label: 'Active' },
    { key: 'Inactive', label: 'Inactive' },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/quality/service?page=${page}`);
  };

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Input
          type='text'
          placeholder='Search...'
          prefix={<Icon icon={'iconamoon:search-light'} height={24} className='text-zinc-400' />}
          className='h-12 w-fit'
        />
        <Dropdown
          menu={{
            items: statusOptions,
            selectable: true,
            onClick: ({ key }) => router.push(`/dashboard/quality/service?status=${key}&page=${page}`),
            selectedKeys: [status],
          }}
          trigger={['click']}
          className='cursor-pointer h-12 bg-zinc-100 px-4 py-2 rounded-xl text-sm 2xl:text-base text-zinc-500 font-medium hover:bg-zinc-200 transition-all duration-500'
          placement='bottomRight'
        >
          <div className='flex items-center justify-between gap-4'>
            <p>Status</p>
            <Icon icon='weui:arrow-outlined' height={24} className='rotate-90' />
          </div>
        </Dropdown>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listServices?.limit}
        currentPage={listServices?.page}
        totalData={listServices?.total}
        totalPage={listServices?.totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default AdminService;
