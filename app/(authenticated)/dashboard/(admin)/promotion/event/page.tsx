'use client';

import ConfirmModal from '#/components/Modal/ConfirmModal';
import EventModal from '#/components/Modal/EventModal';
import CustomTable from '#/components/Tables/CustomTable';
import { eventRepository } from '#/repository/event';
import { Event } from '#/types/EventTypes';
import { Icon } from '@iconify-icon/react';
import { Button, Dropdown, Input, MenuProps, message, TableProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import dayjs from 'dayjs';

const AdminEvents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: listEvents, isLoading, mutate } = eventRepository.hooks.useAllEvents(10, page);

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/promotion/event?page=${page}`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_, record) => <p className='font-medium'>{record.name}</p>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.startDate).format('DD MMMM YYYY HH:mm')}
        </p>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
      sorter: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
      render: (_, record) => (
        <p className='text-xs 2xl:text-sm font-medium'>
          {dayjs(record.endDate).format('DD MMMM YYYY HH:mm')}
        </p>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: actionDropdownItem(record as Event),
          }}
        >
          <Icon
            icon={'tabler:dots'}
            className='text-gray-500 text-2xl cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500'
          />
        </Dropdown>
      ),
    },
  ];

  const data = listEvents?.data?.map((event: Event) => ({
    key: event.id,
    ...event,
  }));

  const handleSelect = (event: Event, type: 'edit' | 'delete' | 'detail') => {
    setSelectedEvent(event);
    if (type === 'edit') {
      setIsModalOpen(true);
    } else if (type === 'delete') {
      setOpenConfirmModal(true);
    } else if (type === 'detail') {
      router.push(`/dashboard/promotion/event/${event.id}`);
    }
  };

  const handleConfirm = async () => {
    if (selectedEvent) {
      setLoading(true);
      try {
        await eventRepository.api.deleteEvent(selectedEvent.id);
        message.success('Event deleted successfully');
        mutate();
      } catch (error) {
        message.error('Error deleting event');
      } finally {
        setOpenConfirmModal(false);
        setLoading(false);
      }
    }
  };

  const actionDropdownItem = (event: Event): MenuProps['items'] => [

    {
      key: 'detail',
      label: (
        <div className='flex items-center'>
          <Icon icon={'solar:eye-linear'} className='text-lg' />
          <span className='ml-2'>View Details</span>
        </div>
      ),
      onClick: () => handleSelect(event, 'detail'),
    },


    {
      key: 'edit',
      label: (
        <div className='flex items-center'>
          <Icon icon={'hugeicons:pencil-edit-01'} className='text-lg' />
          <span className='ml-2'>Edit Event</span>
        </div>
      ),
      onClick: () => handleSelect(event, 'edit'),
    },
    {
      key: 'delete',
      label: (
        <div className='flex items-center text-rose-500'>
          <Icon icon={'tabler:trash'} className='text-lg ' />
          <span className='ml-2'>Delete Event</span>
        </div>
      ),
      onClick: () => handleSelect(event, 'delete'),
    },
  ];

  return (
    <main className="bg-white w-full rounded-3xl p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type='text'
          placeholder='Search...'
          prefix={<Icon icon={'iconamoon:search-light'} height={24} className='text-zinc-400' />}
          className='h-12 w-fit'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type='primary'
          className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
          onClick={() => setIsModalOpen(true)}
        >
          Add new
          <Icon icon={'ph:plus'} className='text-xl' />
        </Button>
      </div>

      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pageSize={listEvents?.limit}
        currentPage={listEvents?.page}
        totalData={listEvents?.total}
        totalPage={listEvents?.totalPages}
        handlePageChange={handlePageChange}
      />

      <EventModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        mutate={mutate}
        event={selectedEvent}
      />

      <ConfirmModal
        open={openConfirmModal}
        onCancel={() => {
          setOpenConfirmModal(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleConfirm}
        type='danger'
        title='Delete Event'
        description='Are you sure you want to delete this event? This action cannot be undone.'
        cancelText='No, cancel'
        confirmText="Yes, I'm sure"
        isLoading={loading}
      />
    </main>
  );
};

export default AdminEvents;
