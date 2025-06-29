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
      try {
        if (initData && initData.user) {
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
          // No Telegram user data available
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        setUser(null);
      } finally {
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