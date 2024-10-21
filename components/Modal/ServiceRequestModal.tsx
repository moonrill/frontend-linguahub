'use client';

import { imgProfilePicture } from '#/constants/general';
import { couponRepository } from '#/repository/coupon';
import { UserCoupon } from '#/types/CouponTypes';
import { Translator } from '#/types/TranslatorTypes';
import { http } from '#/utils/http';
import { TokenUtil } from '#/utils/token';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type Props = {
  open: boolean;
  onCancel: () => void;
  translator: Translator;
};

const currentDate = dayjs().format('YYYY-MM-DD');

const ServiceRequestModal = ({ open, onCancel, translator }: Props) => {
  const [form] = useForm();
  const accessToken = TokenUtil.accessToken;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { data: userCoupons } = useSWR(
    accessToken
      ? couponRepository.url.getUserCoupons(
          'available',
          1,
          15,
          'discountPercentage',
          'desc'
        )
      : null,
    http.fetcher
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (success && countdown === 0) {
      setSuccess(false);
      onCancel();
      form.resetFields();
    }
    return () => clearTimeout(timer);
  }, [success, countdown, onCancel, form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        translatorId: translator?.id,
        startAt: values.startAt ? dayjs(values.startAt).format('HH:mm') : null,
        endAt: values.endAt ? dayjs(values.endAt).format('HH:mm') : null,
      };

      const response = await fetch('http://localhost:3222/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setCountdown(5);
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setSuccess(false);
  };

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      {success ? (
        <div className='text-center'>
          <h2 className='text-xl font-semibold'>
            Request Successfully Created!
          </h2>
          <div className='relative w-[150px] h-[150px] my-6 mx-auto'>
            <Image
              src={'/images/translator-success.svg'}
              alt={'translator-success'}
              fill
              sizes='(max-width: 400px)'
            />
          </div>
          <p className='text-sm'>
            Our translator will considering your request and we will send you an
            email after the translator accepts your request.
          </p>
          <p className='text-sm mt-4'>
            This message will close in {countdown} seconds
          </p>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
              <Icon icon={'lets-icons:edit'} className='text-2xl' />
            </div>
            <h1 className='text-lg 2xl:text-xl font-semibold'>
              Create Service Request
            </h1>
          </div>
          <Form
            className='mt-6 text-black flex flex-col'
            onFinish={onFinish}
            form={form}
          >
            <div className='flex flex-col gap-1 2xl:gap-2 mb-3'>
              <p className='text-xs 2xl:text-sm font-medium'>Translator</p>
              <div className='flex gap-2 items-center'>
                <div className='relative w-14 h-14 2xl:w-16 2xl:h-16 rounded-full'>
                  <Image
                    src={
                      translator?.user?.userDetail.profilePicture
                        ? imgProfilePicture(
                            translator?.user?.userDetail.profilePicture
                          )
                        : '/images/avatar-placeholder.png'
                    }
                    alt={'profile-picture'}
                    fill
                    sizes='(max-width: 64px)'
                    className='object-cover rounded-full'
                  />
                </div>
                <div>
                  <h1 className='font-semibold 2xl:text-lg'>
                    {translator?.user?.userDetail?.fullName}
                  </h1>
                  <div className='flex items-center gap-1'>
                    <Icon
                      icon={'tabler:star-filled'}
                      className='text-yellow-400 text-xs 2xl:text-sm'
                    />
                    <p className='text-sm'>{translator?.rating}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1 2xl:gap-2'>
              <p className='text-xs 2xl:text-sm font-medium'>Service</p>
              <Form.Item
                name='serviceId'
                rules={[{ required: true, message: 'Please select a service' }]}
              >
                <Select
                  placeholder='Select a service'
                  className='h-16'
                  options={translator?.services?.map((service) => ({
                    label: (
                      <div className='flex justify-between gap-2 py-2 items-center'>
                        <div>
                          <p className='font-semibold text-sm'>
                            {service.name}
                          </p>
                          <p className='text-xs'>
                            {service.sourceLanguage.name} -{' '}
                            {service.targetLanguage.name}
                          </p>
                        </div>
                        <p className='text-blue-600 font-semibold text-sm'>
                          Rp{service.pricePerHour.toLocaleString('id-ID')}/hr
                        </p>
                      </div>
                    ),
                    value: service.id,
                  }))}
                  suffixIcon={
                    <Icon
                      icon={'mdi:chevron-down'}
                      height={24}
                      className='text-zinc-400'
                    />
                  }
                />
              </Form.Item>
            </div>
            <div className='flex flex-col gap-2 '>
              <p className='text-xs 2xl:text-sm font-medium'>Date & Time</p>
              <Form.Item
                name='bookingDate'
                rules={[{ required: true, message: 'Please select a date' }]}
                style={{ margin: 0 }}
                className='!mb-1'
              >
                <DatePicker
                  placeholder='Date'
                  className='h-14 w-full bg-zinc-100 border-none rounded-2xl hover:bg-zinc-200 px-6 focus:bg-zinc-100'
                  minDate={dayjs(currentDate)}
                  suffixIcon={
                    <Icon
                      icon={'ic:round-date-range'}
                      height={24}
                      className='text-zinc-400'
                    />
                  }
                />
              </Form.Item>
              <div className='flex justify-between gap-3'>
                <Form.Item
                  name={'startAt'}
                  className='!w-full'
                  rules={[
                    { required: true, message: 'Please select start time' },
                  ]}
                >
                  <TimePicker
                    format={'HH:mm'}
                    className='!w-full'
                    placeholder='Start'
                    suffixIcon={
                      <Icon
                        icon={'mdi:clock-time-three-outline'}
                        className='text-2xl'
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={'endAt'}
                  className='!w-full'
                  dependencies={['startAt']}
                  rules={[
                    { required: true, message: 'Please select end time' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const startAt = getFieldValue('startAt');
                        if (!value || !startAt || value.isAfter(startAt)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('End time must be later than start time')
                        );
                      },
                    }),
                  ]}
                >
                  <TimePicker
                    format={'HH:mm'}
                    className='!w-full'
                    placeholder='End'
                    suffixIcon={
                      <Icon icon={'mdi:clock-outline'} className='text-2xl' />
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex flex-col gap-2 '>
              <p className='text-xs 2xl:text-sm font-medium'>Location</p>
              <Form.Item
                name={'location'}
                rules={[{ required: true, message: 'Please input a location' }]}
              >
                <Input
                  type='text'
                  placeholder='Location'
                  suffix={
                    <Icon
                      icon={'mdi:map-marker-radius'}
                      height={24}
                      className='text-zinc-400'
                    />
                  }
                  className='h-14'
                />
              </Form.Item>
            </div>
            <div className='flex flex-col gap-2 '>
              <p className='text-xs 2xl:text-sm font-medium'>Notes</p>
              <Form.Item name={'notes'}>
                <Input
                  type='text'
                  placeholder='Notes'
                  suffix={
                    <Icon
                      icon={'mdi:file-document-edit-outline'}
                      height={24}
                      className='text-zinc-400'
                    />
                  }
                  className='h-14'
                />
              </Form.Item>
            </div>
            <div className='flex flex-col gap-1 2xl:gap-2'>
              <p className='text-xs 2xl:text-sm font-medium'>Coupon</p>
              <Form.Item name='couponId'>
                <Select
                  placeholder='Select a coupon'
                  className='h-16'
                  suffixIcon={
                    <Icon
                      icon={'mdi:chevron-down'}
                      height={24}
                      className='text-zinc-400'
                    />
                  }
                  options={userCoupons?.data?.map((uc: UserCoupon) => ({
                    value: uc?.coupon.id,
                    label: (
                      <div className='flex justify-between'>
                        <div className='flex gap-3'>
                          <div className='p-3 bg-blue-600 flex justify-center items-center rounded-lg'>
                            <Icon
                              icon='mdi:ticket-percent'
                              className='text-2xl text-white'
                            />
                          </div>
                          <div className='flex flex-col justify-between'>
                            <p className='text-base font-semibold'>
                              {uc?.coupon?.discountPercentage} % OFF
                            </p>
                            <p className='text-sm font-medium line-clamp-1'>
                              {uc?.coupon?.name}
                            </p>
                          </div>
                        </div>
                        <p className='text-sm text-rose-600'>
                          Exp:{' '}
                          {dayjs(uc?.coupon?.expiredAt).format('DD MMM YYYY')}
                        </p>
                      </div>
                    ),
                  }))}
                />
              </Form.Item>
            </div>
            <div className='flex justify-between w-full gap-4'>
              <Button
                className='w-full py-6 font-medium rounded-xl'
                type='default'
                htmlType='button'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className='w-full py-6 font-medium rounded-xl'
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                Send request
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default ServiceRequestModal;
