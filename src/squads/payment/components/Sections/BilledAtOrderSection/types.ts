import {
    ProductFormDetails,
    ProductFormPackageCourseType,
} from "src/squads/payment/types/form/order-form-types";
import { BillingRatio } from "src/squads/payment/types/service/bill-ratio-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { BillingItemBaseProductType } from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

interface BilledAtOrderProductType extends BillingItemBaseProductType {
    productTax?: ProductTaxType;
}

export interface BilledAtOrderOneTimeMaterialProduct extends BilledAtOrderProductType {}

export interface BilledAtOrderRecurringProduct extends BilledAtOrderProductType {
    billingSchedulePeriodName?: BillingSchedulePeriod["name"];
    billingRatioNumerator?: BillingRatio["billing_ratio_numerator"];
    billingRatioDenominator?: BillingRatio["billing_ratio_denominator"];
}
export interface BilledAtOrderPackageProduct extends BilledAtOrderProductType {
    packageCourses?: ProductFormPackageCourseType[];
    associatedProducts?: ProductFormDetails[];
    billingSchedulePeriodName?: BillingSchedulePeriod["name"];
    billingRatioNumerator?: BillingRatio["billing_ratio_numerator"];
    billingRatioDenominator?: BillingRatio["billing_ratio_denominator"];
}

export type BilledAtOrderItemType =
    | BilledAtOrderOneTimeMaterialProduct
    | BilledAtOrderRecurringProduct
    | BilledAtOrderPackageProduct;
