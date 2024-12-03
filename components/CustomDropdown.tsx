import { Icon } from '@iconify-icon/react';
import { Dropdown, MenuProps } from 'antd';

type CustomDropdownProps = {
  label: string;
  items: MenuProps['items'];
  selectedKey: string;
  useBackground?: boolean;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  onSelect?: (key: string) => void;
};

const CustomDropdown = ({
  label,
  items,
  selectedKey,
  useBackground = false,
  placement = 'bottomLeft',
  onSelect,
}: CustomDropdownProps) => {
  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
        selectable: true,
        onClick: handleClick,
        selectedKeys: [selectedKey],
      }}
      className='cursor-pointer'
      placement={placement}
    >
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${
          useBackground
            ? 'text-zinc-500 bg-zinc-100 px-4 py-3 rounded-xl hover:bg-zinc-200'
            : 'text-zinc-400 hover:text-zinc-500'
        } `}
      >
        <p className='font-medium text-sm 2xl:text-base'>{label}</p>
        <Icon icon='weui:arrow-outlined' height={24} className='rotate-90' />
      </div>
    </Dropdown>
  );
};

export default CustomDropdown;
