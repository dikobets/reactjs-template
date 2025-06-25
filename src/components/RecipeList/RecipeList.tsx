import { FC } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import './RecipeList.css';

export interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
}

interface RecipeListProps {
  /** Array of recipes to display */
  recipes?: Recipe[];
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Callback when recipe is clicked */
  onRecipeClick?: (recipe: Recipe) => void;
  /** Custom CSS class */
  className?: string;
}

export const RecipeList: FC<RecipeListProps> = ({
  recipes = [],
  loading = false,
  error = null,
  onRecipeClick,
  className = ''
}) => {
  // Handle recipe card click
  const handleRecipeClick = (recipe: Recipe) => {
    if (onRecipeClick) {
      onRecipeClick(recipe);
    }
  };

  // Render skeleton state
  const renderSkeleton = () => {
    const skeletonItems = Array.from({ length: 6 }, (_, index) => (
      <RecipeCard key={`skeleton-${index}`} state="skeleton" />
    ));

    return (
      <div className={`recipe-list recipe-list--loading ${className}`}>
        {skeletonItems}
      </div>
    );
  };

  // Render empty state
  const renderEmpty = () => {
    return (
      <div className={`recipe-list recipe-list--empty ${className}`}>
        <div className="recipe-list__empty-state">
          <div className="recipe-list__empty-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path
                d="M40 20C42.21 20 44 21.79 44 24C44 26.21 42.21 28 40 28C37.79 28 36 26.21 36 24C36 21.79 37.79 20 40 20ZM40 32C46.63 32 52 37.37 52 44V48H28V44C28 37.37 33.37 32 40 32Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="recipe-list__empty-title">Рецептів не знайдено</h3>
          <p className="recipe-list__empty-description">
            Спробуйте змінити параметри пошуку або додайте перший рецепт
          </p>
        </div>
      </div>
    );
  };

  // Render error state
  const renderError = () => {
    return (
      <div className={`recipe-list recipe-list--error ${className}`}>
        <div className="recipe-list__error-state">
          <div className="recipe-list__error-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path
                d="M40 8C21.76 8 7 22.76 7 41C7 59.24 21.76 74 40 74C58.24 74 73 59.24 73 41C73 22.76 58.24 8 40 8ZM44 54H36V46H44V54ZM44 38H36V26H44V38Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="recipe-list__error-title">Помилка завантаження</h3>
          <p className="recipe-list__error-description">
            {error || 'Не вдалося завантажити рецепти. Перевірте підключення до інтернету.'}
          </p>
          <button 
            className="recipe-list__error-button"
            onClick={() => window.location.reload()}
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  };

  // Render success state with recipes
  const renderSuccess = () => {
    return (
      <div className={`recipe-list recipe-list--success ${className}`}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            state="default"
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            onClick={() => handleRecipeClick(recipe)}
          />
        ))}
      </div>
    );
  };

  // Main render logic
  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return renderError();
  }

  if (recipes.length === 0) {
    return renderEmpty();
  }

  return renderSuccess();
}; 