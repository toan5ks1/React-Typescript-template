import { Payment_GetProductPriceByProductIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type ProductPriceListType = Payment_GetProductPriceByProductIdQuery["product_price"];

export type ProductPriceType = ArrayElement<ProductPriceListType>;
