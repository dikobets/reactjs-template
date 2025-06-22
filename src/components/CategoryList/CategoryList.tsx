import React from 'react';
import { CategoryCard } from '../CategoryCard';
import './CategoryList.css';

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface CategoryListProps {
  categories: Category[];
  loading?: boolean;
  onCategoryClick?: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  loading = false,
  onCategoryClick,
}) => {
  // Show skeleton loading state
  if (loading) {
    return (
      <div className="category-list">
        <div className="category-list__container">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategoryCard
              key={`skeleton-${index}`}
              state="skeleton"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="category-list">
      <div className="category-list__container">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            state="default"
            icon={category.icon}
            title={category.title}
            onClick={() => onCategoryClick?.(category)}
          />
        ))}
      </div>
    </div>
  );
}; 