import test from "@lib/BaseTest";
import { expect } from "@playwright/test";


test(`@E2E Watch T-shirts detail infomation.`, async ({ homePage, productPage }) => {
    // You should verify page
    await homePage.navigateToURL();
    // await homePage.verifyTitlePage();
    expect(await homePage.page.screenshot()).toMatchSnapshot('HomePage.png')
    await homePage.hoverApparelMenu();
    // Thieu case: Then I can see Shoes and T-shirts categories in APPAREL & ACCESSORIES menu
    await homePage.clickOnTShirtsCategory();

    await productPage.verifyTShirtsPage();
    await productPage.sortPriceLowToHigh();
    // Trau chuot them verifyProductPriceLowToHigh
    await productPage.verifyProductPriceLowToHigh();

    // Lay bat ky 1 san pham co add to card product
    // Lay thong tin gia tien va ten
    await productPage.clickOnAddToCardProduct();

    // Thieu case: And I can see the item detailed information
    // -> Verify gia tien va ten san pham
    await productPage.verifyProductDetail("Name", "Price");
})
