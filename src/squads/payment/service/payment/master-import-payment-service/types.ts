import { MasterCategoryType, OrderManagementCategory } from "src/squads/payment/constants/master";

import {
    AssociatedProductsType,
    ProductAssociatedDataType,
    ProductType,
} from "manabuf/payment/v1/enums_pb";
import {
    ImportAccountingCategoryResponse,
    ImportBillingScheduleResponse,
    ImportBillingSchedulePeriodResponse,
    ImportDiscountResponse,
    ImportProductResponse,
    ImportProductAssociatedDataResponse,
    ImportTaxResponse,
    ImportAccountingCategoryRequest,
    ImportBillingScheduleRequest,
    ImportBillingSchedulePeriodRequest,
    ImportDiscountRequest,
    ImportTaxRequest,
    ImportProductRequest,
    ImportProductAssociatedDataRequest,
    ImportProductPriceRequest,
    ImportBillingRatioRequest,
    ImportProductPriceResponse,
    ImportBillingRatioResponse,
    ImportBillingRatioTypeResponse,
    ImportLeavingReasonRequest,
    ImportLeavingReasonResponse,
    ImportAssociatedProductsRequest,
    ImportAssociatedProductsResponse,
} from "manabuf/payment/v1/import_pb";

export declare namespace NsPaymentMasterImportService {
    export interface ImportMasterDataPayload {
        category: MasterCategoryType;
        file: File;
    }

    export interface ImportMasterRequest {
        payload: ImportMasterDataPayload;
    }

    export type ImportMasterResponse =
        | ImportAccountingCategoryResponse.AsObject
        | ImportAssociatedProductsResponse.AsObject
        | ImportBillingScheduleResponse.AsObject
        | ImportBillingSchedulePeriodResponse.AsObject
        | ImportDiscountResponse.AsObject
        | ImportTaxResponse.AsObject
        | ImportProductResponse.AsObject
        | ImportProductAssociatedDataResponse.AsObject
        | ImportProductPriceResponse.AsObject
        | ImportBillingRatioResponse.AsObject
        | ImportBillingRatioTypeResponse.AsObject
        | ImportLeavingReasonResponse.AsObject;

    export type ImportMasterRequestInstance =
        | ImportAccountingCategoryRequest
        | ImportAssociatedProductsRequest
        | ImportBillingScheduleRequest
        | ImportBillingSchedulePeriodRequest
        | ImportDiscountRequest
        | ImportTaxRequest
        | ImportProductRequest
        | ImportProductAssociatedDataRequest
        | ImportProductPriceRequest
        | ImportBillingRatioRequest
        | ImportLeavingReasonRequest
        | null;
}

export const productType = {
    [OrderManagementCategory.Package]: ProductType.PRODUCT_TYPE_PACKAGE,
    [OrderManagementCategory.Fee]: ProductType.PRODUCT_TYPE_FEE,
    [OrderManagementCategory.Material]: ProductType.PRODUCT_TYPE_MATERIAL,
};

export const productAssociatedType = {
    [OrderManagementCategory.ProductAccountingCategory]:
        ProductAssociatedDataType.PRODUCT_ASSOCIATED_DATA_TYPE_ACCOUNTING_CATEGORY,
    [OrderManagementCategory.ProductCourse]:
        ProductAssociatedDataType.PRODUCT_ASSOCIATED_DATA_TYPE_COURSE,
    [OrderManagementCategory.ProductGrade]:
        ProductAssociatedDataType.PRODUCT_ASSOCIATED_DATA_TYPE_GRADE,
    [OrderManagementCategory.ProductLocation]:
        ProductAssociatedDataType.PRODUCT_ASSOCIATED_DATA_TYPE_LOCATION,
};

export const associatedProductsType = {
    [OrderManagementCategory.PackageCourseMaterial]:
        AssociatedProductsType.ASSOCIATED_PRODUCTS_MATERIAL,
    [OrderManagementCategory.PackageCourseFee]: AssociatedProductsType.ASSOCIATED_PRODUCTS_FEE,
};
