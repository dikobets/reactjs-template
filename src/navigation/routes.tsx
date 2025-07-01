import { lazy, ComponentType, JSX } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RouteObject } from 'react-router-dom';

// Core application pages
const WelcomePageComponent = lazy(() => import('@/pages/WelcomePage/WelcomePage'));
const IndexPageComponent = lazy(() => import('@/pages/IndexPage/IndexPage'));
const CategoryPageComponent = lazy(() => import('@/pages/CategoryPage/CategoryPage'));
const RecipePageComponent = lazy(() => import('@/pages/RecipePage/RecipePage'));
const DebugHooksPageComponent = lazy(() => import('@/pages/DebugHooksPage'));

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  protected?: boolean;
}

export const routes: Route[] = [
  { path: '/', Component: WelcomePageComponent },
  { path: '/home', Component: IndexPageComponent, protected: true },
  { path: '/recipe/:id', Component: RecipePageComponent, protected: true },
  { path: '/category/:categoryName', Component: CategoryPageComponent, protected: true },
  { path: '/debug-hooks', Component: DebugHooksPageComponent, protected: false },
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
