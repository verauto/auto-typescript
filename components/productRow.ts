import { type Locator } from '@playwright/test';

export class ProductRow {
    readonly row: Locator;
    readonly picture: Locator;
    readonly title: Locator;
    readonly price: Locator;
    readonly deleteButton: Locator;

    constructor(row: Locator) {
        this.row = row;
        this.picture = row.locator('td').nth(0).locator('img');
        this.title = row.locator('td').nth(1);
        this.price = row.locator('td').nth(2);
        this.deleteButton = row.getByRole('link', { name: 'Delete' });
    }
}
