import { FC, useState } from 'react';
import { StepItem } from '@/components/StepItem';
import './StepList.css';

interface StepListProps {
  steps: string[];
}

export const StepList: FC<StepListProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="step-list">
      {steps.map((step, index) => (
        <StepItem
          key={index}
          stepNumber={index + 1}
          text={step}
          isActive={activeIndex === index}
          onClick={() => handleStepClick(index)}
        />
      ))}
    </div>
  );
}; 