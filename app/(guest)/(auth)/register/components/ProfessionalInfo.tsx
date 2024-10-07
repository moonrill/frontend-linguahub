import LanguageSelector from '#/components/LanguageSelector';
import SpecializationSelector from '#/components/SpecializationSelector';
import { midtransSupportBanks } from '#/constants/banks';
import { languagesRepository } from '#/repository/language';
import { specializationRepository } from '#/repository/specialization';
import { RegisterFormData, TranslatorFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

type ProfessionalInfoProps = {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
};

const ProfessionalInfo = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}: ProfessionalInfoProps) => {
  const { data: languages, isLoading: isLoadingLanguages } =
    languagesRepository.hooks.useAllLanguages(15, 1);
  const { data: specializations, isLoading: isLoadingSpecializations } =
    specializationRepository.hooks.useAllSpecializations(15, 1);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    (formData as Partial<TranslatorFormData>).languages || []
  );
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >((formData as Partial<TranslatorFormData>).specializations || []);

  const onFinish = (values: Partial<TranslatorFormData>) => {
    const updatedValues = {
      ...values,
      languages: selectedLanguages,
      specializations: selectedSpecializations,
    };

    updateFormData(updatedValues);
    console.log(formData);
  };

  return (
    <div className='flex pt-10 flex-grow overflow-hidden'>
      <Form
        className='flex flex-col justify-between flex-1'
        autoComplete='off'
        requiredMark={false}
        layout='vertical'
        onFinish={onFinish}
        initialValues={formData}
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

        <div className='flex flex-col gap-4 items-center mt-4'>
          <div className='flex justify-between w-full gap-4'>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='default'
              htmlType='button'
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='primary'
              htmlType='submit'
            >
              Continue
            </Button>
          </div>
          <p className='mb-0 text-sm'>
            Already have an account ?{' '}
            <Link href={'/login'} className='text-blue-600 font-medium'>
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default ProfessionalInfo;
