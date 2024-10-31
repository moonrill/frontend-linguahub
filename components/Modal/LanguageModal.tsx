'use client';

import { languagesRepository } from '#/repository/language';
import { uploadRepository } from '#/repository/upload';
import { Language } from '#/types/LanguageTypes';
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
  language?: Language | null;
}

const LanguageModal = ({ open, onCancel, language, mutate }: Props) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleCancel = () => {
    setImageUrl(null);
    form.resetFields();
    onCancel();
  };

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

  const handleUpload = async (file: any) => {
    try {
      const response = await uploadRepository.api.useUploadFlag(file);
      setImageUrl(response?.body?.flagImage);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      message.error('Error uploading image');
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      if (!language && !imageUrl) {
        message.error('Please upload an image');
        return;
      }

      const data = {
        ...values,
        flagImage: imageUrl,
      };
      let response;
      if (language) {
        response = await languagesRepository.api.updateLanguage(
          language.id,
          data
        );
      } else {
        response = await languagesRepository.api.createLanguage(data);
      }
      message.success(
        response?.body?.message || 'Language created successfully'
      );
      mutate();
      handleCancel();
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Error creating language'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (language) {
      console.log(language);
      form.setFieldsValue({
        name: language.name,
        code: language.code,
        flagImage: language.flagImage,
      });
      setImageUrl(language.flagImage);
    }
  }, [form, language]);

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          {language ? 'Edit' : 'Create'} Language
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >
        <div className='flex gap-3 w-full'>
          <div className='w-3/5'>
            <Form.Item
              name={'name'}
              validateDebounce={500}
              className='mb-0 w-full'
              rules={[
                {
                  required: true,
                  message: 'Please enter language name',
                },
              ]}
            >
              <Input
                type='text'
                placeholder='Name'
                suffix={
                  <Icon
                    icon={'cuida:translate-outline'}
                    height={24}
                    className='text-zinc-400'
                  />
                }
                className='h-14'
              />
            </Form.Item>
          </div>
          <div className='w-2/5'>
            <Form.Item
              name={'code'}
              validateDebounce={500}
              className='mb-0 w-full'
              rules={[
                {
                  required: true,
                  message: 'Please enter language code',
                },
                {
                  max: 3,
                  message: 'Code must be 3 characters',
                },
              ]}
            >
              <Input
                type='text'
                placeholder='Code'
                suffix={
                  <Icon
                    icon={'mingcute:hashtag-line'}
                    height={24}
                    className='text-zinc-400'
                  />
                }
                className='h-14'
              />
            </Form.Item>
          </div>
        </div>
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
            <Icon icon={'iwwa:upload'} height={64} className=' text-blue-600' />
            <p className='text-sm text-zinc-500'>
              Drag & drop or click to upload
            </p>
          </div>
        </Dragger>
        {language && (
          <p className='text-sm mt-2 font-light'>
            Upload a new image to replace the current one or let it be blank.
          </p>
        )}
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

export default LanguageModal;
