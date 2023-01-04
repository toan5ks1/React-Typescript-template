import { handleUnknownError } from "src/common/utils/error";
import { ArchitectureCategory } from "src/squads/architecture/common/constants/master";
import { createMockCSVFiles } from "src/squads/architecture/test-utils/mocks/master";

import { LocationManagementGRPCServicePromiseClient } from "manabuf/mastermgmt/v1/masterdata_grpc_web_pb";

import { locationsServiceMaster } from "../locations-service";
import { NsArchitecture_Mastermgmt_LocationsService } from "../types";

jest.mock("manabuf/mastermgmt/v1/masterdata_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/masterdata_grpc_web_pb");
    actual.LocationManagementGRPCServicePromiseClient.prototype.importLocation = jest.fn();
    return actual;
});

const fakeModifierReturn = {
    toObject: jest.fn(),
};

describe("import location", () => {
    beforeEach(() => {
        (
            LocationManagementGRPCServicePromiseClient.prototype.importLocation as jest.Mock
        ).mockImplementation(() => {
            return fakeModifierReturn;
        });
    });

    it("should import location", async () => {
        const file = createMockCSVFiles()[0];

        const request: NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest = {
            payload: {
                file,
                category: ArchitectureCategory.Location,
            },
        };
        await locationsServiceMaster.mutation.importFile(request);

        expect(LocationManagementGRPCServicePromiseClient.prototype.importLocation).toBeCalled();
    });

    it("should import location but submit inValid data", async () => {
        const file = createMockCSVFiles()[0];

        const request = {
            payload: {
                file,
            },
        } as NsArchitecture_Mastermgmt_LocationsService.ImportMasterDataRequest;
        try {
            await locationsServiceMaster.mutation.importFile(request);
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.manabie-error.invalid_params");
        }

        expect(
            LocationManagementGRPCServicePromiseClient.prototype.importLocation
        ).not.toBeCalled();
    });
});
