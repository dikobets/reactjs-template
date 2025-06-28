import { FC } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import './RecipeList.css';
import emptyIcon from '@/assets/icons/category-fork.png';
import errorIcon from '@/assets/icons/egg.png';

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
            <img src={emptyIcon} alt="Рецептів не знайдено" />
          </div>
          <h3 className="recipe-list__empty-title">Тут ще порожньо…</h3>
          <p className="recipe-list__empty-description">
            Додайте перший рецепт — і ваш смачний архів оживе
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
            <img src={errorIcon} alt="Помилка завантаження" />
          </div>
          <h3 className="recipe-list__error-title">Щось пригоріло…</h3>
          <p className="recipe-list__error-description">
            {error || 'Перевірте з’єднання або спробуйте ще раз'}
          </p>
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