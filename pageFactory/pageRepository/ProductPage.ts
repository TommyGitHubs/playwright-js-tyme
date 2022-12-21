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
        const parentDiv = await this.page.$('.thumbnails.grid.row.list-inline');
        let childDivs;
        const price = [];

        if (await parentDiv.$$('div')) {
            childDivs = await parentDiv.$$('div');
        }

        for (const childDiv of childDivs) {
            const priceElement = await childDiv.$('.pricetag .oneprice');
            if (priceElement) {
                price.push(await (await this.page.evaluate(element => element.textContent, priceElement)).slice(1));
            }
        }
        this.compareLowToHighValue(price);
    }

    async compareLowToHighValue(list: string[]): Promise<void> {
        const floatList: number[] = list.map(val => Number(val));

        for(let i=0; i<floatList.length-1; i++) {
            await expect(floatList[i]).toBeLessThanOrEqual(floatList[i+1])
        }
    }

    async clickOnAddToCardProduct(): Promise<void> {
        const parentDiv = await this.page.$('.thumbnails.grid.row.list-inline');
        let childDivs;
        const price = [];

        if (await parentDiv.$$('div')) {
            childDivs = await parentDiv.$$('div');
        }

        for (const childDiv of childDivs) {
            const priceElement = await childDiv.$('.pricetag .oneprice');
            if (priceElement) {
                price.push(await (await this.page.evaluate(element => element.textContent, priceElement)).slice(1));
            }
        }
        this.compareLowToHighValue(price);
    }

    async verifyProductDetail(name: string, price:string): Promise<void> {

    }
}
