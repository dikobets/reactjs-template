import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

export interface CategoryCardProps {
  state?: 'skeleton' | 'default';
  icon?: string;
  title?: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({
  state = 'default',
  icon,
  title,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (state !== 'skeleton' && title) {
      navigate(`/category/${encodeURIComponent(title)}`);
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
                  alt={title || ''} 
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