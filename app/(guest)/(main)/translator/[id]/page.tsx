'use client';

import CardSkeleton from '#/components/CardSkeleton';
import LanguageFlag from '#/components/LanguageFlag';
import ServiceRequestModal from '#/components/Modal/ServiceRequestModal';
import ReviewCard from '#/components/ReviewCard';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { Translator } from '#/types/TranslatorTypes';
import { User } from '#/types/UserType';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  Card,
  Divider,
  Result,
  Skeleton,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TranslatorDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data: result, isLoading } =
    translatorRepository.hooks.useGetTranslatorById(params.id);

  const translator: Translator = result?.data;

  useEffect(() => {
    if (!translator) return;
    document.title = `${translator?.user?.userDetail?.fullName} - Translator`;
  }, [translator]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

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

  const handleClick = () => {
    if (user) {
      if (!user.googleCalendarToken) {
        const authUrl = `${
          config.baseUrl
        }/auth/google?email=${encodeURIComponent(user.email)}`;
        window.location.href = authUrl;
        return;
      }
      setModalOpen(!modalOpen);
      return;
    }
    router.push('/login');
  };

  return (
    <div className='mt-6 flex gap-6 min-h-screen'>
      {isLoading ? (
        <>
          <div className='w-[280px] 2xl:w-[360px]'>
            <CardSkeleton />
          </div>
          <div className='flex-1'>
            <Skeleton active />
            <Skeleton active className='mt-4' />
          </div>
        </>
      ) : translator ? (
        <>
          <Card className='my-card hover:!shadow-none overflow-hidden w-[280px] 2xl:w-[360px]'>
            <div className='relative w-full h-[280px] 2xl:h-[360px]'>
              <Image
                src={
                  translator?.user?.userDetail?.profilePicture
                    ? imgProfilePicture(
                        translator.user.userDetail.profilePicture
                      )
                    : '/images/avatar-placeholder.png'
                }
                alt={'translator-profile-picture'}
                fill
                sizes='(max-width: 400px)'
                className='object-cover'
                priority
              />
            </div>
            <div className='p-4 2xl:p-5'>
              <div className='flex flex-col gap-3'>
                <div>
                  <p className='text-sm font-medium'>Languages offered :</p>
                  <div className='flex gap-1 2xl:gap-2 mt-2'>
                    {translator?.languages?.map(
                      (language: Language, index: number) => (
                        <LanguageFlag key={index} language={language} />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-sm font-medium'>Specializations :</p>
                  <div className='flex gap-1 2xl:gap-2 mt-2 flex-wrap'>
                    {translator?.specializations?.map(
                      (specialization: Specialization, index: number) => (
                        <Link
                          key={index}
                          href={`/specialization?name=${specialization.name}`}
                          className='group'
                        >
                          <Tag
                            color='blue'
                            className='!border-blue-50 text-xs 2xl:text-sm py-1 px-5 rounded-full font-medium group-hover:!border-blue-600'
                          >
                            {specialization.name}
                          </Tag>
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <Divider style={{ margin: 0 }} className='!my-2' />
                <div className='flex items-center gap-2'>
                  <Icon
                    icon={'ic:round-phone'}
                    className='text-blue-600 text-xl 2xl:text-2xl'
                  />
                  <p className='text-xs 2xl:text-sm font-medium text-blue-600'>
                    {translator?.user?.userDetail?.phoneNumber}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Icon
                    icon={'mdi:map-marker'}
                    className='text-blue-600 text-xl 2xl:text-2xl'
                  />
                  <p className='text-xs 2xl:text-sm font-medium text-blue-600'>
                    {translator?.user?.userDetail?.city},{' '}
                    {translator?.user?.userDetail?.province}
                  </p>
                </div>
                {(!user || user?.role?.name === 'client') && (
                  <Button
                    type='primary'
                    onClick={handleClick}
                    className='text-xs 2xl:text-sm py-5 2xl:py-6 !mt-3 2xl:!mt-4 rounded-xl font-medium flex-grow'
                  >
                    Send a Request
                  </Button>
                )}
              </div>
            </div>
          </Card>
          <Card className='my-card hover:!shadow-none flex-1 p-4 2xl:p-6'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-2'>
                <div>
                  <h1 className='text-2xl 2xl:text-4xl font-semibold text-blue-900'>
                    {translator?.user?.userDetail?.fullName}
                  </h1>
                  <p className='text-zinc-500 text-sm 2xl:text-base font-medium'>
                    {translator?.user?.email}
                  </p>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-1 items-center'>
                    <Icon
                      icon={'tabler:star-filled'}
                      className='text-yellow-400 text-base 2xl:text-xl'
                    />
                    <p className='text-sm font-semibold'>
                      {translator?.rating}
                    </p>
                    <p className='text-xs font-light'>
                      ({translator?.reviewsCount} reviews)
                    </p>
                  </div>
                  <div className='flex gap-1 items-center text-zinc-500'>
                    <Icon
                      icon={'solar:square-academic-cap-bold'}
                      className='text-base 2xl:text-xl'
                    />
                    <p className='text-xs font-medium'>
                      {translator?.yearsOfExperience} Years of Experience
                    </p>
                  </div>
                </div>
              </div>
              <Tooltip title='View Portfolio'>
                <Button type='link' href={translator?.portfolioLink}>
                  <Icon
                    icon={'simple-icons:readdotcv'}
                    className='text-4xl 2xl:text-5xl'
                  />
                </Button>
              </Tooltip>
            </div>
            <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
            <div>
              <p className='text-blue-900 font-medium text-base 2xl:text-lg'>
                Bio
              </p>
              <p className='text-xs 2xl:text-sm'>{translator?.bio}</p>
            </div>
            <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
            <div>
              <p className='text-blue-900 font-medium text-base 2xl:text-lg mb-2'>
                Services
              </p>
              <Table
                columns={columns}
                dataSource={services}
                pagination={false}
              />
            </div>
            <Divider style={{ margin: 0 }} className='!my-2 2xl:!my-4' />
            <div>
              <p className='text-blue-900 font-medium text-base 2xl:text-lg mb-2'>
                Latest Reviews
              </p>
              <div className='flex flex-col gap-3'>
                {translator?.reviews?.map((review) => (
                  <ReviewCard review={review} key={review.id} />
                ))}
              </div>
            </div>
          </Card>
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
              href='/translator'
              className='py-3 px-5 w-fit h-fit text-sm rounded-xl'
            >
              Back
            </Button>
          }
        />
      )}
      <ServiceRequestModal
        translator={translator}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default TranslatorDetail;
