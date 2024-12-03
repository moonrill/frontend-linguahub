import { Steps } from 'antd';

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <Steps current={currentStep} labelPlacement="vertical">
      {steps.map((step, index) => (
        <Steps.Step key={index} title={step} />
      ))}
    </Steps>
  );
}
