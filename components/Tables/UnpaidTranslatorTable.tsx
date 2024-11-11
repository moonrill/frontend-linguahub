'use client';

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
  message,
  Table,
  TableProps,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import StatusBadge from '../StatusBadge';

interface Props {
  data: Payment[];
  mutate: () => void;
}

const UnpaidTranslatorTable = ({ data, mutate }: Props) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [drawerSize, setDrawerSize] = useState<'default' | 'large'>('large');

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setDrawerSize('default');
      } else {
        setDrawerSize('large');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <p className='text-xs 2xl:text-sm font-medium truncate max-w-[200px]'>
            {record.booking?.id}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Translator',
      dataIndex: 'translator',
      key: 'translator',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div className='relative w-[50px] h-[50px] hidden 2xl:block'>
            <Image
              src={
                record?.booking?.translator?.user?.userDetail.profilePicture
                  ? imgProfilePicture(
                      record?.booking?.translator?.user?.userDetail
                        .profilePicture
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
            <p className='font-semibold text-xs 2xl:text-sm'>
              {record?.booking?.translator?.user?.userDetail?.fullName}
            </p>
            <p className='text-[10px] 2xl:text-xs font-semibold text-gray-500'>
              {record?.booking?.translator?.user?.email}
            </p>
          </div>
        </div>
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title='View Detail'>
          <div
            className='text-gray-500 cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500 flex items-center justify-center w-fit'
            onClick={() => {
              setSelectedPayment(
                data.find((payment: Payment) => payment.id === record.key) ||
                  null
              );

              setShowDrawer(true);
            }}
          >
            <Icon
              icon={'solar:eye-linear'}
              className='text-xl 2xl:text-2xl text-blue-600'
            />
          </div>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    if (selectedPayment) {
      const updatedPayment = data?.find(
        (payment: Payment) => payment.id === selectedPayment.id
      );
      setSelectedPayment(updatedPayment || null);
    }
  }, [data, selectedPayment]);

  const tableData = data?.map((record) => ({
    key: record.id,
    ...record,
  }));
  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 'max-content' }}
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
              <>
                <div className='flex flex-col gap-3 text-sm'>
                  <h1 className='text-xl font-semibold'>Translator Bank</h1>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>Bank Name</p>
                    <p className='font-medium text-blue-950'>
                      {selectedPayment?.booking?.translator?.bank}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>
                      Bank Account Number
                    </p>
                    <p className='font-medium text-blue-950'>
                      {selectedPayment?.booking?.translator?.bankAccountNumber}
                    </p>
                  </div>
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
              </>
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
    </>
  );
};

export default UnpaidTranslatorTable;
