import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Tells Playwright where test files are located.
  // In this project Playwright will search for tests inside the "tests" folder.
  testDir: './tests',

  // Tells Playwright to generate an HTML report after the test run.
  // The report is created in the "playwright-report" folder.
  reporter: 'html',
});
