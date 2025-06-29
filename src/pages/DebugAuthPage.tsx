import { FC } from 'react';
import { initDataState, initDataRaw, useSignal } from '@telegram-apps/sdk-react';
import { useUser } from '@/context/UserContext';
import { Page } from '@/components/Page';

export const DebugAuthPage: FC = () => {
  const initData = useSignal(initDataState);
  const initDataRawSignal = useSignal(initDataRaw);
  const { user, isAuthenticated, isLoading } = useUser();

  return (
    <Page back={true}>
      <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px' }}>
        <h2>🔍 Auth Debug Information</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>UserContext State:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({ 
              isAuthenticated, 
              isLoading, 
              user 
            }, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Raw initData:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {initDataRawSignal || 'null'}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Parsed initData:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(initData, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Window.Telegram:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              available: !!window.Telegram,
              webAppAvailable: !!window.Telegram?.WebApp,
            }, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Environment Info:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              isDev: import.meta.env.DEV,
              userAgent: navigator.userAgent,
              href: window.location.href,
              origin: window.location.origin
            }, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '20px', padding: '16px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#856404' }}>📋 Діагностика:</h3>
          {!window.Telegram?.WebApp ? (
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#856404' }}>
                ❌ <strong>Telegram WebApp недоступний</strong>
              </p>
              <p style={{ margin: '0 0 8px 0', color: '#856404' }}>
                Ви відкрили Mini App в браузері, а не через Telegram бота.
              </p>
              <p style={{ margin: '0', color: '#856404' }}>
                {import.meta.env.DEV ? 
                  '🔧 Використовується fallback авторизація для розробки.' :
                  '🚫 В production режимі fallback авторизація недоступна.'
                }
              </p>
            </div>
          ) : (
            <p style={{ margin: '0', color: '#155724' }}>
              ✅ <strong>Telegram WebApp доступний</strong>
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px', padding: '16px', background: '#d4edda', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#155724' }}>🔧 Як правильно тестувати:</h3>
          <ol style={{ margin: '0', color: '#155724', paddingLeft: '20px' }}>
            <li>Створіть файл <code>.env</code> в корені проекту</li>
            <li>Додайте: <code>TELEGRAM_BOT_TOKEN=ваш_токен</code></li>
            <li>Додайте: <code>WEBAPP_URL=https://192.168.0.41:5173/</code></li>
            <li>Запустіть бота: <code>PYTHONPATH=src python3 -m lets_eat_mini_app.bot.main</code></li>
            <li>Відкрийте бота в Telegram і натисніть кнопку WebApp</li>
          </ol>
        </div>

        <button 
          onClick={() => window.location.reload()}
          style={{
            background: 'var(--tg-theme-button-color)',
            color: 'var(--tg-theme-button-text-color)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔄 Reload Page
        </button>
      </div>
    </Page>
  );
};

export default DebugAuthPage; 