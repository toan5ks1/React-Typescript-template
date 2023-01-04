import { KeyProductMaterialTypes, KeyProductTypes } from "src/squads/payment/constants/const";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetTaxByTaxIdV2Query,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    OrderFormValues,
    ProductFormPackageCourseType,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { ProductMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingRecurringProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

const mockRecurringProductTax: ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]> =
    createMockTaxDataList()[0];

const productList: Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] = [
    {
        product_id: "product_id_1",
        name: "Product material 1",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_2",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 2",
        billing_schedule_id: "billing_schedule_id_2",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
    {
        product_id: "product_id_2",
        name: "Product material 2",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_2",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 2",
        billing_schedule_id: "billing_schedule_id_2",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
    {
        product_id: "product_id_3",
        available_from: "2022-01-17T23:00:00+00:00",
        available_until: "2022-10-17T23:00:00+00:00",
        billing_schedule_id: "billing_schedule_id_1",
        created_at: "2022-06-28T09:33:19.977655+00:00",
        custom_billing_period: "2022-07-17T23:00:00+00:00",
        disable_pro_rating_flag: false,
        name: "Frequency Package",
        product_type: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
        remarks: null,
        tax_id: null,
        updated_at: "2022-06-28T09:33:19.977655+00:00",
    },
];
const productListFrequencyBasedPackage: Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] =
    [
        {
            product_id: "product_id_1",
            available_from: "2022-01-17T23:00:00+00:00",
            available_until: "2022-10-17T23:00:00+00:00",
            billing_schedule_id: "billing_schedule_id_1",
            created_at: "2022-06-28T09:33:19.977655+00:00",
            custom_billing_period: "2022-07-17T23:00:00+00:00",
            disable_pro_rating_flag: false,
            name: "Frequency Package 1",
            product_type: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
            remarks: null,
            tax_id: null,
            updated_at: "2022-06-28T09:33:19.977655+00:00",
        },
        {
            product_id: "product_id_2",
            available_from: "2022-01-17T23:00:00+00:00",
            available_until: "2022-10-17T23:00:00+00:00",
            billing_schedule_id: "billing_schedule_id_2",
            created_at: "2022-06-28T09:33:19.977655+00:00",
            custom_billing_period: "2022-07-17T23:00:00+00:00",
            disable_pro_rating_flag: false,
            name: "Frequency Package 2",
            product_type: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
            remarks: null,
            tax_id: null,
            updated_at: "2022-06-28T09:33:19.977655+00:00",
        },
    ];

const productMaterialList: ProductMaterialType[] = [
    {
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
        custom_billing_date: "2021-12-28T02:35:17.916498+00:00",
    },
];

const mockRecurringMaterialProductChoices: ProductTypeQuery[] = productList;

const mockFrequencyBasedPackageProductChoices: ProductTypeQuery[] = productList;

const mockBillingSchedulePeriods: BillingSchedulePeriod[] = [
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        name: "Billing Schedule Period 1",
        billing_date: "2022-05-01T02:35:17.916498+00:00",
        start_date: "2022-05-05T02:35:17.916498+00:00",
        end_date: "2022-06-05T02:35:17.916498+00:00",
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        name: "Billing Schedule Period 2",
        billing_date: "2022-06-01T02:35:17.916498+00:00",
        start_date: "2022-06-06T02:35:17.916498+00:00",
        end_date: "2022-07-06T02:35:17.916498+00:00",
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_3",
        name: "Billing Schedule Period 3",
        billing_date: "2022-07-01T02:35:17.916498+00:00",
        start_date: "2022-07-07T02:35:17.916498+00:00",
        end_date: "2022-08-07T02:35:17.916498+00:00",
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_4",
        name: "Billing Schedule Period 4",
        billing_date: "2022-08-01T02:35:17.916498+00:00",
        start_date: "2022-08-08T02:35:17.916498+00:00",
        end_date: "2022-09-08T02:35:17.916498+00:00",
        billing_ratios: [],
    },
];

const mockBillingFrequencyBasedPackageSchedulePeriods: BillingSchedulePeriod[] = [
    {
        billing_schedule_period_id: "billing_schedule_period_id_1",
        billing_schedule_id: "billing_schedule_id_1",
        name: "PERIOD-1",
        billing_date: "2022-07-05T19:00:00+00:00",
        start_date: "2022-07-01T17:00:00+00:00",
        end_date: "2022-07-31T16:59:59+00:00",
        billing_ratios: [
            {
                billing_ratio_id: "billing_ratio_id_1",
                start_date: "2022-07-01T17:00:00+00:00",
                end_date: "2022-07-15T16:59:59+00:00",
                billing_schedule_period_id: "billing_schedule_period_id_1",
                billing_ratio_numerator: 4,
                billing_ratio_denominator: 4,
            },
            {
                billing_ratio_id: "billing_ratio_id_2",
                start_date: "2022-07-15T17:00:00+00:00",
                end_date: "2022-07-31T16:59:59+00:00",
                billing_schedule_period_id: "billing_schedule_period_id_1",
                billing_ratio_numerator: 2,
                billing_ratio_denominator: 4,
            },
        ],
    },
    {
        billing_schedule_period_id: "billing_schedule_period_id_2",
        billing_schedule_id: "billing_schedule_id_1",
        name: "PERIOD-2",
        billing_date: "2022-08-05T19:00:00+00:00",
        start_date: "2022-08-01T17:00:00+00:00",
        end_date: "2022-08-31T16:59:59+00:00",
        billing_ratios: [
            {
                billing_ratio_id: "billing_ratio_id_1",
                start_date: "2022-08-01T17:00:00+00:00",
                end_date: "2022-08-15T16:59:59+00:00",
                billing_schedule_period_id: "billing_schedule_period_id_2",
                billing_ratio_numerator: 4,
                billing_ratio_denominator: 4,
            },
            {
                billing_ratio_id: "billing_ratio_id_2",
                start_date: "2022-08-15T17:00:00+00:00",
                end_date: "2022-08-31T16:59:59+00:00",
                billing_schedule_period_id: "billing_schedule_period_id_2",
                billing_ratio_numerator: 2,
                billing_ratio_denominator: 4,
            },
        ],
    },
];

const mockMaterialProductBilledAtOrderItems: BilledAtOrderRecurringProduct[] = [
    {
        productName: "Recurring Material Product",
        productPrice: 1000,
        discountName: undefined,
        discountPrice: 0,
        currency: OrderCurrency.JAPANESE_YEN,
        productTax: undefined,
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
        },
        billingRatioNumerator: undefined,
        billingRatioDenominator: undefined,
        billingSchedulePeriodName: "Billing Period",
    },
    {
        productName: "Recurring Material Product with discount",
        productPrice: 1000,
        discountName: "Discount 300",
        discountPrice: 300,
        currency: OrderCurrency.JAPANESE_YEN,
        productTax: undefined,
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
        },
        billingRatioNumerator: undefined,
        billingRatioDenominator: undefined,
        billingSchedulePeriodName: "Billing Period",
    },
    {
        productName: "Recurring Material Product with tax",
        productPrice: 1000,
        discountName: undefined,
        discountPrice: 0,
        currency: OrderCurrency.JAPANESE_YEN,
        productTax: mockRecurringProductTax,
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
        },
        billingRatioNumerator: undefined,
        billingRatioDenominator: undefined,
        billingSchedulePeriodName: "Billing Period",
    },
    {
        productName: "Recurring Material Product with billing ratio",
        productPrice: 1000,
        discountName: undefined,
        discountPrice: 0,
        currency: OrderCurrency.JAPANESE_YEN,
        productTax: undefined,
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
        },
        billingRatioNumerator: 1,
        billingRatioDenominator: 3,
        billingSchedulePeriodName: "Billing Period",
    },
];

const mockRecurringProductPrices: ProductPriceType[] = [
    {
        product_price_id: 1,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
    },
    {
        product_price_id: 2,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
    },
    {
        product_price_id: 3,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_3",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
    },
    {
        product_price_id: 4,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_4",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
    },
];

const mockRecurringSlotProductPrices: ProductPriceType[] = [
    {
        product_price_id: 1,
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2022-06-28T08:29:13.651784+00:00",
        price: 1000,
        product_id: "product_id_1",
        quantity: 1,
    },
    {
        product_price_id: 2,
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2022-06-28T08:29:13.651784+00:00",
        price: 2000,
        product_id: "product_id_1",
        quantity: 2,
    },
    {
        product_price_id: 3,
        billing_schedule_period_id: "billing_schedule_period_id_2",
        created_at: "2022-06-28T08:29:13.651784+00:00",
        price: 1000,
        product_id: "product_id_1",
        quantity: 1,
    },
    {
        product_price_id: 4,
        billing_schedule_period_id: "billing_schedule_period_id_2",
        created_at: "2022-06-28T08:29:13.651784+00:00",
        price: 2000,
        product_id: "product_id_1",
        quantity: 2,
    },
];

const mockPackageCourseList: ProductFormPackageCourseType[] = [
    {
        course: {
            course_id: "1",
            grade: 1,
            name: "Course 1",
        },
        packageCourse: {
            course_id: "1",
            course_weight: 1,
            created_at: "2022-06-28T17:02:20.53655+00:00",
            mandatory_flag: false,
            max_slots_per_course: 2,
            package_id: "package_id_1",
        },
        slot: 1,
    },
    {
        course: {
            course_id: "2",
            grade: 1,
            name: "Course 2",
        },
        packageCourse: {
            course_id: "2",
            course_weight: 1,
            created_at: "2022-06-28T17:02:20.53655+00:00",
            mandatory_flag: false,
            max_slots_per_course: 2,
            package_id: "package_id_1",
        },
        slot: 1,
    },
];

const mockProductFieldArrayItems: ProductsFormValues[] = [
    {
        product: mockRecurringMaterialProductChoices[0],
        productPrices: mockRecurringProductPrices,
        productTax: mockRecurringProductTax,
        discount: createMockDiscountChoices()[0],
        material: productMaterialList[0],
        recurringDetails: {
            billingSchedulePeriods: mockBillingSchedulePeriods,
        },
    },
    {
        product: mockFrequencyBasedPackageProductChoices[2],
        packageCourses: mockPackageCourseList,
        associatedProducts: [],
        recurringDetails: {
            startDate: "2022-07-20T06:43:45.000Z",
            billingSchedulePeriods: mockBillingFrequencyBasedPackageSchedulePeriods,
        },
        productPrices: mockRecurringSlotProductPrices,
    },
];

const mockMaterialProductUpcomingBillingItems: UpcomingBillingRecurringProduct[] =
    mockMaterialProductBilledAtOrderItems.map((item) => ({
        ...item,
        billingDate: "2022-07-01T02:35:17.916498+00:00",
    }));

export const createMockRecurringMaterialList =
    (): Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] => productList;

export const createMockUpsertOrderFormValuesForRecurringProducts = (): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                comment: "test comment",
                productFieldArrayItems: mockProductFieldArrayItems,
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

export const createMockProductFieldArrayItems = (): ProductsFormValues[] =>
    mockProductFieldArrayItems;

export const createMockRecurringMaterialProductBilledAtOrderItems =
    (): BilledAtOrderRecurringProduct[] => mockMaterialProductBilledAtOrderItems;

export const createMockRecurringMaterialTax = (): ArrayElement<
    Payment_GetTaxByTaxIdV2Query["tax"]
> => mockRecurringProductTax;

export const createMockRecurringMaterialProductUpcomingBillingItems =
    (): UpcomingBillingRecurringProduct[] => mockMaterialProductUpcomingBillingItems;

export const createMockRecurringMaterialProductPrices = (): ProductPriceType[] =>
    mockRecurringProductPrices;

export const createBasedPackageCourseList = (): ProductFormPackageCourseType[] =>
    mockPackageCourseList;

export const createMockBillingSchedulePeriods = (): BillingSchedulePeriod[] =>
    mockBillingSchedulePeriods;

export const createMockFrequencyBasedPackageList =
    (): Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] =>
        productListFrequencyBasedPackage;
