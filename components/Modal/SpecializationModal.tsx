'use client';

import { specializationRepository } from '#/repository/specialization';
import { uploadRepository } from '#/repository/upload';
import { Specialization } from '#/types/SpecializationTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Modal, Upload, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  mutate: () => void;
  specialization?: Specialization | null;
}

const SpecializationModal = ({
  open,
  onCancel,
  specialization,
  mutate,
}: Props) => {
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
    listType: 'picture',
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

  const handleUpload = async (file: any) => {
    try {
      const response = await uploadRepository.api.useUploadLogo(file);
      form.setFieldValue('logo', response?.body?.logo);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      message.error('Error uploading image');
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      let response;
      if (specialization) {
        response = await specializationRepository.api.updateSpecialization(
          specialization.id,
          values
        );
      } else {
        response = await specializationRepository.api.createSpecialization(
          values
        );
      }
      message.success(
        response?.body?.message || 'Specialization created successfully'
      );
      mutate();
      handleCancel();
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Error creating specialization'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (specialization) {
      form.setFieldsValue({
        name: specialization.name,
        logo: specialization.logo,
      });
    }
  }, [form, specialization]);

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          {specialization ? 'Edit' : 'Create'} Specialization
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >
        <Form.Item
          name={'name'}
          validateDebounce={500}
          className='mb-0 w-full'
          rules={[
            {
              required: true,
              message: 'Please enter specialization name',
            },
          ]}
        >
          <Input
            type='text'
            placeholder='Name'
            suffix={
              <Icon
                icon={'bi:alphabet'}
                height={24}
                className='text-zinc-400'
              />
            }
            className='h-14'
          />
        </Form.Item>
        <Form.Item
          name={'logo'}
          rules={[
            { required: true, message: 'Please upload specialization logo' },
          ]}
        >
          <Dragger
            {...uploadProps}
            style={{ width: '100%', padding: '3rem 0' }}
            onChange={(info: UploadChangeParam<UploadFile>) => {
              const { file } = info;
              if (file.status !== 'removed') {
                handleUpload(file);
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
          <p className='text-sm mt-2'>Use 24px x 24px image for best results</p>
          {specialization && (
            <p className='text-sm mt-2 font-light'>
              Upload a new image to replace the current one or let it be blank.
            </p>
          )}
        </Form.Item>
        <div className='flex justify-between w-full gap-4 mt-4'>
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
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SpecializationModal;
