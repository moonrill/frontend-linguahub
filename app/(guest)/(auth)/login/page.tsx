'use client';

import { Icon } from '@iconify-icon/react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      }

      localStorage.setItem('access_token', data?.accessToken);

      if (data?.role === 'admin') router.push('dashboard');
      if (data?.role === 'translator') router.push('dashboard/translator');
      if (data?.role === 'client') router.push('/');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mt-4 2xl:mt-24 flex flex-col gap-8 lg:p-4'>
        <div className='flex flex-col gap-2 md:gap-4'>
          <h1 className='text-[56px] font-semibold m-0'>Sign In</h1>
          <p className='text-zinc-600'>
            Please enter your email and password below to connect with your
            LinguaHub account.
          </p>
        </div>

        <div>
          <Form
            className='flex flex-col'
            // autoComplete='off'
            requiredMark={false}
            layout='vertical'
            onFinish={onFinish}
            onChange={() => setError('')}
          >
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
                placeholder='Enter your email'
                suffix={
                  <Icon
                    icon={'ic:round-email'}
                    height={24}
                    className='text-zinc-400'
                  />
                }
                className='h-16 rounded-2xl border-none bg-zinc-100 hover:bg-zinc-200 px-6 font-medium'
              />
            </Form.Item>
            <Form.Item
              name={'password'}
              validateDebounce={500}
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                placeholder='Enter your password'
                className='h-16 rounded-2xl border-none bg-zinc-100 hover:bg-zinc-200 px-6 font-medium'
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
              />
            </Form.Item>
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            <Form.Item className='mt-4'>
              <Button
                className='w-full py-7 rounded-full focus:ring-0 font-medium'
                type='primary'
                htmlType='submit'
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>
          <div className='w-full flex justify-center'>
            <p className='text-sm'>
              Don&apos;t have an account?{' '}
              <Link href={'/register'} className='text-blue-600 font-medium '>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
