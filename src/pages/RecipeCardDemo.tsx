import { FC } from 'react';
import { RecipeCard } from '@/components/RecipeCard';

export const RecipeCardDemo: FC = () => {

  const handleCardClick = (state: string) => {
    console.log(`Clicked card with state: ${state}`);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'var(--tg-theme-secondary-bg-color)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: 'var(--tg-theme-text-color)', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Recipe Card States Demo
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Default State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Default
          </h3>
          <RecipeCard
            state="default"
            title="Вівсяна каша з горіхами та вишнями"
            onClick={() => handleCardClick('default')}
          />
        </div>

        {/* Empty State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Empty
          </h3>
          <RecipeCard
            state="empty"
            title="Вівсяна каша з горіхами та ви..."
            onClick={() => handleCardClick('empty')}
          />
        </div>

        {/* Skeleton State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Skeleton
          </h3>
          <RecipeCard
            state="skeleton"
          />
        </div>

        {/* Hover State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Hover (hover over card)
          </h3>
          <RecipeCard
            state="default"
            title="Вівсяна каша з горіхами та вишнями"
            onClick={() => handleCardClick('hover')}
          />
        </div>

        {/* Press State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Press
          </h3>
          <RecipeCard
            state="press"
            title="Вівсяна каша з горіхами та вишнями"
            onClick={() => handleCardClick('press')}
          />
        </div>

        {/* Disabled State */}
        <div>
          <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '10px' }}>
            Disabled
          </h3>
          <RecipeCard
            state="default"
            title="Вівсяна каша з горіхами та вишнями"
            disabled={true}
            onClick={() => handleCardClick('disabled')}
          />
        </div>

      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: 'var(--tg-theme-bg-color)',
        borderRadius: '12px'
      }}>
        <h3 style={{ color: 'var(--tg-theme-text-color)', marginBottom: '15px' }}>
          Usage Instructions:
        </h3>
        <ul style={{ color: 'var(--tg-theme-text-color)', lineHeight: '1.6' }}>
          <li><strong>Default:</strong> Normal interactive card with image and title</li>
          <li><strong>Empty:</strong> Card with fork icon when no image is available</li>
          <li><strong>Skeleton:</strong> Loading state with placeholder elements</li>
          <li><strong>Hover:</strong> Hover over any card to see the hover effect</li>
          <li><strong>Press:</strong> Explicit press state (also triggers on click)</li>
          <li><strong>Disabled:</strong> Non-interactive state with reduced opacity</li>
        </ul>
      </div>
    </div>
  );
}; 

export default RecipeCardDemo; 