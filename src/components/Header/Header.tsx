import { type FC } from 'react';
import { classNames } from '@/css/classnames';
import './Header.css';

interface HeaderProps {
  className?: string;
  title: string;
}

export const Header: FC<HeaderProps> = ({ className, title }) => {
  return (
    <header className={classNames('header', className)}>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}; 