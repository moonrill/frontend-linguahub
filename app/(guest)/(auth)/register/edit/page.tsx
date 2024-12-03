'use client';

import AddressSelect from '#/components/AddressSelect';
import CustomFileUpload from '#/components/CustomFileUpload';
import LanguageSelector from '#/components/LanguageSelector';
import TranslatorSuccess from '#/components/RegisterSuccess/Translator';
import SpecializationSelector from '#/components/SpecializationSelector';
import { midtransSupportBanks } from '#/constants/banks';
import { fetchAddress } from '#/repository/address';
import { authRepository } from '#/repository/auth';
import { languagesRepository } from '#/repository/language';
import { specializationRepository } from '#/repository/specialization';
import { translatorRepository } from '#/repository/translator';
import { uploadRepository } from '#/repository/upload';
import {
  Addresses,
  City,
  District,
  Province,
  SubDistrict,
} from '#/types/AddressTypes';
import { Translator } from '#/types/TranslatorTypes';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadChangeParam } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RegisterEdit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [cvFile, setCvFile] = useState<UploadFile | null>(null);
  const [certificateFile, setCertificateFile] = useState<UploadFile | null>(
    null
  );
  const [addresses, setAddresses] = useState<Addresses>({
    province: [],
    city: [],
    district: [],
    subDistrict: [],
  });

  const [form] = useForm();

  const { data, isLoading } = translatorRepository.hooks.useGetTranslatorById(
    id ?? ''
  );
  const { data: languages, isLoading: isLoadingLanguages } =
    languagesRepository.hooks.useAllLanguages(15, 1);
  const { data: specializations, isLoading: isLoadingSpecializations } =
    specializationRepository.hooks.useAllSpecializations(15, 1);

  const translator: Translator = data?.data;

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: '.pdf',
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
      if (file.size > 10 * 1024 * 1024) {
        message.error('File too large');
        return Upload.LIST_IGNORE;
      }
      if (file.type !== 'application/pdf') {
        message.error('Only PDF files are allowed');
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

  useEffect(() => {
    const initializeData = async () => {
      if (!id) {
        router.push('/register');
        return;
      }

      if (!isLoading && !translator) {
        message.error('Translator not found');
        router.push('/register');
        return;
      }

      if (translator && translator.status !== 'rejected') {
        router.push('/register');
        return;
      }

      // Only proceed with initialization if we have valid translator data
      if (!isLoading && translator) {
        try {
          // Initialize form fields
          form.setFieldsValue({
            fullName: translator.user.userDetail.fullName,
            email: translator.user.email,
            phoneNumber: translator.user.userDetail.phoneNumber,
            dateOfBirth: dayjs(translator.user.userDetail.dateOfBirth),
            gender: translator.user.userDetail.gender,
            street: translator.user.userDetail.street,
            yearsOfExperience: translator.yearsOfExperience,
            portfolioLink: translator.portfolioLink,
            bank: translator.bank,
            bankAccountNumber: translator.bankAccountNumber,
          });

          // Initialize languages and specializations
          translator.languages?.forEach((language) => {
            setSelectedLanguages((prev) => [...prev, language.id]);
          });
          translator.specializations?.forEach((specialization) => {
            setSelectedSpecializations((prev) => [...prev, specialization.id]);
          });

          // Initialize addresses
          const provinces = (await fetchAddress('provinces')) as Province[];
          setAddresses((prev) => ({ ...prev, province: provinces }));

          const userDetail = translator.user.userDetail;
          if (userDetail?.province) {
            const province = provinces.find(
              (p) => p.name === userDetail.province.toUpperCase()
            );

            if (province) {
              form.setFieldsValue({
                provinceId: province.id,
                province: userDetail.province,
              });

              const cities = (await fetchAddress(
                'regencies',
                province.id
              )) as City[];
              setAddresses((prev) => ({ ...prev, city: cities }));

              const city = cities.find(
                (c) => c.name === userDetail.city.toUpperCase()
              );

              if (city) {
                form.setFieldsValue({
                  cityId: city.id,
                  city: userDetail.city,
                });

                const districts = (await fetchAddress(
                  'districts',
                  city.id
                )) as District[];
                setAddresses((prev) => ({ ...prev, district: districts }));

                const district = districts.find(
                  (d) => d.name === userDetail.district.toUpperCase()
                );

                if (district) {
                  form.setFieldsValue({
                    districtId: district.id,
                    district: userDetail.district,
                  });

                  const subDistricts = (await fetchAddress(
                    'villages',
                    district.id
                  )) as SubDistrict[];
                  setAddresses((prev) => ({
                    ...prev,
                    subDistrict: subDistricts,
                  }));

                  const subDistrict = subDistricts.find(
                    (sd) => sd.name === userDetail.subDistrict.toUpperCase()
                  );

                  if (subDistrict) {
                    form.setFieldsValue({
                      subDistrictId: subDistrict.id,
                      subDistrict: userDetail.subDistrict,
                    });
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Error initializing data:', error);
          message.error('Failed to load data');
        }
      }
    };

    initializeData();
  }, [id, isLoading, translator, form, router]);

  const currentDate = dayjs().format('YYYY-MM-DD');

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

  const handleUpload = async (file: UploadFile, type: 'cv' | 'certificate') => {
    try {
      let response;
      if (type === 'cv') {
        response = await uploadRepository.api.useCvUpload(file as any);
        setCvFile(file);
      } else {
        response = await uploadRepository.api.useCertificateUpload(file as any);
        setCertificateFile(file);
      }
      message.success(`${type.toWellFormed()} uploaded successfully`);
      form.setFieldValue(type, response.body?.[type]);
    } catch (error) {
      console.error(error);
      message.error(`Error uploading ${type.toUpperCase()}`);
    }
  };

  const handleRemove = (type: 'cv' | 'certificate') => {
    if (type === 'cv') {
      setCvFile(null);
    } else {
      setCertificateFile(null);
    }
    form.resetFields([type]);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const address = {
      province: form.getFieldValue('province'),
      city: form.getFieldValue('city'),
      district: form.getFieldValue('district'),
      subDistrict: form.getFieldValue('subDistrict'),
    };

    const data = {
      ...values,
      ...address,
      role: 'translator',
      translatorId: translator?.id,
      languages: selectedLanguages,
      specializations: selectedSpecializations,
    };

    console.log(data);

    try {
      const response = await authRepository.api.editTranslatorRegister(data);

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Failed to edit translator'
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div className='flex flex-col justify-center items-center '>
      <Icon icon={'iwwa:upload'} height={64} className=' text-blue-600' />
      <p className='text-sm text-zinc-500'>Drag & drop or click to upload</p>
    </div>
  );

  return isLoading ? (
    <div className='w-full h-[calc(100vh-140px)] flex flex-col gap-4 justify-center items-center'>
      <Spin size='large' />
      <p className='text-blue-600'>Getting translator data...</p>
    </div>
  ) : !success ? (
    <main className='w-full mt-10'>
      <h1 className='font-semibold text-3xl mb-6'>Edit Translator Register</h1>
      <Form
        className='flex flex-col gap-4'
        autoComplete='off'
        requiredMark={false}
        layout='vertical'
        onFinish={onFinish}
        form={form}
      >
        <div>
          <p className='mb-2'>Personal Information</p>
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
            name={'email'}
            validateDebounce={500}
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input
              type='email'
              placeholder='Email'
              inputMode='email'
              suffix={
                <Icon
                  icon={'ic:round-email'}
                  height={24}
                  className='text-zinc-400'
                />
              }
              className='h-14'
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
          <div className='grid md:grid-cols-2 md:gap-4'>
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
                maxDate={dayjs(currentDate)}
                suffixIcon={
                  <Icon
                    icon={'ic:round-date-range'}
                    height={24}
                    className='text-zinc-400'
                  />
                }
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
          </div>
        </div>
        <div>
          <p className='mb-2'>Address Information</p>
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
              rules={[{ required: true, message: 'Please select a district' }]}
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
        <div>
          <p className='mb-2'>Professional Information</p>
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
        </div>
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
        <div>
          <Form.Item
            name={'cv'}
            label={'CV/Resume'}
            rules={[{ required: true, message: 'Please upload your CV' }]}
          >
            {!cvFile ? (
              <Dragger
                {...uploadProps}
                fileList={[]}
                onChange={(info: UploadChangeParam<UploadFile>) => {
                  const { file } = info;
                  if (file.status !== 'removed') {
                    handleUpload(file, 'cv');
                  }
                }}
              >
                {uploadButton}
              </Dragger>
            ) : (
              <CustomFileUpload
                fileList={[cvFile]}
                onFileRemove={() => handleRemove('cv')}
              />
            )}
          </Form.Item>
          <Form.Item
            name={'certificate'}
            label={'Certificate'}
            rules={[
              { required: true, message: 'Please upload your certificate' },
            ]}
          >
            {!certificateFile ? (
              <Dragger
                {...uploadProps}
                fileList={[]}
                onChange={(info: UploadChangeParam<UploadFile>) => {
                  const { file } = info;
                  if (file.status !== 'removed') {
                    handleUpload(file, 'certificate');
                  }
                }}
              >
                {uploadButton}
              </Dragger>
            ) : (
              <CustomFileUpload
                fileList={[certificateFile]}
                onFileRemove={() => handleRemove('certificate')}
              />
            )}
          </Form.Item>
        </div>
        <Button
          className='w-full py-6 font-medium rounded-xl'
          type='primary'
          htmlType='submit'
          loading={loading}
        >
          Update data
        </Button>
      </Form>
    </main>
  ) : (
    <div className='w-full h-[calc(100vh-140px)] flex flex-col gap-4 justify-center items-center'>
      <TranslatorSuccess />
    </div>
  );
};

export default RegisterEdit;
