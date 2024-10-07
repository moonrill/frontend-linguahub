import { Language } from '#/types/Language';
import { Form, Tag, Tooltip } from 'antd';
import Image from 'next/image';

const LanguageSelector: React.FC<{
  languages: Language[];
  isLoading: boolean;
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ languages, isLoading, selectedLanguages, setSelectedLanguages }) => {
  const toggleLanguage = (id: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Form.Item
      name='languages'
      label='Select your preferred languages'
      rules={[
        {
          validator: () =>
            selectedLanguages.length > 1
              ? Promise.resolve()
              : Promise.reject(
                  new Error('Please select at least two languages')
                ),
        },
      ]}
    >
      <div className='grid grid-cols-5 md:grid-cols-6 w-full gap-2 md:gap-4'>
        {isLoading ? (
          <Tag>Loading languages...</Tag>
        ) : (
          languages?.map((lang: Language) => (
            <Tooltip key={lang.id} title={lang.name}>
              <Tag.CheckableTag
                checked={selectedLanguages.includes(lang.id)}
                onChange={() => toggleLanguage(lang.id)}
                className='w-full h-fit flex py-3 px-4 justify-center items-center border-zinc-100 rounded-lg md:rounded-xl shadow-xl shadow-zinc-300/10 m-0'
              >
                <div className='relative w-[32px] h-[32px] md:w-[42px] md:h-[42px]'>
                  <Image
                    src={lang.flagImage}
                    className='object-contain brightness-100'
                    alt={lang.name}
                    fill
                    sizes='(max-width: 90px)'
                  />
                </div>
              </Tag.CheckableTag>
            </Tooltip>
          ))
        )}
      </div>
    </Form.Item>
  );
};

export default LanguageSelector;
