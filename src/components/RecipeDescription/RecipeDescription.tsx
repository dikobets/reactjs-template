import { FC, ReactNode } from 'react';
import './RecipeDescription.css';

interface RecipeDescriptionProps {
  children: ReactNode;
}

export const RecipeDescription: FC<RecipeDescriptionProps> = ({ children }) => {
  return <p className="recipe-description">{children}</p>;
}; 