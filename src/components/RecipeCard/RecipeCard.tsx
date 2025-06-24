import { FC } from 'react';
import './RecipeCard.css';
import categoryForkIcon from '@/assets/icons/category-fork.png';
import receptImage from '@/assets/icons/recept-image.png';

interface RecipeCardProps {
  /** Current state of the recipe card */
  state?: 'default' | 'empty' | 'hover' | 'skeleton' | 'press';
  /** Recipe title */
  title?: string;
  /** Recipe image URL */
  imageUrl?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the card is disabled */
  disabled?: boolean;
}

export const RecipeCard: FC<RecipeCardProps> = ({
  state = 'default',
  title = 'Вівсяна каша з горіхами та ви...',
  imageUrl,
  onClick,
  disabled = false
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const renderImage = () => {
    if (state === 'skeleton') {
      return (
        <div className="recipe-card__image recipe-card__image--skeleton">
          <div className="recipe-card__skeleton-icon" />
        </div>
      );
    }

    if (state === 'empty') {
      return (
        <div className="recipe-card__image recipe-card__image--empty">
          <div className="recipe-card__empty-icon">
            <img 
              src={categoryForkIcon} 
              alt="" 
              className="recipe-card__empty-icon-image"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="recipe-card__image">
        <img
          src={imageUrl || receptImage}
          alt={title}
          className="recipe-card__image-img"
        />
      </div>
    );
  };

  const renderText = () => {
    if (state === 'skeleton') {
      return (
        <div className="recipe-card__text">
          <div className="recipe-card__skeleton-text">
            <div className="recipe-card__skeleton-line recipe-card__skeleton-line--full" />
            <div className="recipe-card__skeleton-line recipe-card__skeleton-line--partial" />
          </div>
        </div>
      );
    }

    return (
      <div className="recipe-card__text">
        <p className="recipe-card__title">{title}</p>
      </div>
    );
  };

  return (
    <div
      className={`recipe-card recipe-card--${state} ${disabled ? 'recipe-card--disabled' : ''}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {renderImage()}
      {renderText()}
    </div>
  );
}; 