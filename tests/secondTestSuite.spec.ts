import { test, expect } from '../fixtures/pageFixtures'
import { type CartPage } from '../pages/cartPage';
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoblaze.com/');
});

test('Enter contact field value.', async ({ homePage }) => {

    const contactModal = await homePage.openContactModal();
    const message = faker.lorem.sentence();;
    const email = faker.internet.email();
    const name = faker.person.fullName();
    await contactModal.fillContactForm(email, name, message);

    await expect(contactModal.emailInput).toHaveValue(email);
    await expect(contactModal.nameInput).toHaveValue(name);
    await expect(contactModal.messageInput).toHaveValue(message);
});

test('Select cellPhones and check they are present in grid.', async ({ homePage }) => {
    const productNames = ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6'];
    let cartPage: CartPage;

    await test.step('Add products to cart', async () => {
        for (const prodName of productNames) {
            const cellPhoneInfoPage = await homePage.clickProduct(prodName);
            await cellPhoneInfoPage.clickAddToCartButtonAndGoBack();
        }
    });

    await test.step('Open cart page', async () => {
        cartPage = await homePage.openCartPage();
    });

    await test.step('Check products in cart', async () => {
        for (const productName of productNames) {
            const productRow = cartPage.productsTable.rowByProductName(productName);
            await expect(productRow.title).toHaveText(productName);
        }
    });
});
