import { useEffect, useMemo, useCallback, useState } from 'react';
import { useApi } from './useApi';
import { apiService, NewRecipePayload, Recipe } from '@/api';

export const useRecipes = () => {
  // Використовуємо useMemo, щоб забезпечити стабільне посилання на функцію
  const getRecipesRequest = useMemo(() => () => apiService.getRecipes(), []);
  const { data: recipes, error, isLoading, request: refetch } = useApi(getRecipesRequest);
  
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createRecipe = useCallback(async (payload: NewRecipePayload) => {
    setIsMutating(true);
    try {
      const newRecipe = await apiService.addRecipe(payload);
      // Оновлюємо список рецептів після успішного створення
      await refetch();
      return newRecipe;
    } catch (e) {
      // Обробка помилки (можна передати далі або залогувати)
      console.error("Failed to create recipe:", e);
      throw e;
    } finally {
      setIsMutating(false);
    }
  }, [refetch]);

  const updateRecipe = useCallback(async (id: string, payload: Partial<NewRecipePayload>) => {
    setIsMutating(true);
    try {
      const updatedRecipe = await apiService.updateRecipe(id, payload);
      // Оновлюємо список рецептів після успішного оновлення
      await refetch();
      return updatedRecipe;
    } catch (e) {
      console.error("Failed to update recipe:", e);
      throw e;
    } finally {
      setIsMutating(false);
    }
  }, [refetch]);

  const deleteRecipe = useCallback(async (id: string) => {
    setIsMutating(true);
    try {
      await apiService.deleteRecipe(id);
      // Оновлюємо список рецептів після успішного видалення
      await refetch();
    } catch (e) {
      console.error("Failed to delete recipe:", e);
      throw e;
    } finally {
      setIsMutating(false);
    }
  }, [refetch]);

  return {
    recipes: recipes as Recipe[] | null,
    error,
    isLoading: isLoading || isMutating,
    refetch,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
}; 