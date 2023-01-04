import {
    OrderManagementCategory,
    UserSchoolGroupCategory,
} from "src/squads/payment/constants/master";

import {
    ImportAccountingCategoryRequest,
    ImportAccountingCategoryResponse,
    ImportBillingRatioRequest,
    ImportBillingRatioResponse,
    ImportBillingSchedulePeriodRequest,
    ImportBillingSchedulePeriodResponse,
    ImportBillingScheduleRequest,
    ImportBillingScheduleResponse,
    ImportDiscountRequest,
    ImportDiscountResponse,
    ImportLeavingReasonRequest,
    ImportLeavingReasonResponse,
    ImportProductAssociatedDataRequest,
    ImportProductAssociatedDataResponse,
    ImportProductPriceRequest,
    ImportProductPriceResponse,
    ImportProductRequest,
    ImportProductResponse,
    ImportTaxRequest,
    ImportTaxResponse,
    ImportPackageQuantityTypeMappingRequest,
    ImportPackageQuantityTypeMappingResponse,
} from "manabuf/payment/v1/import_pb";

export const expectResponseCases = [
    {
        category: OrderManagementCategory.AccountingCategory,
        request: new ImportAccountingCategoryRequest(),
        expectFn: (response: ImportAccountingCategoryResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.Discount,
        request: new ImportDiscountRequest(),
        expectFn: (response: ImportDiscountResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.BillingSchedule,
        request: new ImportBillingScheduleRequest(),
        expectFn: (response: ImportBillingScheduleResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.BillingSchedulePeriod,
        request: new ImportBillingSchedulePeriodRequest(),
        expectFn: (response: ImportBillingSchedulePeriodResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.Tax,
        request: new ImportTaxRequest(),
        expectFn: (response: ImportTaxResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.Package,
        request: new ImportProductRequest(),
        expectFn: (response: ImportProductResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.Material,
        request: new ImportProductRequest(),
        expectFn: (response: ImportProductResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.Fee,
        request: new ImportProductRequest(),
        expectFn: (response: ImportProductResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.ProductGrade,
        request: new ImportProductAssociatedDataRequest(),
        expectFn: (response: ImportProductAssociatedDataResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.ProductCourse,
        request: new ImportProductAssociatedDataRequest(),
        expectFn: (response: ImportProductAssociatedDataResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.ProductLocation,
        request: new ImportProductAssociatedDataRequest(),
        expectFn: (response: ImportProductAssociatedDataResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.ProductAccountingCategory,
        request: new ImportProductAssociatedDataRequest(),
        expectFn: (response: ImportProductAssociatedDataResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.ProductPrice,
        request: new ImportProductPriceRequest(),
        expectFn: (response: ImportProductPriceResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.BillingRatio,
        request: new ImportBillingRatioRequest(),
        expectFn: (response: ImportBillingRatioResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.LeavingReason,
        request: new ImportLeavingReasonRequest(),
        expectFn: (response: ImportLeavingReasonResponse | null) => expect(response).not.toBeNull(),
    },
    {
        category: OrderManagementCategory.PackageQuantityTypeMapping,
        request: new ImportPackageQuantityTypeMappingRequest(),
        expectFn: (response: ImportPackageQuantityTypeMappingResponse | null) =>
            expect(response).not.toBeNull(),
    },
    {
        // TODO: update this case when implementing the category School
        category: UserSchoolGroupCategory.School,
        request: null,
        expectFn: (response: any) => expect(response).toBeNull(),
    },
];

export const expectRequestCases = [
    {
        category: OrderManagementCategory.AccountingCategory,
        expectedValue: new ImportAccountingCategoryRequest(),
    },
    {
        category: OrderManagementCategory.Discount,
        expectedValue: new ImportDiscountRequest(),
    },
    {
        category: OrderManagementCategory.BillingSchedule,
        expectedValue: new ImportBillingScheduleRequest(),
    },
    {
        category: OrderManagementCategory.BillingSchedulePeriod,
        expectedValue: new ImportBillingSchedulePeriodRequest(),
    },
    {
        category: OrderManagementCategory.Tax,
        expectedValue: new ImportTaxRequest(),
    },
    {
        category: OrderManagementCategory.Package,
        expectedValue: new ImportProductRequest(),
    },
    {
        category: OrderManagementCategory.Fee,
        expectedValue: new ImportProductRequest(),
    },
    {
        category: OrderManagementCategory.Material,
        expectedValue: new ImportProductRequest(),
    },
    {
        category: OrderManagementCategory.ProductGrade,
        expectedValue: new ImportProductAssociatedDataRequest(),
    },
    {
        category: OrderManagementCategory.ProductCourse,
        expectedValue: new ImportProductAssociatedDataRequest(),
    },
    {
        category: OrderManagementCategory.ProductAccountingCategory,
        expectedValue: new ImportProductAssociatedDataRequest(),
    },
    {
        category: OrderManagementCategory.ProductLocation,
        expectedValue: new ImportProductAssociatedDataRequest(),
    },
    {
        category: OrderManagementCategory.ProductPrice,
        expectedValue: new ImportProductPriceRequest(),
    },
    {
        category: OrderManagementCategory.BillingRatio,
        expectedValue: new ImportBillingRatioRequest(),
    },
    {
        category: OrderManagementCategory.LeavingReason,
        expectedValue: new ImportLeavingReasonRequest(),
    },
    {
        category: OrderManagementCategory.PackageQuantityTypeMapping,
        expectedValue: new ImportPackageQuantityTypeMappingRequest(),
    },
    {
        // TODO: update this case when implementing the category School
        category: UserSchoolGroupCategory.School,
        expectedValue: null,
    },
];
