import { config } from '#/config/app';
import { Icon } from '@iconify-icon/react';
import { Button, DatePicker, Form, Modal, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  role: 'admin' | 'translator';
}

const ExportModal: React.FC<Props> = ({ open, onCancel, role }) => {
  const adminStatusList = ['Pending', 'Paid', 'Failed', 'Refund'];
  const translatorStatusList = ['Pending', 'Paid', 'Failed'];
  const typeList = ['Translator', 'Client'];

  const statusList = role === 'admin' ? adminStatusList : translatorStatusList;

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    setSelectedStatus((prev) =>
      checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedType((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handleFinish = async (values: any) => {
    const data = {
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
      status: selectedStatus.map((s) => s.toLowerCase()),
      type: selectedType.map((t) => t.toLowerCase()),
    };

    try {
      const response = await fetch(`${config.baseUrl}/payments/export`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} centered footer={null}>
      <div className='flex items-center gap-2 mb-6'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon='uil:export' className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>Export Options</h1>
      </div>
      <Form layout='vertical' onFinish={handleFinish} requiredMark={false}>
        <Form.Item
          label='Date Range'
          name='dateRange'
          rules={[{ required: true }]}
        >
          <DatePicker.RangePicker
            className='w-full'
            disabledDate={disabledDate}
            suffixIcon={
              <Icon
                icon='ic:round-date-range'
                height={24}
                className='text-zinc-400'
              />
            }
            format={'YYYY-MM-DD'}
          />
        </Form.Item>
        {role === 'admin' && (
          <Form.Item
            label='Payment Type'
            name='paymentType'
            rules={[
              {
                validator: () =>
                  selectedType.length > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Please select at least one type')
                      ),
              },
            ]}
          >
            <div className='flex flex-wrap gap-2 md:gap-4'>
              {typeList.map((type) => (
                <Tag.CheckableTag
                  key={type}
                  checked={selectedType.includes(type)}
                  onChange={(checked) => handleTypeChange(type, checked)}
                  className='rounded-full px-6 py-2 border-zinc-200 m-0'
                >
                  {type}
                </Tag.CheckableTag>
              ))}
            </div>
          </Form.Item>
        )}
        <Form.Item
          label='Status'
          name='status'
          rules={[
            {
              validator: () =>
                selectedStatus.length > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('Please select at least one status')
                    ),
            },
          ]}
        >
          <div className='flex flex-wrap gap-2 md:gap-4'>
            {statusList.map((status) => (
              <Tag.CheckableTag
                key={status}
                checked={selectedStatus.includes(status)}
                onChange={(checked) => handleStatusChange(status, checked)}
                className='rounded-full px-6 py-2 border-zinc-200 m-0'
              >
                {status}
              </Tag.CheckableTag>
            ))}
          </div>
        </Form.Item>
        <Button
          type='primary'
          className='py-3 px-5 w-full h-fit text-sm rounded-xl'
          htmlType='submit'
        >
          Export
        </Button>
      </Form>
    </Modal>
  );
};

export default ExportModal;
