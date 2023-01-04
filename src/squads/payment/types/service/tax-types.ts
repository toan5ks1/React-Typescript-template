import {
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesReferenceQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type ProductTaxType = ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]>;

export type ProductTaxesType = ArrayElement<Payment_GetManyTaxesByTaxIdsQuery["tax"]>;

export type CustomBillingTaxType = ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>;
