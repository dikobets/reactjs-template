import { useMemo, useCallback } from 'react';
import { useApi } from './useApi';
import { apiService, Recipe } from '@/api';

export const useSearch = () => {
  // Прив'язуємо функцію пошуку до apiService
  const searchRequest = useMemo(() => 
    (query: string) => apiService.searchRecipes(query), 
  []);

  const { data: results, error, isLoading, request } = useApi(searchRequest);

  // Функція `search`, яку будуть викликати компоненти
  const search = useCallback((query: string) => {
    // Не робимо запит, якщо рядок пошуку порожній
    if (!query || query.trim() === '') {
      return;
    }
    request(query);
  }, [request]);

  return {
    results: results as Recipe[] | null,
    error,
    isLoading,
    search,
  };
}; 