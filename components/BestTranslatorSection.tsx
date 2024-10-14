import { translatorRepository } from '#/repository/translator';
import { BestTranslator } from '#/types/TranslatorTypes';
import BestTranslatorCard from './TranslatorCard/BestTranslatorCard';

const BestTranslatorSection = () => {
  const { data: translator, isLoading } =
    translatorRepository.hooks.useGetBestTranslator();
  return (
    <section className='flex flex-col gap-10 2xl:gap-24'>
      <h1 className='text-[28px] 2xl:text-4xl font-bold text-blue-950 text-center'>
        Our Best Translator
      </h1>
      <div className='grid grid-cols-3 justify-center gap-6 2xl:gap-10 bg-blue-50 py-9 px-14 rounded-3xl'>
        {isLoading ? (
          // TODO: Change to skeleton
          <div>Loading</div>
        ) : (
          translator.data.map((t: BestTranslator) => (
            <BestTranslatorCard key={t.id} translator={t} />
          ))
        )}
      </div>
    </section>
  );
};

export default BestTranslatorSection;
