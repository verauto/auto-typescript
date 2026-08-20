import { type Locator, type Page } from '@playwright/test';
import { ContactModal } from '../modals/contactModal';
import { CartPage } from './cartPage';
import { CellPhoneInfoPage } from './cellPhoneInfoPage';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly phonesButton: Locator;
  readonly laptopsButton: Locator;
  readonly monitorsButton: Locator;
  readonly previousButton: Locator;
  readonly galaxyS6Picture: Locator;
  readonly nokiaLumiaLink: Locator;
  readonly contactModal: ContactModal;
  readonly cartPage: CartPage;
  readonly cellPhoneInfoPage: CellPhoneInfoPage;

  constructor(page: Page) {
    super(page);
    this.phonesButton = page.getByText('Phones');
    this.laptopsButton = page.locator('#itemc').filter({ hasText: 'Laptops' });
    this.monitorsButton = page.locator(`[onclick="byCat('monitor')"]`);
    this.previousButton = page.getByRole('button', { name: 'Previous' });
    this.galaxyS6Picture = page.locator('.card h-100').locator('.card-img-top img-fluid')
    this.nokiaLumiaLink = page.locator('.card-block', { has: page.getByText('Nokia lumia 1520') })
    this.contactModal = new ContactModal(page);
    this.cartPage = new CartPage(page);
    this.cellPhoneInfoPage = new CellPhoneInfoPage(page);
  }

  productLink(productName: string): Locator {
    return this.page.locator('a.hrefch', { hasText: productName });
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async openContactModal(): Promise<ContactModal> {
    await this.contactButton.click();
    return this.contactModal;
  }

  async clickProduct(productName: string): Promise<CellPhoneInfoPage> {
    await this.productLink(productName).click();
    return this.cellPhoneInfoPage;
  }

  async openCartPage(): Promise<CartPage> {
    await this.cartButton.click();
    return this.cartPage
  }
}
