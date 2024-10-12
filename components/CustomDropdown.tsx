import { Icon } from '@iconify-icon/react';
import { Dropdown, MenuProps } from 'antd';

type CustomDropdownProps = {
  label: string;
  items: MenuProps['items'];
  onSelect?: (key: string) => void; // Hanya mengirimkan key
};

const CustomDropdown = ({ label, items, onSelect }: CustomDropdownProps) => {
  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (onSelect) {
      onSelect(key); // Kirim key yang dipilih
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
        selectable: true,
        onClick: handleClick, // Handler untuk klik item
      }}
      className='language-select cursor-pointer'
    >
      <div className='flex items-center gap-2'>
        <p className='font-medium text-sm 2xl:text-base'>{label}</p>
        <Icon icon='weui:arrow-outlined' height={24} className='rotate-90' />
      </div>
    </Dropdown>
  );
};

export default CustomDropdown;
