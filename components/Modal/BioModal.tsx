import { translatorRepository } from '#/repository/translator';
import { Translator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onCancel: () => void;
  translator: Translator;
  mutate: () => void;
};

const BioModal = ({ open, onCancel, translator, mutate }: Props) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ bio: translator.bio });
  }, [translator]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      await translatorRepository.api.updateBio(translator.id, values);
      mutate();
      onCancel();
      message.success('Service request updated successfully');
    } catch (error: any) {
      message.error(error?.response?.body?.message || 'Error updating bio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>Update Bio</h1>
      </div>
      <Form
        form={form}
        className='text-black flex flex-col'
        layout='vertical'
        requiredMark={false}
        onFinish={handleFinish}
      >
        <Form.Item
          name='bio'
          rules={[
            {
              required: true,
              message: 'Please enter your bio',
            },
          ]}
        >
          <Input.TextArea
            rows={10}
            className='mt-4 text-sm 2xl:text-base focus:!border-none border-none !bg-zinc-100 focus:!ring-0 p-3 rounded-xl'
            placeholder='Enter your bio'
          />
        </Form.Item>
        <div className='flex justify-between w-full gap-4'>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            htmlType='button'
            onClick={onCancel}
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
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BioModal;
