import { test, expect } from '../fixtures/pageFixtures'

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoblaze.com/');
});

test('demoblaze has title.', async ({ page }) => {
    await expect(page).toHaveTitle('STORE');
});

test('demoblaze has home page button.', async ({ page, homePage }) => {
    await homePage.clickHomeButton();

    await expect(page).toHaveTitle('STORE');
});
