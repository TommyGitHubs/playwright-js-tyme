import { Locator, Page } from "@playwright/test";
import { WebActions } from "../../lib/WebActions";
import { HomePageObjects } from "../objectRepository/HomePageObjects";


let webActions: WebActions;

export class HomePage extends HomePageObjects {
    readonly page: Page;
    readonly apparelMenu: Locator;
    readonly allApprarel: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.apparelMenu = page.getByRole('link', {name: 'Apparel & accessories'});
        this.allApprarel = page.locator(HomePageObjects.ALL_APPAREL);
        webActions = new WebActions(this.page);
    }

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(`/`);
    }

    async verifyTitlePage(): Promise<void> {
        await webActions.verifyElementText(HomePageObjects.APPRAREL_MENU_NAME, `Apparel & accessories`)
    }

    async hoverApparelMenu(): Promise<void> {
        await this.apparelMenu.hover();
    }

    async clickOnTShirtsCategory(): Promise<void> {
        await webActions.clickElement(HomePageObjects.TSHIRTS_ITEM_XPATH);
        // await webActions.waitForPageNavigation(`load`);
    }
}
