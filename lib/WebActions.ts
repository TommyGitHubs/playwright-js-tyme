import { expect, Page } from "@playwright/test";
import { testConfig } from "../testConfig";
const waitForElement = testConfig.waitforElement;

export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        await this.page.goto(url, { waitUntil: `networkidle`});
    }

    async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
        }
    }


    async verifyElementText(locator: string, text: string): Promise<void> {
        const textValue = await this.page.textContent(locator);
        expect(textValue.trim()).toBe(text);
    }

    async clickElement(locator: string): Promise<void> {
        await this.page.click(locator);
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async getTextFromWebElements(locator: string): Promise<string[]> {
        return this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
    }
}
