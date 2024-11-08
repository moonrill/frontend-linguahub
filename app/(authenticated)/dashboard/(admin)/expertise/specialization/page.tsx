'use client';

import ConfirmModal from '#/components/Modal/ConfirmModal';
import SpecializationModal from '#/components/Modal/SpecializationModal';
import CustomTable from '#/components/Tables/CustomTable';
import { imgSpecialization } from '#/constants/general';
import { specializationRepository } from '#/repository/specialization';
import { Specialization } from '#/types/SpecializationTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Input, message, TableProps } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const DashboardSpecialization = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<Specialization | null>(null);

  const {
    data: listSpecializations,
    isLoading,
    mutate,
  } = specializationRepository.hooks.useAllSpecializations(10, page);

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/expertise/specialization?page=${page}`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (_, record) => (
        <div className={`relative w-8 h-8 2xl:w-10 2xl:h-10`}>
          <Image
            src={imgSpecialization(record.logo)}
            alt={`${record.name} flag`}
            fill
            sizes='(max-width: 40px)'
            className='object-cover'
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <p className='font-medium'>{record.name}</p>,
    },
    {
      title: 'Total Translators',
      dataIndex: 'translatorCount',
      key: 'translatorCount',
      align: 'center',
      render: (_, record) => <p>{record.translatorCount}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const data = listSpecializations?.data?.map(
    (specialization: Specialization) => ({
      key: specialization.id,
      action: (
        <div className='flex '>
          <div
            className='p-2 hover:bg-zinc-200 w-fit cursor-pointer rounded-lg transition-all duration-500 flex items-center justify-center'
            onClick={() => handleSelect(specialization, 'edit')}
          >
            <Icon
              icon={'hugeicons:pencil-edit-01'}
              className='text-2xl text-blue-600'
            />
          </div>
          <div
            className='p-2 hover:bg-rose-200 w-fit cursor-pointer rounded-lg transition-all duration-500 flex items-center justify-center'
            onClick={() => handleSelect(specialization, 'delete')}
          >
            <Icon icon={'mynaui:trash'} className='text-2xl text-rose-600' />
          </div>
        </div>
      ),
      ...specialization,
    })
  );

  const handleSelect = (
    specialization: Specialization,
    type: 'edit' | 'delete'
  ) => {
    setSelectedSpecialization(specialization);

    type === 'edit' ? setIsModalOpen(true) : setOpenConfirmModal(true);
  };

  // BUG: After delete specialization, the data is seleceted in form
  const handleConfirm = async () => {
    setLoading(true);

    try {
      if (selectedSpecialization) {
        await specializationRepository.api.deleteSpecialization(
          selectedSpecialization.id
        );

        setSelectedSpecialization(null);
        mutate();
        message.success('Specialization deleted successfully');
      }
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Error deleting specialization'
      );
      setLoading(false);
    } finally {
      setOpenConfirmModal(false);
    }
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
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listSpecializations?.limit}
        currentPage={listSpecializations?.page}
        totalData={listSpecializations?.total}
        totalPage={listSpecializations?.totalPages}
        handlePageChange={handlePageChange}
      />
      <SpecializationModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedSpecialization(null);
        }}
        mutate={mutate}
        specialization={selectedSpecialization}
      />
      <ConfirmModal
        open={openConfirmModal}
        onCancel={() => {
          setOpenConfirmModal(false);
          setSelectedSpecialization(null);
        }}
        onConfirm={handleConfirm}
        type='danger'
        title='Delete Specialization'
        description='Are you sure you want to delete this specialization? This action cannot be undone'
        cancelText='No, cancel'
        confirmText="Yes, I'm sure"
        isLoading={loading}
      />
    </main>
  );
};

export default DashboardSpecialization;
