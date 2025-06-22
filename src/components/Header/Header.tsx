import { FC } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ 
  title = "Привіт! Готові зберегти, знайти або щось приготувати?",
  className = ""
}) => {
  return (
    <div className={`header ${className}`} data-name="Header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__title">
            <p className="header__title-text">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 