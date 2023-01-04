import { formInvalidErr } from "src/internals/errors";
import { OrderManagementCategory } from "src/squads/payment/constants/master";
import { createMockMasterImportPayload } from "src/squads/payment/test-utils/mocks/master";

import {
    ImportProductAssociatedDataRequest,
    ImportProductRequest,
} from "manabuf/payment/v1/import_pb";

import {
    getImportMasterRequestWithData,
    setRequestData,
    validateImportMasterDataRequest,
} from "src/squads/payment/service/payment/master-import-payment-service/master-import-payment-modifier.mutation";

const mockMasterImportPayload = createMockMasterImportPayload();

jest.mock("src/common/utils/file", () => ({
    fileToPayload: () => "mockDataFilePayload",
}));

describe("validateImportMasterDataRequest", () => {
    it("should NOT THROW when correct request", () => {
        expect(() => {
            validateImportMasterDataRequest({ payload: mockMasterImportPayload });
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateImportMasterDataRequest();
        }).toThrowError(formInvalidErr);
    });
});

describe("getImportMasterRequestWithData", () => {
    it("should return correctly request", async () => {
        const request = await getImportMasterRequestWithData({
            ...mockMasterImportPayload,
        });

        expect(request?.toObject().payload).toEqual("mockDataFilePayload");
    });
});

describe("setRequestData", () => {
    it("should not return undefined when set data type with ImportProductRequest", async () => {
        const productRequest = new ImportProductRequest();

        const expectedRequest = await setRequestData(productRequest, {
            category: OrderManagementCategory.Package,
            file: mockMasterImportPayload.file,
        });

        expect(expectedRequest).not.toEqual(undefined);
    });

    it("should not return undefined when set data type with ImportProductAssociatedDataRequest", async () => {
        const productAssociatedRequest = new ImportProductAssociatedDataRequest();

        const expectedRequest = await setRequestData(productAssociatedRequest, {
            category: OrderManagementCategory.ProductAccountingCategory,
            file: mockMasterImportPayload.file,
        });

        expect(expectedRequest).not.toEqual(undefined);
    });

    it("should return null when request is null", async () => {
        const expectedRequest = await setRequestData(null, {
            category: OrderManagementCategory.Package,
            file: mockMasterImportPayload.file,
        });

        expect(expectedRequest).toEqual(null);
    });
});
