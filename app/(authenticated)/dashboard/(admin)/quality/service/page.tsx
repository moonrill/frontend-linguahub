'use client';

import Image from 'next/image';
import LanguageFlag from '#/components/LanguageFlag';
import Pagination from '#/components/Pagination';
import StatusBadge from '#/components/StatusBadge';
import { serviceRepository } from '#/repository/service';
import { translatorRepository } from '#/repository/translator';
import { Service } from '#/types/ServiceTypes';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  message,
  Table,
  TableProps,
} from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AdminServicePages = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    data: listServices,
    isLoading,
    error,
    mutate,
  } = serviceRepository.hooks.useTranslatorServices(page, 10);

  const { data: listLanguages } = translatorRepository.hooks.useGetTranslatorLanguages();

  const columns: TableProps['columns'] = [
    {
      title: 'Translator',
      dataIndex: 'translator',
      key: 'translator',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={record?.translator?.translatorDetail?.profilePicture || '/images/avatar-placeholder.png'}
              alt='translator-profile-picture'
              fill
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <div className='flex flex-col'>
            <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>{record?.translator?.translatorDetail?.fullName || 'N/A'}</p>
            <p className='font-semibold text-xs 2xl:text-sm line-clamp-1'>{record?.translator?.translatorDetail?.email || 'N/A'}</p>
          </div>
        </div>
      ),
      sorter: (a, b) => {
        const nameA = a.translator?.translatorDetail?.fullName || '';
        const nameB = b.translator?.translatorDetail?.fullName || '';
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      minWidth: 200,
      render: (text) => <p className='font-medium'>{text}</p>,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Source',
      dataIndex: 'sourceLanguage',
      key: 'sourceLanguage',
      minWidth: 200,
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <LanguageFlag language={record.sourceLanguage} />
          <span>{record.sourceLanguage.name}</span>
        </div>
      ),
    },
    {
      title: 'Target',
      dataIndex: 'targetLanguage',
      key: 'targetLanguage',
      minWidth: 200,
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
      align: 'right',
      minWidth: 150,
      render: (text) => (
        <p className='font-semibold'>Rp{text.toLocaleString('id-ID')}</p>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
  ];

  const toggleStatus = async (id: string) => {
    try {
      await serviceRepository.api.toggleStatus(id);
      mutate(); // Re-fetch the data
      message.success('Service status updated successfully');
    } catch (error: any) {
      message.error(error.response?.body?.message || 'Error toggling service', 5);
    }
  };

  const actionDropdownItem = (service: Service) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div className='flex items-center'>
            <Icon icon={'hugeicons:pencil-edit-01'} className='text-lg 2xl:text-xl' />
            <span className='ml-2 text-xs 2xl:text-sm'>Edit</span>
          </div>
        ),
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

    return items;
  };

  const filteredData = listServices?.data?.filter((service: Service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filteredData?.map((service: any) => ({
    key: service.id,
    ...service,
    action: (
      <Dropdown
        trigger={['click']}
        menu={{
          items: actionDropdownItem(service),
        }}
      >
        <Icon
          icon={'tabler:dots'}
          className='text-gray-500 text-2xl cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500'
        />
      </Dropdown>
    ),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/service?page=${page}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching services:", error);
    return <p>Error loading services. Please try again later.</p>;
  }

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<Icon icon={'iconamoon:search-light'} height={24} className='text-zinc-400' />}
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
              <span className='font-bold'>{listServices?.page}</span> of {listServices?.totalPages} from {listServices?.total} results
            </p>
            <Pagination
              current={listServices?.page}
              total={listServices?.total}
              pageSize={listServices?.limit}
              onChange={handlePageChange}
            />
          </div>
        )}
      />
    </main>
  );
};

export default AdminServicePages;
