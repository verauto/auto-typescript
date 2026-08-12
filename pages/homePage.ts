import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a.navbar-brand#nava');
  }

  async clickHomeButton(){
    await this.logo.click()
  }
}
