import { lazy, ComponentType, JSX } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Core application pages
const IndexPage = lazy(() => import('@/pages/IndexPage/IndexPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage/CategoryPage'));
const RecipePage = lazy(() => import('@/pages/RecipePage/RecipePage'));

// Development and demo pages
const InitDataPage = lazy(() => import('@/pages/InitDataPage'));
const LaunchParamsPage = lazy(() => import('@/pages/LaunchParamsPage'));
const ThemeParamsPage = lazy(() => import('@/pages/ThemeParamsPage'));
const TONConnectPage = lazy(() => import('@/pages/TONConnectPage/TONConnectPage'));
const RecipeCardDemo = lazy(() => import('@/pages/RecipeCardDemo'));
const RecipeListDemo = lazy(() => import('@/pages/RecipeListDemo'));
const DebugAuthPage = lazy(() => import('@/pages/DebugAuthPage'));

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  protected?: boolean;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/init-data', Component: InitDataPage, title: 'Init Data' },
  { path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
  { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
  { path: '/recipe-card-demo', Component: RecipeCardDemo, title: 'Recipe Card Demo' },
  { path: '/recipe-list-demo', Component: RecipeListDemo, title: 'Recipe List Demo' },
  { path: '/recipe/:id', Component: RecipePage, protected: true },
  { path: '/category/:categoryName', Component: CategoryPage, protected: true },
  {
    path: '/ton-connect',
    Component: TONConnectPage,
    title: 'TON Connect',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 56 56"
        fill="none"
      >
        <path
          d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
          fill="#0098EA"
        />
        <path
          d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z"
          fill="white"
        />
      </svg>
    ),
  },
  { path: '/debug-auth', Component: DebugAuthPage },
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
