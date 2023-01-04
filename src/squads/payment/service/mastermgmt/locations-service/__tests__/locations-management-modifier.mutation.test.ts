import { ArchitectureCategory, OrderManagementCategory } from "src/squads/payment/constants/master";
import { NsPaymentLocationsService } from "src/squads/payment/service/mastermgmt/locations-service/type";
import { createMockCSVFiles } from "src/squads/payment/test-utils/mocks/master";

import { LocationManagementGRPCServicePromiseClient } from "manabuf/mastermgmt/v1/masterdata_grpc_web_pb";

import locationsModifierMutationService from "src/squads/payment/service/mastermgmt/locations-service/locations-management-modifier.mutation";

jest.mock("manabuf/mastermgmt/v1/masterdata_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/masterdata_grpc_web_pb");

    actual.LocationManagementGRPCServicePromiseClient.prototype.importLocation = jest.fn();

    return actual;
});

const fakeReturn = {
    toObject: jest.fn(),
};

const mockCSVFiles = createMockCSVFiles()[0];

describe("import location", () => {
    it("should successfully import location with valid payload", async () => {
        (
            LocationManagementGRPCServicePromiseClient.prototype.importLocation as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });

        const importLocationPayloadData: NsPaymentLocationsService.ImportMasterDataRequest = {
            payload: {
                file: mockCSVFiles,
                category: ArchitectureCategory.Location,
            },
        };
        await locationsModifierMutationService.importFile(importLocationPayloadData);

        expect(LocationManagementGRPCServicePromiseClient.prototype.importLocation).toBeCalled();
    });

    it("should throw error when calling importFile with inValid payload", async () => {
        (
            LocationManagementGRPCServicePromiseClient.prototype.importLocation as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });

        const invalidImportLocationPayloadData: NsPaymentLocationsService.ImportMasterDataRequest =
            {
                payload: {
                    file: mockCSVFiles,
                    category: OrderManagementCategory.AccountingCategory,
                },
            };

        await expect(
            locationsModifierMutationService.importFile(invalidImportLocationPayloadData)
        ).rejects.toThrow(Error("ra.manabie-error.invalid_params"));
    });
});
