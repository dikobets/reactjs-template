import { useEffect, useMemo } from 'react';
import { useApi } from './useApi';
import { apiService, Category } from '@/api';

export const useCategories = () => {
  const getCategoriesRequest = useMemo(() => () => apiService.getCategories(), []);
  const { data: categories, error, isLoading, request: refetch } = useApi(getCategoriesRequest);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    categories: categories as Category[] | null,
    error,
    isLoading,
    refetch,
  };
}; 