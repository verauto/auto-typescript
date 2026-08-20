import { type Locator, type Page } from '@playwright/test';
import { DatePicker } from '../components/datePicker';

export class ContactModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly title: Locator;
  readonly closeIcon: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly datePicker: DatePicker;
  readonly agreementCheckbox: Locator;
  readonly closeButton: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('div.modal#exampleModal').first();
    this.title = this.modal.locator('#exampleModalLabel');
    this.closeIcon = this.modal.getByLabel('Close');
    this.emailInput = this.modal.locator('#recipient-email');
    this.nameInput = this.modal.locator('#recipient-name');
    this.messageInput = this.modal.locator('#message-text');
    this.datePicker = new DatePicker(
      this.modal.locator('#contact-date'),
      this.modal.locator('.datepicker')
    );
    this.agreementCheckbox = this.modal.locator('#agreement');
    this.closeButton = this.modal.locator('.modal-footer').getByRole('button', { name: 'Close' });
    this.sendMessageButton = this.modal.getByRole('button', { name: 'Send message' });
  }

  async fillContactForm(email: string, name: string, message: string) {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.messageInput.fill(message);
  }

  async sendMessage() {
    await this.sendMessageButton.click();
  }

  async acceptAgreement() {
    await this.agreementCheckbox.check();
  }

  async rejectAgreement() {
    await this.agreementCheckbox.uncheck();
  }

  async close() {
    await this.closeButton.click();
  }
}
