import { FC } from 'react';
import { classNames } from '@/css/classnames';
import './StepItem.css';

interface StepItemProps {
  stepNumber: number;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const StepItem: FC<StepItemProps> = ({ stepNumber, text, isActive, onClick }) => {
  return (
    <div
      className={classNames('step-item', isActive && 'step-item--active')}
      onClick={onClick}
    >
      <div className="step-item__number-container">
        <span className="step-item__number">{stepNumber}</span>
      </div>
      <p className="step-item__text">{text}</p>
    </div>
  );
}; 