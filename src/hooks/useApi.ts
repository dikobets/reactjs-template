import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type ApiRequest<T> = (...args: any[]) => Promise<T>;

export const useApi = <T>(apiRequest: ApiRequest<T>) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const request = useCallback(
    async (...args: any[]) => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const data = await apiRequest(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('An unknown error occurred');
        setState({ data: null, error: err, isLoading: false });
        throw err;
      }
    },
    [apiRequest]
  );

  return {
    ...state,
    request,
  };
}; 