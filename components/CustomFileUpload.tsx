import { Icon } from '@iconify-icon/react';
import { UploadProps } from 'antd';
import React, { useState } from 'react';

interface CustomFileUploadProps extends UploadProps {
  onFileRemove: () => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  onFileRemove,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const fileList = props.fileList || [];
  const file = fileList[0];

  if (!file) return null;

  return (
    <div
      className={`relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-xl transition duration-200 ${
        isHovered ? 'bg-rose-50' : 'bg-blue-50'
      } flex flex-col items-center justify-center cursor-pointer p-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onFileRemove}
      style={{
        border: '2px solid',
        borderColor: isHovered ? '#f43f5e' : '#2563eb',
      }}
    >
      {isHovered ? (
        <>
          <Icon
            icon='mage:trash-fill'
            className='text-rose-500 text-[48px] md:text-[64px] mb-2'
          />
          <span className='text-rose-600 text-xs md:text-sm truncate w-full text-center px-2'>
            Remove
          </span>
        </>
      ) : (
        <>
          <Icon
            icon='basil:document-solid'
            className='text-blue-600 text-[48px] md:text-[64px] mb-2'
          />
          <span className='text-blue-600 text-xs md:text-sm truncate w-full text-center px-2'>
            {file.name}
          </span>
        </>
      )}
    </div>
  );
};

export default CustomFileUpload;
