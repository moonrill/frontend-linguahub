'use client';
import { Table, TableProps } from 'antd';

const columns: TableProps['columns'] = [
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    render: (text) => <p className='font-semibold'>{text}</p>,
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    align: 'right',
  },
];

const data = [
  {
    key: '1',
    client: 'John Brown',
    service: 'Service 1',
    requestDate: '2021-01-01',
  },
  {
    key: '2',
    client: 'John Brown',
    service: 'Service 1',
    requestDate: '2021-01-01',
  },
  {
    key: '3',
    client: 'John Brown',
    service: 'Service 1',
    requestDate: '2021-01-01',
  },
  {
    key: '4',
    client: 'John Brown',
    service: 'Service 1',
    requestDate: '2021-01-01',
  },
  {
    key: '5',
    client: 'John Brown',
    service: 'Service 1',
    requestDate: '2021-01-01',
  },
];

const NewRequest = () => {
  // console.log(TokenUtil.getAccessToken());

  // const { data } =
  //   serviceRequestRepository.hook.useTranslatorNewServiceRequest();
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default NewRequest;
