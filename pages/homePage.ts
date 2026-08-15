import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly homeButton: Locator;
  readonly contactButton: Locator;
  readonly cartButton: Locator;
  readonly signUpButton: Locator;
  readonly phonesButton: Locator;
  readonly laptopsButton: Locator;
  readonly monitorsButton: Locator;
  readonly previousButton: Locator;
  readonly galaxyS6Picture: Locator;
  readonly nokiaLumiaLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a.navbar-brand#nava');
    this.homeButton = page.getByRole('link', { name: 'Home (current)' });
    this.contactButton = page.getByText('Contact');
    this.cartButton = page.locator('#cartur');
    this.signUpButton = page.locator('[data-target="#signInModal"]');
    this.phonesButton = page.getByText('Phones');
    this.laptopsButton = page.locator('#itemc').filter({ hasText: 'Laptops' });
    this.monitorsButton = page.locator(`[onclick="byCat('monitor')"]`);
    this.previousButton = page.getByRole('button', { name: 'Previous' });
    this.galaxyS6Picture = page.locator('.card h-100').locator('.card-img-top img-fluid')
    this.nokiaLumiaLink = page.locator('.card-block', {has: page.getByText('Nokia lumia 1520')})
  }

  productLink(productName: string): Locator {
    return this.page.locator('a.hrefch', { hasText: productName });
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickProduct(productName: string) {
    await this.productLink(productName).click();
  }
}
