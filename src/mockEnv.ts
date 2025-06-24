import { mockTelegramEnv, isTMA, emitEvent } from '@telegram-apps/sdk-react';

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
//
// NOTE: When testing in Telegram via ngrok, this mock environment will NOT be used
// because isTMA() will return true. The real Telegram environment will provide the theme.
if (import.meta.env.DEV) {
  console.log('🔧 DEV mode detected, checking Telegram environment...');
  
  // Check if we're in Telegram environment synchronously first
  const isInTelegram = isTMA();
  console.log('📱 Is in Telegram environment:', isInTelegram);
  
  if (!isInTelegram) {
    console.log('🔄 Setting up mock environment for browser testing...');
    
    const themeParams = {
      accent_text_color: '#6ab2f2',
      bg_color: '#17212b',
      button_color: '#5288c1',
      button_text_color: '#ffffff',
      destructive_text_color: '#ec3942',
      header_bg_color: '#17212b',
      hint_color: '#708499',
      link_color: '#6ab3f3',
      secondary_bg_color: '#232e3c',
      section_bg_color: '#17212b',
      section_header_text_color: '#6ab3f3',
      subtitle_text_color: '#708499',
      text_color: '#f5f5f5',
    } as const;
    
    const noInsets = { left: 0, top: 0, bottom: 0, right: 0 } as const;

    try {
      mockTelegramEnv({
        onEvent(e) {
          console.log('📡 Mock event received:', e[0]);
          
          // Here you can write your own handlers for all known Telegram MIni Apps methods.
          if (e[0] === 'web_app_request_theme') {
            console.log('🎨 Responding to theme request');
            return emitEvent('theme_changed', { theme_params: themeParams });
          }
          if (e[0] === 'web_app_request_viewport') {
            console.log('📱 Responding to viewport request');
            return emitEvent('viewport_changed', {
              height: window.innerHeight,
              width: window.innerWidth,
              is_expanded: true,
              is_state_stable: true,
            });
          }
          if (e[0] === 'web_app_request_content_safe_area') {
            console.log('🛡️ Responding to content safe area request');
            return emitEvent('content_safe_area_changed', noInsets);
          }
          if (e[0] === 'web_app_request_safe_area') {
            console.log('🛡️ Responding to safe area request');
            return emitEvent('safe_area_changed', noInsets);
          }
        },
        launchParams: new URLSearchParams([
          // Discover more launch parameters:
          // https://docs.telegram-mini-apps.com/platform/launch-parameters#parameters-list
          ['tgWebAppThemeParams', JSON.stringify(themeParams)],
          // Your init data goes here. Learn more about it here:
          // https://docs.telegram-mini-apps.com/platform/init-data#parameters-list
          //
          // Note that to make sure, you are using a valid init data, you must pass it exactly as it
          // is sent from the Telegram application. The reason is in case you will sort its keys
          // (auth_date, hash, user, etc.) or values your own way, init data validation will more
          // likely to fail on your server side. So, to make sure you are working with a valid init
          // data, it is better to take a real one from your application and paste it here. It should
          // look something like this (a correctly encoded URL search params):
          // ```
          // user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22...
          // ```
          // But in case you don't really need a valid init data, use this one:
          ['tgWebAppData', new URLSearchParams([
            ['auth_date', (new Date().getTime() / 1000 | 0).toString()],
            ['hash', 'some-hash'],
            ['signature', 'some-signature'],
            ['user', JSON.stringify({ id: 1, first_name: 'Vladislav' })],
          ]).toString()],
          ['tgWebAppVersion', '8.4'],
          ['tgWebAppPlatform', 'tdesktop'],
        ]),
      });

      // Manually set CSS variables for development
      console.log('🎨 Setting CSS variables manually for browser development...');
      const root = document.documentElement;
      
      root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
      root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
      root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
      root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
      root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
      root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
      root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color);
      root.style.setProperty('--tg-theme-header-bg-color', themeParams.header_bg_color);
      root.style.setProperty('--tg-theme-accent-text-color', themeParams.accent_text_color);
      root.style.setProperty('--tg-theme-section-bg-color', themeParams.section_bg_color);
      root.style.setProperty('--tg-theme-section-separator-color', '#2c3e50');
      root.style.setProperty('--tg-theme-section-header-text-color', themeParams.section_header_text_color);
      root.style.setProperty('--tg-theme-subtitle-text-color', themeParams.subtitle_text_color);
      root.style.setProperty('--tg-theme-destructive-text-color', themeParams.destructive_text_color);

      console.log('✅ Mock environment set up successfully');
      console.info(
        '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
      );
    } catch (error) {
      console.error('❌ Error setting up mock environment:', error);
    }
  } else {
    console.log('✅ Telegram environment detected, no mocking needed');
  }
}
