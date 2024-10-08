import CustomFileUpload from '#/components/CustomFileUpload';
import { uploadRepository } from '#/repository/upload';
import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Form, message, Upload, UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import { useState } from 'react';

const MAX_SIZE = 5 * 1024 * 1024;

type DocumentsUploadProps = {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
};

const DocumentsUpload = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}: DocumentsUploadProps) => {
  const [cvFile, setCvFile] = useState<UploadFile | null>(null);
  const [certificateFile, setCertificateFile] = useState<UploadFile | null>(
    null
  );

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
      if (file.size > MAX_SIZE) {
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

  const handleUpload = async (file: UploadFile, type: 'cv' | 'certificate') => {
    try {
      let response;
      if (type === 'cv') {
        response = await uploadRepository.manipulateData.useCvUpload(
          file as any
        );
        setCvFile(file);
      } else {
        response = await uploadRepository.manipulateData.useCertificateUpload(
          file as any
        );
        setCertificateFile(file);
      }
      message.success(`${type.toWellFormed} uploaded successfully`);
      updateFormData({ [type]: response.body?.[type] });
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
    updateFormData({ [type]: undefined });
  };

  const uploadButton = (
    <div className='flex flex-col justify-center items-center '>
      <Icon icon={'iwwa:upload'} height={64} className=' text-blue-600' />
      <p className='text-sm text-zinc-500'>Drag & drop or click to upload</p>
    </div>
  );

  const onFinish = () => {
    if (!cvFile || !certificateFile) {
      message.error('Please upload your CV and certificate');
      return;
    }

    console.log(formData);
    // TODO: Handle onFinish
  };

  return (
    <div className='flex pt-10 flex-grow overflow-hidden'>
      <Form
        className='flex flex-col justify-between flex-1'
        autoComplete='off'
        requiredMark={false}
        layout='vertical'
        onFinish={onFinish}
      >
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

        <div className='flex flex-col gap-4 items-center mt-4'>
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

export default DocumentsUpload;
