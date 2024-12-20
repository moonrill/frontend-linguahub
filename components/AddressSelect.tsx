import { City, District, Province, SubDistrict } from '#/types/AddressTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Select } from 'antd';

type AddressSelectOptions = Province[] | City[] | District[] | SubDistrict[];

type AddressSelectProps = {
  placeholder: string;
  options: AddressSelectOptions;
  disabled: boolean;
  value?: string;
  onChange: (label: string, value: string) => void;
};

const AddressSelect = ({
  placeholder,
  options,
  disabled,
  value,
  onChange,
}: AddressSelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      showSearch
      disabled={disabled}
      className='h-14 w-full border-none'
      onChange={(value, option: any) => onChange(option.label, value)}
      value={value}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options.map((opt) => ({
        label: capitalizeFirstLetter(opt.name),
        value: opt.id,
      }))}
      menuItemSelectedIcon={
        <Icon icon={'ci:check-big'} height={24} className='text-zinc-500' />
      }
      suffixIcon={
        <Icon icon={'mdi:chevron-down'} height={32} className='text-zinc-400' />
      }
    />
  );
};

export default AddressSelect;
