import { useMemo, Suspense } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { routes, wrapWithProtection } from '@/navigation/routes.tsx';
import { UserProvider } from '@/context/UserContext.tsx';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <UserProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
        <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    Component={wrapWithProtection(route.Component, route.protected || false)}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
        </Routes>
            </Suspense>
      </HashRouter>
        </ErrorBoundary>
      </UserProvider>
    </AppRoot>
  );
}
