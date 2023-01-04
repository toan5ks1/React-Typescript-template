import {
    ProductFormDetails,
    ProductFormPackageCourseType,
} from "src/squads/payment/types/form/order-form-types";
import { BillingRatio } from "src/squads/payment/types/service/bill-ratio-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { BillingItemBaseProductType } from "src/squads/payment/types/service/product-types";

interface UpcomingBillingProductType extends BillingItemBaseProductType {}

export interface UpcomingBillingOneTimeMaterialProduct extends UpcomingBillingProductType {
    billingDate: string;
}

export interface UpcomingBillingRecurringProduct extends UpcomingBillingProductType {
    billingSchedulePeriodName?: BillingSchedulePeriod["name"];
    billingRatioNumerator?: BillingRatio["billing_ratio_numerator"];
    billingRatioDenominator?: BillingRatio["billing_ratio_denominator"];
    billingDate: string;
}
export interface UpcomingBillingPackageProduct extends UpcomingBillingProductType {
    packageCourses?: ProductFormPackageCourseType[];
    associatedProducts?: ProductFormDetails[];
    billingDate: string;
    billingSchedulePeriodName?: BillingSchedulePeriod["name"];
    billingRatioNumerator?: BillingRatio["billing_ratio_numerator"];
    billingRatioDenominator?: BillingRatio["billing_ratio_denominator"];
}

export type UpcomingBillingItemType =
    | UpcomingBillingOneTimeMaterialProduct
    | UpcomingBillingRecurringProduct
    | UpcomingBillingPackageProduct;
