import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/components/Page';
import { Header } from '@/components/Header';
import { RecipeList, Recipe } from '@/components/RecipeList';
import receptImage from '@/assets/icons/recept-image.png';
import './CategoryPage.css';

const mockRecipes: Recipe[] = [
  { id: '1', title: 'Український сендвіч зі свининою', imageUrl: receptImage },
  { id: '2', title: 'Часниковий хліб з сиром', imageUrl: receptImage },
  { id: '3', title: 'Швидка закуска з кабачків', imageUrl: receptImage },
  { id: '4', title: 'Ще один рецепт', imageUrl: receptImage },
];

export const CategoryPage: FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  // TODO: Fetch recipes by categoryName from the API

  return (
    <Page>
      <div className="category-page">
        <div className="category-page__content">
          <Header title={categoryName || 'Категорія'} />
          <RecipeList recipes={mockRecipes} />
        </div>
      </div>
    </Page>
  );
}; 