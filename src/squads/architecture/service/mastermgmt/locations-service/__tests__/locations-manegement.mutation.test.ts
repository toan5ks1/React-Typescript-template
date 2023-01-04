import { InvalidParamError, ToStringFormat } from "src/squads/architecture/service/service-types";
import {
    createMockLocationImportPayload,
    createMockLocationImportPayloadInvalid,
} from "src/squads/architecture/test-utils/mocks/master";
import { getInvalidParamErrorObject } from "src/squads/architecture/test-utils/service";

import { newImportLocationRequest } from "../locations-management.mutation";

const mockLocationImportPayload = createMockLocationImportPayload();
const mockLocationImportPayloadInvalid = createMockLocationImportPayloadInvalid();

jest.mock("src/common/utils/file", () => ({
    fileToPayload: () => "ABC",
}));

describe("validateGetImportRequest", () => {
    it("should NOT THROW when correct request", () => {
        expect(async () => {
            await newImportLocationRequest({ payload: mockLocationImportPayload });
        }).not.toThrowError(InvalidParamError);
    });

    it("should THROW when incorrect request payload", async () => {
        let error;
        try {
            await newImportLocationRequest();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual<ToStringFormat>({
            action: "LocationsManagementServiceMaster",
            errorName: "InvalidParamError",
            errors: [{ field: "payload" }],
            serviceName: "mastermgmtGRPC",
        });
    });

    it("should THROW when incorrect category", async () => {
        let error;
        try {
            await newImportLocationRequest({ payload: mockLocationImportPayloadInvalid });
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual<ToStringFormat>({
            action: "LocationsManagementServiceMaster",
            errorName: "InvalidParamError",
            errors: [{ field: "category" }],
            serviceName: "mastermgmtGRPC",
        });
    });
});

describe("getImportMasterDataRequest", () => {
    it("should return correctly request", async () => {
        const request = await newImportLocationRequest({ payload: mockLocationImportPayload });

        expect(request?.toObject().payload).toEqual("ABC");
    });
});
