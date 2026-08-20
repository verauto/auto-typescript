import { test, expect } from '../fixtures/pageFixtures'

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoblaze.com/');
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
test('NAVBAR LINKS COUNT.', async ({ homePage }) => {
    await expect(homePage.navigationLinks).toHaveCount(8)
});

//6
test('NAVBAR LINKS TEXT.', async ({ page, homePage }) => {
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
//7 and 8
test('CONTACT MODAL OPENS.', async ({ page, homePage }) => {

    await homePage.openContactModal();

    await expect(homePage.contactModal.title).toBeVisible();
    await expect(homePage.contactModal.emailInput).toBeVisible();
    await expect(homePage.contactModal.nameInput).toBeVisible();
    await expect(homePage.contactModal.messageInput).toBeVisible();

    await homePage.contactModal.close();

    await expect(homePage.contactModal.modal).toHaveAttribute('aria-hidden', 'true');

});

test('Enter contact field value.', async ({ homePage }) => {

    const contactModal = await homePage.openContactModal();
    const message = 'Can you give me an advice?';
    const email = 'demo@email.com';
    const name = 'Jack';
    await contactModal.fillContactForm(email, name, message);

    await expect(contactModal.emailInput).toHaveValue(email);
    await expect(contactModal.nameInput).toHaveValue(name);
    await expect(contactModal.messageInput).toHaveValue(message);
});

test('Select cellPhones and check they are present in grid.', async ({ homePage }) => {
    const productNames = ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6'];

    for (const prodName of productNames) {
        const cellPhoneInfoPage = await homePage.clickProduct(prodName);
        await cellPhoneInfoPage.clickAddToCartButtonAndGoBack();
    }

    const cartPage = await homePage.openCartPage();

    for (const productName of productNames) {
        const productRow = cartPage.productsTable.rowByProductName(productName);
        await expect(productRow.title).toHaveText(productName);
    }
});
