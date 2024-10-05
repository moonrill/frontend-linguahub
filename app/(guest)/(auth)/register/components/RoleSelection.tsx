'use client';

import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Card } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type RoleSelectionProps = {
  updateFormData: (data: Partial<RegisterFormData>) => void;
  nextStep: () => void;
  formData: Partial<RegisterFormData>;
};

const RoleSelection = ({
  updateFormData,
  nextStep,
  formData: { role: selectedRole },
}: RoleSelectionProps) => {
  const [currentRole, setCurrentRole] = useState<
    'client' | 'translator' | undefined
  >(selectedRole);

  useEffect(() => {
    setCurrentRole(selectedRole);
  }, [selectedRole]);

  const handleRoleSubmit = () => {
    if (currentRole) {
      updateFormData({ role: currentRole });
      nextStep();
    }
  };

  return (
    <div className='flex flex-col justify-between flex-grow'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-5xl'>Select Your Role</h1>
          <p className='text-zinc-600'>
            Pick your role: Are you joining as a Client or as a Translator?
            We&apos;re excited to have you!
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Card
            className={`cursor-pointer hover:border-green-600 transition duration-200 ease-in ${
              currentRole === 'client'
                ? 'border-green-600 bg-green-50'
                : 'border-zinc-200'
            }`}
            styles={{ body: { padding: '1rem' } }}
            onClick={() => setCurrentRole('client')}
          >
            <div className='flex flex-col gap-2'>
              <div
                className={`flex justify-center items-center p-3 rounded-lg w-fit transition duration-200 ease-in ${
                  selectedRole === 'client'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-600'
                }`}
              >
                <Icon icon={'mdi:users-group'} height={40} />
              </div>
              <h3 className='font-semibold text-[20px] mb-0'>I am Client</h3>
              <p className='text-sm'>
                Search qualified translators and request translation services
              </p>
            </div>
          </Card>
          <Card
            className={`cursor-pointer hover:border-blue-600 transition duration-200 ease-in ${
              currentRole === 'translator' ? 'border-blue-600 bg-blue-50' : ''
            }`}
            styles={{ body: { padding: '1rem' } }}
            onClick={() => setCurrentRole('translator')}
          >
            <div className='flex flex-col gap-2'>
              <div
                className={`flex justify-center items-center p-3 rounded-lg w-fit transition duration-200 ease-in ${
                  selectedRole === 'translator'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Icon icon={'mdi:account-tie-voice'} height={40} />
              </div>
              <h3 className='font-semibold text-[20px] mb-0'>
                I am Translator
              </h3>
              <p className='text-sm'>
                Offer your translation expertise and connect with clients
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <Button
          className='w-full py-6 font-medium rounded-xl'
          type='primary'
          disabled={!currentRole}
          onClick={handleRoleSubmit}
        >
          Continue
        </Button>
        <p className='mb-0 text-sm'>
          Already have an account?{' '}
          <Link href={'/login'} className='text-blue-600 font-medium'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
