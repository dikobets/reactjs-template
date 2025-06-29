import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
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
  const initData = useSignal(initDataState);

  useEffect(() => {
    // Initialize user data from Telegram WebApp
    const initializeUser = async () => {
      console.log('🔄 UserContext: Starting user initialization...');
      console.log('🔄 UserContext: initData:', initData);
      
      try {
        if (initData && initData.user) {
          console.log('✅ UserContext: Found user data in initData:', initData.user);
          const telegramUser = initData.user;
          
          const userData: User = {
            id: telegramUser.id.toString(),
            username: telegramUser.username,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            languageCode: telegramUser.language_code,
            photoUrl: telegramUser.photo_url,
          };
          
          console.log('✅ UserContext: Setting user data:', userData);
          setUser(userData);
        } else {
          // Fallback for development when Telegram WebApp is not available
          console.warn('⚠️ UserContext: No user data found in initData');
          console.log('🔍 UserContext: initData structure:', {
            hasInitData: !!initData,
            hasUser: !!(initData && initData.user),
            initDataKeys: initData ? Object.keys(initData) : 'no initData'
          });
          
          // Check if we're in development mode and Telegram is not available
          if (import.meta.env.DEV && !window.Telegram?.WebApp) {
            console.log('🔧 UserContext: Development mode detected, using fallback auth');
            const fallbackUser: User = {
              id: 'dev-user-123',
              username: 'devuser',
              firstName: 'Development',
              lastName: 'User',
              languageCode: 'uk',
            };
            setUser(fallbackUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('❌ UserContext: Error initializing user:', error);
        setUser(null);
      } finally {
        console.log('🏁 UserContext: Initialization complete, setting loading to false');
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [initData]);

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