import {
    KeyDiscountAmountTypes,
    KeyDiscountTypes,
    KeyTaxCategoryTypes,
    KeyBillingStatus,
    KeyProductTypes,
    KeyProductMaterialTypes,
} from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import {
    createMockProductChoices,
    createMockProductMaterialList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { OrderDetailProductListMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

export const createMockUpdateOrderFormValues = (): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                productFieldArrayItems: [
                    {
                        product: createMockProductChoices()[1],
                        material: createMockProductMaterialList()[0],
                        productPrices: createMockProductPriceList(),
                        productTax: createMockTaxDataList()[0],
                        discount: createMockDiscountChoices()[0],
                        updateOrderDetails: {
                            orderStatus: ProductListItemStatus.ACTIVE,
                            effectiveDate: new Date(),
                            billItems: [],
                        },
                    },
                    {
                        product: createMockProductChoices()[1],
                        material: createMockProductMaterialList()[0],
                        productPrices: createMockProductPriceList(),
                        productTax: createMockTaxDataList()[1],
                        discount: createMockDiscountChoices()[0],
                        updateOrderDetails: {
                            orderStatus: ProductListItemStatus.CANCELLED,
                            effectiveDate: new Date(),
                            billItems: [],
                        },
                    },
                ],
                comment: "test comment",
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

const updateProduct: ProductTypeQuery = {
    product_id: "product_id_1",
    name: "Update Order Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    billing_schedule_id: null,
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};

export const mockUpdateProducts = (
    effectiveDate?: Date,
    orderStatus: ProductListItemStatus = ProductListItemStatus.ACTIVE
): ProductsFormValues[] => {
    const defaultEffectiveDate = getDateWithZeroMilliseconds();

    return [
        {
            product: updateProduct,
            material: {
                material_type: "MATERIAL_TYPE_ONE_TIME",
            },
            productTax: {
                tax_category: "TAX_CATEGORY_INCLUSIVE",
                tax_percentage: 10,
            },
            productPrices: [
                {
                    billing_schedule_period_id: null,
                    created_at: "2023-02-11T11:02:07.616219+00:00",
                    price: 100,
                    product_id: "product_id_1",
                    product_price_id: 1,
                    quantity: 1,
                },
            ],
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
                orderStatus,
                effectiveDate: effectiveDate ? effectiveDate : defaultEffectiveDate,
                billItems: [
                    {
                        product_id: "product_id_1",
                        product_pricing: 1000,
                        discount_amount_type:
                            KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
                        discount_amount_value: 10,
                        tax_id: "tax_id_1",
                        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
                        tax_percentage: 10,
                        order_id: "order_id_1",
                        billing_status: KeyBillingStatus.BILLING_STATUS_BILLED,
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
                    },
                ],
                reccuringDetails: {
                    billingSchedulePeriods: [],
                },
            },
            fee: undefined,
            packageEntity: undefined,
        },
    ];
};

export const mockHasUpdateProducts = (
    effectiveDate?: Date,
    orderStatus: ProductListItemStatus = ProductListItemStatus.ACTIVE
): ProductsFormValues[] => {
    const defaultEffectiveDate = getDateWithZeroMilliseconds();
    return [
        {
            product: updateProduct,
            material: {
                material_type: "MATERIAL_TYPE_ONE_TIME",
            },
            productTax: {
                tax_category: "TAX_CATEGORY_INCLUSIVE",
                tax_percentage: 10,
            },
            productPrices: [
                {
                    billing_schedule_period_id: "billing_schedule_period_id_1",
                    created_at: "update_order_created_at",
                    price: 1000,
                    product_id: "product_id_1",
                    product_price_id: -1,
                    quantity: -1,
                },
            ],
            discount: {
                name: "Discount name",
                discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
                discount_amount_value: 20,
                available_from: "2021-12-28T02:35:17.738471+00:00",
                available_until: "2022-12-28T02:35:17.738471+00:00",
                created_at: "2021-12-28T02:35:17.738471+00:00",
                discount_id: "discount_id_1",
                discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
                updated_at: "2021-12-28T02:35:17.738471+00:00",
            },
            updateOrderDetails: {
                orderStatus,
                effectiveDate: effectiveDate ? effectiveDate : defaultEffectiveDate,
                billItems: [
                    {
                        product_id: "product_id_1",
                        product_pricing: 1000,
                        discount_amount_type:
                            KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
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
                    },
                ],
                hasUpdate: true,
            },
            fee: undefined,
            packageEntity: undefined,
        },
    ];
};

export const mockUpdateProductRecurringMaterial = (): OrderDetailProductListMaterialType[] => [
    {
        material_id: "product_id_1",
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
    },
];

export const mockUpdateProduct = (): ProductTypeQuery => updateProduct;
