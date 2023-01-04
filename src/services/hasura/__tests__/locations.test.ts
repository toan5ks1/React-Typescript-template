import { ProviderTypes } from "src/common/constants/enum";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import hasuraLocations from "../locations";

jest.mock("manabuf/bob/v1/masterdata_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/masterdata_grpc_web_pb");

    actual.MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("Location service", () => {
    beforeEach(() => {
        (
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });
    });

    it("retrieve lowest level locations with correctly params", async () => {
        await hasuraLocations({
            type: ProviderTypes.MANY_REFERENCE,
            payload: {
                filter: {
                    name: "location name",
                    limit: 10,
                    offset: 0,
                },
                pagination: {
                    page: 0,
                    perPage: 10,
                },
            },
        });

        expect(
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations
        ).toBeCalledWith(
            expect.objectContaining({
                array: ["location name", 10, null],
            })
        );
    });
});
