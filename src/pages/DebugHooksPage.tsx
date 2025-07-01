import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useCategories } from '../hooks/useCategories';
import { useSearch } from '../hooks/useSearch';
import { Page } from '../components/Page';

const DebugHooksPage: React.FC = () => {
  // Тестуємо useRecipes
  const { recipes, isLoading: isRecipesLoading, error: recipesError, createRecipe, deleteRecipe } = useRecipes();

  // Тестуємо useCategories
  const { categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();

  // Тестуємо useSearch
  const { results: searchResults, isLoading: isSearchLoading, error: searchError, search } = useSearch();

  const handleSearch = () => {
    search('каша'); // Пошуковий запит для тесту
  };

  const handleAddRecipe = () => {
    createRecipe({ title: 'Новий тестовий рецепт' });
  };
  
  const handleDeleteRecipe = (id: string) => {
    if (id) {
      deleteRecipe(id);
    }
  };

  return (
    <Page>
      <h1>Debug Hooks Page</h1>
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {/* Recipes Section */}
        <section>
          <h2>useRecipes</h2>
          <button onClick={handleAddRecipe} disabled={isRecipesLoading}>Add Test Recipe</button>
          {isRecipesLoading && <p>Loading recipes...</p>}
          {recipesError && <p style={{ color: 'red' }}>Error: {recipesError.message}</p>}
          <ul>
            {recipes?.map(r => (
              <li key={r.id}>
                {r.title} <button onClick={() => handleDeleteRecipe(r.id)} disabled={isRecipesLoading}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        <hr />

        {/* Categories Section */}
        <section>
          <h2>useCategories</h2>
          {isCategoriesLoading && <p>Loading categories...</p>}
          {categoriesError && <p style={{ color: 'red' }}>Error: {categoriesError.message}</p>}
          <ul>
            {categories?.map(c => <li key={c.id}>{c.name}</li>)}
          </ul>
        </section>

        <hr />

        {/* Search Section */}
        <section>
          <h2>useSearch</h2>
          <button onClick={handleSearch} disabled={isSearchLoading}>Search for "каша"</button>
          {isSearchLoading && <p>Searching...</p>}
          {searchError && <p style={{ color: 'red' }}>Error: {searchError.message}</p>}
          <ul>
            {searchResults?.map(r => <li key={r.id}>{r.title}</li>)}
          </ul>
        </section>
      </div>
    </Page>
  );
};

export default DebugHooksPage; 