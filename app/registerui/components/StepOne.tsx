"use client";

import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';

const currentDate = dayjs().format('YYYY-MM-DD');

interface PersonalInfoFormProps {
  updateFormData: (data: Partial<RegisterFormData>) => void;
}

export const PersonalInfoForm = ({ updateFormData }: PersonalInfoFormProps) => {
  return (
    <>
      <Form.Item
        name="fullName"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input
          type="text"
          placeholder="Full Name"
          suffix={<Icon icon="material-symbols:id-card" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ fullName: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="email"
        validateDebounce={500}
        rules={[
          { type: 'email', message: 'Please enter a valid email' },
          { required: true, message: 'Please enter your email' },
        ]}
      >
        <Input
          type="email"
          placeholder="Email"
          inputMode="email"
          suffix={<Icon icon="ic:round-email" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        validateDebounce={500}
        validateFirst
        rules={[
          { required: true, message: 'Please enter your phone number' },
          { pattern: /^\d+$/, message: 'Phone number must be digits only!' },
          { min: 10, message: 'Phone number must be at least 10 digits!' },
          { max: 13, message: 'Phone number cannot be more than 13 digits!' },
        ]}
      >
        <Input
          type="text"
          placeholder="Phone Number"
          inputMode="numeric"
          pattern="[0-9]*"
          suffix={<Icon icon="ic:round-phone" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
        />
      </Form.Item>

      <div className="grid md:grid-cols-2 md:gap-4">
        <Form.Item
          name="dateOfBirth"
          validateDebounce={500}
          rules={[{ required: true, message: 'Please enter your date of birth' }]}
        >
          <DatePicker
            placeholder="Date of Birth"
            className="h-14 w-full bg-zinc-100 border-none rounded-2xl hover:bg-zinc-200 px-6 focus:bg-zinc-100"
            maxDate={dayjs(currentDate)}
            suffixIcon={<Icon icon="ic:round-date-range" height={24} className="text-zinc-400" />}
            onChange={(date) => updateFormData({ dateOfBirth: date })}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select
            placeholder="Gender"
            className="h-14 w-full border-none"
            menuItemSelectedIcon={<Icon icon="ci:check-big" height={24} className="text-zinc-500" />}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            suffixIcon={<Icon icon="mdi:chevron-down" height={32} className="text-zinc-400" />}
            onChange={(value) => updateFormData({ gender: value })}
          />
        </Form.Item>

        <Form.Item
        name="password"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          type="password"
          placeholder="Password"
          iconRender={(visible) =>
            visible ? (
              <Icon icon="solar:eye-closed-bold" height={24} style={{ color: '#a1a1aa' }} />
            ) : (
              <Icon icon="solar:eye-bold" height={24} style={{ color: '#a1a1aa' }} />
            )
          }
          className="h-14"
          onChange={(e) => updateFormData({ password: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        validateDebounce={500}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          type="password"
          placeholder="Confirm Password"
          iconRender={(visible) =>
            visible ? (
              <Icon icon="solar:eye-closed-bold" height={24} style={{ color: '#a1a1aa' }} />
            ) : (
              <Icon icon="solar:eye-bold" height={24} style={{ color: '#a1a1aa' }} />
            )
          }
          className="h-14"
          onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
        />
      </Form.Item>
      
      </div>

    </>
  );
};