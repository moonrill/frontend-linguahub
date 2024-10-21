'use client';

import { reviewRepository } from '#/repository/review';
import { Icon } from '@iconify-icon/react';
import { Button, Input, message, Modal, Rate } from 'antd';
import { useState } from 'react';

type Props = {
  bookingId: string;
  open: boolean;
  onCancel: () => void;
  mutate: () => void;
};

const ReviewModal = ({ bookingId, open, onCancel, mutate }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      message.error('Please select rating');
    }

    const data = {
      rating,
      comment,
    };

    try {
      setLoading(true);

      await reviewRepository.manipulateData.createReview(bookingId, data);
      message.success('Review submitted');
      mutate();
    } catch (error) {
      message.error('Failed to submit review');
    } finally {
      // onCancel();
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className='rounded-xl !w-fit'
    >
      <div className='flex items-center gap-2'>
        <Icon icon={'cryptocurrency:chat'} className='text-3xl text-blue-600' />
        <h1 className='2xl:text-lg font-semibold'>Review</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-3 mt-6'>
          <h1 className='text-xl font-semibold'>
            How was your experience with us?
          </h1>
          <p className='text-sm font-medium text-gray-500'>
            What do you think about this translation service?{' '}
          </p>
          <Rate
            style={{ fontSize: '40px' }}
            onChange={(value) => setRating(value)}
            value={rating}
          />
        </div>
        <Input.TextArea
          rows={6}
          className='mt-4 text-sm focus:!border-none border-none !bg-zinc-100 focus:!ring-0 p-3 rounded-xl'
          placeholder='Describe your experience (optional)'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type='primary'
          className='py-3 px-5 h-fit text-sm rounded-xl'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewModal;
