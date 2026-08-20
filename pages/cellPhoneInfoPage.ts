import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CellPhoneInfoPage extends BasePage {

    addToCartButton: Locator;

    constructor(page: Page) {
        super(page);

        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    }

    async clickAddToCartButton() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.addToCartButton.scrollIntoViewIfNeeded();
        await this.addToCartButton.click();
    }
    async clickAddToCartButtonAndGoBack() {
        await this.clickAddToCartButton();
        await this.homeButton.click();
    }
}
