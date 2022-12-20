import test from "@lib/BaseTest";
import { expect } from "@playwright/test";


const APPRAREL_MENU = [
'Shoes',
'T-Shirts'
];

test(`@E2E Watch T-shirts detail infomation.`, async ({ homePage, productPage }) => {
    // You should verify page
    await homePage.navigateToURL();
    await homePage.verifyTitlePage();
    await homePage.hoverApparelMenu();
    await homePage.clickOnTShirtsCategory();

    await productPage.verifyProductPage();
    await productPage.sortPriceLowToHigh();
    await productPage.verifyProductPriceLowToHigh();
})
