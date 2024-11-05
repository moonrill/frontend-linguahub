'use client';

import LanguageFlag from '#/components/LanguageFlag';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { paymentRepository } from '#/repository/payment';
import { Payment } from '#/types/PaymentTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import {
  Image as AntdImage,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Input,
  TableProps,
} from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TranslatorPayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;

  const [drawerSize, setDrawerSize] = useState('large');
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const { data: listPayments, isLoading } =
    paymentRepository.hooks.useGetPayments('translator', statusParam, page, 10);

  const columns: TableProps['columns'] = [
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(text).format('DD MMMM YYYY, HH:mm')}
        </p>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      render: (text) => (
        <div className='w-fit'>
          <StatusBadge text={capitalizeFirstLetter(text)} status={text} />
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ellipsis: true,
      render: (text) => (
        <p className='text-xs 2xl:text-sm font-semibold'>Rp{text}</p>
      ),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const data = listPayments?.data?.map((payment: Payment) => ({
    key: payment.id,
    client: (
      <div className='flex gap-3 items-center'>
        <div className='relative w-[40px] h-[40px] hidden 2xl:block'>
          <Image
            src={
              payment?.booking?.user?.userDetail.profilePicture
                ? imgProfilePicture(
                    payment?.booking?.user?.userDetail.profilePicture
                  )
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
            {payment?.booking?.user?.userDetail?.fullName}
          </p>
          <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
            {payment?.booking?.user?.email}
          </p>
        </div>
      </div>
    ),
    service: (
      <div className='flex flex-col gap-1'>
        <p className='text-xs 2xl:text-sm font-medium'>
          {payment?.booking?.service?.name}
        </p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <LanguageFlag
              language={payment?.booking?.service?.sourceLanguage}
              size='sm'
            />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {payment?.booking?.service?.sourceLanguage?.code}
            </span>
          </div>
          -
          <div className='flex items-center gap-1'>
            <LanguageFlag
              language={payment?.booking?.service?.targetLanguage}
              size='sm'
            />
            <span className='text-[10px] 2xl:text-xs uppercase font-semibold text-gray-500'>
              {payment?.booking?.service?.targetLanguage?.code}
            </span>
          </div>
        </div>
      </div>
    ),
    ...payment,
    amount: payment?.amount.toLocaleString('id-ID'),
  }));

  const statusOptions: MenuItemType[] = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'pending',
      label: 'Pending',
    },
    {
      key: 'paid',
      label: 'Paid',
    },
    {
      key: 'failed',
      label: 'Failed',
    },
  ];

  const handleSelect = (key: string) => {
    router.push(`/dashboard/translator/payment?status=${key}&page=${page}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/translator/payment?page=${page}&status=${status}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setDrawerSize('default');
      } else {
        setDrawerSize('large');
      }
    };

    // Call once to set initial limit
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        pageSize={listPayments?.limit}
        currentPage={listPayments?.page}
        totalData={listPayments?.total}
        totalPage={listPayments?.totalPages}
        handlePageChange={handlePageChange}
        onClick={({ key }) => {
          const originalPayment = listPayments?.data?.find(
            (payment: Payment) => payment.id === key
          );
          setSelectedPayment(originalPayment || null);
          setShowDrawer(true);
        }}
      />
      <Drawer
        onClose={() => {
          setShowDrawer(false);
          setSelectedPayment(null);
        }}
        open={showDrawer}
        size={drawerSize}
        title='Payment Details'
        extra={
          selectedPayment && (
            <StatusBadge
              status={selectedPayment?.status}
              text={capitalizeFirstLetter(selectedPayment?.status)}
            />
          )
        }
      >
        {selectedPayment && (
          <div>
            <h1 className='text-xl font-semibold'>Booking Summary</h1>
            <div className='text-sm mt-2 flex flex-col gap-1'>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Client</p>
                <p className='font-semibold text-blue-950'>
                  {selectedPayment?.booking?.user?.userDetail?.fullName}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Service</p>
                <p className='font-semibold text-blue-950'>
                  {selectedPayment?.booking?.service.name}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Source Language</p>
                <p className='font-semibold text-blue-950'>
                  {selectedPayment?.booking?.service.sourceLanguage.name}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Target Language</p>
                <p className='font-semibold text-blue-950'>
                  {selectedPayment?.booking?.service.targetLanguage.name}
                </p>
              </div>

              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Booking Date</p>
                <p className='font-semibold text-blue-950'>
                  {dayjs(selectedPayment?.booking.bookingDate).format(
                    'DD MMMM YYYY'
                  )}
                </p>
              </div>
            </div>
            <Divider />
            <h1 className='text-xl font-semibold'>Price Details</h1>
            <div className='text-sm mt-2 flex flex-col gap-1'>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Service price</p>
                <p className='font-medium text-blue-950'>
                  Rp
                  {selectedPayment?.booking?.service?.pricePerHour.toLocaleString(
                    'id-ID'
                  )}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='font-medium text-slate-500'>Duration</p>
                <p className='font-medium text-blue-950'>
                  {selectedPayment?.booking.duration} Hours
                </p>
              </div>
            </div>
            <Divider />
            <div className='flex justify-between'>
              <h1 className='text-xl font-semibold'>Total</h1>
              <h1 className='text-xl font-semibold'>
                Rp{selectedPayment?.booking.serviceFee.toLocaleString('id-ID')}
              </h1>
            </div>
            <Divider />
            <div className='flex flex-col gap-3'>
              <h1 className='text-xl font-semibold'>Proof</h1>
              {selectedPayment?.proof ? (
                <>
                  <AntdImage
                    width={200}
                    height={200}
                    className='object-cover rounded-xl'
                    src={`${config.baseUrl}/images/proof/payment/${selectedPayment?.proof}`}
                  />
                  <Button
                    type='primary'
                    className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
                  >
                    Complete Payment
                  </Button>
                </>
              ) : (
                <p className='text-sm text-slate-500'>No proof uploaded yet</p>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </main>
  );
};

export default TranslatorPayment;
