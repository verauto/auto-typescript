import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Tells Playwright where test files are located.
  // In this project Playwright will search for tests inside the "tests" folder.
  testDir: './tests',

  // Tells Playwright how many times to retry a failed test.
  // Locally tests will not be retried, but in CI failed tests will be retried 2 times.
  retries: process.env.CI ? 2 : 0,

  // Tells Playwright to generate an HTML report after the test run.
  // The report is created in the "playwright-report" folder.
  reporter: 'html',

  // Runs different spec files in parallel using 2 worker processes.
  workers: 5,

  fullyParallel: true
});
