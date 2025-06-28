import { FC } from 'react';
import { classNames } from '@/css/classnames';
import './SectionTitle.css';

interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <h2 className={classNames('section-title', className)}>
      {title}
    </h2>
  );
}; 