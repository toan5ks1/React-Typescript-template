import { OrderCurrency } from "src/squads/payment/constants/enum";
import { calculatePriceWithBillingRatio } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    OrderFormProductSection,
    ProductFormPackageCourseType,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductPriceListType } from "src/squads/payment/types/service/price-types";
import {
    ProductAndProductExtensionType,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

import { BillingItem, CourseItem } from "manabuf/payment/v1/order_pb";

import { getBillingItemProperties } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import {
    getBillingDiscountDetails,
    getBillingPeriods,
    getDiscountApplicablePeriodIds,
    getPeriodRatioDetails,
    getPeriodWithBillingRatio,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";

export const getRecurringProductInfo = (productFieldArrayItem: ProductsFormValues) => {
    const { product, recurringDetails, productTax, discount, productPrices, packageCourses } =
        productFieldArrayItem;
    const billingPeriods = recurringDetails?.billingSchedulePeriods ?? [];
    const startDate = recurringDetails?.startDate;
    const proRatingFlagDisabled = product?.disable_pro_rating_flag;
    const productAndProductExtension = getProductAndProductExtensionType(productFieldArrayItem);

    return {
        product,
        productTax,
        discount,
        productPrices,
        billingPeriods,
        startDate,
        proRatingFlagDisabled,
        productAndProductExtension,
        packageCourses,
    };
};

export const getRecurringBillingPeriodInfo = ({
    billingPeriod,
    periodWithBillingRatio,
    proRatingFlagDisabled,
    startDate,
    productPrices,
    discountApplicablePeriodIds,
    discount,
    product,
    productTax,
}: {
    billingPeriod: BillingSchedulePeriod;
    periodWithBillingRatio?: BillingSchedulePeriod;
    proRatingFlagDisabled?: boolean;
    startDate: string;
    productPrices?: ProductPriceListType;
    discountApplicablePeriodIds: Array<BillingSchedulePeriod["billing_schedule_period_id"]>;
    discount?: ProductDiscountType | null;
    productTax?: ProductTaxType;
    product: ProductTypeQuery;
}) => {
    const { billingRatioDenominator, billingRatioNumerator } = getPeriodRatioDetails({
        billingPeriod,
        periodWithBillingRatio,
        proRatingFlagDisabled,
        startDate,
    });

    const productPrice = productPrices?.find(
        (price) => price.billing_schedule_period_id === billingPeriod.billing_schedule_period_id
    );

    const billingItemPriceWithRatio = calculatePriceWithBillingRatio({
        productPrice: productPrice?.price!,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    const canApplyDiscount = Boolean(
        discountApplicablePeriodIds.find(
            (periodId) => periodId === billingPeriod.billing_schedule_period_id
        )
    );

    const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
        canApplyDiscount ? discount : undefined,
        product.tax_id,
        productTax,
        billingItemPriceWithRatio
    );

    const { discountName, discountAmount } = getBillingDiscountDetails(
        billingItemPriceWithRatio,
        discount,
        canApplyDiscount
    );

    return {
        billingItemPriceWithRatio,
        taxItem,
        discountItem,
        finalPrice,
        productPrice,
        discountName,
        discountAmount,
        billingRatioNumerator,
        billingRatioDenominator,
    };
};

export const getRecurringBillingItems = ({
    productFieldArrayItem,
    section,
    orderDate,
    courseItemsList = [],
}: {
    productFieldArrayItem: ProductsFormValues;
    section: OrderFormProductSection;
    orderDate: string;
    courseItemsList?: Array<CourseItem.AsObject>;
}): Array<BillingItem.AsObject> => {
    const {
        product,
        productPrices,
        discount,
        billingPeriods,
        productTax,
        startDate,
        proRatingFlagDisabled,
    } = getRecurringProductInfo(productFieldArrayItem);

    if (!product || !startDate || !productPrices) {
        return [];
    }

    const selectedBillingPeriods = getBillingPeriods({
        billingPeriods,
        startDate,
        orderDate: orderDate,
        billingSection: section,
    });

    const periodWithBillingRatio = getPeriodWithBillingRatio(billingPeriods, startDate);
    const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
        billingPeriods,
        startDate,
        discount
    );

    const billingItems: Array<BillingItem.AsObject> = selectedBillingPeriods.map(
        (billingPeriod) => {
            const { billingItemPriceWithRatio, taxItem, discountItem, finalPrice, productPrice } =
                getRecurringBillingPeriodInfo({
                    billingPeriod,
                    periodWithBillingRatio,
                    proRatingFlagDisabled,
                    startDate,
                    productPrices,
                    discountApplicablePeriodIds,
                    discount,
                    product,
                    productTax,
                });

            return {
                productId: product.product_id!,
                billingSchedulePeriodId: billingPeriod.billing_schedule_period_id,
                price: billingItemPriceWithRatio,
                taxItem,
                discountItem,
                finalPrice,
                quantity: productPrice?.quantity,
                courseItemsList: courseItemsList,
            };
        }
    );

    return billingItems;
};

export interface GeneratedRecurringBillingSectionItem {
    productName: string;
    productPrice: number;
    discountName?: string;
    discountPrice: number;
    currency: OrderCurrency;
    productTax?: ProductTaxType;
    packageCourses?: ProductFormPackageCourseType[];
    productAndProductExtension: ProductAndProductExtensionType;
    billingDate: string;
    billingSchedulePeriodName?: string;
    billingRatioNumerator?: number;
    billingRatioDenominator?: number;
}

export const generateRecurringBillingSectionItem = ({
    productFieldArrayItem,
    currency,
    section,
    orderDate,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    section: OrderFormProductSection;
    orderDate: string;
}): GeneratedRecurringBillingSectionItem[] => {
    const {
        packageCourses,
        product,
        discount,
        billingPeriods,
        startDate,
        proRatingFlagDisabled,
        productAndProductExtension,
        productTax,
        productPrices,
    } = getRecurringProductInfo(productFieldArrayItem);

    if (!product || !startDate || !productPrices) return [];

    const billingPeriodsBySection = getBillingPeriods({
        billingPeriods,
        startDate,
        orderDate,
        billingSection: section,
    });

    const periodWithBillingRatio = getPeriodWithBillingRatio(billingPeriods, startDate);
    const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
        billingPeriods,
        startDate,
        discount
    );

    const billingItems = billingPeriodsBySection.map((billingPeriod) => {
        const {
            billingItemPriceWithRatio,
            discountName,
            discountAmount,
            billingRatioNumerator,
            billingRatioDenominator,
        } = getRecurringBillingPeriodInfo({
            billingPeriod,
            periodWithBillingRatio,
            proRatingFlagDisabled,
            startDate,
            productPrices,
            discountApplicablePeriodIds,
            discount,
            product,
            productTax,
        });

        return {
            productName: product.name,
            productPrice: billingItemPriceWithRatio,
            discountName,
            discountPrice: discountAmount,
            currency,
            productTax,
            packageCourses,
            productAndProductExtension,
            billingDate: billingPeriod.billing_date,
            billingSchedulePeriodName: billingPeriod.name,
            billingRatioNumerator,
            billingRatioDenominator,
        };
    });

    return billingItems;
};
