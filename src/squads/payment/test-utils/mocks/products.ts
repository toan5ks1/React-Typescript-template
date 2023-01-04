import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
    KeyProductTypes,
} from "src/squads/payment/constants/const";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetProductIdsByGradeIdsQuery,
    Payment_GetProductIdsByLocationIdsQuery,
    Payment_GetProductPriceByProductIdQuery,
    Payment_GetManyProductsReferenceQuery,
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetPackagesByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    ProductFeeType,
    OrderDetailProductListFeeType,
} from "src/squads/payment/types/service/product-fee-types";
import {
    OrderDetailProductListMaterialType,
    ProductMaterialType,
} from "src/squads/payment/types/service/product-material-types";
import { ProductPackageType } from "src/squads/payment/types/service/product-package-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import {
    UpcomingBillingItemType,
    UpcomingBillingPackageProduct,
} from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

const productList: Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] = [
    {
        product_id: "product_id_1",
        name: "Product package",
        product_type: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
        tax_id: "tax_id_1",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 1",
        billing_schedule_id: "billing_schedule_id_1",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
    {
        product_id: "product_id_2",
        name: "Product material",
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
        name: "Product fee",
        product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
        tax_id: "tax_id_3",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 3",
        billing_schedule_id: "billing_schedule_id_3",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];

const productNameList: Payment_GetManyProductsByProductIdsQuery["product"] = [
    {
        product_id: "product_id_1",
        name: "Product material",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_1",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 1",
        billing_schedule_id: "billing_schedule_id_1",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
    {
        product_id: "product_id_2",
        name: "Product material",
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
        name: "Product fee",
        product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
        tax_id: "tax_id_3",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 3",
        billing_schedule_id: "billing_schedule_id_3",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];

const productPackageList: ProductPackageType[] = [
    {
        max_slot: 34,
        package_type: KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME,
        package_start_date: "2021-12-28T02:35:17.73456+00:00",
        package_end_date: "2022-12-28T02:35:17.73456+00:00",
    },
    {
        max_slot: 34,
        package_type: KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED,
        package_start_date: "2021-12-28T02:35:17.73456+00:00",
        package_end_date: "2022-12-28T02:35:17.73456+00:00",
    },
];

const productMaterialList: ProductMaterialType[] = [
    {
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
        custom_billing_date: "2021-12-28T02:35:17.916498+00:00",
    },
    {
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
        custom_billing_date: "2025-12-28T02:35:17.916498+00:00",
    },
];

const productMaterialListWithId: OrderDetailProductListMaterialType[] = [
    {
        material_id: "material_id_1",
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
    },
    {
        material_id: "material_id_2",
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
    },
];

const productFeeList: ProductFeeType[] = [
    {
        fee_type: KeyProductFeeTypes.FEE_TYPE_ONE_TIME,
    },
];

const productFeeListWithId: OrderDetailProductListFeeType[] = [
    {
        fee_id: "fee_id_1",
        fee_type: KeyProductFeeTypes.FEE_TYPE_NONE,
    },
    {
        fee_id: "fee_id_2",
        fee_type: KeyProductFeeTypes.FEE_TYPE_ONE_TIME,
    },
];

const productPriceList: Payment_GetProductPriceByProductIdQuery["product_price"] = [
    {
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2021-12-28T02:35:18.03406+00:00",
        product_price_id: 2,
        price: 1000,
        product_id: "product_id_1",
        quantity: 10,
    },
];

const mockProductPackages: Payment_GetPackagesByProductIdsQuery["package"] = [
    {
        package_id: "package_id_1",
        max_slot: 34,
        package_type: KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME,
        package_start_date: "2021-12-28T02:35:17.73456+00:00",
        package_end_date: "2022-12-28T02:35:17.73456+00:00",
    },
    {
        package_id: "package_id_2",
        max_slot: 34,
        package_type: KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED,
        package_start_date: "2021-12-28T02:35:17.73456+00:00",
        package_end_date: "2022-12-28T02:35:17.73456+00:00",
    },
];

const productPriceManyList: Payment_GetManyProductPricesByProductIdsQuery["product_price"] =
    productPriceList;

const productsManyList: Payment_GetManyProductsReferenceQuery["product"] = [
    {
        product_id: "product_id_1",
        available_from: "2022-02-06T11:08:19.61944+00:00",
        available_until: "2023-02-06T11:08:19.61944+00:00",
        billing_schedule_id: null,
        created_at: "2022-02-06T11:08:19.62049+00:00",
        custom_billing_period: null,
        disable_pro_rating_flag: false,
        name: "Product 1",
        product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
        remarks: null,
        tax_id: null,
        updated_at: "2022-02-06T11:08:19.62049+00:00",
    },
    {
        product_id: "product_id_2",
        available_from: "2022-02-06T11:08:19.705676+00:00",
        available_until: "2023-02-06T11:08:19.705677+00:00",
        billing_schedule_id: null,
        created_at: "2022-02-06T11:08:19.720758+00:00",
        custom_billing_period: null,
        disable_pro_rating_flag: false,
        name: "Product 2",
        product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
        remarks: null,
        tax_id: null,
        updated_at: "2022-02-06T11:08:19.720758+00:00",
    },
];

const locationBasedProductIds: Payment_GetProductIdsByLocationIdsQuery["product_location"] = [
    {
        product_id: "product_id_1",
    },
    {
        product_id: "product_id_2",
    },
    {
        product_id: "product_id_3",
    },
];

const gradeBasedProductIds: Payment_GetProductIdsByGradeIdsQuery["product_grade"] = [
    {
        product_id: "product_id_2",
    },
    {
        product_id: "product_id_3",
    },
    {
        product_id: "product_id_4",
    },
];

const billedAtOrderProductsList: BilledAtOrderItemType[] = [
    {
        productName: "Product Test 1",
        productPrice: 100,
        discountName: "Product Discount 20",
        discountPrice: 20,
        currency: OrderCurrency.JAPANESE_YEN,
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
        },
    },
    {
        productName: "Product Test 2",
        productPrice: 100,
        discountName: "Product Discount 20",
        discountPrice: 20,
        currency: OrderCurrency.JAPANESE_YEN,
        productAndProductExtension: {
            productEntityType: "packageEntity",
            productExtensionType: KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME,
        },
    },
    {
        productName: "Product Test 3",
        productPrice: 100,
        discountName: "Product Discount 20",
        discountPrice: 20,
        currency: OrderCurrency.JAPANESE_YEN,
        productAndProductExtension: {
            productEntityType: "packageEntity",
            productExtensionType: KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY,
        },
        billingSchedulePeriodName: "Period 1",
        billingRatioDenominator: 4,
        billingRatioNumerator: 1,
    },
];

const upcomingBillingProductsList: UpcomingBillingItemType[] = [
    {
        productName: "Product Test 1",
        productPrice: 100,
        discountName: "Product Discount 10",
        discountPrice: 10,
        currency: OrderCurrency.JAPANESE_YEN,
        billingDate: "2023-10-10T00:00:00-04:00",
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
        },
    },
    {
        productName: "Product Test 2",
        productPrice: 100,
        discountName: "Product Discount 100",
        discountPrice: 10,
        currency: OrderCurrency.JAPANESE_YEN,
        billingDate: "2023-10-10T00:00:00-04:00",
        productAndProductExtension: {
            productEntityType: "material",
            productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
        },
    },
    {
        productName: "Product Test 3",
        productPrice: 100,
        discountName: "Product Discount 100",
        discountPrice: 10,
        currency: OrderCurrency.JAPANESE_YEN,
        billingDate: "2023-10-10T00:00:00-04:00",
        productAndProductExtension: {
            productEntityType: "packageEntity",
            productExtensionType: KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY,
        },
        billingSchedulePeriodName: "Period 1",
        billingRatioDenominator: 4,
        billingRatioNumerator: 1,
    },
];

export const createMockProductList =
    (): Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] => productList;

export const createMockProductsDetailList =
    (): Payment_GetManyProductsByProductIdsQuery["product"] => productNameList;

export const createMockProductChoices = (): ProductTypeQuery[] => productList;

export const createMockProductPackageList = (): ProductPackageType[] => productPackageList;

export const createMockProductMaterialList = (): ProductMaterialType[] => productMaterialList;

export const createMockProductMaterialListWithProductId =
    (): OrderDetailProductListMaterialType[] => productMaterialListWithId;

export const createMockProductFeeList = (): ProductFeeType[] => productFeeList;

export const createMockProductFeeListWithProductId = (): OrderDetailProductListFeeType[] =>
    productFeeListWithId;

export const createMockProductPackages = (): Payment_GetPackagesByProductIdsQuery["package"] =>
    mockProductPackages;

export const createMockProductPriceList =
    (): Payment_GetProductPriceByProductIdQuery["product_price"] => productPriceList;

export const createMockProductPriceManyList =
    (): Payment_GetManyProductPricesByProductIdsQuery["product_price"] => productPriceManyList;

export const createMockProductsManyChoices = (): Payment_GetManyProductsReferenceQuery["product"] =>
    productsManyList;

export const createMockLocationBasedProductIds =
    (): Payment_GetProductIdsByLocationIdsQuery["product_location"] => locationBasedProductIds;

export const createMockGradeBasedProductIds =
    (): Payment_GetProductIdsByGradeIdsQuery["product_grade"] => gradeBasedProductIds;

export const createMockBilledAtOrderProductsList = (): BilledAtOrderItemType[] =>
    billedAtOrderProductsList;

export const createMockUpcomingBillingProductsList = (): UpcomingBillingItemType[] =>
    upcomingBillingProductsList;

export const createMockUpcomingBillingFrequencyPackageProductsList =
    (): UpcomingBillingPackageProduct[] => upcomingBillingProductsList;
