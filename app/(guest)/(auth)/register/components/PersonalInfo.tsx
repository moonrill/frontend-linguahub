import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

type PersonalInfoProps = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
};

const currentDate = dayjs().format('YYYY-MM-DD');

const PersonalInfo = () => {
  return (
    <div className="flex flex-col justify-between pt-10 flex-1">
      <Form
        className="flex flex-col justify-between flex-1"
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
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
            type="text"
            placeholder="Full Name"
            suffix={
              <Icon
                icon={'material-symbols:id-card'}
                height={24}
                className="text-zinc-400"
              />
            }
            className="h-14"
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
            type="email"
            placeholder="Email"
            suffix={
              <Icon
                icon={'ic:round-email'}
                height={24}
                className="text-zinc-400"
              />
            }
            className="h-14"
          />
        </Form.Item>
        <Form.Item
          name={'phoneNumber'}
          validateDebounce={500}
          rules={[
            {
              required: true,
              message: 'Please enter your phone number',
            },
            {
              min: 10,
              max: 13,
              type: 'number',
              message: 'Please enter a valid phone number',
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Phone Number"
            suffix={
              <Icon
                icon={'ic:round-phone'}
                height={24}
                className="text-zinc-400"
              />
            }
            className="h-14"
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name={'dateOfBirth'}>
            <DatePicker
              placeholder="Date of Birth"
              className="h-14 w-full bg-zinc-100 border-none rounded-2xl hover:bg-zinc-200 px-6 focus:bg-zinc-100"
              maxDate={dayjs(currentDate)}
              suffixIcon={<Icon icon={'ic:round-date-range'} height={24} />}
            />
          </Form.Item>
          <Form.Item name={'gender'}>
            <Select
              placeholder="Gender"
              className="h-14 w-full border-none"
              suffixIcon={<Icon icon={'mdi:chevron-down'} height={24} />}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Input
            type="email"
            placeholder="Enter your email"
            suffix={
              <Icon
                icon={'ic:round-email'}
                height={24}
                className="text-zinc-400"
              />
            }
            className="h-14"
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="email"
            placeholder="Enter your email"
            suffix={
              <Icon
                icon={'ic:round-email'}
                height={24}
                className="text-zinc-400"
              />
            }
            className="h-14"
          />
        </Form.Item>
        <div className="flex flex-col gap-4 items-center">
          <Button
            className="w-full py-6 font-medium rounded-xl"
            type="primary"
            htmlType="submit"
          >
            Continue
          </Button>
          <p className="mb-0 text-sm">
            Already have an account ?{' '}
            <Link href={'/login'} className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInfo;
