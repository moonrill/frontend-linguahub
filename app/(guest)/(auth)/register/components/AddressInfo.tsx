import { RegisterFormData } from '#/types/RegisterTypes';
import { Button, Form } from 'antd';
import Link from 'next/link';

type AddressInfoProps = {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
};

const AddressInfo = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}: AddressInfoProps) => {
  return (
    <div className='flex flex-col justify-between pt-10 flex-grow'>
      <Form>
        <div className='flex flex-col gap-4 items-center'>
          <div className='flex justify-between w-full gap-4'>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='default'
              htmlType='button'
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className='w-full py-6 font-medium rounded-xl'
              type='primary'
              htmlType='submit'
            >
              Continue
            </Button>
          </div>
          <p className='mb-0 text-sm'>
            Already have an account ?{' '}
            <Link href={'/login'} className='text-blue-600 font-medium'>
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default AddressInfo;
