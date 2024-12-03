'use client';

import { imgLanguage } from '#/constants/general';
import { serviceRepository } from '#/repository/service';
import { Language } from '#/types/LanguageTypes';
import { Service } from '#/types/ServiceTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  languages: Language[];
  mutate: () => void;
  service?: Service | null;
}

const ServiceModal = ({
  open,
  onCancel,
  languages,
  mutate,
  service,
}: Props) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const languageOptions = languages?.map((language) => ({
    value: language.id,
    label: (
      <div className='flex items-center gap-2 my-2 rounded-full'>
        <div>
          <Image
            src={imgLanguage(language.flagImage)}
            width={24}
            height={24}
            alt={language.name}
          />
        </div>
        <p>{language.name}</p>
      </div>
    ),
  }));

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        pricePerHour: Number(values.pricePerHour.replace(/\./g, '')),
      };
      let response;

      if (service) {
        response = await serviceRepository.api.updateService(service.id, data);
      } else {
        response = await serviceRepository.api.createService(data);
      }
      message.success(response.body.message);
      mutate();
      onCancel();
      form.resetFields();
    } catch (error: any) {
      message.error(error?.response?.body?.message || 'Error creating service');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        name: service.name,
        pricePerHour: service.pricePerHour
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        sourceLanguageId: service.sourceLanguage.id,
        targetLanguageId: service.targetLanguage.id,
      });
    }
  }, [form, service]);

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          {service ? 'Edit' : 'Create'} Service
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >
        <div className='flex flex-col gap-1 2xl:gap-2'>
          <p className='text-xs 2xl:text-sm font-medium'>Name</p>
          <Form.Item
            name={'name'}
            validateDebounce={500}
            rules={[
              {
                required: true,
                message: 'Please enter your service name',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='Service Name'
              suffix={
                <Icon
                  icon={'mingcute:service-fill'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
            />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-1 2xl:gap-2'>
          <p className='text-xs 2xl:text-sm font-medium'>Source Language</p>
          <Form.Item
            name={'sourceLanguageId'}
            rules={[
              {
                required: true,
                message: 'Please select service source language',
              },
            ]}
          >
            <Select
              placeholder='Select Source Language'
              className='h-14'
              options={languageOptions}
              suffixIcon={
                <Icon
                  icon={'mdi:chevron-down'}
                  height={32}
                  className='text-zinc-400'
                />
              }
            />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-1 2xl:gap-2'>
          <p className='text-xs 2xl:text-sm font-medium'>Target Language</p>
          <Form.Item
            name={'targetLanguageId'}
            rules={[
              {
                required: true,
                message: 'Please select service target language',
              },
            ]}
          >
            <Select
              placeholder='Select target Language'
              className='h-14'
              options={languageOptions}
              suffixIcon={
                <Icon
                  icon={'mdi:chevron-down'}
                  height={32}
                  className='text-zinc-400'
                />
              }
            />
          </Form.Item>
        </div>
        <div className='flex flex-col gap-1 2xl:gap-2'>
          <p className='text-xs 2xl:text-sm font-medium'>Price Per Hour</p>
          <Form.Item
            name={'pricePerHour'}
            validateDebounce={500}
            rules={[
              {
                required: true,
                message: 'Please enter your service price per hour',
              },
              {
                validator: async (_, value) => {
                  if (!value) return;

                  // Remove dots and check if the remaining string contains only numbers
                  const numberOnly = value.replace(/\./g, '');
                  if (!/^\d+$/.test(numberOnly)) {
                    throw new Error('Please enter a valid number');
                  }

                  // Optional: Add minimum/maximum validation
                  const numValue = parseInt(numberOnly);
                  if (numValue < 1000) {
                    throw new Error('Minimum price is Rp 1.000');
                  }
                  if (numValue > 10000000) {
                    throw new Error('Maximum price is Rp 10.000.000');
                  }
                },
              },
            ]}
            normalize={(value) => {
              if (!value) return value;

              // Remove existing dots and non-numeric characters
              const numberOnly = value.replace(/[^\d]/g, '');

              // Add dots for thousands
              return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }}
          >
            <Input
              type='text'
              placeholder='100.000'
              prefix={<p className='text-zinc-400 font-medium'>Rp</p>}
              className='h-14'
              maxLength={16}
            />
          </Form.Item>
        </div>
        <div className='flex justify-between w-full gap-4'>
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

export default ServiceModal;
