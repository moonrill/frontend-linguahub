import { imgLanguage } from '#/constants/general';
import { Language } from '#/types/LanguageTypes';
import Image from 'next/image';

const LanguageFlag = ({ language }: { language: Language }) => {
  return (
    <div className='relative'>
      <Image
        src={imgLanguage(language.flagImage)}
        alt={`${language.name} flag`}
        fill
        sizes='(max-width: 40px)'
      />
    </div>
  );
};

export default LanguageFlag;
