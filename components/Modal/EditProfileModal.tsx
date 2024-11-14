'use client';

import { fetchAddress } from '#/repository/address';
import { authRepository } from '#/repository/auth';
import { uploadRepository } from '#/repository/upload';
import {
  Addresses,
  City,
  District,
  Province,
  SubDistrict,
} from '#/types/AddressTypes';
import { User } from '#/types/UserType';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
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

  useEffect(() => {
    form.setFieldsValue({
      fullName: user?.userDetail?.fullName,
      gender: user?.userDetail?.gender,
      phoneNumber: user?.userDetail?.phoneNumber,
      dateOfBirth: user?.userDetail?.dateOfBirth
        ? dayjs(user?.userDetail?.dateOfBirth)
        : null,
      street: user?.userDetail?.street,
    });
  }, [user, form]);

  useEffect(() => {
    const initializeAddresses = async () => {
      try {
        const provinces = (await fetchAddress('provinces')) as Province[];
        setAddresses((prev) => ({ ...prev, province: provinces }));

        // Find province by name and fetch cities
        if (user?.userDetail?.province) {
          const province = provinces.find(
            (p) => p.name === user.userDetail.province.toUpperCase()
          );

          if (province) {
            form.setFieldsValue({
              provinceId: province.id,
              province: user?.userDetail?.province,
            });
            const cities = (await fetchAddress(
              'regencies',
              province.id
            )) as City[];
            setAddresses((prev) => ({ ...prev, city: cities }));

            // Find city by name and fetch districts
            const city = cities.find(
              (c) => c.name === user.userDetail.city.toUpperCase()
            );

            if (city) {
              form.setFieldsValue({
                cityId: city.id,
                city: user?.userDetail?.city,
              });
              const districts = (await fetchAddress(
                'districts',
                city.id
              )) as District[];
              setAddresses((prev) => ({ ...prev, district: districts }));

              // Find district by name and fetch subdistricts
              const district = districts.find(
                (d) => d.name === user.userDetail.district.toUpperCase()
              );

              if (district) {
                form.setFieldsValue({
                  districtId: district.id,
                  district: user?.userDetail?.district,
                });
                const subDistricts = (await fetchAddress(
                  'villages',
                  district.id
                )) as SubDistrict[];
                setAddresses((prev) => ({
                  ...prev,
                  subDistrict: subDistricts,
                }));

                // Find and set subdistrict
                const subDistrict = subDistricts.find(
                  (sd) => sd.name === user.userDetail.subDistrict.toUpperCase()
                );

                if (subDistrict) {
                  form.setFieldsValue({
                    subDistrictId: subDistrict.id,
                    subDistrict: user?.userDetail?.subDistrict,
                  });
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error initializing addresses:', error);
        message.error('Failed to load address data');
      }
    };

    if (open) {
      initializeAddresses();
    }
  }, [open, user, form]);

  const handleSelectionChange = async (
    addressType: string,
    label: string,
    value: string
  ) => {
    try {
      form.setFieldValue(addressType, value);
      form.setFieldValue(addressType.slice(0, -2), label);

      const resetTypes = {
        provinceId: ['cityId', 'districtId', 'subDistrictId'],
        cityId: ['districtId', 'subDistrictId'],
        districtId: ['subDistrictId'],
      };

      // Reset dependent fields
      resetTypes[addressType as keyof typeof resetTypes]?.forEach((type) => {
        form.resetFields([type]);
        setAddresses((prev) => ({ ...prev, [type.slice(0, -2)]: [] }));
      });

      // Fetch dependent address data
      if (addressType === 'provinceId') {
        const cities = (await fetchAddress('regencies', value)) as City[];
        setAddresses((prev) => ({ ...prev, city: cities }));
      } else if (addressType === 'cityId') {
        const districts = (await fetchAddress(
          'districts',
          value
        )) as District[];
        setAddresses((prev) => ({ ...prev, district: districts }));
      } else if (addressType === 'districtId') {
        const subDistricts = (await fetchAddress(
          'villages',
          value
        )) as SubDistrict[];
        setAddresses((prev) => ({ ...prev, subDistrict: subDistricts }));
      }
    } catch (error) {
      console.error('Error handling address selection:', error);
      message.error('Failed to update address selection');
    }
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

  const handleFinish = async (values: any) => {
    setLoading(true);
    const address = {
      province: form.getFieldValue('province'),
      city: form.getFieldValue('city'),
      district: form.getFieldValue('district'),
      subDistrict: form.getFieldValue('subDistrict'),
    };

    try {
      const data = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
          : null,
      };

      await authRepository.api.updateProfile(user?.id, { ...data, ...address });

      message.success('Profile updated successfully');
      onCancel();
      mutate();
    } catch (error) {
      message.error('Failed to edit profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: any) => {
    try {
      const response = await uploadRepository.api.useUploadProfilePicture(file);
      form.setFieldValue('profilePicture', response?.body?.profilePicture);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      message.error('Error uploading image');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      footer={null}
      className='!min-w-[700px]'
    >
      <div className='flex items-center gap-2'>
        <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
          <Icon icon={'lets-icons:edit'} className='text-2xl' />
        </div>
        <h1 className='text-lg 2xl:text-xl font-semibold'>Edit Profile</h1>
      </div>
      <Form
        form={form}
        className='mt-6 text-black flex flex-col gap-2'
        onFinish={handleFinish}
      >
        <div className='flex gap-4'>
          <div className='max-w-[250px]'>
            <Form.Item name={'profilePicture'}>
              <p className='text-sm 2xl:text-base mb-2'>
                Profile Picture
                <span className='text-zinc-500'> (Optional)</span>
              </p>
              <Dragger
                {...uploadProps}
                style={{ width: 250, padding: '3rem 0' }}
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
            </Form.Item>
          </div>
          <div className='w-full'>
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
                  name='provinceId'
                  rules={[
                    { required: true, message: 'Please select a province' },
                  ]}
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
                    disabled={!form.getFieldValue('provinceId')}
                    onChange={(label: string, value: string) =>
                      handleSelectionChange('cityId', label, value)
                    }
                  />
                </Form.Item>
              </div>
              <div className='grid md:grid-cols-2 md:gap-4'>
                <Form.Item
                  name='districtId'
                  rules={[
                    { required: true, message: 'Please select a district' },
                  ]}
                >
                  <AddressSelect
                    placeholder='District'
                    options={addresses.district}
                    disabled={!form.getFieldValue('cityId')}
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
                    disabled={!form.getFieldValue('districtId')}
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
          </div>
        </div>

        <div className='flex justify-between w-full gap-4'>
          <Button
            className='w-full py-6 font-medium rounded-xl'
            type='default'
            htmlType='button'
            onClick={onCancel}
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
