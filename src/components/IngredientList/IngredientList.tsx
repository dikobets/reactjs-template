import { FC } from 'react';
import { IngredientItem } from '@/components/IngredientItem';
import './IngredientList.css';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface IngredientListProps {
  items: Ingredient[];
}

export const IngredientList: FC<IngredientListProps> = ({ items }) => {
  return (
    <div className="ingredient-list">
      {items.map((item, index) => (
        <IngredientItem
          key={index}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
        />
      ))}
    </div>
  );
}; 