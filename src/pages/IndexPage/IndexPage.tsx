import type { FC } from 'react';
import { Header } from '@/components/Header';
import { Search } from '@/components/Search';
import { CategoryList, Category } from '@/components/CategoryList';
import { Link } from '@/components/Link/Link';

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
      minHeight: '100vh',
      backgroundColor: 'var(--tg-theme-bg-color)',
      color: 'var(--tg-theme-text-color)'
    }}>
      <Header title="Let's Eat Mini App" />
      
      <div style={{ 
        padding: '16px',
        backgroundColor: 'var(--tg-theme-bg-color)'
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
        
        {/* Demo link for development */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: 'var(--tg-theme-secondary-bg-color)',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            color: 'var(--tg-theme-text-color)', 
            margin: '0 0 12px 0',
            fontSize: '16px'
          }}>
            Development Demo
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link 
              to="/recipe-card-demo"
              style={{ 
                color: 'var(--tg-theme-link-color)',
                textDecoration: 'none'
              }}
            >
              → Recipe Card States Demo
            </Link>
            <Link 
              to="/recipe-list-demo"
              style={{ 
                color: 'var(--tg-theme-link-color)',
                textDecoration: 'none'
              }}
            >
              → Recipe List Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
