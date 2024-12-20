'use client';

import ConfirmModal from '#/components/Modal/ConfirmModal';
import CouponModal from '#/components/Modal/CouponModal';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { couponRepository } from '#/repository/coupon';
import { eventRepository } from '#/repository/event';
import { Coupon } from '#/types/CouponTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Dropdown, Input, MenuProps, message, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AdminCoupons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: listCoupons,
    isLoading,
    mutate,
  } = couponRepository.hooks.useAllCoupons(10, page);

  const { data: listEvents } = eventRepository.hooks.useAllEvents(100, 1);

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/promotion/coupon?page=${page}`);
  };

  const toggleStatus = async (id: string) => {
    try {
      await couponRepository.api.toggleStatus(id);

      mutate();
      message.success('Coupon status updated successfully');
    } catch (error: any) {
      message.error(error.response.body?.message || 'Error toggling Coupon', 5);
    }
  };

  const actionDropdownItem = (coupon: Coupon): MenuProps['items'] => [
    {
      key: 'edit',
      label: (
        <div className='flex items-center'>
          <Icon icon={'hugeicons:pencil-edit-01'} className='text-lg' />
          <span className='ml-2'>Edit Coupon</span>
        </div>
      ),
      onClick: () => handleSelect(coupon, 'edit'),
    },
    {
      key: 'toggle-status',
      label: (
        <div className='flex items-center'>
          <Icon
            icon={'tabler:circle-filled'}
            className={`text-lg 2xl:text-xl ${
              coupon.status !== 'Active' ? 'text-green-500' : 'text-rose-500'
            }`}
          />
          <span className='ml-2 text-xs 2xl:text-sm'>
            {coupon.status !== 'Active' ? 'Activate' : 'Deactivate'}
          </span>
        </div>
      ),
      onClick: () => toggleStatus(coupon.id),
    },
  ];

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_, record) => <p className='font-medium'>{record.name}</p>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      ellipsis: true,
      render: (_, record) => (
        <p className='font-medium'>{record.discountPercentage}%</p>
      ),
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      ellipsis: true,
      render: (_, record) => (
        <p className='font-medium'>
          {dayjs(record.expiredAt).format('DD MMMM YYYY HH:mm')}
        </p>
      ),
    },
    {
      title: 'Total Claimed',
      dataIndex: 'totalClaimed',
      key: 'totalClaimed',
      ellipsis: true,
      align: 'center',
      render: (_, record) => (
        <p className='font-medium'>{record.totalClaimed}</p>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      render: (text) => (
        <div className='w-fit'>
          <StatusBadge text={text} status={text} />
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: actionDropdownItem(record as Coupon),
          }}
        >
          <Icon
            icon={'tabler:dots'}
            className='text-gray-500 text-2xl cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500'
          />
        </Dropdown>
      ),
    },
  ];

  const data = listCoupons?.data?.map((coupon: Coupon) => ({
    key: coupon.id,
    ...coupon,
  }));

  const handleSelect = (coupon: Coupon, type: 'edit' | 'delete' | 'detail') => {
    setSelectedCoupon(coupon);
    if (type === 'edit') {
      setIsModalOpen(true);
    } else if (type === 'delete') {
      setOpenConfirmModal(true);
    } else if (type === 'detail') {
      router.push(`/dashboard/promotion/coupon/${coupon.id}`);
    }
  };

  const handleConfirm = async () => {
    if (selectedCoupon) {
      setLoading(true);
      try {
        await couponRepository.api.deleteCoupon(selectedCoupon.id);
        message.success('Coupon deleted successfully');
        mutate();
      } catch (error) {
        message.error('Error deleting coupon');
      } finally {
        setOpenConfirmModal(false);
        setLoading(false);
      }
    }
  };

  return (
    <main className='bg-white w-full rounded-3xl p-4'>
      <div className='flex justify-between items-center mb-4'>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        pageSize={listCoupons?.limit}
        currentPage={listCoupons?.page}
        totalData={listCoupons?.total}
        totalPage={listCoupons?.totalPages}
        handlePageChange={handlePageChange}
      />

      <CouponModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedCoupon(null);
        }}
        mutate={mutate}
        coupon={selectedCoupon}
        events={listEvents?.data}
      />

      <ConfirmModal
        open={openConfirmModal}
        onCancel={() => {
          setOpenConfirmModal(false);
          setSelectedCoupon(null);
        }}
        onConfirm={handleConfirm}
        type='danger'
        title='Delete Coupon'
        description='Are you sure you want to delete this coupon? This action cannot be undone.'
        cancelText='No, cancel'
        confirmText="Yes, I'm sure"
        isLoading={loading}
      />
    </main>
  );
};

export default AdminCoupons;
