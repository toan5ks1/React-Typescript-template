import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { MasterCategoryType, OrderManagementCategory } from "src/squads/payment/constants/master";
import { NsPaymentMasterImportService } from "src/squads/payment/service/payment/master-import-payment-service/types";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";

import { ImportMasterDataServicePromiseClient } from "manabuf/payment/v1/import_grpc_web_pb";
import {
    ImportAccountingCategoryRequest,
    ImportBillingRatioRequest,
    ImportBillingSchedulePeriodRequest,
    ImportBillingScheduleRequest,
    ImportDiscountRequest,
    ImportLeavingReasonRequest,
    ImportProductAssociatedDataRequest,
    ImportProductPriceRequest,
    ImportProductRequest,
    ImportTaxRequest,
    ImportPackageQuantityTypeMappingRequest,
    ImportAssociatedProductsRequest,
} from "manabuf/payment/v1/import_pb";

class MasterImportServiceSwitch extends InheritedGrpcServiceClient<ImportMasterDataServicePromiseClient> {
    public getMasterRequestInstance = (category: MasterCategoryType) => {
        switch (category) {
            case OrderManagementCategory.AccountingCategory:
                return new ImportAccountingCategoryRequest();
            case OrderManagementCategory.Discount:
                return new ImportDiscountRequest();
            case OrderManagementCategory.BillingSchedule:
                return new ImportBillingScheduleRequest();
            case OrderManagementCategory.BillingSchedulePeriod:
                return new ImportBillingSchedulePeriodRequest();
            case OrderManagementCategory.Tax:
                return new ImportTaxRequest();

            case OrderManagementCategory.Package:
            case OrderManagementCategory.Fee:
            case OrderManagementCategory.Material:
                return new ImportProductRequest();

            case OrderManagementCategory.ProductGrade:
            case OrderManagementCategory.ProductCourse:
            case OrderManagementCategory.ProductAccountingCategory:
            case OrderManagementCategory.ProductLocation:
                return new ImportProductAssociatedDataRequest();

            case OrderManagementCategory.PackageCourseMaterial:
            case OrderManagementCategory.PackageCourseFee:
                return new ImportAssociatedProductsRequest();

            case OrderManagementCategory.ProductPrice:
                return new ImportProductPriceRequest();
            case OrderManagementCategory.BillingRatio:
                return new ImportBillingRatioRequest();
            case OrderManagementCategory.LeavingReason:
                return new ImportLeavingReasonRequest();
            case OrderManagementCategory.PackageQuantityTypeMapping:
                return new ImportPackageQuantityTypeMappingRequest();

            default:
                return null;
        }
    };

    public getImportMasterResponse(
        request: NsPaymentMasterImportService.ImportMasterRequestInstance
    ) {
        if (!request) return null;

        switch (request.constructor) {
            case ImportAccountingCategoryRequest:
                return this._call(
                    "importAccountingCategory",
                    request as ImportAccountingCategoryRequest
                );
            case ImportDiscountRequest:
                return this._call("importDiscount", request as ImportDiscountRequest);
            case ImportBillingScheduleRequest:
                return this._call("importBillingSchedule", request as ImportBillingScheduleRequest);
            case ImportBillingSchedulePeriodRequest:
                return this._call(
                    "importBillingSchedulePeriod",
                    request as ImportBillingSchedulePeriodRequest
                );
            case ImportTaxRequest:
                return this._call("importTax", request as ImportTaxRequest);
            case ImportProductRequest:
                return this._call("importProduct", request as ImportProductRequest);
            case ImportProductAssociatedDataRequest:
                return this._call(
                    "importProductAssociatedData",
                    request! as ImportProductAssociatedDataRequest
                );
            case ImportAssociatedProductsRequest:
                return this._call(
                    "importAssociatedProducts",
                    request! as ImportAssociatedProductsRequest
                );
            case ImportProductPriceRequest:
                return this._call("importProductPrice", request as ImportProductPriceRequest);
            case ImportBillingRatioRequest:
                return this._call("importBillingRatio", request as ImportBillingRatioRequest);
            case ImportLeavingReasonRequest:
                return this._call("importLeavingReason", request as ImportLeavingReasonRequest);
            case ImportPackageQuantityTypeMappingRequest:
                return this._call(
                    "importPackageQuantityTypeMapping",
                    request as ImportPackageQuantityTypeMappingRequest
                );
            default:
                return null;
        }
    }
}

const masterImportServiceSwitch = new MasterImportServiceSwitch(
    ImportMasterDataServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default masterImportServiceSwitch;
