import { type Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly homeButton: Locator;
    readonly contactButton: Locator;
    readonly aboutUsButton: Locator;
    readonly cartButton: Locator;
    readonly logInButton: Locator;
    readonly signUpButton: Locator;
    readonly navigationLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('a.navbar-brand#nava');
        this.homeButton = page.getByRole('link', { name: 'Home (current)' });
        this.contactButton = page.getByRole('link', { name: 'Contact', exact: true });
        this.aboutUsButton = page.getByRole('link', { name: 'About us', exact: true });
        this.cartButton = page.locator('#cartur');
        this.logInButton = page.locator('#login2');
        this.signUpButton = page.locator('[data-target="#signInModal"]');
        this.navigationLinks = page.locator('.navbar-nav.ml-auto li');
    }
}
