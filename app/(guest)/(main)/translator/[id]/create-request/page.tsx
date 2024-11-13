'use client';

import LanguageFlag from '#/components/LanguageFlag';
import { imgProfilePicture } from '#/constants/general';
import { couponRepository } from '#/repository/coupon';
import { serviceRequestRepository } from '#/repository/service-request';
import { translatorRepository } from '#/repository/translator';
import { UserCoupon } from '#/types/CouponTypes';
import { Language } from '#/types/LanguageTypes';
import { Service } from '#/types/ServiceTypes';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const CreateServiceRequestPage = ({ params }: { params: { id: string } }) => {
  const [form] = useForm();
  const router = useRouter();
  const currentDate = dayjs().format('YYYY-MM-DD');

  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<UserCoupon | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [fees, setFees] = useState({
    serviceFee: 0,
    systemFee: 0,
    discount: 0,
    total: 0,
  });

  const { data: result } = translatorRepository.hooks.useGetTranslatorById(
    params.id
  );
  const { data: userCoupons } = couponRepository.hooks.useGetUserCoupons(
    'available',
    1,
    20,
    'discountPercentage',
    'desc'
  );

  const translator = result?.data;

  const calculateDuration = () => {
    const { startAt, endAt } = form.getFieldsValue(['startAt', 'endAt']);

    if (startAt && endAt) {
      const diff = endAt.diff(startAt, 'hour', true).toFixed(2);
      setDuration(Number(diff));
    }
  };

  const calculateFees = useCallback(() => {
    if (!selectedService || !duration) return;
    const serviceFee = selectedService.pricePerHour * duration;
    const systemFee = serviceFee * 0.1;
    const discount = selectedCoupon
      ? ((serviceFee + systemFee) * selectedCoupon.coupon.discountPercentage) /
        100
      : 0;
    const total = serviceFee + systemFee - discount;
    setFees({ serviceFee, systemFee, discount, total });
  }, [selectedService, duration, selectedCoupon]);

  const handleServiceChange = (value: string) => {
    const service = translator?.services?.find((s: Service) => s.id === value);
    setSelectedService(service || null);
  };

  const handleCouponChange = (value: string) => {
    const coupon = userCoupons?.data?.find(
      (uc: UserCoupon) => uc.coupon.id === value
    );
    setSelectedCoupon(coupon || null);
  };

  useEffect(() => calculateFees(), [calculateFees]);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      setSuccess(false);
      router.push('/profile/service-request');
    }
  }, [success, countdown, router]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        translatorId: translator?.id,
        startAt: values.startAt ? dayjs(values.startAt).format('HH:mm') : null,
        endAt: values.endAt ? dayjs(values.endAt).format('HH:mm') : null,
        duration,
      };

      const response = await serviceRequestRepository.api.createServiceRequest(
        data
      );

      if (response.ok) {
        setSuccess(true);
        setCountdown(5);
        form.resetFields();
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=' min-h-[calc(100vh-150px)] mt-6'>
      <Form
        className='mt-4 text-black flex gap-6'
        onFinish={onFinish}
        form={form}
      >
        <section className='w-3/5 rounded-2xl border p-6'>
          <h1 className='font-semibold text-3xl'>Create Service Request</h1>
          <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
          <div className='flex flex-col gap-1 2xl:gap-2 mb-3'>
            <p className='text-sm 2xl:text-base font-medium'>Translator</p>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <div className='relative w-20 h-20 2xl:w-24 2xl:h-24 rounded-full'>
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
                    className='object-cover rounded-2xl'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <h1 className='font-semibold 2xl:text-2xl'>
                      {translator?.user?.userDetail?.fullName}
                    </h1>
                    <p className='text-sm 2xl:text-base font-semibold text-gray-500'>
                      {translator?.user?.email}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Icon
                      icon={'tabler:star-filled'}
                      className='text-yellow-400 text-sm 2xl:text-base'
                    />
                    <p className='text-sm'>
                      {translator?.rating}{' '}
                      <span className='font-light'>
                        ({translator?.reviewsCount} reviews)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex gap-1 2xl:gap-2 mt-2'>
                {translator?.languages
                  ?.slice(0, 3)
                  .map((language: Language, index: number) => (
                    <LanguageFlag key={index} language={language} />
                  ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1 2xl:gap-2'>
            <p className='text-sm 2xl:text-base font-medium'>Service</p>
            <Form.Item
              name='serviceId'
              rules={[{ required: true, message: 'Please select a service' }]}
            >
              <Select
                placeholder='Select a service'
                className='h-16'
                onChange={handleServiceChange}
                options={translator?.services?.map((service: Service) => ({
                  label: (
                    <div className='flex justify-between gap-2 py-2 items-center'>
                      <div>
                        <p className='font-semibold text-sm'>{service.name}</p>
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
            <p className='text-sm 2xl:text-base font-medium'>Date & Time</p>
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
                  onChange={calculateDuration}
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
                  onChange={calculateDuration}
                  suffixIcon={
                    <Icon icon={'mdi:clock-outline'} className='text-2xl' />
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className='flex flex-col gap-2 '>
            <p className='text-sm 2xl:text-base font-medium'>Location</p>
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
            <p className='text-sm 2xl:text-base font-medium'>
              Notes{' '}
              <span className='text-zinc-400 font-normal'>(Optional)</span>
            </p>
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
        </section>
        <section className='w-2/5 rounded-2xl border p-6 flex flex-col justify-between'>
          <div className='flex flex-col gap-4'>
            <div className='border p-4 rounded-xl'>
              <div>
                <h1 className='font-semibold text-2xl'>Service Detail</h1>
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>Price per Hour</p>
                    <p className='font-semibold text-blue-950'>
                      {selectedService
                        ? `Rp${selectedService.pricePerHour.toLocaleString(
                            'id-ID'
                          )}`
                        : 'Rp-'}
                    </p>
                  </div>
                </div>
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>
                      Service Duration
                    </p>
                    <p className='font-semibold text-blue-950'>
                      {duration} {duration > 1 ? 'hours' : 'hour'}
                    </p>
                  </div>
                </div>
                <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-blue-950 text-lg'>
                      Total Service Fee
                    </p>
                    <p className='font-semibold text-blue-950'>
                      Rp{fees.serviceFee.toLocaleString('id-ID') || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1 2xl:gap-2'>
              <Form.Item name='couponId' style={{ marginBottom: 0 }}>
                <Select
                  placeholder='Use a coupon (optional)'
                  className='h-16'
                  onChange={handleCouponChange}
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
                      <div className='flex justify-between items-center'>
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
            <div className='border p-4 rounded-xl'>
              <div>
                <h1 className='font-semibold text-2xl'>Summary</h1>
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>Service Fee</p>
                    <p className='font-semibold text-blue-950'>
                      Rp{fees.serviceFee.toLocaleString('id-ID') || '-'}
                    </p>
                  </div>
                </div>
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-medium text-slate-500'>
                      System Fee (10%)
                    </p>
                    <p className='font-semibold text-blue-950'>
                      Rp{fees.systemFee.toLocaleString('id-ID') || '-'}
                    </p>
                  </div>
                </div>
                {fees.discount !== 0 && (
                  <div className='mt-2 flex flex-col gap-1'>
                    <div className='flex justify-between'>
                      <p className='font-medium text-slate-500'>
                        Discount Amount
                      </p>
                      <p className='font-semibold text-blue-950'>
                        -Rp{fees.discount.toLocaleString('id-ID') || '-'}
                      </p>
                    </div>
                  </div>
                )}
                <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
                <div className='mt-2 flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-blue-950 text-xl'>
                      Total Price
                    </p>
                    <p className='font-semibold text-blue-950 text-xl'>
                      Rp{fees.total.toLocaleString('id-ID') || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='primary'
            htmlType='submit'
            loading={loading}
            disabled={loading}
          >
            Send request
          </Button>
        </section>
      </Form>
      <Modal
        open={success}
        centered
        footer={null}
        closeIcon={null}
        closable={false}
      >
        <div className='flex flex-col gap-4 items-center text-center'>
          <h2 className='text-xl font-semibold'>
            Request Successfully Created!
          </h2>
          <div className='relative w-[150px] h-[150px] mx-auto'>
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
          <Link
            href={'/profile/service-request'}
            className={`text-sm h-fit p-4 rounded-xl font-medium bg-blue-600 hover:!bg-blue-700 hover:text-white text-white`}
          >
            See Your Request
          </Link>
          <p className='text-sm'>
            This message will close in {countdown} seconds
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default CreateServiceRequestPage;
