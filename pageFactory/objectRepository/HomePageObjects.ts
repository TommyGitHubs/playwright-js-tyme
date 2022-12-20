export class HomePageObjects {
    protected static LOGO_TITLE_NAME = `/html/body/div[1]/header/div[1]/div/div[1]/a/img`
    protected static APPRAREL_MENU_NAME = `text="Apparel & accessories"`
    protected static TSHIRTS_CATEGORY_NAME = `T-shirts`
    protected static SUB_CATEGORY_CLASS = `subcategories`
    protected static SHOES_AND_TSHIRTS_CATEGORY_TXT = `Shoes T-shirts`
    protected static SHOES_ITEM_XPATH = `"(//div[@class='subcategories']//a)[1]"`
    protected static TSHIRTS_ITEM_XPATH = `text="T-shirts"`
    protected static ALL_APPAREL = `(//div[@class='subcategories']//ul)[1]")`
}
