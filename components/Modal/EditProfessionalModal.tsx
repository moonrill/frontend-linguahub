'use client';

import { midtransSupportBanks } from '#/constants/banks';
import { languagesRepository } from '#/repository/language';
import { specializationRepository } from '#/repository/specialization';
import { translatorRepository } from '#/repository/translator';
import { Translator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import LanguageSelector from '../LanguageSelector';
import SpecializationSelector from '../SpecializationSelector';

type Props = {
  open: boolean;
  onCancel: () => void;
  translator: Translator;
  mutate: () => void;
};

const EditProfessionalModal = ({
  open,
  onCancel,
  translator,
  mutate,
}: Props) => {
  const [form] = useForm();

  const { data: languages, isLoading: isLoadingLanguages } =
    languagesRepository.hooks.useAllLanguages(15, 1);
  const { data: specializations, isLoading: isLoadingSpecializations } =
    specializationRepository.hooks.useAllSpecializations(15, 1);

  const [loading, setLoading] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (open && translator) {
      form.setFieldsValue({
        yearsOfExperience: translator.yearsOfExperience,
        portfolioLink: translator.portfolioLink,
        bank: translator.bank,
        bankAccountNumber: translator.bankAccountNumber,
      });

      translator?.languages?.forEach((language) => {
        setSelectedLanguages((prev) => [...prev, language.id]);
      });
      translator?.specializations?.forEach((specialization) => {
        setSelectedSpecializations((prev) => [...prev, specialization.id]);
      });
    }
  }, [form, translator, open]);

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      const data = {
        ...values,
        languages: selectedLanguages,
        specializations: selectedSpecializations,
      };

      await translatorRepository.api.updateProfessionalInfo(
        translator.id,
        data
      );

      setSelectedLanguages([]);
      setSelectedSpecializations([]);
      message.success('Professional info updated successfully');
      onCancel();
      mutate();
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Error updating professional info'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedLanguages([]);
    setSelectedSpecializations([]);
    onCancel();
  };

  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>
          Edit Professional Info
        </h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        layout='vertical'
        requiredMark={false}
        onFinish={handleFinish}
      >
        <div>
          <Form.Item
            name={'yearsOfExperience'}
            validateDebounce={500}
            validateFirst
            rules={[
              {
                required: true,
                message: 'Please enter your years of experience',
              },
              {
                pattern: /^\d+$/,
                message: 'Years of experience must be number!',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='Years Of Experience'
              inputMode='numeric'
              pattern='[0-9]*'
              suffix={
                <Icon
                  icon={'fluent:clock-bill-16-filled'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
            />
          </Form.Item>
          <Form.Item
            name={'portfolioLink'}
            validateDebounce={500}
            rules={[
              {
                required: true,
                message: 'Please enter your portfolio link',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='Portfolio Link'
              suffix={
                <Icon
                  icon={'mdi:link-variant'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
            />
          </Form.Item>
          <Form.Item
            name={'bank'}
            validateDebounce={500}
            rules={[
              {
                required: true,
                message: 'Please select your bank ',
              },
            ]}
          >
            <Select
              placeholder='Bank'
              className='h-14'
              showSearch
              suffixIcon={
                <Icon
                  icon={'mdi:chevron-down'}
                  height={32}
                  className='text-zinc-400'
                />
              }
              options={midtransSupportBanks.map((bank) => ({
                label: bank,
                value: bank,
              }))}
            />
          </Form.Item>
          <Form.Item
            name={'bankAccountNumber'}
            validateDebounce={500}
            validateFirst
            rules={[
              {
                required: true,
                message: 'Please enter your bank account number',
              },
              {
                pattern: /^\d+$/,
                message: 'Bank account number must be number!',
              },
            ]}
          >
            <Input
              type='text'
              inputMode='numeric'
              placeholder='Bank Account Number'
              pattern='[0-9]*'
              suffix={
                <Icon
                  icon={'mingcute:bank-card-fill'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
            />
          </Form.Item>
          <LanguageSelector
            languages={languages?.data}
            isLoading={isLoadingLanguages}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
          />

          <SpecializationSelector
            specializations={specializations?.data}
            isLoading={isLoadingSpecializations}
            selectedSpecializations={selectedSpecializations}
            setSelectedSpecializations={setSelectedSpecializations}
          />
        </div>
        <div className='flex justify-between w-full gap-4'>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            htmlType='button'
            disabled={loading}
            onClick={handleCancel}
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

export default EditProfessionalModal;
