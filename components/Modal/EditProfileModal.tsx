'use client';

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
import { User } from '#/types/UserType';
import { Icon } from '@iconify-icon/react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AddressSelect from '../AddressSelect';

type Props = {
  open: boolean;
  onCancel: () => void;
  user: User;
  mutate: () => void;
};

const EditProfileModal = ({ open, onCancel, user, mutate }: Props) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Addresses>({
    province: [],
    city: [],
    district: [],
    subDistrict: [],
  });
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({});

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user?.userDetail?.fullName,
        gender: user?.userDetail?.gender,
        phoneNumber: user?.userDetail?.phoneNumber,
        dateOfBirth: user?.userDetail?.dateOfBirth
          ? dayjs(user?.userDetail?.dateOfBirth)
          : null,
        street: user?.userDetail?.street,
      });
    }
  }, [user, form]);

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
      setSelectedAddress((prev) => ({ ...prev, [type]: null }));
      setSelectedAddressNames((prev) => ({ ...prev, [type]: null }));
      setAddresses((prev) => ({ ...prev, [type]: [] }));
      form.resetFields([type]);
    });
  };

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
          : null,
      };
      await authRepository.manipulateData.updateProfile(user?.id, data);

      message.success('Profile updated successfully');
      onCancel();
      mutate();
    } catch (error) {
      message.error('Failed to edit profile');
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
        <h1 className='text-lg 2xl:text-xl font-semibold'>Edit Profile</h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col'
        onFinish={handleFinish}
      >
        <Form.Item
          name={'fullName'}
          validateDebounce={500}
          rules={[
            {
              required: true,
              message: 'Please enter your full name',
            },
          ]}
        >
          <Input
            type='text'
            placeholder='Full Name'
            suffix={
              <Icon
                icon={'material-symbols:id-card'}
                height={24}
                className='text-zinc-400'
              />
            }
            className='h-14'
          />
        </Form.Item>
        <Form.Item
          name={'gender'}
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select
            placeholder='Gender'
            className='h-14 w-full border-none'
            menuItemSelectedIcon={
              <Icon
                icon={'ci:check-big'}
                height={24}
                className='text-zinc-500'
              />
            }
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            suffixIcon={
              <Icon
                icon={'mdi:chevron-down'}
                height={32}
                className='text-zinc-400'
              />
            }
          />
        </Form.Item>
        <Form.Item
          name={'phoneNumber'}
          validateDebounce={500}
          validateFirst
          rules={[
            {
              required: true,
              message: 'Please enter your phone number',
            },
            {
              pattern: /^\d+$/,
              message: 'Phone number must be digits only!',
            },
            {
              min: 10,
              message: 'Phone number must be at least 10 digits!',
            },
            {
              max: 13,
              message: 'Phone number cannot be more than 13 digits!',
            },
          ]}
        >
          <Input
            type='text'
            placeholder='Phone Number'
            inputMode='numeric'
            pattern='[0-9]*'
            suffix={
              <Icon
                icon={'ic:round-phone'}
                height={24}
                className='text-zinc-400'
              />
            }
            className='h-14'
          />
        </Form.Item>
        <Form.Item
          name={'dateOfBirth'}
          validateDebounce={500}
          rules={[
            { required: true, message: 'Please enter your date of birth' },
          ]}
        >
          <DatePicker
            placeholder='Date of Birth'
            className='h-14 w-full bg-zinc-100 border-none rounded-2xl hover:bg-zinc-200 px-6 focus:bg-zinc-100'
            maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
            suffixIcon={
              <Icon
                icon={'ic:round-date-range'}
                height={24}
                className='text-zinc-400'
              />
            }
          />
        </Form.Item>
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
        <div className='flex justify-between w-full gap-4'>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            htmlType='button'
            onClick={() => {
              onCancel();
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
