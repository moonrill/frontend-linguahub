"use client";
import LanguageSelector from '#/components/LanguageSelector';
import SpecializationSelector from '#/components/SpecializationSelector';
import { midtransSupportBanks } from '#/constants/banks';
import { languagesRepository } from '#/repository/language';
import { specializationRepository } from '#/repository/specialization';
import { RegisterFormData, TranslatorFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Form, Input, Select } from 'antd';

interface ProfessionalInfoFormProps {
  updateFormData: (data: Partial<RegisterFormData>) => void;
}

export const ProfessionalInfoForm = ({ updateFormData }: ProfessionalInfoFormProps) => {
  const { data: languages, isLoading: isLoadingLanguages } =
    languagesRepository.hooks.useAllLanguages(15, 1);
  const { data: specializations, isLoading: isLoadingSpecializations } =
    specializationRepository.hooks.useAllSpecializations(15, 1);

  return (
    <>
      <Form.Item
        name="yearsOfExperience"
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
          type="text"
          placeholder="Years Of Experience"
          inputMode="numeric"
          pattern="[0-9]*"
          suffix={
            <Icon
              icon="fluent:clock-bill-16-filled"
              height={24}
              className="text-zinc-400"
            />
          }
          className="h-14"
          onChange={(e) =>
            updateFormData({ yearsOfExperience: Number(e.target.value) })
          }
        />
      </Form.Item>

      <Form.Item
        name="portfolioLink"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please enter your portfolio link' }]}
      >
        <Input
          type="text"
          placeholder="Portfolio Link"
          suffix={<Icon icon="mdi:link-variant" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ portfolioLink: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="bank"
        validateDebounce={500}
        rules={[
          {
            required: true,
            message: 'Please select your bank ',
          },
        ]}
      >
        <Select
          placeholder="Bank"
          className="h-14"
          showSearch
          suffixIcon={
            <Icon
              icon="mdi:chevron-down"
              height={32}
              className="text-zinc-400"
            />
          }
          options={midtransSupportBanks.map((bank) => ({
            label: bank,
            value: bank,
          }))}
          onChange={(value) => updateFormData({ bank: value })}
        />
      </Form.Item>

      <Form.Item
        name="bankAccountNumber"
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
          type="text"
          inputMode="numeric"
          placeholder="Bank Account Number"
          pattern="[0-9]*"
          suffix={
            <Icon
              icon="mingcute:bank-card-fill"
              height={24}
              className="text-zinc-400"
            />
          }
          className="h-14"
          onChange={(e) =>
            updateFormData({ bankAccountNumber: e.target.value })
          }
        />
      </Form.Item>

      <LanguageSelector
        languages={languages?.data}
        isLoading={isLoadingLanguages}
        selectedLanguages={[]}
        setSelectedLanguages={() => {}}
        updateFormData={updateFormData}
      />

      <SpecializationSelector
        specializations={specializations?.data}
        isLoading={isLoadingSpecializations}
        selectedSpecializations={[]}
        setSelectedSpecializations={() => {}}
        updateFormData={updateFormData}
      />
    </>
  );
};