'use client';

import EditProfileModal from '#/components/Modal/EditProfileModal';
import { authRepository } from '#/repository/auth';
import { User } from '#/types/UserType';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Form, Input, message, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';

const Profile = () => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const { data: result, isLoading, mutate } = authRepository.hooks.useProfile();

  const user: User = result?.data;

  const handleUpdatePassword = async (values: any) => {
    try {
      await authRepository.api.updatePassword(values);

      message.success('Password updated successfully');
      form.resetFields();
    } catch (error: any) {
      message.error(
        error?.response?.body?.message || 'Failed to update password'
      );
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl 2xl:text-3xl font-semibold'>Profile</h1>
        <Button
          type='primary'
          className='py-5 text-sm rounded-xl'
          onClick={() => setOpen(true)}
        >
          <Icon icon={'hugeicons:pencil-edit-01'} className='text-xl' />
          Edit
        </Button>
        <EditProfileModal
          open={open}
          onCancel={() => setOpen(false)}
          user={user}
          mutate={mutate}
        />
      </div>
      <div className='w-full flex flex-col gap-4'>
        <div className='flex flex-col gap-3 border p-4 rounded-lg'>
          <p className='font-semibold text-lg 2xl:text-xl border-b pb-1'>
            About
          </p>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className='flex gap-32'>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>Full Name</p>
                <h3 className='text-blue-950 font-semibold'>
                  {user?.userDetail?.fullName}
                </h3>
              </div>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>Gender</p>
                <h3 className='text-blue-950 font-semibold'>
                  {capitalizeFirstLetter(user?.userDetail?.gender)}
                </h3>
              </div>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>
                  Date of Birth
                </p>
                <h3 className='text-blue-950 font-semibold'>
                  {new Date(user?.userDetail?.dateOfBirth).toLocaleDateString(
                    'en-UK',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-3 border p-4 rounded-lg'>
          <p className='font-semibold text-lg 2xl:text-xl border-b pb-1'>
            Contact
          </p>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className='flex gap-32'>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>Email</p>
                <h3 className='text-blue-950 font-semibold'>{user?.email}</h3>
              </div>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>
                  Phone Number
                </p>
                <h3 className='text-blue-950 font-semibold'>
                  {user?.userDetail?.phoneNumber}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-3 border p-4 rounded-lg'>
          <p className='font-semibold text-lg 2xl:text-xl border-b pb-1'>
            Address
          </p>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <div className='flex gap-32'>
              <div>
                <div className='flex flex-col'>
                  <p className='text-gray-500 font-medium text-xs'>Province</p>
                  <h3 className='text-blue-950 font-semibold'>
                    {user?.userDetail?.province}
                  </h3>
                </div>
                <div className='flex flex-col mt-3'>
                  <p className='text-gray-500 font-medium text-xs'>District</p>
                  <h3 className='text-blue-950 font-semibold'>
                    {user?.userDetail?.district}
                  </h3>
                </div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <p className='text-gray-500 font-medium text-xs'>City</p>
                  <h3 className='text-blue-950 font-semibold'>
                    {user?.userDetail?.city}
                  </h3>
                </div>
                <div className='flex flex-col mt-3'>
                  <p className='text-gray-500 font-medium text-xs'>
                    Sub District
                  </p>
                  <h3 className='text-blue-950 font-semibold'>
                    {user?.userDetail?.subDistrict}
                  </h3>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-gray-500 font-medium text-xs'>Street</p>
                <h3 className='text-blue-950 font-semibold'>
                  {user?.userDetail?.street}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-3 border p-4 rounded-lg'>
        <p className='font-semibold text-lg 2xl:text-xl border-b pb-1'>
          Change Password
        </p>
        <Form
          className='flex flex-col'
          onFinish={handleUpdatePassword}
          form={form}
        >
          <Form.Item
            name={'oldPassword'}
            validateDebounce={500}
            rules={[
              { required: true, message: 'Please enter your current password' },
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
                { required: true, message: 'Please enter your new password' },
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
                    if (!value || getFieldValue('newPassword') === value) {
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
            className='w-fit py-6 px-10 font-medium rounded-xl ml-auto'
            type='default'
            htmlType='submit'
          >
            Update Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
