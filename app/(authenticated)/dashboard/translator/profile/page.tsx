'use client';

import LanguageFlag from '#/components/LanguageFlag';
import BioModal from '#/components/Modal/BioModal';
import EditProfessionalModal from '#/components/Modal/EditProfessionalModal';
import EditProfileModal from '#/components/Modal/EditProfileModal';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { authRepository } from '#/repository/auth';
import { Language } from '#/types/LanguageTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Skeleton, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TranslatorProfile = () => {
  const [form] = useForm();

  const [editProfileModal, setEditProfileModal] = useState(false);
  const [editProfessionalModal, setEditProfessionalModal] = useState(false);
  const [bioModal, setBioModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, mutate } = authRepository.hooks.useProfile();

  const profile = data?.data;

  const handleUpdatePassword = async (values: any) => {
    setLoading(true);
    try {
      await authRepository.api.updatePassword(values);

      message.success('Password updated successfully');
      form.resetFields();
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Failed to update password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-white w-full h-full rounded-3xl p-4 flex flex-col gap-4'>
      {isLoading ? (
        <Skeleton active />
      ) : (
        profile && (
          <>
            <section className='flex justify-between p-4 border rounded-xl'>
              <div className='flex gap-10'>
                <div className='relative w-[150px] 2xl:w-[250px] h-[150px] 2xl:h-[250px]'>
                  <Image
                    src={
                      profile?.userDetail?.profilePicture
                        ? imgProfilePicture(profile.userDetail.profilePicture)
                        : '/images/avatar-placeholder.png'
                    }
                    alt={'translator-profile-picture'}
                    fill
                    sizes='(max-width: 400px)'
                    className='object-cover rounded-xl'
                    priority
                  />
                </div>
                <div className='flex gap-20 2xl:gap-32'>
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                      Personal Information
                    </h1>
                    <div className='flex gap-4'>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Full Name
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Email
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Gender
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Date of Birth
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Phone Number
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.fullName}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.email}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {capitalizeFirstLetter(profile?.userDetail?.gender)}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.dateOfBirth}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                      Address
                    </h1>
                    <div className='flex gap-4'>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Province
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          City
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          District
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Sub District
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          Street
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                        <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                          :
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.province}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.city}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.district}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.subDistrict}
                        </p>
                        <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                          {profile?.userDetail?.street}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type='primary'
                className='py-4 2xl:py-5 text-xs 2xl:text-sm rounded-lg 2xl:rounded-xl'
                onClick={() => setEditProfileModal(true)}
              >
                <Icon icon={'hugeicons:pencil-edit-01'} className='text-xl' />
                Edit
              </Button>
              <EditProfileModal
                open={editProfileModal}
                onCancel={() => setEditProfileModal(false)}
                user={profile}
                mutate={mutate}
              />
            </section>
            <section className='flex p-4 border w-full rounded-xl justify-between'>
              <div className='flex gap-10 2xl:gap-20'>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Professional Information
                  </h1>
                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Years of Experience
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Portfolio Link
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Bank
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Bank Account Number
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {profile?.translator?.yearsOfExperience} Years
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {profile?.translator?.portfolioLink && (
                          <Link href={profile?.translator?.portfolioLink}>
                            <Tag
                              color='blue'
                              className='text-xs 2xl:text-base font-medium border-none px-2 py-0.5 hover:bg-blue-100 rounded-lg flex items-center gap-2 w-fit'
                            >
                              See Portfolio
                              <Icon icon={'akar-icons:link-out'} />
                            </Tag>
                          </Link>
                        )}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {profile?.translator?.bank}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {profile?.translator?.bankAccountNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Languages
                  </h1>
                  <div className='flex gap-1 2xl:gap-2'>
                    {profile?.translator?.languages?.map(
                      (language: Language, index: number) => (
                        <LanguageFlag key={index} language={language} />
                      )
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Specializations
                  </h1>
                  <div className='flex gap-1 2xl:gap-2 flex-wrap'>
                    {profile?.translator?.specializations?.map(
                      (specialization: Specialization, index: number) => (
                        <Link
                          key={index}
                          href={`/specialization?name=${specialization.name}`}
                          className='group'
                        >
                          <Tag
                            color='blue'
                            className='!border-blue-50 text-xs 2xl:text-sm py-0.5 px-3 2xl:py-1 2xl:px-5 rounded-full font-medium group-hover:!border-blue-600'
                          >
                            {specialization.name}
                          </Tag>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <Button
                type='primary'
                className='py-4 2xl:py-5 text-xs 2xl:text-sm rounded-lg 2xl:rounded-xl'
                onClick={() => setEditProfessionalModal(true)}
              >
                <Icon icon={'hugeicons:pencil-edit-01'} className='text-xl' />
                Edit
              </Button>
              <EditProfessionalModal
                open={editProfessionalModal}
                translator={profile?.translator}
                onCancel={() => setEditProfessionalModal(false)}
                mutate={mutate}
              />
            </section>
            <section className='flex p-4 border w-full rounded-xl gap-6'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                  CV/Resume
                </h1>
                <Link
                  target='_blank'
                  href={`${config.baseUrl}/translators/cv/${profile?.translator?.cv}`}
                  className='group'
                >
                  <div className='w-[120px] h-[120px] rounded-xl bg-blue-50 flex flex-col justify-center items-center group-hover:border group-hover:border-blue-600 transition-all duration-300'>
                    <Icon
                      icon='basil:document-solid'
                      height={64}
                      className='text-blue-600 group-hover:scale-110 transition-all duration-300'
                    />
                  </div>
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                  Certificate
                </h1>
                <Link
                  target='_blank'
                  href={`${config.baseUrl}/translators/certificates/${profile?.translator?.certificate}`}
                  className='group'
                >
                  <div className='w-[120px] h-[120px] rounded-xl bg-blue-50 flex flex-col justify-center items-center group-hover:border group-hover:border-blue-600 transition-all duration-300'>
                    <Icon
                      icon='basil:document-solid'
                      height={64}
                      className='text-blue-600 group-hover:scale-110 transition-all duration-300'
                    />
                  </div>
                </Link>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <div className='flex justify-between'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Bio
                  </h1>
                  <Button
                    type='primary'
                    className='py-3 text-xs 2xl:text-sm rounded-lg'
                    onClick={() => setBioModal(true)}
                  >
                    <Icon
                      icon={'hugeicons:pencil-edit-01'}
                      className='text-xl'
                    />
                    Edit
                  </Button>
                  <BioModal
                    open={bioModal}
                    onCancel={() => setBioModal(false)}
                    translator={profile?.translator}
                    mutate={mutate}
                  />
                </div>
                <div className='w-full h-full rounded-xl border p-2'>
                  <p>{profile?.translator?.bio || '-'}</p>
                </div>
              </div>
            </section>
            <section className='flex flex-col gap-3 border p-4 rounded-xl'>
              <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                Change Password
              </h1>
              <Form
                className='flex flex-col'
                onFinish={handleUpdatePassword}
                form={form}
              >
                <Form.Item
                  name={'oldPassword'}
                  validateDebounce={500}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your current password',
                    },
                  ]}
                >
                  <Input.Password
                    type='password'
                    placeholder='Current Password'
                    iconRender={(visible) =>
                      visible ? (
                        <Icon
                          icon={'solar:eye-closed-bold'}
                          height={24}
                          style={{ color: '#a1a1aa' }}
                        />
                      ) : (
                        <Icon
                          icon={'solar:eye-bold'}
                          height={24}
                          style={{ color: '#a1a1aa' }}
                        />
                      )
                    }
                    className='h-14'
                  />
                </Form.Item>
                <div className='grid grid-cols-2 gap-4'>
                  <Form.Item
                    name={'newPassword'}
                    validateDebounce={500}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your new password',
                      },
                    ]}
                  >
                    <Input.Password
                      type='password'
                      placeholder='New Password'
                      iconRender={(visible) =>
                        visible ? (
                          <Icon
                            icon={'solar:eye-closed-bold'}
                            height={24}
                            style={{ color: '#a1a1aa' }}
                          />
                        ) : (
                          <Icon
                            icon={'solar:eye-bold'}
                            height={24}
                            style={{ color: '#a1a1aa' }}
                          />
                        )
                      }
                      className='h-14'
                    />
                  </Form.Item>
                  <Form.Item
                    name={'confirmPassword'}
                    validateDebounce={500}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your confirm password',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue('newPassword') === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              'The new password that you entered do not match!'
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      type='password'
                      placeholder='Confirm Password'
                      iconRender={(visible) =>
                        visible ? (
                          <Icon
                            icon={'solar:eye-closed-bold'}
                            height={24}
                            style={{ color: '#a1a1aa' }}
                          />
                        ) : (
                          <Icon
                            icon={'solar:eye-bold'}
                            height={24}
                            style={{ color: '#a1a1aa' }}
                          />
                        )
                      }
                      className='h-14'
                    />
                  </Form.Item>
                </div>
                <Button
                  className='w-fit p-4 text-xs 2xl:text-sm font-medium rounded-lg ml-auto'
                  type='default'
                  htmlType='submit'
                  disabled={loading}
                  loading={loading}
                >
                  Update Password
                </Button>
              </Form>
            </section>
          </>
        )
      )}
    </main>
  );
};

export default TranslatorProfile;
