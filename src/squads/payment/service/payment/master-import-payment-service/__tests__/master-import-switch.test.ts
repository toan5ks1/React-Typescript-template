import { ArchitectureCategory } from "src/squads/payment/constants/master";
import masterImportServiceSwitch from "src/squads/payment/service/payment/master-import-payment-service/master-import-switch";
import {
    expectRequestCases,
    expectResponseCases,
} from "src/squads/payment/service/payment/master-import-payment-service/utils";
import { createMockMasterImportPayload } from "src/squads/payment/test-utils/mocks/master";

import { ImportLocationRequest } from "manabuf/bob/v1/masterdata_pb";

import { setRequestData } from "src/squads/payment/service/payment/master-import-payment-service/master-import-payment-modifier.mutation";

const mockImportPayload = createMockMasterImportPayload();

jest.mock("manabuf/payment/v1/import_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/payment/v1/import_grpc_web_pb");

    actual.ImportMasterDataServicePromiseClient.prototype.importAccountingCategory = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importDiscount = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importBillingSchedule = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importBillingSchedulePeriod = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importTax = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importProduct = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importProductAssociatedData = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importProductPrice = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importBillingRatio = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importBillingRatioType = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importLeavingReason = jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importPackageQuantityTypeMapping =
        jest.fn();
    actual.ImportMasterDataServicePromiseClient.prototype.importAssociatedProducts = jest.fn();

    return actual;
});

describe("getMasterRequestInstance", () => {
    test.each(expectRequestCases)(
        "should return correct request",
        ({ category, expectedValue }) => {
            const requestInstance = masterImportServiceSwitch.getMasterRequestInstance(category);

            expect(requestInstance).toEqual(expectedValue);
        }
    );
});

describe("getImportMasterResponse", () => {
    test.each(expectResponseCases)(
        "should return correct response",
        async ({ category, request, expectFn }) => {
            const mockRequestWithData = await setRequestData(request, {
                category,
                file: mockImportPayload.file,
            });

            const response = await masterImportServiceSwitch.getImportMasterResponse(
                mockRequestWithData
            );

            expectFn(response);
        }
    );

    it("should return null response with null request", async () => {
        const response = await masterImportServiceSwitch.getImportMasterResponse(null);

        expect(response).toBeNull();
    });

    it("should return null response with Location category", async () => {
        const mockRequestWithData = await setRequestData(new ImportLocationRequest(), {
            category: ArchitectureCategory.Location,
            file: mockImportPayload.file,
        });

        const response = await masterImportServiceSwitch.getImportMasterResponse(
            mockRequestWithData
        );

        expect(response).toBeNull();
    });
});
