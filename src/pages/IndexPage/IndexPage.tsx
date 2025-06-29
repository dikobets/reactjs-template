import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Search } from '@/components/Search';
import { CategoryList, Category } from '@/components/CategoryList';
import { RecipeList, Recipe } from '@/components/RecipeList';
import { SectionTitle } from '@/components/SectionTitle';
import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page';
import './IndexPage.css';

// Імпорти іконок
import breakfastIcon from '@/assets/icons/category-breakfast.png';
import lunchIcon from '@/assets/icons/category-lunch.png';
import dinnerIcon from '@/assets/icons/category-dinner.png';
import snacksIcon from '@/assets/icons/category-snacks.png';
import dessertsIcon from '@/assets/icons/category-desserts.png';
import drinksIcon from '@/assets/icons/category-drinks.png';
import recipeImage from '@/assets/icons/recept-image.png';

// Мокові дані для категорій
const testCategories: Category[] = [
  { id: '1', title: 'Сніданок', icon: breakfastIcon },
  { id: '2', title: 'Обід', icon: lunchIcon },
  { id: '3', title: 'Вечеря', icon: dinnerIcon },
  { id: '4', title: 'Перекуси', icon: snacksIcon },
  { id: '5', title: 'Десерти', icon: dessertsIcon },
  { id: '6', title: 'Напої', icon: drinksIcon },
];

// Мокові дані для рецептів
const recentRecipes: Recipe[] = [
  { id: '1', title: 'Вівсяна каша з горіхами та ягодами', imageUrl: recipeImage },
  { id: '2', title: 'Смузі з бананом та полуницею', imageUrl: recipeImage },
  { id: '3', title: 'Салат цезар з куркою', imageUrl: recipeImage },
  { id: '4', title: 'Паста карбонара', imageUrl: recipeImage },
];

export const IndexPage: FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    console.log('Clicked category:', category);
    navigate(`/category/${category.title}`);
  };

  const handleSearchChange = (value: string) => {
    console.log('Search value:', value);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Page back={false}>
      <div className="index-page">
        <div className="index-page__content">
          <Header title="Привіт! Готові щось приготувати або додати?" />

          <Search 
            placeholder="Знайти рецепт"
            onChange={handleSearchChange}
          />
          
          <div className="index-page__categories">
            <CategoryList 
              categories={testCategories}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          <SectionTitle 
            title="Останні додані"
            className="index-page__section-title"
          />

          <RecipeList 
            recipes={recentRecipes}
            onRecipeClick={handleRecipeClick}
          />
          
          <div className="index-page__demo-block">
            <h3 className="index-page__demo-title">
              Development Demo
            </h3>
            <div className="index-page__demo-links">
              <Link 
                to="/recipe-card-demo"
                className="index-page__demo-link"
              >
                → Recipe Card States Demo
              </Link>
              <Link 
                to="/recipe-list-demo"
                className="index-page__demo-link"
              >
                → Recipe List Demo
              </Link>
              <Link 
                to="/launch-params"
                className="index-page__demo-link"
              >
                → Launch Params
              </Link>
              <Link 
                to="/theme-params"
                className="index-page__demo-link"
              >
                → Theme Params
              </Link>
              <Link 
                to="/ton-connect"
                className="index-page__demo-link"
              >
                → TON Connect
              </Link>
              <Link 
                to="/debug-auth"
                className="index-page__demo-link"
              >
                → 🔍 Debug Auth
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default IndexPage;
