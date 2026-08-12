// TypeScript: імпортуємо test та expect
// Аналог у C#: using Microsoft.Playwright.NUnit;
//               using NUnit.Framework;
import { test, expect } from '@playwright/test';

// TypeScript: оголошуємо тест
// Аналог у C#: [Test]
//              public async Task GooglePageHasCorrectTitle()
test('Automation Exercise page has correct title', async ({ page }) => {

  // TypeScript: відкриваємо сторінку
  // Аналог у C#: await Page.GotoAsync("https://automationexercise.com/");
  await page.goto('https://demoblaze.com/');

  // TypeScript: перевіряємо заголовок сторінки
  // Аналог у C#: await Expect(Page).ToHaveTitleAsync(new Regex("Google"));
  await expect(page).toHaveTitle('STORE');
});