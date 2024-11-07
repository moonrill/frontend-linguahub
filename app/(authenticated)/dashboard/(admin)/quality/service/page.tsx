'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ServiceModal from '#/components/Modal/ServiceModal';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { serviceRepository } from '#/repository/service';
import { translatorRepository } from '#/repository/translator';
import { Service } from '#/types/ServiceTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Dropdown, Input, MenuProps, message, TableProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const AdminService = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    data: listServices,
    isLoading,
    mutate,
  } = serviceRepository.hooks.useGetAllServices(page, 10);

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
              src={record?.translator?.user?.userDetail?.profilePicture || '/images/avatar-placeholder.png'}
              fill
              alt='translator-profile-picture'
              sizes='(max-width: 400px)'
              className='object-cover rounded-lg'
              priority
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-sm line-clamp-1'>{record?.translator?.user?.userDetail?.fullName || 'N/A'}</p>
            <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>{record?.translator?.user?.email || 'N/A'}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      minWidth: 200,
      render: (text) => <p className='font-medium'>{text}</p>,
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
      render: (text) => <p className='font-semibold'>Rp{text.toLocaleString('id-ID')}</p>,
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
  ];

  const toggleStatus = async (id: string) => {
    try {
      await serviceRepository.api.toggleStatus(id);
      mutate();
      message.success('Service status updated successfully');
    } catch (error: any) {
      message.error(error.response.body?.message || 'Error toggling service', 5);
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

  const statusOptions: MenuProps['items'] = [
    { key: 'all', label: 'All' },
    { key: 'Active', label: 'Active' },
    { key: 'Inactive', label: 'Inactive' },
  ];

  const handleSelect = (value: string) => {
    router.push(`/dashboard/quality/service?status=${value}&page=${page}`);
  };

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
            onClick: ({ key }) => handleSelect(key),
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

export default AdminService;
