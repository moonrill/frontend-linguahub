import { imgLanguage } from '#/constants/general';
import { languagesRepository } from '#/repository/language';
import { Language } from '#/types/LanguageTypes';
import { Icon } from '@iconify-icon/react';
import { MenuProps, Skeleton } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomDropdown from './CustomDropdown';

type TranslatorSearchBarProps = {
  sourceLanguage?: string;
  targetLanguage?: string;
  sortBy?: string;
  isHome?: boolean;
};

const TranslatorSearchBar = ({
  sourceLanguage,
  targetLanguage,
  sortBy,
  isHome = false,
}: TranslatorSearchBarProps) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState({
    sourceLanguage: sourceLanguage || 'English',
    targetLanguage: targetLanguage || 'Indonesian',
    sortBy: sortBy || 'mostReviewed',
  });

  const sortByOptions: MenuItemType[] = [
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
    languagesRepository.hooks.useAllLanguages(15, 1);

  const languageOptions: MenuProps['items'] = languages?.data.map(
    (language: any) => ({
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
    })
  );

  const handleSelect = (type: string, key: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [type]: key,
    }));

    if (!isHome) {
      handleSearch({ ...selectedValue, [type]: key });
    }
  };

  const handleSearch = (updatedValue = selectedValue) => {
    router.push(
      `/translator?sourceLanguage=${updatedValue.sourceLanguage}&targetLanguage=${updatedValue.targetLanguage}&sortBy=${updatedValue.sortBy}`
    );
  };

  return (
    <div
      className={`bg-white w-full rounded-[32px] 2xl:rounded-[40px] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[120px] ${
        isHome && '2xl:h-[160px]'
      } px-[100px] 2xl:px-[120px] py-[44px]`}
    >
      <div className='w-full flex justify-between'>
        {/* Source Language */}
        <div className='flex flex-col gap-2'>
          <CustomDropdown
            label='Source Language'
            items={languageOptions}
            onSelect={(key) => handleSelect('sourceLanguage', key)}
            selectedKey={selectedValue.sourceLanguage}
          />
          <div className='flex items-center gap-2'>
            <div className='relative w-8 h-8 2xl:w-[40px] 2xl:h-[40px]'>
              {isLoading ? (
                <Skeleton.Avatar active shape='circle' size={'large'} />
              ) : (
                languages?.data && (
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
                )
              )}
            </div>
            {isLoading ? (
              <Skeleton.Button
                active
                size='small'
                shape={'square'}
                style={{ width: '120px', height: '24px' }}
              />
            ) : (
              <h1 className='font-semibold text-lg 2xl:text-2xl'>
                {selectedValue.sourceLanguage || 'English'}
              </h1>
            )}
          </div>
        </div>

        {/* Target Language */}
        <div className='flex flex-col gap-2'>
          <CustomDropdown
            label='Target Language'
            items={languageOptions}
            onSelect={(key) => handleSelect('targetLanguage', key)}
            selectedKey={selectedValue.targetLanguage}
          />
          <div className='flex items-center gap-2'>
            <div className='relative w-8 h-8 2xl:w-[40px] 2xl:h-[40px]'>
              {isLoading ? (
                <Skeleton.Avatar active shape='circle' size={'large'} />
              ) : (
                languages?.data && (
                  <Image
                    src={imgLanguage(
                      languages.data.find(
                        (lang: Language) =>
                          lang.name === selectedValue.targetLanguage
                      )?.flagImage || languages.data[0].flagImage
                    )}
                    alt='flag'
                    fill
                    sizes='(max-width: 40px)'
                  />
                )
              )}
            </div>
            {isLoading ? (
              <Skeleton.Button
                active
                size='small'
                shape={'square'}
                style={{ width: '120px', height: '24px' }}
              />
            ) : (
              <h1 className='font-semibold text-lg 2xl:text-2xl'>
                {selectedValue.targetLanguage || 'English'}
              </h1>
            )}
          </div>
        </div>

        {/* Sort By */}
        <div className='flex flex-col gap-2'>
          <CustomDropdown
            label='Sort By'
            items={sortByOptions}
            onSelect={(key) => handleSelect('sortBy', key)}
            selectedKey={selectedValue.sortBy}
          />
          <div className='flex items-center gap-2'>
            <h1 className='font-semibold text-lg 2xl:text-2xl'>
              {sortByOptions.find((item) => item?.key === selectedValue.sortBy)
                ?.label || 'Select'}
            </h1>
          </div>
        </div>

        {/* Search Button */}
        {isHome && (
          <div className='flex justify-end'>
            <Link
              href={`/translator?sourceLanguage=${selectedValue.sourceLanguage}&targetLanguage=${selectedValue.targetLanguage}&sortBy=${selectedValue.sortBy}`}
              className='h-full !w-[64px] 2xl:!w-[75px] bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:text-white hover:bg-blue-500 transition-all duration-300'
            >
              <Icon icon='iconamoon:search-light' height={26} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatorSearchBar;
