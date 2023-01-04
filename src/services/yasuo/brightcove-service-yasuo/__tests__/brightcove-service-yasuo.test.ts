import { BrightcoveServicePromiseClient } from "manabuf/yasuo/v1/brightcove_grpc_web_pb";
import {
    GetBrightCoveVideoInfoResponse,
    RetrieveBrightCoveProfileDataResponse,
} from "manabuf/yasuo/v1/brightcove_pb";

import brightcoveServiceYasuo from "../brightcove-service-yasuo";

jest.mock("manabuf/yasuo/v1/brightcove_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/yasuo/v1/brightcove_grpc_web_pb");
    actual.BrightcoveServicePromiseClient.prototype.retrieveBrightCoveProfileData = jest.fn();
    actual.BrightcoveServicePromiseClient.prototype.getBrightcoveVideoInfo = jest.fn();
    return actual;
});

describe("brightcoveServiceYasuo", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it(brightcoveServiceYasuo.retrieveBrightcoveProfileData.name, async () => {
        const mockResult = new RetrieveBrightCoveProfileDataResponse();
        mockResult.setAccountId("accountId");
        mockResult.setPolicyKey("policyKey");

        (
            BrightcoveServicePromiseClient.prototype.retrieveBrightCoveProfileData as jest.Mock
        ).mockImplementation(() => {
            return mockResult;
        });

        const result = await brightcoveServiceYasuo.retrieveBrightcoveProfileData();

        expect(result.data).toMatchObject(mockResult.toObject());
    });

    it(brightcoveServiceYasuo.retrieveBrightcoveVideoInfo.name, async () => {
        const mockResult = new GetBrightCoveVideoInfoResponse();
        mockResult.setId("videoId");
        mockResult.setName("name");

        (
            BrightcoveServicePromiseClient.prototype.getBrightcoveVideoInfo as jest.Mock
        ).mockImplementation(() => {
            return mockResult;
        });

        const result = await brightcoveServiceYasuo.retrieveBrightcoveVideoInfo({
            videoId: "videoId",
            accountId: "accountId",
        });

        expect(result.data).toMatchObject(mockResult.toObject());
    });
});
