import {
    KeyBillingStatus,
    KeyDiscountAmountTypes,
    KeyTaxCategoryTypes,
} from "src/squads/payment/constants/const";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyBillItemsV2Query,
} from "src/squads/payment/service/fatima/fatima-types";

import {
    BillingStatus,
    BillingType,
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
    QuantityType,
} from "manabuf/payment/v1/enums_pb";
import {
    RetrieveBillingOfOrderDetailsResponse,
    RetrieveListOfBillItemsResponse,
} from "manabuf/payment/v1/order_pb";

import { DataWithTotal } from "@manabie-com/react-utils";

export const createMockBillItems = (): DataWithTotal<
    Payment_GetManyBillItemsV2Query["bill_item"]
> => {
    return {
        data: [
            {
                bill_item_sequence_number: 1,
                product_description: "One-time Material A",
                billing_status: KeyBillingStatus.BILLING_STATUS_PENDING,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                final_price: 450,
                order_id: "order_id_1",
                product_id: "product_id_1",
            },
            {
                bill_item_sequence_number: 2,
                product_description: "One-time Material B",
                billing_status: KeyBillingStatus.BILLING_STATUS_BILLED,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                final_price: 450,
                order_id: "order_id_1",
                product_id: "product_id_2",
            },
            {
                bill_item_sequence_number: 3,
                product_description: "One-time Material C",
                billing_status: KeyBillingStatus.BILLING_STATUS_CANCELLED,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                final_price: 450,
                order_id: "order_id_1",
                product_id: "product_id_3",
            },
            {
                bill_item_sequence_number: 4,
                product_description: "One-time Material D",
                billing_status: KeyBillingStatus.BILLING_STATUS_WAITING_APPROVAL,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                final_price: 450,
                order_id: "order_id_1",
                product_id: "product_id_4",
            },
            {
                bill_item_sequence_number: 5,
                product_description: "One-time Material E",
                billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                final_price: 450,
                order_id: "order_id_1",
                product_id: "product_id_5",
            },
        ],
        total: 5,
    };
};

export const createMockBillItemListByStudentProductId =
    (): Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"] => {
        return [
            {
                product_id: "product_id_1",
                product_pricing: 1000,
                discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
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
            },
            {
                product_id: "product_id_2",
                product_pricing: 1000,
                discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
                discount_amount_value: 10,
                tax_id: "tax_id_2",
                tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
                tax_percentage: 10,
                order_id: "order_id_2",
                billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
                billing_date: "2021-12-28T02:35:17.738471+00:00",
                billing_schedule_period_id: "billing_schedule_period_id_2",
                bill_item_sequence_number: 2,
                discount_amount: 10,
                tax_amount: 10,
                final_price: 990,
                billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
                billing_item_description: "description",
                student_product_id: "student_product_id_2",
            },
        ];
    };

export const createMockBillItemList = (): Payment_GetManyBillItemsV2Query["bill_item"] => {
    return [
        {
            bill_item_sequence_number: 1,
            product_description: "One-time Material A",
            billing_status: KeyBillingStatus.BILLING_STATUS_PENDING,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            final_price: 450,
            order_id: "order_id_1",
            product_id: "product_id_1",
        },
        {
            bill_item_sequence_number: 2,
            product_description: "One-time Material B",
            billing_status: KeyBillingStatus.BILLING_STATUS_BILLED,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            final_price: 450,
            order_id: "order_id_1",
            product_id: "product_id_2",
        },
        {
            bill_item_sequence_number: 3,
            product_description: "One-time Material C",
            billing_status: KeyBillingStatus.BILLING_STATUS_CANCELLED,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            final_price: 450,
            order_id: "order_id_1",
            product_id: "product_id_3",
        },
        {
            bill_item_sequence_number: 4,
            product_description: "One-time Material D",
            billing_status: KeyBillingStatus.BILLING_STATUS_WAITING_APPROVAL,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            final_price: 450,
            order_id: "order_id_1",
            product_id: "product_id_4",
        },
        {
            bill_item_sequence_number: 5,
            product_description: "One-time Material E",
            billing_status: KeyBillingStatus.BILLING_STATUS_INVOICED,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            final_price: 450,
            order_id: "order_id_1",
            product_id: "product_id_5",
        },
    ];
};

export const createMockRetrieveBillingItem =
    (): RetrieveBillingOfOrderDetailsResponse.OrderDetails.AsObject[] => [
        {
            index: 1,
            orderId: "order_id_1",
            billItemSequenceNumber: 1,
            billingStatus: BillingStatus.BILLING_STATUS_PENDING,
            billingDate: {
                seconds: 1663318082,
                nanos: 810000000,
            },
            amount: 1000,
            billItemDescription: {
                productId: "product_id_1",
                productName: "Material product",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
        {
            index: 2,
            orderId: "order_id_2",
            billItemSequenceNumber: 2,
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingDate: {
                seconds: 1663318082,
                nanos: 810000000,
            },
            amount: 2000,
            billItemDescription: {
                productId: "product_id_3801",
                productName: "Material product 2 no tax",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
        {
            index: 3,
            orderId: "order_id_3",
            billItemSequenceNumber: 3,
            billingStatus: BillingStatus.BILLING_STATUS_PENDING,
            billingDate: {
                seconds: 1663318082,
                nanos: 810000000,
            },
            amount: 2000,
            billItemDescription: {
                productId: "product_id_3801",
                productName: "Schedule based package product",
                productType: ProductType.PRODUCT_TYPE_PACKAGE,
                packageType: PackageType.PACKAGE_TYPE_SCHEDULED,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_COURSE_WEIGHT,
                courseItemsList: [],
                billingPeriodName: { value: "Period 1" },
                billingScheduleName: { value: "Schedule 1" },
                billingRatioNumerator: { value: 3 },
                billingRatioDenominator: { value: 3 },
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
        {
            index: 4,
            orderId: "order_id_4",
            billItemSequenceNumber: 4,
            billingStatus: BillingStatus.BILLING_STATUS_PENDING,
            amount: 1000,
            billItemDescription: {
                productId: "product_id_4",
                productName: "Material Recurring Product",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_RECURRING,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
                billingPeriodName: { value: "Period 1" },
                billingRatioNumerator: { value: 1 },
                billingRatioDenominator: { value: 2 },
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
        {
            index: 5,
            orderId: "order_id_5",
            billItemSequenceNumber: 5,
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            amount: 1000,
            billItemDescription: {
                productId: "product_id_5",
                productName: "One-Time Package Product",
                productType: ProductType.PRODUCT_TYPE_PACKAGE,
                packageType: PackageType.PACKAGE_TYPE_ONE_TIME,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_COURSE_WEIGHT,
                courseItemsList: [
                    {
                        courseId: "Course_1",
                        courseName: "English",
                        slot: undefined,
                    },
                    {
                        courseId: "Course2",
                        courseName: "Math",
                        slot: undefined,
                    },
                ],
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
        {
            index: 6,
            orderId: "order_id_6",
            billItemSequenceNumber: 6,
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            amount: 1000,
            billItemDescription: {
                productId: "product_id_6",
                productName: "One-Time Package Product",
                productType: ProductType.PRODUCT_TYPE_PACKAGE,
                packageType: PackageType.PACKAGE_TYPE_SLOT_BASED,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_SLOT,
                courseItemsList: [
                    {
                        courseId: "Course_1",
                        courseName: "English",
                        slot: 2,
                    },
                    {
                        courseId: "Course2",
                        courseName: "Math",
                        slot: 1,
                    },
                ],
            },
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
        },
    ];

export const createMockRetrieveAdjustmentBillingItem =
    (): RetrieveBillingOfOrderDetailsResponse.OrderDetails.AsObject[] => [
        {
            index: 1,
            orderId: "order_id_1",
            billItemSequenceNumber: 1,
            billingStatus: BillingStatus.BILLING_STATUS_PENDING,
            billingDate: {
                seconds: 1663318082,
                nanos: 810000000,
            },
            amount: 1000,
            billItemDescription: {
                productId: "product_id_1",
                productName: "Material product",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingType: BillingType.BILLING_TYPE_ADJUSTMENT_BILLING,
        },
        {
            index: 2,
            orderId: "order_id_2",
            billItemSequenceNumber: 2,
            billingStatus: BillingStatus.BILLING_STATUS_PENDING,
            billingDate: {
                seconds: 1663318082,
                nanos: 810000000,
            },
            amount: 1000,
            billItemDescription: {
                productId: "product_id_2",
                productName: "Schedule Based Package product",
                productType: ProductType.PRODUCT_TYPE_PACKAGE,
                packageType: PackageType.PACKAGE_TYPE_SCHEDULED,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_COURSE_WEIGHT,
                courseItemsList: [],
                billingPeriodName: { value: "Period 1" },
                billingScheduleName: { value: "Schedule 1" },
                billingRatioNumerator: { value: 3 },
                billingRatioDenominator: { value: 3 },
            },
            billingType: BillingType.BILLING_TYPE_ADJUSTMENT_BILLING,
        },
    ];

export const createMockBillingItems = (): RetrieveListOfBillItemsResponse.BillItems.AsObject[] => {
    return [
        {
            index: 1,
            locationInfo: {
                locationId: "location_id_1",
                locationName: "location 1",
            },
            billingNo: 1,
            orderId: "",
            billItemDescription: {
                productId: "product_id_1",
                productName: "Product 1",
                productType: ProductType.PRODUCT_TYPE_FEE,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_ONE_TIME,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
            billingDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
            amount: 10000,
        },
        {
            index: 2,
            locationInfo: {
                locationId: "location_id_2",
                locationName: "location 2",
            },
            billingNo: 2,
            orderId: "",
            billItemDescription: {
                productId: "product_id_1",
                productName: "Product 1",
                productType: ProductType.PRODUCT_TYPE_FEE,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_ONE_TIME,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
            billingDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
            amount: 10000,
        },
        {
            index: 3,
            locationInfo: {
                locationId: "location_id_3",
                locationName: "location 3",
            },
            billingNo: 3,
            orderId: "",
            billItemDescription: {
                productId: "product_id_1",
                productName: "Product 1",
                productType: ProductType.PRODUCT_TYPE_FEE,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_ONE_TIME,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
            billingDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
            amount: 10000,
        },
        {
            index: 4,
            locationInfo: {
                locationId: "location_id_4",
                locationName: "location 4",
            },
            billingNo: 4,
            orderId: "",
            billItemDescription: {
                productId: "product_id_1",
                productName: "Product 1",
                productType: ProductType.PRODUCT_TYPE_FEE,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_ONE_TIME,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
            billingDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
            amount: 10000,
        },
        {
            index: 5,
            locationInfo: {
                locationId: "location_id_5",
                locationName: "location 5",
            },
            billingNo: 5,
            orderId: "",
            billItemDescription: {
                productId: "product_id_1",
                productName: "Product 1",
                productType: ProductType.PRODUCT_TYPE_FEE,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_NONE,
                feeType: FeeType.FEE_TYPE_ONE_TIME,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                courseItemsList: [],
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
            billingDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
            amount: 10000,
        },
    ];
};

export const createMockAdjustmentBillItems =
    (): RetrieveListOfBillItemsResponse.BillItems.AsObject[] => {
        return [
            {
                index: 1,
                adjustmentPrice: 100,
                locationInfo: {
                    locationId: "location_id_1",
                    locationName: "location 1",
                },
                billingNo: 1,
                orderId: "",
                billItemDescription: {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_FEE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_ONE_TIME,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                    courseItemsList: [],
                },
                billingStatus: BillingStatus.BILLING_STATUS_BILLED,
                billingType: BillingType.BILLING_TYPE_ADJUSTMENT_BILLING,
                billingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                amount: 10000,
            },
        ];
    };

export const createRetrieveListOfBillItems = (): RetrieveListOfBillItemsResponse.AsObject => {
    return {
        itemsList: createMockBillingItems(),
        nextPage: undefined,
        previousPage: undefined,
        totalItems: 5,
    };
};

export const createRetrieveBillingDetail = (): RetrieveBillingOfOrderDetailsResponse.AsObject => {
    return {
        itemsList: createMockRetrieveBillingItem(),
        nextPage: undefined,
        previousPage: undefined,
        totalItems: 5,
    };
};
