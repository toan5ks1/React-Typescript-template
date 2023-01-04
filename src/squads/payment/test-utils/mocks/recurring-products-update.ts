import {
    KeyDiscountAmountTypes,
    KeyTaxCategoryTypes,
    KeyBillingStatus,
    KeyDiscountTypes,
    KeyProductTypes,
} from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { createMockRecurringMaterialProductPrices } from "src/squads/payment/test-utils/mocks/recurring-products";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { UpdateOrderBillItem } from "src/squads/payment/types/service/bill-item-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

const recurringMaterialBillItems: UpdateOrderBillItem[] = [
    {
        product_id: "product_id_1",
        product_pricing: 1000,
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        tax_id: "tax_id_1",
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        order_id: "order_id_1",
        billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
        billing_date: "2021-12-28T02:35:17.738471+00:00",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        bill_item_sequence_number: 1,
        discount_amount: 10,
        tax_amount: 10,
        final_price: 990,
        billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
        billing_item_description: "description",
        student_product_id: "student_product_id_1",
        is_latest_bill_item: true,
        price: 1000,
        billing_ratio_numerator: 1,
        billing_ratio_denominator: 1,
    },
    {
        product_id: "product_id_1",
        product_pricing: 1000,
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        tax_id: "tax_id_1",
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        order_id: "order_id_1",
        billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
        billing_date: "2021-12-28T02:35:17.738471+00:00",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        bill_item_sequence_number: 1,
        discount_amount: 10,
        tax_amount: 10,
        final_price: 990,
        billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
        billing_item_description: "description",
        student_product_id: "student_product_id_1",
        is_latest_bill_item: true,
        price: 1000,
        billing_ratio_numerator: 1,
        billing_ratio_denominator: 1,
    },
    {
        product_id: "product_id_1",
        product_pricing: 1000,
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        tax_id: "tax_id_1",
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        order_id: "order_id_1",
        billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
        billing_date: "2021-12-28T02:35:17.738471+00:00",
        billing_schedule_period_id: "billing_schedule_period_id_3",
        bill_item_sequence_number: 1,
        discount_amount: 10,
        tax_amount: 10,
        final_price: 990,
        billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
        billing_item_description: "description",
        student_product_id: "student_product_id_1",
        is_latest_bill_item: true,
        price: 1000,
        billing_ratio_numerator: 1,
        billing_ratio_denominator: 1,
    },
    {
        product_id: "product_id_1",
        product_pricing: 1000,
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        tax_id: "tax_id_1",
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        order_id: "order_id_1",
        billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
        billing_date: "2021-12-28T02:35:17.738471+00:00",
        billing_schedule_period_id: "billing_schedule_period_id_4",
        bill_item_sequence_number: 1,
        discount_amount: 10,
        tax_amount: 10,
        final_price: 990,
        billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
        billing_item_description: "description",
        student_product_id: "student_product_id_1",
        is_latest_bill_item: true,
        price: 1000,
        billing_ratio_numerator: 1,
        billing_ratio_denominator: 1,
    },
];

export const createMockBillingSchedulePeriodsForUpdateOrder = (): BillingSchedulePeriod[] => {
    return [
        {
            billing_schedule_id: "billing_schedule_id_1",
            billing_schedule_period_id: "billing_schedule_period_id_1",
            name: "Billing Schedule Period 1",
            billing_date: "2022-05-01T00:00:00.000Z",
            start_date: "2022-05-04T00:00:00.000Z",
            end_date: "2022-06-04T00:00:00.000Z",
            billing_ratios: [],
        },
        {
            billing_schedule_id: "billing_schedule_id_1",
            billing_schedule_period_id: "billing_schedule_period_id_2",
            name: "Billing Schedule Period 2",
            billing_date: "2022-06-01T00:00:00.000Z",
            start_date: "2022-06-04T00:00:00.000Z",
            end_date: "2022-07-04T00:00:00.000Z",
            billing_ratios: [],
        },
    ];
};

export const updateProduct: ProductTypeQuery = {
    product_id: "product_id_1",
    name: "Update Order Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};

export const updateProductProRatingDisabled: ProductTypeQuery = {
    product_id: "product_id_1",
    name: "Update Order Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: true,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};

export const mockUpdateProductFormRecurringMaterial = ({
    startDate,
    effectiveDate,
}: {
    startDate?: string;
    effectiveDate?: Date;
}): ProductsFormValues[] => {
    const currentDate = getDateWithZeroMilliseconds();
    return [
        {
            product: updateProduct,
            material: {
                material_type: "MATERIAL_TYPE_RECURRING",
            },
            productTax: {
                tax_category: "TAX_CATEGORY_INCLUSIVE",
                tax_percentage: 10,
            },
            productPrices: createMockRecurringMaterialProductPrices(),
            discount: {
                name: "Discount name",
                discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
                discount_amount_value: 10,
                available_from: "2021-12-28T02:35:17.738471+00:00",
                available_until: "2022-12-28T02:35:17.738471+00:00",
                created_at: "2021-12-28T02:35:17.738471+00:00",
                discount_id: "discount_id_1",
                discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
                updated_at: "2021-12-28T02:35:17.738471+00:00",
            },
            updateOrderDetails: {
                orderStatus: ProductListItemStatus.ACTIVE,
                effectiveDate: effectiveDate ? effectiveDate : currentDate,
                billItems: createMockRecurringMaterialBillingItem(),
                reccuringDetails: {
                    startDate,
                    billingSchedulePeriods: createMockBillingSchedulePeriodsForUpdateOrder(),
                },
            },
            fee: undefined,
            packageEntity: undefined,
        },
    ];
};

export const createMockRecurringMaterialBillingItem = (): UpdateOrderBillItem[] =>
    recurringMaterialBillItems;
