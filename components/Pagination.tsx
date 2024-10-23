import { Icon } from '@iconify-icon/react';
import { Pagination as AntPagination } from 'antd';
import { FC } from 'react';

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  return (
    <AntPagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      className={total <= pageSize || total === 0 ? 'hidden' : ''}
      align='end'
      prevIcon={<Icon icon='iconamoon:arrow-left-2-light' />}
      nextIcon={<Icon icon='iconamoon:arrow-right-2-light' />}
    />
  );
};

export default Pagination;
