'use client';

import LanguageFlag from '#/components/LanguageFlag';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import { Button, Result, Skeleton, Table, TableProps, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const TranslatorDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, mutate } =
    translatorRepository.hooks.useGetTranslatorById(params.id);

  const translator: Translator = data?.data;

  const columns: TableProps['columns'] = [
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Source Language',
      dataIndex: 'sourceLanguage',
      key: 'sourceLanguage',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <LanguageFlag language={record.sourceLanguage} />
          <span>{record.sourceLanguage.name}</span>
        </div>
      ),
    },
    {
      title: 'Target Language',
      dataIndex: 'targetLanguage',
      key: 'targetLanguage',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <LanguageFlag language={record.targetLanguage} />
          <span>{record.targetLanguage.name}</span>
        </div>
      ),
    },
    {
      title: 'Price per hour',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      align: 'right',
      render: (text) => (
        <p className='font-semibold'>Rp{text.toLocaleString('id-ID')}</p>
      ),
    },
  ];

  const services = translator?.services?.map((service) => ({
    key: service.id,
    ...service,
  }));

  return (
    <main className='bg-white w-full h-full rounded-3xl p-4 flex flex-col gap-4'>
      {isLoading ? (
        <Skeleton active />
      ) : translator ? (
        <>
          <section className='flex justify-between p-4 border rounded-xl'>
            <div className='flex gap-10'>
              {translator?.status === 'approved' && (
                <div className='relative w-[150px] 2xl:w-[250px] h-[150px] 2xl:h-[250px]'>
                  <Image
                    src={
                      translator?.user?.userDetail?.profilePicture
                        ? imgProfilePicture(
                            translator?.user?.userDetail?.profilePicture
                          )
                        : '/images/avatar-placeholder.png'
                    }
                    alt={'translator-profile-picture'}
                    fill
                    sizes='(max-width: 400px)'
                    className='object-cover rounded-xl'
                    priority
                  />
                </div>
              )}
              <div className='flex gap-20 2xl:gap-32'>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Personal Information
                  </h1>
                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Full Name
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Email
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Gender
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Date of Birth
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Phone Number
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.fullName}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.email}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {capitalizeFirstLetter(
                          translator?.user?.userDetail?.gender
                        )}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.dateOfBirth}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                    Address
                  </h1>
                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Province
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        City
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        District
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Sub District
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        Street
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                      <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                        :
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.province}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.city}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.district}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.subDistrict}
                      </p>
                      <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                        {translator?.user?.userDetail?.street}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='flex p-4 border w-full rounded-xl justify-between'>
            <div className='flex gap-10 2xl:gap-20'>
              <div className='flex flex-col gap-3'>
                <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                  Professional Information
                </h1>
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      Years of Experience
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      Portfolio Link
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      Bank
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      Bank Account Number
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      :
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      :
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      :
                    </p>
                    <p className='text-xs 2xl:text-base font-medium text-zinc-500'>
                      :
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                      {translator?.yearsOfExperience} Years
                    </p>
                    <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                      {translator?.portfolioLink && (
                        <Link href={translator?.portfolioLink} target='_blank'>
                          <Tag
                            color='blue'
                            className='text-xs 2xl:text-base font-medium border-none px-2 py-0.5 hover:bg-blue-100 rounded-lg flex items-center gap-2 w-fit'
                          >
                            See Portfolio
                            <Icon icon={'akar-icons:link-out'} />
                          </Tag>
                        </Link>
                      )}
                    </p>
                    <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                      {translator?.bank}
                    </p>
                    <p className='text-xs 2xl:text-base font-semibold text-zinc-800'>
                      {translator?.bankAccountNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                  Languages
                </h1>
                <div className='flex gap-1 2xl:gap-2'>
                  {translator?.languages?.map(
                    (language: Language, index: number) => (
                      <LanguageFlag key={index} language={language} />
                    )
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                  Specializations
                </h1>
                <div className='flex gap-1 2xl:gap-2 flex-wrap'>
                  {translator?.specializations?.map(
                    (specialization: Specialization, index: number) => (
                      <Link
                        key={index}
                        href={`/specialization?name=${specialization.name}`}
                        className='group'
                      >
                        <Tag
                          color='blue'
                          className='!border-blue-50 text-xs 2xl:text-sm py-0.5 px-3 2xl:py-1 2xl:px-5 rounded-full font-medium group-hover:!border-blue-600'
                        >
                          {specialization.name}
                        </Tag>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className='flex p-4 border w-full rounded-xl gap-6'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                CV/Resume
              </h1>
              <Link
                target='_blank'
                href={`${config.baseUrl}/translators/cv/${translator?.cv}`}
                className='group'
              >
                <div className='w-[120px] h-[120px] rounded-xl bg-blue-50 flex flex-col justify-center items-center group-hover:border group-hover:border-blue-600 transition-all duration-300'>
                  <Icon
                    icon='basil:document-solid'
                    height={64}
                    className='text-blue-600 group-hover:scale-110 transition-all duration-300'
                  />
                </div>
              </Link>
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
                Certificate
              </h1>
              <Link
                target='_blank'
                href={`${config.baseUrl}/translators/certificates/${translator?.certificate}`}
                className='group'
              >
                <div className='w-[120px] h-[120px] rounded-xl bg-blue-50 flex flex-col justify-center items-center group-hover:border group-hover:border-blue-600 transition-all duration-300'>
                  <Icon
                    icon='basil:document-solid'
                    height={64}
                    className='text-blue-600 group-hover:scale-110 transition-all duration-300'
                  />
                </div>
              </Link>
            </div>
          </section>
          <section className='flex flex-col gap-3 p-4 border w-full rounded-xl'>
            <h1 className='text-sm 2xl:text-xl font-semibold text-zinc-600'>
              Service
            </h1>
            <Table
              columns={columns}
              dataSource={services}
              pagination={false}
              rowHoverable={false}
            />
          </section>
        </>
      ) : (
        <Result
          status='404'
          title='404'
          subTitle='Oops! Translator not found.'
          className='mx-auto'
          extra={
            <Button
              type='primary'
              href='/dashboard/account/translator'
              className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
            >
              Back
            </Button>
          }
        />
      )}
    </main>
  );
};

export default TranslatorDetail;
