// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

async function renderApp() {
  await init({
    debug: import.meta.env.DEV,
    eruda: true, // Always enable Eruda for better debugging
    mockForMacOS: false, // We don't need macOS mocking anymore
  });

  // Simple render without complex initialization
  root.render(
    <StrictMode>
      <Root/>
    </StrictMode>
  );
}

renderApp();
