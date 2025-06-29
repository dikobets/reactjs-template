import { lazy, ComponentType, JSX } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Core application pages
const IndexPage = lazy(() => import('@/pages/IndexPage/IndexPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage/CategoryPage'));
const RecipePage = lazy(() => import('@/pages/RecipePage/RecipePage'));

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  protected?: boolean;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/recipe/:id', Component: RecipePage, protected: true },
  { path: '/category/:categoryName', Component: CategoryPage, protected: true },
];

// Helper function to wrap component with ProtectedRoute if needed
export const wrapWithProtection = (Component: ComponentType, isProtected: boolean) => {
  if (!isProtected) {
    return Component;
  }
  
  return () => (
    <ProtectedRoute>
      <Component />
    </ProtectedRoute>
  );
};
