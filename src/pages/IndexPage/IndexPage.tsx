import type { FC } from 'react';
import { Header } from '@/components/Header';
import { Search } from '@/components/Search';
import { CategoryList, Category } from '@/components/CategoryList';

// Імпорти іконок
import breakfastIcon from '@/assets/icons/category-breakfast.png';
import lunchIcon from '@/assets/icons/category-lunch.png';
import dinnerIcon from '@/assets/icons/category-dinner.png';
import snacksIcon from '@/assets/icons/category-snacks.png';
import dessertsIcon from '@/assets/icons/category-desserts.png';
import drinksIcon from '@/assets/icons/category-drinks.png';

// Дані з правильними іконками
const testCategories: Category[] = [
  { id: '1', title: 'Сніданок', icon: breakfastIcon },
  { id: '2', title: 'Обід', icon: lunchIcon },
  { id: '3', title: 'Вечеря', icon: dinnerIcon },
  { id: '4', title: 'Перекуси', icon: snacksIcon },
  { id: '5', title: 'Десерти', icon: dessertsIcon },
  { id: '6', title: 'Напої', icon: drinksIcon },
];

export const IndexPage: FC = () => {
  const handleCategoryClick = (category: Category) => {
    console.log('Clicked category:', category);
  };

  const handleSearchChange = (value: string) => {
    console.log('Search value:', value);
  };

  return (
    <div style={{ 
      minHeight: '100vh'
    }}>
      <Header title="Let's Eat Mini App" />
      
      <div style={{ 
        padding: '16px'
      }}>
        <Search 
          placeholder="Знайти рецепт"
          onChange={handleSearchChange}
        />
        
        <div style={{ marginTop: '16px' }}>
          <CategoryList 
            categories={testCategories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </div>
    </div>
  );
};
