import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { initDataState, useSignal } from '@telegram-apps/sdk-react';

// Define the shape of the user data based on Telegram User interface
interface User {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  languageCode?: string;
  photoUrl?: string;
}

// Define the shape of the context state
interface UserContextState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context with a default undefined value
const UserContext = createContext<UserContextState | undefined>(undefined);

// Create the provider component
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Використовуємо useSignal на верхньому рівні компонента
  const initData = useSignal(initDataState);

  useEffect(() => {
    // Якщо користувач вже є, не запускаємо перевірку знову
    if (user) {
      return;
    }

    const checkAuth = async () => {
      try {
        console.log('🔍 UserContext: Starting auth check...');

        const webApp = window.Telegram?.WebApp;

        // Пріоритетний спосіб: webApp.initDataUnsafe
        if (webApp?.initDataUnsafe?.user) {
          const telegramUser = webApp.initDataUnsafe.user;
          console.log('✅ UserContext: Found user via initDataUnsafe.');
          
          const userData: User = {
            id: telegramUser.id.toString(),
            username: telegramUser.username,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            languageCode: telegramUser.language_code,
            photoUrl: telegramUser.photo_url
          };
          
          setUser(userData);
          return; // Виходимо, якщо користувача знайдено
        }

        // Fallback до SDK, якщо initDataUnsafe не спрацював
        if (initData?.user) {
          console.log('✅ UserContext: Found user via SDK initData.');
          const telegramUser = initData.user;
          
          const userData: User = {
            id: telegramUser.id.toString(),
            username: telegramUser.username,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            languageCode: telegramUser.language_code,
            photoUrl: telegramUser.photo_url,
          };
          
          setUser(userData);
        } else {
          console.warn('⚠️ UserContext: No user data found.');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ UserContext: Error initializing user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [initData, user]); // Додаємо user в залежності

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 