import { HomePage } from '@pages/HomePage';
import { ProductPage } from '@pages/ProductPage';
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
    homePage: HomePage;
    productPage: ProductPage;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    }
});

export default test;
