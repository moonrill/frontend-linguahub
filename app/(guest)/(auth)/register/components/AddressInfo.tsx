import AddressSelect from '#/components/AddressSelect';
import { fetchAddress } from '#/repository/address';
import { authRepository } from '#/repository/auth';
import {
  Addresses,
  City,
  District,
  Province,
  SelectedAddressName,
  SubDistrict,
} from '#/types/AddressTypes';
import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type AddressInfoProps = {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
};

const AddressInfo = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}: AddressInfoProps) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [selectedAddressName, setSelectedAddressName] =
    useState<SelectedAddressName>({});
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
        setAddresses((prev) => ({
          ...prev,
          subDistrict: data as SubDistrict[],
        }));
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

    console.log(formData);

    if (formData.role === 'translator') {
      nextStep();
    } else {
      try {
        const clientData = {
          ...formData,
          values,
        };

        await authRepository.api.register(clientData);

        nextStep();
      } catch (error: any) {
        message.error(error?.response?.body?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex pt-10 flex-grow overflow-hidden'>
      <Form
        form={form}
        className='flex flex-col justify-between flex-1'
        requiredMark={false}
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
      >
        <div>
          <div className='grid md:grid-cols-2 md:gap-4'>
            <Form.Item
              name='provinceId'
              rules={[{ required: true, message: 'Please select a province' }]}
            >
              <AddressSelect
                placeholder='Province'
                options={addresses.province}
                disabled={false}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('provinceId', label, value)
                }
              />
            </Form.Item>
            <Form.Item
              name='cityId'
              rules={[{ required: true, message: 'Please select a city' }]}
            >
              <AddressSelect
                placeholder='City'
                options={addresses.city}
                disabled={!formData.provinceId}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('cityId', label, value)
                }
              />
            </Form.Item>
          </div>
          <div className='grid md:grid-cols-2 md:gap-4'>
            <Form.Item
              name='districtId'
              rules={[{ required: true, message: 'Please select a district' }]}
            >
              <AddressSelect
                placeholder='District'
                options={addresses.district}
                disabled={!formData.cityId}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('districtId', label, value)
                }
              />
            </Form.Item>
            <Form.Item
              name='subDistrictId'
              rules={[
                { required: true, message: 'Please select a sub-district' },
              ]}
            >
              <AddressSelect
                placeholder='Sub District'
                options={addresses.subDistrict}
                disabled={!formData.districtId}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('subDistrictId', label, value)
                }
              />
            </Form.Item>
          </div>
          <Form.Item
            name={'street'}
            validateDebounce={500}
            rules={[
              {
                required: true,
                message: 'Please enter your street',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='Street'
              onChange={(e) => updateFormData({ street: e.target.value })}
              suffix={
                <Icon
                  icon={'fluent:street-sign-24-filled'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
            />
          </Form.Item>
        </div>

        <div className='flex flex-col gap-4 items-center'>
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
              loading={loading}
            >
              {formData.role === 'translator' ? 'Continue' : 'Create account'}
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

export default AddressInfo;
