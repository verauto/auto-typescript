import { Page, Locator } from '@playwright/test';

export class PlaceOrderModal {
    readonly page: Page;
readonly orderModalLabel : Locator;
    constructor(page: Page) {
        this.page = page;
        this.orderModalLabel = page.locator('#orderModalLabel');
   
   
    }
}