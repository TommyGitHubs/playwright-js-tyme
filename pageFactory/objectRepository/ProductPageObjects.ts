export class ProductPageObjects {
    protected static PRODUCT_SORT_ID = `#sort`;
    protected static LOW_TO_HIGH_OPTION_VALUE = `p.price-ASC`;

    protected static TITLE = `h1`;
    protected static PRODUCT_PARENT_XPATH = `//div[contains(@class,'thumbnails grid')]`;
    protected static PRODUCT_NAME = `.fixed_wrapper .fixed .prdocutname`;
    protected static PRICE_CLASS = `.thumbnail .pricetag .oneprice`;
    protected static PRODUCT_CARD = `.pricetag .productcart`;

    protected static PRODUCT_FIL_NEPRICE = `.productfilneprice`;
    protected static PRODUCT_DETAIL_NAME = `.col-md-12 .productname`;
}
