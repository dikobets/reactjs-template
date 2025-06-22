import React from 'react';
import './CategoryCard.css';

export interface CategoryCardProps {
  state?: 'skeleton' | 'default' | 'hover' | 'press';
  icon?: string;
  title?: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  state = 'default',
  icon,
  title,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick && state !== 'skeleton') {
      onClick();
    }
  };

  return (
    <div 
      className={`category-card category-card--${state}`}
      onClick={handleClick}
    >
      <div className="category-card__content">
        {state === 'skeleton' ? (
          <>
            <div className="category-card__icon-skeleton" />
            <div className="category-card__title-skeleton" />
          </>
        ) : (
          <>
            <div className="category-card__icon">
              {icon && (
                <img 
                  src={icon} 
                  alt="" 
                  className="category-card__icon-image"
                />
              )}
            </div>
            <div className="category-card__title">
              {title}
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 