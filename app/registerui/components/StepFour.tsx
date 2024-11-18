import CustomFileUpload from '#/components/CustomFileUpload';
import { uploadRepository } from '#/repository/upload';
import { RegisterFormData } from '#/types/RegisterTypes';
import { Icon } from '@iconify-icon/react';
import { Form, message, Upload, UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';

const MAX_SIZE = 10 * 1024 * 1024;

interface DocumentsUploadFormProps {
  updateFormData: (data: Partial<RegisterFormData>) => void;
}

export const DocumentsUploadForm = ({ updateFormData }: DocumentsUploadFormProps) => {
  const [cvFile, setCvFile] = useState<UploadFile | null>(null);
  const [certificateFile, setCertificateFile] = useState<UploadFile | null>(null);

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: '.pdf',
    listType: 'picture-card',
    iconRender: (file) => (
      <Icon
        icon="basil:document-solid"
        height={64}
        className="text-blue-600 mb-4"
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
        <Icon icon="mynaui:trash" className="text-red-500" height={24} />
      ),
    },
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
      message.success(`${type.toUpperCase()} uploaded successfully`);
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
    <div className="flex flex-col justify-center items-center">
      <Icon icon="iwwa:upload" height={64} className="text-blue-600" />
      <p className="text-sm text-zinc-500">Drag & drop or click to upload</p>
    </div>
  );

  return (
    <>
      <Form.Item
        name="cv"
        label="CV/Resume"
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
        name="certificate"
        label="Certificate"
        rules={[{ required: true, message: 'Please upload your certificate' }]}
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
    </>
  );
};