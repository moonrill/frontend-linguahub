'use client';

import { RegisterFormData } from '#/types/RegisterTypes';
import { useState } from 'react';
import AddressInfo from './components/AddressInfo';
import DocumentsUpload from './components/DocumentsUpload';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalInfo from './components/ProfessionalInfo';
import RoleSelection from './components/RoleSelection';
import StepIndicator from './components/StepIndicator';

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({
    role: undefined,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev: Partial<RegisterFormData>) => ({ ...prev, ...data }));
  };

  const clientSteps = ['Personal Information', 'Address Information'];
  const translatorSteps = [
    'Personal Information',
    'Address Information',
    'Professional Information',
    'Documents Upload',
  ];

  const steps = [
    {
      component: RoleSelection,
      props: { updateFormData, nextStep, formData },
    },
    {
      component: PersonalInfo,
      props: { updateFormData, nextStep, prevStep, formData },
    },
    {
      component: AddressInfo,
      props: { updateFormData, nextStep, prevStep, formData },
    },
    {
      component: ProfessionalInfo,
      props: { updateFormData, nextStep, prevStep, formData },
    },
    {
      component: DocumentsUpload,
      props: { updateFormData, nextStep, prevStep, formData },
    },
  ];

  const CurrentStep = steps[step].component;
  const currentProps = steps[step].props;

  const isLastStep =
    (formData.role === 'client' && step === 2) ||
    (formData.role === 'translator' && step === 4);

  return (
    <div className='pt-4 md:pt-14 flex flex-col h-full'>
      {step > 0 && (
        <div className='w-full'>
          <StepIndicator
            steps={formData.role === 'client' ? clientSteps : translatorSteps}
            currentStep={step - 1}
          />
        </div>
      )}
      <CurrentStep {...currentProps} />
    </div>
  );
};

export default Register;
