'use client';

import LanguageFlag from '#/components/LanguageFlag';
import ConfirmModal from '#/components/Modal/ConfirmModal';
import StatusBadge from '#/components/StatusBadge';
import { config } from '#/config/app';
import { imgProfilePicture } from '#/constants/general';
import { translatorRepository } from '#/repository/translator';
import { Language } from '#/types/LanguageTypes';
import { Specialization } from '#/types/SpecializationTypes';
import { Translator } from '#/types/TranslatorTypes';
import { capitalizeFirstLetter } from '#/utils/capitalizeFirstLetter';
import { Icon } from '@iconify-icon/react';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Result,
  Skeleton,
  Tag,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TranslatorDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, mutate } =
    translatorRepository.hooks.useGetTranslatorById(params.id);

  const [openApprove, setOpenApprove] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const translator: Translator = data?.data;

  const handleAccept = async () => {
    if (!translator) return;
    setLoading(true);
    try {
      await translatorRepository.api.approveTranslator(translator.id);
      setOpenApprove(false);
      message.success('Translator approved successfully');
      mutate();
    } catch (error) {
      message.error('Failed to approve translator');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (values: any) => {
    if (!translator) return;
    setLoading(true);
    try {
      await translatorRepository.api.rejectTranslator(translator.id, values);
      setOpenRejectModal(false);
      message.success('Translator rejected successfully');
      mutate();
    } catch (error) {
      message.error('Failed to reject translator');
    } finally {
      setLoading(false);
    }
  };

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
            <div>
              <StatusBadge
                status={translator?.status}
                text={capitalizeFirstLetter(translator?.status)}
              />
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
                        <Link href={translator?.portfolioLink}>
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
            <div className='flex flex-col gap-2'>
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
            <div className='flex flex-col gap-2'>
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
          {translator?.status === 'pending' && (
            <>
              <div className='flex gap-3 justify-end'>
                <Button
                  className='py-6 px-4 font-medium rounded-xl text-sm 2xl:text-base flex gap-0.5 hover:!border hover:!border-rose-600 hover:!text-rose-600'
                  type='default'
                  htmlType='button'
                  onClick={() => setOpenRejectModal(true)}
                >
                  Reject
                </Button>
                <Button
                  className='py-6 px-4 font-medium rounded-xl text-sm 2xl:text-base flex gap-0.5'
                  type='primary'
                  htmlType='submit'
                  onClick={() => setOpenApprove(true)}
                >
                  <Icon
                    icon={'solar:check-read-linear'}
                    className='text-2xl 2xl:text-3xl'
                  />
                  Approve
                </Button>
              </div>
              <ConfirmModal
                open={openApprove}
                onCancel={() => setOpenApprove(false)}
                onConfirm={handleAccept}
                type='success'
                title='Approve Request?'
                description='Are you sure you want to approve this request?'
                cancelText='No, cancel'
                confirmText="Yes, I'm sure"
                isLoading={loading}
              />
              <Modal
                open={openRejectModal}
                onCancel={() => setOpenRejectModal(false)}
                centered
                footer={null}
              >
                <div className='flex items-center gap-2'>
                  <div className='p-2 bg-blue-600 rounded-full flex items-center justify-center text-white'>
                    <Icon icon={'lucide:mail-x'} className='text-2xl' />
                  </div>
                  <h1 className='text-lg 2xl:text-xl font-semibold'>
                    Reject Request
                  </h1>
                </div>
                <Form
                  className='mt-2 text-black flex flex-col'
                  onFinish={handleReject}
                >
                  <Form.Item
                    name='reason'
                    rules={[
                      {
                        required: true,
                        message: 'Please provide reason for rejection',
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={6}
                      className='mt-4 text-sm focus:!border-none border-none !bg-zinc-100 focus:!ring-0 p-3 rounded-xl'
                      placeholder='Please provide reason for rejection'
                    />
                  </Form.Item>
                  <div className='flex justify-between w-full gap-4'>
                    <Button
                      className='w-full py-6 font-medium rounded-xl'
                      type='default'
                      htmlType='button'
                      onClick={() => setOpenRejectModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className='w-full py-6 font-medium rounded-xl'
                      type='primary'
                      htmlType='submit'
                      loading={loading}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </Modal>
            </>
          )}
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
