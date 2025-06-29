import {
  setDebug,
  mountBackButton,
  restoreInitData,
  init as initSDK,
  bindThemeParamsCssVars,
  mountViewport,
  bindViewportCssVars,
  mockTelegramEnv,
  type ThemeParams,
  themeParamsState,
  retrieveLaunchParams,
  emitEvent,
  miniApp,
} from '@telegram-apps/sdk-react';
import eruda from 'eruda';

// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: any;
        colorScheme: string;
        themeParams: Record<string, string>;
        enableClosingConfirmation: () => void;
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
}

interface InitOptions {
  debug?: boolean;
  eruda?: boolean;
  mockForMacOS?: boolean;
}

/**
 * Waits for Telegram WebApp to be available
 */
function waitForTelegramWebApp(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Telegram?.WebApp) {
      resolve();
      return;
    }

    const checkInterval = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    // Fallback timeout after 5 seconds
    setTimeout(() => {
      console.warn('⚠️ Telegram WebApp did not load after 5 seconds.');
      clearInterval(checkInterval);
      resolve();
    }, 5000);
  });
}

/**
 * Initializes the application with the given options.
 * @param options - Configuration options for initialization
 */
export async function init(options: InitOptions = {}) {
  const { debug = false, eruda: useEruda = false } = options;

  // Initialize Eruda for debugging if enabled
  if (useEruda) {
    eruda.init();
  }

  // Wait for Telegram WebApp to load
  await waitForTelegramWebApp();

  // It's important to initialize the Telegram WebApp first.
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
  }

  // Enable debug mode in Telegram WebApp if needed
  if (debug) {
    setDebug(true);
    window.Telegram?.WebApp?.enableClosingConfirmation();
  }

  // Initialize the Telegram SDK.
  initSDK();

  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  if (options.mockForMacOS) {
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event, next) {
        if (event[0] === 'web_app_request_theme') {
          let tp: ThemeParams = {};
          if (firstThemeSent) {
            tp = themeParamsState();
          } else {
            firstThemeSent = true;
            tp ||= retrieveLaunchParams().tgWebAppThemeParams;
          }
          return emitEvent('theme_changed', { theme_params: tp });
        }

        if (event[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', { left: 0, top: 0, right: 0, bottom: 0 });
        }

        next();
      },
    });
  }

  // Mount all components used in the project.
  mountBackButton.ifAvailable();
  restoreInitData();

  if (miniApp.mount.isAvailable()) {
    miniApp.mount();
  }

  mountViewport.isAvailable() && mountViewport().then(() => {
    bindThemeParamsCssVars();
    bindViewportCssVars();
  });
}