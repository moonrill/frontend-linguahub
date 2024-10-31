import { Icon } from '@iconify-icon/react';
import { Button, Modal } from 'antd';

type Props = {
  type: 'danger' | 'success';
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

const ConfirmModal = ({
  type,
  title,
  description,
  cancelText,
  confirmText,
  open,
  onCancel,
  onConfirm,
  isLoading,
}: Props) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      className='rounded-xl'
    >
      <div className='flex flex-col items-center gap-4'>
        <Icon
          icon={`${
            type === 'success'
              ? 'icon-park-outline:check-one'
              : 'ion:warning-outline'
          }`}
          className={`${
            type === 'success' ? 'text-blue-600' : 'text-rose-600'
          } text-7xl`}
        />
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='text-center text-sm'>{description}</p>
        <div className='flex gap-3'>
          <Button
            type='default'
            onClick={onCancel}
            className='text-sm h-fit py-3 px-4 rounded-xl border-zinc-300 text-gray-500 hover:!text-black font-medium hover:!bg-zinc-100 hover:!border-zinc-300'
            disabled={isLoading}
          >
            {cancelText || 'Cancel'}
          </Button>
          <Button
            type='primary'
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            className={`text-sm h-fit py-3 px-4 rounded-xl font-medium ${
              type === 'success'
                ? 'bg-blue-600 hover:!bg-blue-700'
                : 'bg-rose-600 hover:!bg-rose-700'
            } text-white`}
          >
            {confirmText || 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
