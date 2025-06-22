import { Section } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryList, Category } from '@/components/CategoryList';

// Локальні іконки категорій
import categorySnacksIcon from '@/assets/icons/category-snacks.png';
import categoryBreakfastIcon from '@/assets/icons/category-breakfast.png';
import categoryLunchIcon from '@/assets/icons/category-lunch.png';
import categoryDinnerIcon from '@/assets/icons/category-dinner.png';
import categoryDrinksIcon from '@/assets/icons/category-drinks.png';
import categoryDessertsIcon from '@/assets/icons/category-desserts.png';

// Тестові дані для CategoryList з локальними іконками
const testCategories: Category[] = [
  {
    id: '1',
    title: 'Перекуси',
    icon: categorySnacksIcon
  },
  {
    id: '2', 
    title: 'Сніданок',
    icon: categoryBreakfastIcon
  },
  {
    id: '3',
    title: 'Обід', 
    icon: categoryLunchIcon
  },
  {
    id: '4',
    title: 'Вечеря',
    icon: categoryDinnerIcon
  },
  {
    id: '5',
    title: 'Напої',
    icon: categoryDrinksIcon
  },
  {
    id: '6',
    title: 'Десерти',
    icon: categoryDessertsIcon
  }
];

export const IndexPage: FC = () => {
  const handleCategoryClick = (category: Category) => {
    console.log('Category clicked:', category);
  };

  return (
    <Page back={false}>
      <Header />
      
      {/* CategoryList - Horizontal Scroll Menu */}
      <Section
        header="Категорії"
        footer="Горизонтальний скрол меню категорій згідно з Figma дизайном"
      >
        <CategoryList 
          categories={testCategories}
          onCategoryClick={handleCategoryClick}
        />
      </Section>

      {/* CategoryList Loading State */}
      <Section
        header="Завантаження категорій"
        footer="Стан завантаження з skeleton елементами"
      >
        <CategoryList 
          categories={[]}
          loading={true}
        />
      </Section>
      
      {/* CategoryCard Testing Section */}
      <Section
        header="Category Cards"
        footer="Тестування різних станів CategoryCard компонента"
      >
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          padding: '16px',
          flexWrap: 'wrap'
        }}>
          <CategoryCard 
            state="skeleton"
            title="Завантаження..."
          />
          
          <CategoryCard 
            state="default"
            icon={categorySnacksIcon}
            title="Перекуси"
          />
          
          <CategoryCard 
            state="hover"
            icon={categorySnacksIcon}
            title="Перекуси (Hover)"
          />
          
          <CategoryCard 
            state="press"
            icon={categorySnacksIcon}
            title="Перекуси (Press)"
          />
          
          <CategoryCard 
            state="default"
            icon={categorySnacksIcon}
            title="Дуже довга назва категорії"
          />
        </div>
      </Section>
    </Page>
  );
};
