import { BrightcoveServicePromiseClient } from "manabuf/yasuo/v1/brightcove_grpc_web_pb";
import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import brightcoveServiceYasuo from "src/squads/user/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-reader.query";

jest.mock("manabuf/yasuo/v1/brightcove_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/yasuo/v1/brightcove_grpc_web_pb");
    actual.BrightcoveServicePromiseClient.prototype.retrieveBrightCoveProfileData = jest.fn();
    actual.BrightcoveServicePromiseClient.prototype.getBrightcoveVideoInfo = jest.fn();
    return actual;
});

describe("brightcoveServiceYasuo", () => {
    it(brightcoveServiceYasuo.retrieveBrightcoveProfileData.name, async () => {
        const mockResult = new RetrieveBrightCoveProfileDataResponse();
        mockResult.setAccountId("accountId");
        mockResult.setPolicyKey("policyKey");

        (
            BrightcoveServicePromiseClient.prototype.retrieveBrightCoveProfileData as jest.Mock
        ).mockReturnValue(mockResult);

        const result = await brightcoveServiceYasuo.retrieveBrightcoveProfileData();

        expect(result).toEqual(mockResult.toObject());
    });
});
