'use client';

import { eventRepository } from '#/repository/event';
import { uploadRepository } from '#/repository/upload';
import { Event } from '#/types/EventTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Modal, Upload, UploadProps, TimePicker, DatePicker, Calendar} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


interface Props {
  open: boolean;
  onCancel: () => void;
  mutate: () => void;
  event?: Event | null;
}

const currentDate = dayjs().format('YYYY-MM-DD');

const EventModal = ({ open, onCancel, event, mutate }: Props) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: '.jpg,.jpeg,.png,.svg',
    listType: 'picture-card',
    iconRender: () => (
      <Icon icon='basil:document-solid' height={64} className='text-blue-600 mb-4' />
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

  const handleUpload = async (file: UploadFile) => {
    try {
      const response = await uploadRepository.api.useUploadPoster(file);
      form.setFieldValue('poster', response?.body?.poster);
      message.success('Image uploaded successfully');
    } catch (error: any) {
      console.error(error);
      message.error(error?.response?.body?.message || 'Error uploading image');
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = event
        ? await eventRepository.api.updateEvent(event.id, values)
        : await eventRepository.api.createEvent(values);

      message.success(response?.body?.message || 'Event created successfully');
      mutate();
      handleCancel();
    } catch (error: any) {
      message.error(error?.response?.body?.message || 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        name: event.name,
        poster: event.poster,
        startDate: dayjs(event.startDate), 
        endDate: dayjs(event.endDate), 
        description: event.description,
      });
    }
  }, [form, event]);


  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon='lets-icons:edit' className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          {event ? 'Edit' : 'Create'} Event
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >

<Form.Item
          name='poster'
          rules={[{ required: true, message: 'Please upload event poster' }]}
        >
          <Dragger
            {...uploadProps}
            style={{ width: '100%', padding: '3rem 0' }}
            onChange={(info: UploadChangeParam<UploadFile>) => {
              const { file } = info;
              if (file.status !== 'removed') handleUpload(file);
            }}
          >
            <div className='flex flex-col justify-center items-center'>
              <Icon icon='iwwa:upload' height={64} className='text-blue-600' />
              <p className='text-sm text-zinc-500'>Drag & drop or click to upload</p>
            </div>
          </Dragger>
          <p className='text-sm mt-2'>Use 24px x 24px image for best results</p>
          {event && (
            <p className='text-sm mt-2 font-light'>
              Upload a new image to replace the current one or leave it blank.
            </p>
          )}
        </Form.Item>

        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Please enter event name' }]}
        >
          <Input
            placeholder='Enter event name'
            className='h-16'
            suffix={<Icon icon='bi:alphabet' height={24} className='text-zinc-400' />}
          />
        </Form.Item>

        <div className='grid md:grid-cols-2 gap-4'>
          <Form.Item
            name="startDate"
            rules={[{ required: true, message: 'Please select start time' }]}>
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              placeholder="Start Date"
              value={form.getFieldValue('startDate')}
              onChange={(value) => form.setFieldValue('startDate', value)}
              suffixIcon={<Icon icon="mdi:clock-time-three-outline" className="text-2xl" />}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              showTime={{ format: 'HH:mm' }} 
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            dependencies={['startDate']}
            rules={[
              { required: true, message: 'Please select end time' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startAt = getFieldValue('startDate');
                  if (!value || !startAt || value.isAfter(startAt)) return Promise.resolve();
                  return Promise.reject(new Error('End time must be later than start time'));
                },
              }),
            ]}>
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              placeholder="End Date"
              value={form.getFieldValue('endDate')}
              onChange={(value) => form.setFieldValue('endDate', value)}
              suffixIcon={<Icon icon="mdi:clock-outline" className="text-2xl" />}
              showTime={{ format: 'HH:mm' }} 
            />
          </Form.Item>
        </div>

        <Form.Item
  name="description"
  rules={[{ required: true, message: 'Please input a description' }]}
>
  <Input.TextArea
    rows={4}
    placeholder="Event description"
    className="h-14 bg-[#f4f4f5] hover:bg-[#e5e7eb] !ring-none !focus:ring-amber-600 !hover:border-transparent"
    style={{ backgroundColor: '#f4f4f5' }}
    onFocus={(e) => {
      e.target.style.backgroundColor = '#f4f4f5'; 
    }}
    onBlur={(e) => {
      if (!e.target.value) {
        e.target.style.backgroundColor = '#e5e7eb'; 
      }
    }}
  />
</Form.Item>



        <div className='flex justify-between gap-4 mt-4'>
        <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            htmlType='button'
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
            Add Event
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EventModal;
