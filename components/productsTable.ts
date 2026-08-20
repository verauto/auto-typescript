import { type Locator, type Page } from '@playwright/test';
import { ProductRow } from './productRow';

export class ProductsTable {
    readonly page: Page;
    readonly table: Locator;
    readonly rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator('.table-responsive table');
        this.rows = this.table.locator('tbody#tbodyid tr');
    }

    rowByProductName(productName: string): ProductRow {
        return new ProductRow(this.rows.filter({ hasText: productName }));
    }
}
