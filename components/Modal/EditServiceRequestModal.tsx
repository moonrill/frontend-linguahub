import { serviceRequestRepository } from '#/repository/service-request';
import { Booking } from '#/types/BookingTypes';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  TimePicker,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onCancel: () => void;
  serviceRequest: Booking;
  mutate: () => void;
};

const EditServiceRequestModal = ({
  open,
  onCancel,
  serviceRequest,
  mutate,
}: Props) => {
  const [form] = useForm();

  // Set default values
  useEffect(() => {
    form.setFieldsValue({
      bookingDate: dayjs(serviceRequest?.bookingDate),
      startAt: moment(serviceRequest.startAt.slice(0, 5), 'HH:mm'),
      endAt: moment(serviceRequest.endAt.slice(0, 5), 'HH:mm'),
      note: serviceRequest?.notes,
      location: serviceRequest?.location,
    });
  }, [form, serviceRequest]);

  const handleFinish = async (values: any) => {
    const data = {
      ...values,
      startAt: values.startAt.format('HH:mm'),
      endAt: values.endAt.format('HH:mm'),
    };

    try {
      await serviceRequestRepository.api.updateServiceRequest(
        serviceRequest.id,
        data
      );
      message.success('Service request updated successfully');
    } catch (error) {
      message.error('Failed to edit service request');
    } finally {
      onCancel();
      mutate();
    }
  };
  return (
    <Modal open={open} onCancel={onCancel} centered footer={null}>
      <>
        <div className='flex items-center gap-2'>
          <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
            <Icon icon={'lets-icons:edit'} className='text-2xl' />
          </div>
          <h1 className='text-lg 2xl:text-xl font-semibold'>
            Edit Service Request
          </h1>
        </div>
        <Form
          className='mt-6 text-black flex flex-col'
          onFinish={handleFinish}
          form={form}
        >
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
                minDate={dayjs(dayjs().format('YYYY-MM-DD'))}
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
          <div className='flex justify-between w-full gap-4'>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='default'
              htmlType='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='primary'
              htmlType='submit'
            >
              Save
            </Button>
          </div>
        </Form>
      </>
    </Modal>
  );
};

export default EditServiceRequestModal;
