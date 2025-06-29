import { FC } from 'react';
import { classNames } from '@/css/classnames';
import './Divider.css';

interface DividerProps {
  className?: string;
}

export const Divider: FC<DividerProps> = ({ className }) => {
  return (
    <div className={classNames('divider', className)} />
  );
}; 