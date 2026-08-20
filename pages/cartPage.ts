import { Page, Locator } from '@playwright/test';
import { PlaceOrderModal } from '../modals/placeOrderModal';
import { ProductsTable } from '../components/productsTable';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
    readonly productNames: Locator;
    readonly productsTable: ProductsTable;
    readonly placeOrderButton: Locator;
    readonly placeOrderModal: PlaceOrderModal;

    constructor(page: Page) {
        super(page);
        this.productNames = page.locator('#tbodyid td:nth-child(2)');
        this.productsTable = new ProductsTable(page);
        this.placeOrderButton = page.locator('.btn.btn-success');
        this.placeOrderModal = new PlaceOrderModal(page);
    }

    async openPlaceOrder():Promise<PlaceOrderModal>{
        await this.placeOrderButton.click();
        return this.placeOrderModal;
    }
}
