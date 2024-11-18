"use client";

import { RegisterFormData } from '#/types/RegisterTypes';
import { Button, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAddress } from '#/repository/address';
import { authRepository } from '#/repository/auth';
import { Addresses, City, District, Province, SelectedAddressName, SubDistrict } from '#/types/AddressTypes';
import { PersonalInfoForm } from './components/StepOne';
import { AddressForm } from './components/StepTwo';
import { ProfessionalInfoForm } from './components/StepThree';
import { DocumentsUploadForm } from './components/StepFour';
import Link from 'next/link';

const RegisterUi = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);
  const [selectedAddressName, setSelectedAddressName] = useState<SelectedAddressName>({});
  const [addresses, setAddresses] = useState<Addresses>({
    province: [],
    city: [],
    district: [],
    subDistrict: [],
  });

  useEffect(() => {
    fetchAddress('provinces').then((data) => 
      setAddresses((prev) => ({ ...prev, province: data as Province[] }))
    );
  }, []);

  useEffect(() => {
    if (formData.provinceId) {
      fetchAddress('regencies', formData.provinceId).then((data) => {
        setAddresses((prev) => ({ ...prev, city: data as City[] }));
      });
    }
  }, [formData.provinceId]);

  useEffect(() => {
    if (formData.cityId) {
      fetchAddress('districts', formData.cityId).then((data) => {
        setAddresses((prev) => ({ ...prev, district: data as District[] }));
      });
    }
  }, [formData.cityId]);

  useEffect(() => {
    if (formData.districtId) {
      fetchAddress('villages', formData.districtId).then((data) => {
        setAddresses((prev) => ({ ...prev, subDistrict: data as SubDistrict[] }));
      });
    }
  }, [formData.districtId]);

  useEffect(() => {
    if (
      formData.provinceId ||
      formData.cityId ||
      formData.districtId ||
      formData.subDistrictId ||
      formData.street
    ) {
      setSelectedAddressName({
        province: formData.province,
        city: formData.city,
        district: formData.district,
        subDistrict: formData.subDistrict,
      });
      form.setFieldsValue({
        provinceId: formData.provinceId,
        cityId: formData.cityId,
        districtId: formData.districtId,
        subDistrictId: formData.subDistrictId,
        street: formData.street,
      });
    }
  }, [formData, form]);

  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSelectionChange = (
    addressType: string,
    label: string,
    value: string
  ) => {
    setSelectedAddressName((prev) => ({
      ...prev,
      [addressType.slice(0, -2)]: label,
    }));

    updateFormData({ [addressType]: value });
    updateFormData({ [addressType.slice(0, -2)]: label });

    const resetTypes = {
      provinceId: ['cityId', 'districtId', 'subDistrictId'],
      cityId: ['districtId', 'subDistrictId'],
      districtId: ['subDistrictId'],
    };

    resetTypes[addressType as keyof typeof resetTypes]?.forEach((type) => {
      updateFormData({ [type]: null });
      setSelectedAddressName((prev) => ({
        ...prev,
        [type.slice(0, -2)]: null,
      }));
      setAddresses((prev) => ({ ...prev, [type]: [] }));
      form.resetFields([type]);
    });
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const clientData = {
        ...formData,
        ...values,
      };
      await authRepository.api.register(clientData);
      message.success('Registration successful');
    } catch (error: any) {
      message.error(error?.response?.body?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-4 flex-grow overflow-hidden">
      <Form
        form={form}
        className="flex flex-col justify-between flex-1 p-6 bg-slate-50 rounded-lg shadow-lg"
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        initialValues={formData}
      >
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <PersonalInfoForm updateFormData={updateFormData} />
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Address Information</h2>
            <AddressForm
              addresses={addresses}
              formData={formData}
              handleSelectionChange={handleSelectionChange}
              updateFormData={updateFormData}
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Professional Information</h2>
            <ProfessionalInfoForm 
              updateFormData={updateFormData} 
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Documents Upload</h2>
            <DocumentsUploadForm updateFormData={updateFormData} />
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center mt-10">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="h-16 w-full transition-colors duration-300 hover:bg-blue-600"
          >
            Register
          </Button>
          
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default RegisterUi;