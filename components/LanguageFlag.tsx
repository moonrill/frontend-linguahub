import { imgLanguage } from '#/constants/general';
import { Language } from '#/types/LanguageTypes';
import { Tooltip } from 'antd';
import Image from 'next/image';

const LanguageFlag = ({
  language,
  size = 'base',
}: {
  language: Language;
  size?: 'sm' | 'base';
}) => {
  const sizing =
    size === 'sm' ? 'w-4 h-4 2xl:w-6 2xl:h-6' : 'w-6 h-6 2xl:w-8 2xl:h-8';
  return (
    <Tooltip title={language.name}>
      <div className={`relative ${sizing}`}>
        <Image
          src={imgLanguage(language.flagImage)}
          alt={`${language.name} flag`}
          fill
          sizes='(max-width: 40px)'
          className='object-cover'
        />
      </div>
    </Tooltip>
  );
};

export default LanguageFlag;
