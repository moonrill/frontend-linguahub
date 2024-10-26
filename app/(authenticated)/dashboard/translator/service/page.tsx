'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ServiceModal from '#/components/Modal/ServiceModal';
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

const TranslatorService = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    data: listServices,
    isLoading,
    mutate,
  } = serviceRepository.hooks.useTranslatorServices(page, 10);

  const { data: listLanguages } =
    translatorRepository.hooks.useGetTranslatorLanguages();

  const columns: TableProps['columns'] = [
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'right',
      width: 110,
    },
  ];

  const toggleStatus = async (id: string) => {
    try {
      await serviceRepository.api.toggleStatus(id);

      mutate();
      message.success('Service status updated successfully');
    } catch (error: any) {
      message.error(
        error.response.body?.message || 'Error toggling service',
        5
      );
    }
  };

  const actionDropdownItem = (service: Service) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div className='flex items-center'>
            <Icon
              icon={'hugeicons:pencil-edit-01'}
              className='text-lg 2xl:text-xl'
            />
            <span className='ml-2 text-xs 2xl:text-sm'>Edit</span>
          </div>
        ),
        onClick: () => {
          setSelectedService(service);
          setIsModalOpen(true);
        },
      },
      {
        key: '2',
        label: (
          <div className='flex items-center'>
            <Icon
              icon={'tabler:circle-filled'}
              className={`text-lg 2xl:text-xl ${
                service.status !== 'Active' ? 'text-green-500' : 'text-rose-500'
              }`}
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

  const data = listServices?.data?.map((service: any) => ({
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
        <Button
          type='primary'
          className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
          onClick={() => setIsModalOpen(true)}
        >
          Add new
          <Icon icon={'ph:plus'} className='text-xl' />
        </Button>
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
              <span className='font-bold'>{listServices?.page}</span> of{' '}
              {listServices?.totalPages} from {listServices?.total} result
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
      <ServiceModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        languages={listLanguages?.data}
        mutate={mutate}
        service={selectedService}
      />
    </main>
  );
};

export default TranslatorService;
