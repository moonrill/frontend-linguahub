import AddressSelect from '#/components/AddressSelect';
import { fetchAddress } from '#/repository/address';
import { authRepository } from '#/repository/auth';
import {
  Addresses,
  City,
  District,
  Province,
  SelectedAddress,
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
  const [addresses, setAddresses] = useState<Addresses>({
    province: [],
    city: [],
    district: [],
    subDistrict: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({});
  const [selectedAddressNames, setSelectedAddressNames] =
    useState<SelectedAddress>({});

  useEffect(() => {
    fetchAddress('provinces').then((data) =>
      setAddresses((prev) => ({ ...prev, province: data as Province[] }))
    );
  }, []);

  useEffect(() => {
    if (selectedAddress.province) {
      fetchAddress('regencies', selectedAddress.province).then((data) => {
        setAddresses((prev) => ({ ...prev, city: data as City[] }));
      });
    }
  }, [selectedAddress.province]);

  useEffect(() => {
    if (selectedAddress.city) {
      fetchAddress('districts', selectedAddress.city).then((data) => {
        setAddresses((prev) => ({ ...prev, district: data as District[] }));
      });
    }
  }, [selectedAddress.city]);

  useEffect(() => {
    if (selectedAddress.district) {
      fetchAddress('villages', selectedAddress.district).then((data) => {
        setAddresses((prev) => ({
          ...prev,
          subDistrict: data as SubDistrict[],
        }));
      });
    }
  }, [selectedAddress.district]);

  const handleSelectionChange = (
    addressType: string,
    value: string,
    label: string
  ) => {
    setSelectedAddress((prev) => ({
      ...prev,
      [addressType]: value,
    }));
    setSelectedAddressNames((prev) => ({
      ...prev,
      [addressType]: label,
    }));

    const resetTypes = {
      province: ['city', 'district', 'subDistrict'],
      city: ['district', 'subDistrict'],
      district: ['subDistrict'],
    };

    resetTypes[addressType as keyof typeof resetTypes]?.forEach((type) => {
      setSelectedAddress((prev) => ({ ...prev, [type]: undefined }));
      setSelectedAddressNames((prev) => ({ ...prev, [type]: undefined }));
      setAddresses((prev) => ({ ...prev, [type]: [] }));
      form.setFieldsValue({ [type]: undefined });
    });
  };

  const onFinish = async (values: any) => {
    setLoading(true); // Set loading state to true
    if (formData.role === 'translator') {
      updateFormData(selectedAddressNames);
      updateFormData({ street: values.street });
      nextStep();
    } else {
      try {
        const clientData = {
          ...formData,
          ...selectedAddressNames,
          street: values.street,
        };

        await authRepository.manipulateData.register(clientData);

        nextStep();
      } catch (error) {
        message.error('Something went wrong');
      } finally {
        setLoading(false); // Set loading state to false after process
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
        initialValues={{ street: formData.street }}
        autoComplete='off'
      >
        <div>
          <div className='grid md:grid-cols-2 md:gap-4'>
            <Form.Item
              name='province'
              rules={[{ required: true, message: 'Please select a province' }]}
            >
              <AddressSelect
                type='province'
                placeholder='Province'
                options={addresses.province}
                disabled={false}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('province', value, label)
                }
              />
            </Form.Item>
            <Form.Item
              name='city'
              rules={[{ required: true, message: 'Please select a city' }]}
            >
              <AddressSelect
                type='city'
                placeholder='City'
                options={addresses.city}
                disabled={!selectedAddress.province}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('city', value, label)
                }
              />
            </Form.Item>
          </div>
          <div className='grid md:grid-cols-2 md:gap-4'>
            <Form.Item
              name='district'
              rules={[{ required: true, message: 'Please select a district' }]}
            >
              <AddressSelect
                type='district'
                placeholder='District'
                options={addresses.district}
                disabled={!selectedAddress.city}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('district', value, label)
                }
              />
            </Form.Item>
            <Form.Item
              name='subDistrict'
              rules={[
                { required: true, message: 'Please select a sub-district' },
              ]}
            >
              <AddressSelect
                type='subDistrict'
                placeholder='Sub District'
                options={addresses.subDistrict}
                disabled={!selectedAddress.district}
                onChange={(label: string, value: string) =>
                  handleSelectionChange('subDistrict', value, label)
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
              loading={loading} // Disable button while loading
            >
              {formData.role === 'translator' ? 'Next' : 'Create account'}
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
