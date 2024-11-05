import { Table } from 'antd';
import Pagination from '../Pagination';

interface CustomTableProps {
  columns: any[];
  data: any[];
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPage: number;
  totalData: number;
  pageSize: number;
  onClick?: (record: any) => void;
}

const CustomTable = ({
  columns,
  data,
  isLoading,
  currentPage,
  totalPage,
  totalData,
  pageSize,
  handlePageChange,
  onClick,
}: CustomTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
      rootClassName={onClick ? 'cursor-pointer' : ''}
      onRow={
        onClick ? (record) => ({ onClick: () => onClick(record) }) : undefined
      }
      loading={isLoading}
      footer={() => (
        <div className='flex justify-between items-center'>
          <p className='text-xs 2xl:text-sm'>
            Page <span className='font-semibold'>{currentPage}</span> of{' '}
            {totalPage} ({totalData} result)
          </p>
          <Pagination
            current={currentPage}
            total={totalData}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
    />
  );
};

export default CustomTable;
