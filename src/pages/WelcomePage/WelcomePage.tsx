import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Page } from '@/components/Page';
import './WelcomePage.css';

const WelcomePage: FC = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    // While checking auth, show a loader or skeleton
    return (
      <Page>
        <div className="welcome-page__loader">
          {/* We can add a more sophisticated loader here later */}
          Завантаження...
        </div>
      </Page>
    );
  }

  if (isAuthenticated) {
    // If user is authenticated, redirect them to the main content
    return <Navigate to="/home" replace />;
  }

  // If user is not authenticated, show the welcome message
  return (
    <Page>
      <div className="welcome-page">
        <h1 className="welcome-page__title">Ласкаво просимо до LetsEat!</h1>
        <p className="welcome-page__subtitle">
          Схоже, ви тут вперше. Ваш додаток готовий до роботи, але для доступу до рецептів та інших функцій, будь ласка, перезапустіть його через офіційний клієнт Telegram.
        </p>
        <div className="welcome-page__icon">🍽️</div>
      </div>
    </Page>
  );
};

export default WelcomePage; 