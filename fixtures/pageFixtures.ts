// Беремо стандартний Playwright test і називаємо його base.
import { test as base } from '@playwright/test';

// Імпортуємо наш Page Object.
import { HomePage } from '../pages/homePage';

// Описуємо додаткові fixture-и, які будуть доступні в тестах.
type PageFixtures = {
  homePage: HomePage;
};

// Створюємо свій test на основі стандартного Playwright test.
export const test = base.extend<PageFixtures>({
  // Playwright створить homePage і передасть його в тест.
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

// Експортуємо expect, щоб імпортувати test і expect з одного файлу.
export { expect } from '@playwright/test';
