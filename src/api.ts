// ApiService: централізований сервіс для роботи з API
// Підтримує реальні запити та мок-режим для тестування

import recipeImage from '@/assets/icons/recept-image.png';

// Типи для рецептів
export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  // Можна додати imageUrl, якщо у категорій є іконки
}

export interface NewRecipePayload {
  title: string;
  // Додайте інші поля, необхідні для створення рецепта
  // наприклад, description, ingredients, steps
}

// Мок-дані для тестування без бекенду
const mockRecipes: Recipe[] = [
  { id: '1', title: 'Вівсяна каша з горіхами та ягодами', imageUrl: recipeImage },
  { id: '2', title: 'Смузі з бананом та полуницею', imageUrl: recipeImage },
  { id: '3', title: 'Салат цезар з куркою', imageUrl: recipeImage },
  { id: '4', title: 'Паста карбонара', imageUrl: recipeImage },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Сніданки' },
  { id: '2', name: 'Обіди' },
  { id: '3', name: 'Вечері' },
  { id: '4', name: 'Перекуси' },
  { id: '5', name: 'Десерти' },
  { id: '6', name: 'Напої' },
];

let mockRecipesState = [...mockRecipes]; // Для CRUD-операцій у мок-режимі

// Конфігурація
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK = false; // true — для тестування без бекенду
const RETRY_COUNT = 2;

// Допоміжна функція для затримки
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Клас для роботи з API
class ApiService {
  private getAuthToken(): string | null {
    // TODO: замінити на реальну логіку отримання токена (наприклад, з localStorage)
    return localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retry = RETRY_COUNT
  ): Promise<T> {
    if (USE_MOCK) {
      // --- Мок-логіка ---
      await delay(300);
      // GET /recipes
      if (endpoint === '/recipes' && options.method === 'GET') {
        return mockRecipesState as unknown as T;
      }
      // POST /recipes
      if (endpoint === '/recipes' && options.method === 'POST' && options.body) {
        const payload = JSON.parse(options.body as string) as NewRecipePayload;
        const newRecipe: Recipe = {
          id: (Date.now() + Math.random()).toString(),
          title: payload.title,
          imageUrl: recipeImage,
        };
        mockRecipesState = [newRecipe, ...mockRecipesState];
        return newRecipe as unknown as T;
      }
      // DELETE /recipes/:id
      if (endpoint.startsWith('/recipes/') && options.method === 'DELETE') {
        const id = endpoint.split('/')[2];
        mockRecipesState = mockRecipesState.filter(r => r.id !== id);
        return undefined as unknown as T;
      }
      // PATCH /recipes/:id
      if (endpoint.startsWith('/recipes/') && options.method === 'PATCH' && options.body) {
        const id = endpoint.split('/')[2];
        const payload = JSON.parse(options.body as string) as Partial<NewRecipePayload>;
        mockRecipesState = mockRecipesState.map(r =>
          r.id === id ? { ...r, ...payload } : r
        );
        const updated = mockRecipesState.find(r => r.id === id);
        return updated as unknown as T;
      }
      // GET /categories
      if (endpoint === '/categories' && options.method === 'GET') {
        return mockCategories as unknown as T;
      }
      // GET /recipes/search?q=...
      if (endpoint.startsWith('/recipes/search?') && options.method === 'GET') {
        const url = new URL('http://localhost' + endpoint); // endpoint вже містить ?q=...
        const q = url.searchParams.get('q')?.toLowerCase() || '';
        const results = mockRecipesState.filter(r => r.title.toLowerCase().includes(q));
        return results as unknown as T;
      }
      throw new Error('Mock endpoint not implemented');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        // Можна додати додаткову обробку статусів
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      if (retry > 0) {
        await delay(300);
        return this.request<T>(endpoint, options, retry - 1);
      }
      // Централізоване логування помилок
      console.error('API error:', error);
      throw error;
    }
  }

  // --- Методи для роботи з категоріями ---

  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories', { method: 'GET' });
  }

  // --- Методи для пошуку ---

  async searchRecipes(query: string): Promise<Recipe[]> {
    // Використовуємо URLSearchParams для безпечної передачі параметрів
    const params = new URLSearchParams({ q: query });
    return this.request<Recipe[]>(`/recipes/search?${params.toString()}`, { method: 'GET' });
  }

  // --- Методи для роботи з рецептами ---

  async getRecipes(): Promise<Recipe[]> {
    return this.request<Recipe[]>('/recipes', { method: 'GET' });
  }

  async addRecipe(payload: NewRecipePayload): Promise<Recipe> {
    return this.request<Recipe>('/recipes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async updateRecipe(id: string, payload: Partial<NewRecipePayload>): Promise<Recipe> {
    return this.request<Recipe>(`/recipes/${id}`, {
      method: 'PATCH', // або 'PUT', якщо оновлюєте весь об'єкт
      body: JSON.stringify(payload),
    });
  }

  async deleteRecipe(id: string): Promise<void> {
    return this.request<void>(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }
}

// Експортуємо єдиний екземпляр сервісу
export const apiService = new ApiService(); 