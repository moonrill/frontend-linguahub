import { couponRepository } from '#/repository/coupon';
import { Coupon } from '#/types/CouponTypes';
import { Event } from '#/types/EventTypes';
import { Icon } from '@iconify-icon/react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

interface CouponModalProps {
  open: boolean;
  onCancel: () => void;
  mutate: () => void;
  coupon?: Coupon | null;
  events: Event[];
}

const CouponModal = ({
  open,
  onCancel,
  mutate,
  coupon,
  events,
}: CouponModalProps) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Map events to options with filter functionality
  const eventOptions = Array.isArray(events)
    ? events
        .filter((event) =>
          event.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((event) => ({
          value: event.id,
          label: event.name,
        }))
    : [];

  useEffect(() => {
    if (coupon) {
      form.setFieldsValue({
        name: coupon.name,
        description: coupon.description,
        discountPercentage: coupon.discountPercentage,
        expiredAt: dayjs(coupon.expiredAt),
        eventId: coupon.event?.id,
      });
    } else {
      form.resetFields();
    }
  }, [coupon, form]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        description: values.description,
        discountPercentage: Number(values.discountPercentage),
        expiredAt: values.expiredAt,
        eventId: values.eventId,
      };

      if (coupon) {
        await couponRepository.api.updateCoupon(coupon.id, payload);
        message.success('Coupon updated successfully');
      } else {
        await couponRepository.api.createCoupon(payload);
        message.success('Coupon created successfully');
      }
      mutate();
      handleCancel();
    } catch (error) {
      message.error('Failed to save coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon='tabler:tag' className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          {coupon ? 'Edit Coupon' : 'Add New Coupon'}
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >
        <Form.Item
          name='name'
          rules={[
            { required: true, message: 'Please enter coupon name' },
            { max: 50, message: 'Name cannot exceed 50 characters' },
          ]}
        >
          <Input
            placeholder='Enter coupon name'
            className='h-16'
            suffix={
              <Icon icon='bi:alphabet' height={24} className='text-zinc-400' />
            }
          />
        </Form.Item>

        <Form.Item
          name='description'
          rules={[
            { required: true, message: 'Please enter description' },
            { max: 200, message: 'Description cannot exceed 200 characters' },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder='Enter description'
            className='focus:!border-none border-none !bg-zinc-100 focus:!ring-0 py-4 px-6 rounded-xl'
            style={{ backgroundColor: '#f4f4f5' }}
          />
        </Form.Item>

        {!coupon && (
          <Form.Item
            name='eventId'
            rules={[{ required: true, message: 'Please select an event' }]}
          >
            <Select
              placeholder='Select event'
              className='h-16'
              options={eventOptions}
              showSearch
              filterOption={false}
              onSearch={handleSearch}
              searchValue={searchText}
              notFoundContent={
                <div className='text-center py-2 text-gray-500'>
                  No events found
                </div>
              }
            />
          </Form.Item>
        )}

        <Form.Item
          name='expiredAt'
          rules={[
            { required: true, message: 'Please select expiration date' },
            {
              validator: (_, value) =>
                value && dayjs(value).isBefore(dayjs(), 'day')
                  ? Promise.reject('Expiration date cannot be in the past')
                  : Promise.resolve(),
            },
          ]}
        >
          <DatePicker
            format='YYYY-MM-DD HH:mm'
            placeholder='Select expiration date'
            value={form.getFieldValue('expiredAt')}
            onChange={(value: Dayjs | null) =>
              form.setFieldValue('expiredAt', value)
            }
            disabledDate={(current: Dayjs) =>
              current && current < dayjs().startOf('day')
            }
            suffixIcon={<Icon icon='uiw:date' className='text-2xl' />}
            className='h-14 w-full'
            showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>

        <Form.Item
          name='discountPercentage'
          rules={[
            { required: true, message: 'Please enter discount percentage' },
            {
              validator: async (_, value) =>
                value >= 0 && value <= 100
                  ? Promise.resolve()
                  : Promise.reject('Discount must be between 0 and 100'),
            },
          ]}
        >
          <Input
            type='number'
            min={0}
            max={100}
            placeholder='Enter discount percentage'
            className='h-16'
            suffix={
              <Icon
                icon='bi:alphabet'
                height={24}
                className='text-zinc-400 hidden'
              />
            }
          />
        </Form.Item>

        <div className='flex justify-between gap-4 mt-4'>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='primary'
            htmlType='submit'
            loading={loading}
            disabled={loading}
          >
            {coupon ? 'Update Coupon' : 'Create Coupon'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CouponModal;
