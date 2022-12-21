import test from "@lib/BaseTest";
import { expect } from "@playwright/test";


test(`@E2E Watch T-shirts detail infomation.`, async ({ homePage, productPage }) => {
    await homePage.navigateToURL();
    expect(await homePage.page.screenshot()).toMatchSnapshot('HomePage.png')
    await homePage.hoverApparelMenu();
    await homePage.clickOnTShirtsCategory();
    await productPage.verifyTShirtsPage();
    await productPage.sortPriceLowToHigh();
    await productPage.verifyProductPriceLowToHigh();
    await productPage.clickOnAddToCardProductAndVerifyInfor();
})
