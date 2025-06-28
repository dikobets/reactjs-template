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
        colorScheme: string;
        themeParams: Record<string, string>;
        enableClosingConfirmation: () => void;
        onEvent: (eventType: string, callback: () => void) => void;
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
 * Initializes the application with the given options.
 * @param options - Configuration options for initialization
 */
export async function init(options: InitOptions = {}) {
  const { debug = false, eruda = false } = options;

  // Initialize Eruda for debugging if enabled
  if (eruda) {
    await initEruda();
  }

  // Enable debug mode in Telegram WebApp if needed
  if (debug && window.Telegram?.WebApp) {
    window.Telegram.WebApp.enableClosingConfirmation();
  }

  // Initialize theme variables
  initThemeVariables();

  // Set @telegram-apps/sdk-react debug mode and initialize it.
  setDebug(debug);
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

/**
 * Initializes Eruda debugging tool
 */
async function initEruda() {
  // Initialize Eruda only if it's not already initialized
  if (!document.querySelector('#eruda')) {
    eruda.init();
    
    // Position Eruda at the bottom right corner
    const el = document.querySelector('.eruda-container');
    if (el instanceof HTMLElement) {
      el.style.right = '0';
      el.style.left = 'auto';
      el.style.bottom = '0';
    }
  }
}

/**
 * Initializes theme variables from Telegram WebApp
 */
function initThemeVariables() {
  if (!window.Telegram?.WebApp) {
    console.warn('Telegram WebApp is not available');
    return;
  }

  const webApp = window.Telegram.WebApp;

  // Get theme params
  const colorScheme = webApp.colorScheme;
  const themeParams = webApp.themeParams;

  // Set color scheme
  document.documentElement.setAttribute('data-theme', colorScheme);

  // Set theme variables
  Object.entries(themeParams).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--tg-${key}`, value);
  });

  // Subscribe to theme changes
  webApp.onEvent('themeChanged', () => {
    const newColorScheme = webApp.colorScheme;
    const newThemeParams = webApp.themeParams;

    document.documentElement.setAttribute('data-theme', newColorScheme);
    Object.entries(newThemeParams).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--tg-${key}`, value);
    });
  });
}