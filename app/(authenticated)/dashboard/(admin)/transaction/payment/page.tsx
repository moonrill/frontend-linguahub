'use client';

import ExportModal from '#/components/Modal/ExportModal';
import StatusBadge from '#/components/StatusBadge';
import CustomTable from '#/components/Tables/CustomTable';
import { config } from '#/config/app';
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
  message,
  Segmented,
  TableProps,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminPayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;
  const status = searchParams?.get('status') || 'all';
  const statusParam = status === 'all' ? undefined : status;
  const type = searchParams?.get('type') || 'All';
  const typeParam = type === 'All' ? undefined : type.toLowerCase();

  const [showDrawer, setShowDrawer] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [drawerSize, setDrawerSize] = useState<'default' | 'large'>('large');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const {
    data: listPayments,
    isLoading,
    mutate,
  } = paymentRepository.hooks.useGetPayments(
    'admin',
    statusParam,
    page,
    10,
    typeParam
  );

  const columns: TableProps['columns'] = [
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (text) => (
        <Tooltip title={dayjs(text).format('DD MMMM YYYY, HH:mm')}>
          <p className='text-xs 2xl:text-sm font-medium whitespace-nowrap'>
            {dayjs(text).format('DD MMMM YYYY, HH:mm')}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      ellipsis: true,
      render: (_, record) => (
        <Tooltip title={record.booking?.id}>
          <p className='text-xs 2xl:text-sm font-medium truncate max-w-[120px]'>
            {record.booking?.id}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      ellipsis: true,
      render: (_, record) => (
        <div className='w-fit'>
          <StatusBadge
            text={capitalizeFirstLetter(record.paymentType)}
            status={record.paymentType}
            icon={
              record.paymentType === 'client'
                ? 'mdi:account'
                : 'mdi:account-tie-voice'
            }
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_, record) => (
        <Tooltip
          title={
            record?.paymentType === 'client'
              ? record?.booking?.user?.userDetail?.fullName
              : record?.booking?.translator?.user?.userDetail?.fullName
          }
        >
          <p className='font-medium text-xs 2xl:text-sm truncate max-w-[150px]'>
            {record?.paymentType === 'client'
              ? record?.booking?.user?.userDetail?.fullName
              : record?.booking?.translator?.user?.userDetail?.fullName}
          </p>
        </Tooltip>
      ),
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
      render: (_, record) => (
        <Tooltip title={`Rp${record.amount.toLocaleString('id-ID')}`}>
          <p className='text-xs 2xl:text-sm font-semibold whitespace-nowrap'>
            Rp{record.amount.toLocaleString('id-ID')}
          </p>
        </Tooltip>
      ),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const data = listPayments?.data?.map((payment: Payment) => ({
    key: payment.id,
    ...payment,
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

  const statusItems = ['All', 'Client', 'Translator'];

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    listType: 'picture-card',
    iconRender: (file) => (
      <Icon
        icon='basil:document-solid'
        height={64}
        className='text-blue-600 mb-4'
      />
    ),
    progress: {
      strokeColor: {
        '0%': '#2563eb',
        '100%': '#2563eb',
      },
    },
    beforeUpload: (file) => {
      if (file.size > 5 * 1024 * 1024) {
        message.error('File too large');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: (
        <Icon icon='mynaui:trash' className='text-red-500' height={24} />
      ),
    },
  };

  const onChange = (e: any) => {
    router.push(
      `/dashboard/transaction/payment?status=${status}&page=${page}&type=${e}`
    );
  };

  const handleSelect = (key: string) => {
    router.push(
      `/dashboard/transaction/payment?status=${key}&page=${page}&type=${type}`
    );
  };

  const handlePageChange = (page: number) => {
    router.push(
      `/dashboard/transaction/payment?page=${page}&status=${status}&type=${type}`
    );
  };

  const handleUploadProof = async (file: any) => {
    if (!selectedPayment) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('proof', file);
      await paymentRepository.api.updateProof(selectedPayment?.id, formData);
      message.success('Proof uploaded successfully');
      mutate();
    } catch (error) {
      console.error(error);
      message.error('Error uploading proof');
    }
  };

  const handleRemoveProof = async () => {
    if (!selectedPayment) {
      return;
    }

    try {
      await paymentRepository.api.removeProof(selectedPayment?.id);
      message.success('Proof removed successfully');
      mutate();
    } catch (error) {
      console.error(error);
      message.error('Error removing proof');
    }
  };

  useEffect(() => {
    if (selectedPayment) {
      const updatedPayment = listPayments?.data?.find(
        (payment: Payment) => payment.id === selectedPayment.id
      );
      setSelectedPayment(updatedPayment || null);
    }
  }, [listPayments, selectedPayment]);

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
        <div className='flex gap-3'>
          <Segmented
            options={statusItems}
            onChange={onChange}
            defaultValue={type}
          />
          <Dropdown
            menu={{
              items: statusOptions,
              selectable: true,
              onClick: ({ key }) => handleSelect(key),
              selectedKeys: [status],
            }}
            trigger={['click']}
            className='cursor-pointer h-11 2xl:h-12 bg-zinc-100 px-4 py-2 rounded-xl text-sm 2xl:text-base text-zinc-500 font-medium hover:bg-zinc-200 transition-all duration-500'
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
          <Button
            type='default'
            className='py-3 px-5 w-fit h-fit text-sm font-medium text-blue-600 rounded-xl'
            onClick={() => setOpenExportModal(true)}
          >
            <Icon icon={'uil:export'} height={18} />
            Export
          </Button>
        </div>
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
          setSelectedPayment(
            listPayments?.data.find((payment: Payment) => payment.id === key)
          );
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
                <p className='font-medium text-slate-500'>Translator</p>
                <p className='font-semibold text-blue-950'>
                  {
                    selectedPayment?.booking?.translator?.user?.userDetail
                      ?.fullName
                  }
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
              {selectedPayment?.paymentType === 'client' && (
                <div className='flex justify-between'>
                  <p className='font-medium text-slate-500'>Duration</p>
                  <p className='font-semibold text-blue-950'>
                    {selectedPayment?.booking?.duration} Hours
                  </p>
                </div>
              )}
            </div>
            <Divider />
            <h1 className='text-xl font-semibold'>Price Details</h1>
            <div className='text-sm mt-2 flex flex-col gap-1'>
              {selectedPayment?.paymentType === 'client' ? (
                <>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>Service fee</p>
                    <p className='font-medium text-blue-950'>
                      Rp
                      {selectedPayment?.booking?.serviceFee.toLocaleString(
                        'id-ID'
                      )}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>System fee</p>
                    <p className='font-medium text-blue-950'>
                      Rp
                      {selectedPayment?.booking?.systemFee.toLocaleString(
                        'id-ID'
                      )}
                    </p>
                  </div>
                  {selectedPayment?.booking?.discountAmount && (
                    <div className='flex justify-between'>
                      <p className='font-medium text-slate-500'>
                        Discount Amount
                      </p>
                      <p className='font-medium text-blue-950'>
                        -Rp
                        {selectedPayment?.booking?.discountAmount.toLocaleString(
                          'id-ID'
                        )}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            <Divider />
            <div className='flex justify-between'>
              <h1 className='text-xl font-semibold'>Total</h1>
              <h1 className='text-xl font-semibold'>
                Rp
                {selectedPayment?.paymentType === 'client'
                  ? selectedPayment?.booking.totalPrice.toLocaleString('id-ID')
                  : selectedPayment?.booking.serviceFee.toLocaleString('id-ID')}
              </h1>
            </div>
            <Divider />
            {selectedPayment?.paymentType === 'translator' && (
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
                    {selectedPayment?.status === 'pending' && (
                      <Button
                        className='w-fit py-6 font-medium rounded-xl hover:!border-rose-600 hover:!text-rose-600'
                        type='default'
                        htmlType='button'
                        onClick={handleRemoveProof}
                      >
                        Remove Proof
                      </Button>
                    )}
                  </>
                ) : (
                  selectedPayment?.status === 'pending' && (
                    <Dragger
                      {...uploadProps}
                      style={{ width: 300, padding: '3rem 0' }}
                      onChange={(info: UploadChangeParam<UploadFile>) => {
                        const { file } = info;
                        if (file.status !== 'removed') {
                          handleUploadProof(file);
                        }
                      }}
                    >
                      <div className='flex flex-col justify-center items-center'>
                        <Icon
                          icon={'iwwa:upload'}
                          height={64}
                          className=' text-blue-600'
                        />
                        <p className='text-sm text-zinc-500'>
                          Drag & drop or click to upload
                        </p>
                      </div>
                    </Dragger>
                  )
                )}
              </div>
            )}
            {selectedPayment?.paymentType === 'client' &&
              selectedPayment?.paymentMethod && (
                <div className='flex justify-between text-sm mt-4'>
                  <p className='font-medium text-slate-500'>Payment Method</p>
                  <p className='font-semibold text-blue-950'>
                    {selectedPayment?.paymentMethod}
                  </p>
                </div>
              )}
          </div>
        )}
      </Drawer>
      <ExportModal
        open={openExportModal}
        onCancel={() => setOpenExportModal(false)}
        role='admin'
      />
    </main>
  );
};

export default AdminPayment;
