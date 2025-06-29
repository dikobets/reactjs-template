import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Page } from '@/components/Page';
import { Divider } from '@/components/Divider';
import { RecipeDescription } from '@/components/RecipeDescription';
import { SectionTitle } from '@/components/SectionTitle';
import { IngredientList } from '@/components/IngredientList';
import { StepList } from '@/components/StepList';
import './RecipePage.css';

const demoIngredients = [
  { name: "М'ясо баранина", quantity: '1', unit: 'кг' },
  { name: 'Рис (басматі)', quantity: '800', unit: 'г' },
  { name: 'Морква', quantity: '5', unit: 'шт.' },
  { name: 'Цибуля', quantity: '3', unit: 'шт.' },
  { name: 'Часник', quantity: '3', unit: 'головки' },
  { name: 'Олія', quantity: '300', unit: 'мл' },
  { name: 'Зіра', quantity: '1', unit: 'ч.л.' },
  { name: 'Сіль', quantity: 'за смаком', unit: '' },
  { name: 'Вода', quantity: '1,5', unit: 'л' },
];

const demoSteps = [
  'Влийте в казан олію або розтопіть жир.',
  'Наріжте м\'ясо великими шматками і обсмажте до золотистої скоринки.',
  'Додайте нарізану соломкою моркву та цибулю, смажте до м\'якості.',
  'Промийте рис і додайте його до казана. Розрівняйте, але не перемішуйте.',
  'Акуратно влийте гарячу воду, додайте спеції та цілі головки часнику.',
  'Готуйте на сильному вогні, поки вода не випарується з поверхні, потім зменшіть вогонь до мінімуму, накрийте кришкою і готуйте ще 20-25 хвилин.',
];

export const RecipePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: Fetch recipe data using the id

  return (
    <Page>
      <div className="recipe-page">
        <div className="recipe-page__content">
          <Header title="Часникові стрілки в сметані" />
          <RecipeDescription>
            Смачна та ніжна страва з часникових стрілок, обсмажених з цибулею та сметаною, ідеально підходить для швидкого обіду.
          </RecipeDescription>
          <Divider />
          <SectionTitle title="Інгридієнти" />
          <IngredientList items={demoIngredients} />
          <Divider />
          <SectionTitle title="Інструкція" />
          <StepList steps={demoSteps} />
        </div>
      </div>
    </Page>
  );
}; 

export default RecipePage; 