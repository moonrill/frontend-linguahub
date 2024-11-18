import { Addresses, SelectedAddressName } from '#/types/AddressTypes';
import { Form, Input } from 'antd';
import { RegisterFormData } from '#/types/RegisterTypes';
import AddressSelect from '#/components/AddressSelect';
import { Icon } from '@iconify-icon/react';

interface AddressFormProps {
  addresses: Addresses; 
  formData: Partial<RegisterFormData>;
  handleSelectionChange: (addressType: string, label: string, value: string) => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
}

export const AddressForm = ({ 
  addresses, 
  formData,     
  handleSelectionChange,
  updateFormData 
}: AddressFormProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 md:gap-4">
        <Form.Item
          name="provinceId"
          rules={[{ required: true, message: 'Please select a province' }]}
        >
          <AddressSelect
            placeholder="Province"
            options={addresses.province}
            disabled={false}
            onChange={(label: string, value: string) =>
              handleSelectionChange('provinceId', label, value)
            }
          />
        </Form.Item>
        <Form.Item
          name="cityId"
          rules={[{ required: true, message: 'Please select a city' }]}
        >
          <AddressSelect
            placeholder="City"
            options={addresses.city}
            disabled={!formData.provinceId}
            onChange={(label: string, value: string) =>
              handleSelectionChange('cityId', label, value)
            }
          />
        </Form.Item>
      </div>

      <div className="grid md:grid-cols-2 md:gap-4">
        <Form.Item
          name="districtId"
          rules={[{ required: true, message: 'Please select a district' }]}
        >
          <AddressSelect
            placeholder="District"
            options={addresses.district}
            disabled={!formData.cityId}
            onChange={(label: string, value: string) =>
              handleSelectionChange('districtId', label, value)
            }
          />
        </Form.Item>
        <Form.Item
          name="subDistrictId"
          rules={[{ required: true, message: 'Please select a sub-district' }]}
        >
          <AddressSelect
            placeholder="Sub District"
            options={addresses.subDistrict}
            disabled={!formData.districtId}
            onChange={(label: string, value: string) =>
              handleSelectionChange('subDistrictId', label, value)
            }
          />
        </Form.Item>
      </div>

      <Form.Item
        name="street"
        validateDebounce={500}
        rules={[{ required: true, message: 'Please enter your street' }]}
      >
        <Input
          type="text"
          placeholder="Street"
          onChange={(e) => updateFormData({ street: e.target.value })}
          suffix={<Icon icon="fluent:street-sign-24-filled" height={24} className="text-zinc-400" />}
          className="h-14"
        />
      </Form.Item>
    </>
  );
};