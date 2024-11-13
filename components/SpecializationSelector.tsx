import { RegisterFormData } from '#/types/RegisterTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { Form, Tag } from 'antd';
import { useCallback, useEffect } from 'react';

const SpecializationSelector: React.FC<{
  specializations: Specialization[];
  isLoading: boolean;
  selectedSpecializations: string[];
  setSelectedSpecializations: React.Dispatch<React.SetStateAction<string[]>>;
  updateFormData?: (data: Partial<RegisterFormData>) => void;
}> = ({
  specializations,
  isLoading,
  selectedSpecializations,
  setSelectedSpecializations,
  updateFormData,
}) => {
  const toggleSpecialization = useCallback(
    (id: string) => {
      setSelectedSpecializations((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    },
    [setSelectedSpecializations]
  );

  useEffect(() => {
    if (updateFormData)
      updateFormData({ specializations: selectedSpecializations });
  }, [updateFormData, selectedSpecializations]);

  return (
    <Form.Item
      name='specializations'
      label='Select your preferred specializations'
      rules={[
        {
          validator: () =>
            selectedSpecializations.length > 0
              ? Promise.resolve()
              : Promise.reject(
                  new Error('Please select at least one specialization')
                ),
        },
      ]}
    >
      {isLoading ? (
        <Tag>Loading specializations...</Tag>
      ) : (
        <div className='flex flex-wrap gap-2 md:gap-4'>
          {specializations?.map((spec: Specialization) => (
            <Tag.CheckableTag
              key={spec.id}
              checked={selectedSpecializations.includes(spec.id)}
              onChange={() => toggleSpecialization(spec.id)}
              className='rounded-full px-6 py-[2px] border-zinc-200 m-0'
            >
              {spec.name}
            </Tag.CheckableTag>
          ))}
        </div>
      )}
    </Form.Item>
  );
};

export default SpecializationSelector;
