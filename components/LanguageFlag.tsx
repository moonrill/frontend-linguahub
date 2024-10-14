import { imgLanguage } from '#/constants/general';
import { Language } from '#/types/LanguageTypes';
import { Tooltip } from 'antd';
import Image from 'next/image';

const LanguageFlag = ({ language }: { language: Language }) => {
  return (
    <Tooltip title={language.name}>
      <div className='relative w-6 h-6 2xl:w-8 2xl:h-8'>
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
