import { FC } from 'react';
import './IngredientItem.css';

interface IngredientItemProps {
  name: string;
  quantity: string;
  unit: string;
}

export const IngredientItem: FC<IngredientItemProps> = ({ name, quantity, unit }) => {
  return (
    <div className="ingredient-item">
      <span className="ingredient-item__name">{name}</span>
      <span className="ingredient-item__separator">–</span>
      <div className="ingredient-item__measurement">
        <span className="ingredient-item__quantity">{quantity}</span>
        <span className="ingredient-item__unit">{unit}</span>
      </div>
    </div>
  );
}; 