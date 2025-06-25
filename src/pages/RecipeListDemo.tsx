import { FC, useState } from 'react';
import { RecipeList, Recipe } from '@/components/RecipeList';

export const RecipeListDemo: FC = () => {
  // Demo states
  const [currentState, setCurrentState] = useState<'loading' | 'success' | 'empty' | 'error'>('success');

  // Sample recipes data
  const sampleRecipes: Recipe[] = [
    { id: '1', title: 'Вівсяна каша з горіхами та вишнями' },
    { id: '2', title: 'Смузі з бананом та полуницею' },
    { id: '3', title: 'Паста карбонара класична' },
    { id: '4', title: 'Салат цезар з курячим філе' },
    { id: '5', title: 'Тірамісу домашній італійський' },
    { id: '6', title: 'Борщ український червоний' },
    { id: '7', title: 'Піца маргарита тонка' },
    { id: '8', title: 'Чізкейк нью-йоркський класичний' },
    { id: '9', title: 'Сирники творожні з сметаною' },
    { id: '10', title: 'Суп мінестроне овочевий' }
  ];

  const handleRecipeClick = (recipe: Recipe) => {
    console.log('Clicked recipe:', recipe);
  };

  const renderStateSelector = () => (
    <div style={{ 
      marginBottom: '24px',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {['loading', 'success', 'empty', 'error'].map((state) => (
        <button
          key={state}
          onClick={() => setCurrentState(state as any)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--tg-theme-section-separator-color)',
            backgroundColor: currentState === state 
              ? 'var(--tg-theme-button-color)' 
              : 'var(--tg-theme-secondary-bg-color)',
            color: currentState === state 
              ? 'var(--tg-theme-button-text-color)' 
              : 'var(--tg-theme-text-color)',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
            textTransform: 'capitalize'
          }}
        >
          {state}
        </button>
      ))}
    </div>
  );

  const renderCurrentState = () => {
    switch (currentState) {
      case 'loading':
        return (
          <RecipeList
            loading={true}
            onRecipeClick={handleRecipeClick}
          />
        );
      
      case 'success':
        return (
          <RecipeList
            recipes={sampleRecipes}
            onRecipeClick={handleRecipeClick}
          />
        );
      
      case 'empty':
        return (
          <RecipeList
            recipes={[]}
            onRecipeClick={handleRecipeClick}
          />
        );
      
      case 'error':
        return (
          <RecipeList
            error="Не вдалося завантажити рецепти. Перевірте підключення до інтернету."
            onRecipeClick={handleRecipeClick}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--tg-theme-secondary-bg-color)',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          color: 'var(--tg-theme-text-color)', 
          marginBottom: '8px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '600',
          fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Recipe List States Demo
        </h1>
        
        <p style={{
          color: 'var(--tg-theme-hint-color)',
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '16px',
          fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Current state: <strong style={{ color: 'var(--tg-theme-text-color)' }}>{currentState}</strong>
        </p>

        {renderStateSelector()}
        {renderCurrentState()}
        
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          backgroundColor: 'var(--tg-theme-bg-color)',
          borderRadius: '12px',
          margin: '40px 16px 0 16px'
        }}>
          <h3 style={{ 
            color: 'var(--tg-theme-text-color)', 
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            States Information:
          </h3>
          <ul style={{ 
            color: 'var(--tg-theme-text-color)', 
            lineHeight: '1.6',
            margin: 0,
            paddingLeft: '20px',
            fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            <li><strong>Loading:</strong> Shows 6 skeleton RecipeCard components in grid layout</li>
            <li><strong>Success:</strong> Displays {sampleRecipes.length} recipe cards in responsive grid</li>
            <li><strong>Empty:</strong> Shows "No recipes found" message with icon</li>
            <li><strong>Error:</strong> Displays error message with retry button</li>
          </ul>
          
          <h4 style={{ 
            color: 'var(--tg-theme-text-color)', 
            marginTop: '24px',
            marginBottom: '12px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            Responsive Breakpoints:
          </h4>
          <ul style={{ 
            color: 'var(--tg-theme-hint-color)', 
            lineHeight: '1.5',
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            <li><strong>≤359px:</strong> 1 column (compact)</li>
            <li><strong>360px-767px:</strong> 2 columns (standard mobile)</li>
            <li><strong>≥768px:</strong> 3 columns (tablet)</li>
            <li><strong>≥1024px:</strong> 4 columns (desktop)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 