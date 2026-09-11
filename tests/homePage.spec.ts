import { test, expect } from '../fixtures/pageFixtures'
import { type CartPage } from '../pages/cartPage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('demoblaze has title.', async ({ page }) => {
    await expect(page).toHaveTitle('STORE');
});
//1
test('demoblaze has home page button.', async ({ page, homePage }) => {
    await homePage.clickHomeButton();

    await expect(page).toHaveTitle('STORE');
});
//2
test('demoblaze has correct URL after opening.', async ({ page }) => {
    await expect(page).toHaveURL('https://demoblaze.com/');
});
//3
test('demoblaze CURRENT URL.', async ({ page }) => {
    await expect(page).toHaveURL('https://demoblaze.com/');
});
//4
test('demoblaze has visible logo.', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
});

//5
test('NAVBAR LINKS COUNT.', { tag: '@smoke' }, async ({ homePage }) => {
    await expect(homePage.navigationLinks).toHaveCount(6)
});

//6
test('NAVBAR LINKS TEXT - FAILED TEST.', { tag: '@smoke' }, async ({ page, homePage }) => {
    await test.step('Check navbar links test.', async () => {
        const expectedTexts = [
            'Home',
            'Contact',
            'About us',
            'Cart',
            'Log in',
            'Sign up'
        ];

        await expect(homePage.navigationLinks).toHaveText(expectedTexts);
    });
});
//7 and 8
test('CONTACT MODAL OPENS.', async ({ page, homePage }) => {

    await homePage.openContactModal();
    page.screenshot({ path: 'screeenshots/contactModal.png' })
    await expect(homePage.contactModal.title).toBeVisible();
    await expect(homePage.contactModal.emailInput).toBeVisible();
    await expect(homePage.contactModal.nameInput).toBeVisible();
    await expect(homePage.contactModal.messageInput).toBeVisible();

    await homePage.contactModal.close();

    await expect(homePage.contactModal.modal).toHaveAttribute('aria-hidden', 'true');

});

test('Enter contact field value.', async ({ homePage }) => {

    const contactModal = await homePage.openContactModal();
    const message = faker.lorem.sentence();;
    const email = faker.internet.email();
    const name = faker.person.fullName();
    await contactModal.fillContactForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, message);

    await expect(contactModal.emailInput).toHaveValue(process.env.TEST_USER_EMAIL!);
    await expect(contactModal.nameInput).toHaveValue(process.env.TEST_USER_PASSWORD!);
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
