# Lets Eat Mini App

A Telegram Mini App for sharing recipes with family and friends.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Administrative rights (for first-time HTTPS certificate generation)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

On first run, you'll be prompted to install a local SSL certificate. This requires administrative rights and is necessary for local HTTPS.

### Testing in Telegram

To test the Mini App in Telegram:

1. Create a test bot using [@BotFather](https://t.me/BotFather)
2. Set up your Mini App:
   - Send `/newapp` to BotFather
   - Choose your bot
   - Enter a name for your Mini App
   - Enter the URL of your local dev server: `https://localhost:5173`

3. Open your Mini App in Telegram:
   - Use the format: `https://t.me/your_bot_username/your_mini_app_name`
   - Or use the direct test URL from BotFather

### Debugging

The app includes Eruda for debugging in Telegram. To use it:

1. Look for the Eruda icon in the bottom right corner of your app
2. Click it to open the debug panel
3. Use the Console tab to view logs and errors
4. Use the Elements tab to inspect the DOM and CSS

### Development Notes

- The app uses HTTPS in development mode for compatibility with Telegram
- Theme colors are automatically synchronized with Telegram's theme
- CSS variables with `--tg-` prefix are linked to Telegram theme colors
- The app supports both light and dark color schemes

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

- `src/components/` - React components
- `src/pages/` - Page components
- `src/css/` - Global styles and CSS utilities
- `src/helpers/` - Utility functions
- `src/navigation/` - Routing configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly in both light and dark themes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Frontend Mini App

### Реалізовані data hooks (Task 10.2)

У рамках підзадачі **10.2 Implement Custom Data Fetching Hooks** були реалізовані наступні хуки для роботи з даними у фронтенді:

- **useRecipes** — універсальний хук для роботи зі списком рецептів:
  - Отримання списку рецептів (fetch)
  - Додавання нового рецепта (create)
  - Оновлення рецепта (update)
  - Видалення рецепта (delete)
  - Підтримка станів завантаження, помилок, мутацій
  - Вся логіка централізована через apiService

- **useCategories** — хук для отримання списку категорій:
  - Fetch категорій з API (або мок-даних)
  - Стан завантаження та помилок

- **useSearch** — хук для пошуку рецептів:
  - Пошук рецептів за рядком запиту
  - Стан завантаження та помилок

> **Примітка:** Хук для family groups (useFamilyGroups) буде додано окремо, коли функціонал груп стане актуальним для фронтенду.

Всі хуки відповідають архітектурі проекту, використовують централізований apiService, мають типізацію, підтримують стани завантаження та помилок, і легко розширюються для майбутніх потреб.
