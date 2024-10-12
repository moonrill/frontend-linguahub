import { Icon } from '@iconify-icon/react';

const StepCard = ({ icon, title, description }: any) => {
  return (
    <div className='flex flex-col gap-4 max-w-[200px] 2xl:max-w-[350px]'>
      <div className='p-4 2xl:p-5 bg-blue-100 rounded-lg 2xl:rounded-xl flex justify-center w-fit'>
        <Icon icon={icon} className='text-blue-600 text-2xl 2xl:text-3xl' />
      </div>
      <h2 className='text-blue-600 font-semibold 2xl:text-xl'>{title}</h2>
      <p className='text-sm 2xl:text-base'>{description}</p>
    </div>
  );
};

const StepSection = () => {
  return (
    <section className='flex flex-col gap-14 2xl:gap-24'>
      <h1 className='text-[28px] 2xl:text-4xl font-bold text-blue-950 text-center'>
        4 Easy Step and Get Your Translator
      </h1>
      <div className='flex justify-between 2xl:gap-10'>
        <StepCard
          icon='mdi:language'
          title='Choose Your Language'
          description='Select the source and target languages for your translation needs.'
        />
        <StepCard
          icon='iconamoon:search-light'
          title='Find & Select Translator'
          description='Use the search filters to find translators according to your language and specialization criteria.'
        />
        <StepCard
          icon='lucide:notebook-pen'
          title='Request & Booking'
          description='Send a request to your chosen translator and proceed with the booking once confirmed.'
        />
        <StepCard
          icon='heroicons:rocket-launch'
          title='Start Service'
          description='Begin your translation service with the selected translator.'
        />
      </div>
    </section>
  );
};

export default StepSection;
