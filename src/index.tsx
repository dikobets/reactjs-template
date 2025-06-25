// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

async function renderApp() {
  // Mock the environment in case we are outside Telegram.
  if (import.meta.env.DEV) {
    await import('./mockEnv.ts');
  }
  
  await init({
    debug: import.meta.env.DEV,
    eruda: import.meta.env.DEV,
    mockForMacOS: import.meta.env.DEV,
  });

  // Simple render without complex initialization to avoid SDK errors
  root.render(
    <StrictMode>
      <Root/>
    </StrictMode>
  );
}

renderApp();
