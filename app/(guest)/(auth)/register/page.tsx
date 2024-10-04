'use client';

import { RegisterFormData } from '#/types/RegisterTypes';
import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import RoleSelection from './components/RoleSelection';
import StepIndicator from './components/StepIndicator';

const Register = () => {
  const [step, setStep] = useState(-1);
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
      props: { updateFormData, nextStep },
    },
    {
      component: PersonalInfo,
      props: { updateFormData, nextStep, prevStep, formData },
    },
  ];

  const CurrentStep = steps[step + 1].component;
  const currentProps = steps[step + 1].props;

  const isLastStep =
    (formData.role === 'client' && step === 1) ||
    (formData.role === 'translator' && step === 3);

  return (
    <div className="pt-14 flex flex-col h-full">
      {formData.role && step >= 0 && (
        <div className="w-full">
          <StepIndicator
            steps={formData.role === 'client' ? clientSteps : translatorSteps}
            currentStep={step}
          />
        </div>
      )}
      <CurrentStep {...currentProps} />
    </div>
  );
};

export default Register;
