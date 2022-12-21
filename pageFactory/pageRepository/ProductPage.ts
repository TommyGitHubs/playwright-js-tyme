import { WebActions } from "@lib/WebActions";
import { ProductPageObjects } from "@objects/ProductPageObjects";
import { expect, Page } from "@playwright/test";

let webActions: WebActions;

export class ProductPage extends ProductPageObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    };

    async verifyTShirtsPage(): Promise<void> {
        await webActions.verifyElementText(ProductPageObjects.TITLE, `T-shirts`)
    }

    async sortSelect(): Promise<void> {
        await webActions.clickElement(ProductPageObjects.PRODUCT_SORT_ID);
    }

    async sortPriceLowToHigh(): Promise<void> {
        this.sortSelect();
        const product_sort = await this.page.$(ProductPageObjects.PRODUCT_SORT_ID);
        await product_sort?.selectOption({ value: ProductPageObjects.LOW_TO_HIGH_OPTION_VALUE });
    }

    async verifyProductPriceLowToHigh(): Promise<void> {
        const parentDiv = await this.page.$(ProductPageObjects.PRODUCT_PARENT_XPATH);
        let childDivs;
        const price = [];

        if (await parentDiv.$$('div')) {
            childDivs = await parentDiv.$$('div');
        }

        for (const childDiv of childDivs) {
            const priceElement = await childDiv.$(ProductPageObjects.PRICE_CLASS);
            if (priceElement) {
                price.push(await (await this.page.evaluate(element => element.textContent, priceElement)).slice(1));
            }
        }
        // this.compareLowToHighValue(price);
        // Run debugs for fix double run
        const finalPriceList = price.map(string => parseFloat(string));
        for(let i=0; i<(finalPriceList).length-1; i++) {
            expect(finalPriceList[i]).toBeLessThanOrEqual(finalPriceList[i+1])
        }
    }


    // ASCD
    async compareLowToHighValue(list: string[]): Promise<void> {
        const floatList = list.map(string => parseFloat(string));
        for(let i=0; i<floatList.length-1; i++) {
            expect(floatList[i]).toBeLessThanOrEqual(floatList[i+1])
        }
    }

    async clickOnAddToCardProductAndVerifyInfor(): Promise<void> {
        const parentDiv = await this.page.$('.thumbnails.grid.row.list-inline');
        let childDivs;
        let price = '';
        let productCard;
        let priceElement;

        if (await parentDiv.$$('div')) {
            childDivs = await parentDiv.$$('div');
        }

        for (const childDiv of childDivs) {
            productCard = await childDiv.$(ProductPageObjects.PRODUCT_CARD);
            priceElement = await childDiv.$(ProductPageObjects.PRICE_CLASS);
            let productName = await childDiv.$(ProductPageObjects.PRODUCT_NAME);
            if (productCard) {
                price = await (await this.page.evaluate(element => element.textContent, priceElement));

                if(productName) {
                    let productNameContext = await this.page.evaluate(element => element.textContent, productName);
                    await productCard.click();
                    this.verifyProductDetail(productNameContext, price);
                }
                break;
            }
        }
    }

    async verifyProductDetail(name: string, price:string): Promise<void> {
        await webActions.verifyElementText(ProductPageObjects.PRODUCT_DETAIL_NAME, name);
        await webActions.verifyElementText(ProductPageObjects.PRODUCT_FIL_NEPRICE, price);
    }
}
