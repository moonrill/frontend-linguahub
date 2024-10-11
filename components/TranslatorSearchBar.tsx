import { imgLanguage } from '#/constants/general';
import { languagesRepository } from '#/repository/language';
import { Language } from '#/types/Language';
import { Icon } from '@iconify-icon/react';
import { Button, MenuProps } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomDropdown from './CustomDropdown';

const TranslatorSearchBar = () => {
  const [selectedValue, setSelectedValue] = useState({
    sourceLanguage: '',
    targetLanguage: '',
    sortBy: 'rating',
  });

  const items: MenuProps['items'] = [
    {
      key: 'mostReviewed',
      label: 'Most Reviewed',
    },
    {
      key: 'rating',
      label: 'Rating',
    },
    {
      key: 'price',
      label: 'Price',
    },
  ];

  const { data: languages, isLoading } =
    languagesRepository.hooks.useAllLanguages();

  // Filter source languages agar tidak menampilkan targetLanguage
  const sourceLanguagesOptions: MenuProps['items'] = languages?.data
    .filter((language: any) => language.name !== selectedValue.targetLanguage) // Hilangkan bahasa yang sama dengan target
    .map((language: any) => ({
      key: language.name,
      label: (
        <div className='flex items-center gap-2'>
          <div>
            <Image
              src={imgLanguage(language.flagImage)}
              width={24}
              height={24}
              alt={language.name}
            />
          </div>
          <p>{language.name}</p>
        </div>
      ),
    }));

  // Filter target languages agar tidak menampilkan sourceLanguage
  const targetLanguagesOptions: MenuProps['items'] = languages?.data
    .filter((language: any) => language.name !== selectedValue.sourceLanguage) // Hilangkan bahasa yang sama dengan source
    .map((language: any) => ({
      key: language.name,
      label: (
        <div className='flex items-center gap-2'>
          <div>
            <Image
              src={imgLanguage(language.flagImage)}
              width={24}
              height={24}
              alt={language.name}
            />
          </div>
          <p>{language.name}</p>
        </div>
      ),
    }));

  // Set default language ke bahasa pertama saat data tersedia
  useEffect(() => {
    if (languages && languages.data.length > 0) {
      setSelectedValue((prev) => ({
        sourceLanguage: prev.sourceLanguage || languages.data[0].name,
        targetLanguage: prev.targetLanguage || languages.data[1]?.name || '',
        sortBy: prev.sortBy,
      }));
    }
  }, [languages]);

  // Fungsi untuk menangani pemilihan dropdown
  const handleSelect = (type: string, key: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [type]: key, // Simpan key yang dipilih
    }));
    console.log(`Selected ${type}:`, key); // Tampilkan key di console
  };

  return (
    <div className='absolute px-[120px] 2xl:px-[300px] w-full bottom-[-80px]'>
      <div className='bg-white w-full rounded-[40px] flex items-center justify-center shadow-[-17px_-17px_44px_48px_#0000000D,17px_17px_44px_0px_#0000000D] h-[160px] px-[100px] 2xl:px-[120px] py-[44px]'>
        <div className='w-full grid grid-cols-4 items-start gap-[70px]'>
          {/* Source Language */}
          <div className='flex flex-col gap-2'>
            <CustomDropdown
              label='Source Language'
              items={sourceLanguagesOptions} // Hanya menampilkan bahasa yang berbeda dari targetLanguage
              onSelect={(key) => handleSelect('sourceLanguage', key)}
            />
            <div className='flex items-center gap-2'>
              <div className='relative w-[40px] h-[40px]'>
                {languages?.data && (
                  <Image
                    src={imgLanguage(
                      languages.data.find(
                        (lang: Language) =>
                          lang.name === selectedValue.sourceLanguage
                      )?.flagImage || languages.data[0].flagImage
                    )}
                    alt='flag'
                    fill
                    sizes='(max-width: 40px)'
                  />
                )}
              </div>
              <h1 className='font-semibold text-xl 2xl:text-2xl'>
                {selectedValue.sourceLanguage || 'English'}
              </h1>
            </div>
          </div>

          {/* Target Language */}
          <div className='flex flex-col gap-2'>
            <CustomDropdown
              label='Target Language'
              items={targetLanguagesOptions} // Hanya menampilkan bahasa yang berbeda dari sourceLanguage
              onSelect={(key) => handleSelect('targetLanguage', key)}
            />
            <div className='flex items-center gap-2'>
              <div className='relative w-[40px] h-[40px]'>
                {languages?.data && (
                  <Image
                    src={imgLanguage(
                      languages.data.find(
                        (lang: Language) =>
                          lang.name === selectedValue.targetLanguage
                      )?.flagImage ||
                        languages.data.find(
                          (lang: Language) =>
                            lang.name !== selectedValue.sourceLanguage
                        )?.flagImage
                    )}
                    alt='flag'
                    fill
                    sizes='(max-width: 40px)'
                  />
                )}
              </div>
              <h1 className='font-semibold text-xl 2xl:text-2xl'>
                {selectedValue.targetLanguage || 'English'}
              </h1>
            </div>
          </div>

          {/* Sort By */}
          <div className='flex flex-col gap-2'>
            <CustomDropdown
              label='Sort By'
              items={items}
              onSelect={(key) => handleSelect('sortBy', key)}
            />
            <div className='flex items-center gap-2'>
              <h1 className='font-semibold text-xl 2xl:text-2xl'>
                {items.find((item) => item.key === selectedValue.sortBy)
                  ?.label || 'Select'}
              </h1>
            </div>
          </div>

          {/* Search Button */}
          <div className='flex justify-end'>
            <Button
              type='primary'
              icon={<Icon icon='iconamoon:search-light' height={26} />}
              className='!w-[75px] !h-[75px] search-btn'
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorSearchBar;
