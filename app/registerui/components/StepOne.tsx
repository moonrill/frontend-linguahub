import { BaseFormData, RegisterFormData } from '#/types/RegisterTypes';
import { Form, Input, Select, DatePicker } from 'antd';
import { Icon } from '@iconify-icon/react';
import dayjs from 'dayjs';

interface PersonalInfoFormProps {
  updateFormData: (data: Partial<RegisterFormData>) => void;
}

export const PersonalInfoForm = ({ updateFormData }: PersonalInfoFormProps) => {
  return (
    <>
      <Form.Item
        name="role"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please select your role' }]}
      >
        <Select
          placeholder="Select Role"
          className="h-14"
          options={[
            { label: 'Client', value: 'client' },
            { label: 'Translator', value: 'translator' }
          ]}
          onChange={(value) => updateFormData({ role: value })}
          suffixIcon={
            <Icon
              icon="mdi:account-circle"
              height={24}
              className="text-zinc-400"
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="fullName"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input
          type="text"
          placeholder="Full Name"
          suffix={<Icon icon="mdi:user" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ fullName: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="email"
        validateDebounce={500}
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]}
      >
        <Input
          type="email"
          placeholder="Email"
          suffix={<Icon icon="mdi:email" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please select your gender' }]}
      >
        <Select
          placeholder="Select Gender"
          className="h-14"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
          onChange={(value) => updateFormData({ gender: value })}
          suffixIcon={
            <Icon
              icon="mdi:gender-male-female"
              height={24}
              className="text-zinc-400"
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="password"
        validateDebounce={500}
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 8, message: 'Password must be at least 8 characters' }
        ]}
      >
        <Input.Password
          placeholder="Password"
          className="h-14"
          onChange={(e) => updateFormData({ password: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        validateDebounce={500}
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match'));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm Password"
          className="h-14"
          onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please select your date of birth' }]}
      >
        <DatePicker
          className="h-14 w-full"
          placeholder="Date of Birth"
          format="DD/MM/YYYY"
          suffixIcon={
            <Icon
              icon="mdi:calendar"
              height={24}
              className="text-zinc-400"
            />
          }
          onChange={(date) => updateFormData({ dateOfBirth: date || undefined })}
          disabledDate={(current) => {
            // Disable dates after today and before 100 years ago
            return current && (current > dayjs().endOf('day') || current < dayjs().subtract(100, 'year'));
          }}
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        validateDebounce={500}
        validateFirst
        rules={[
          { required: true, message: 'Please enter your phone number' },
          { pattern: /^\d+$/, message: 'Phone number must contain only digits' }
        ]}
      >
        <Input
          type="tel"
          placeholder="Phone Number"
          suffix={<Icon icon="mdi:phone" height={24} className="text-zinc-400" />}
          className="h-14"
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
        />
      </Form.Item>
    </>
  );
};