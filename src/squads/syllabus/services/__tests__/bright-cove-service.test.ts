import { GetBrightCoveVideoInfoRequest } from "manabuf/yasuo/v1/brightcove_pb";

import { brightcoveService } from "../bright-cove-service";
import { brightcoveYasuo } from "../yasuo/brightcove-service-yasuo";

jest.mock(
    "src/squads/syllabus/services/yasuo/brightcove-service-yasuo/brightcove-service-yasuo",
    () => ({
        __esModule: true,
        default: {
            retrieveBrightcoveVideoInfo: jest.fn(),
        },
    })
);

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    featureControllerUnleash: { isFeatureEnabled: jest.fn() },
}));

describe(brightcoveService.query.syllabusBrightcoveGetVideoInfo.name, () => {
    it("should call retrieveBrightcoveVideoInfo and return correct data after success", async () => {
        const response = "response_retrieveBrightcoveVideoInfo";
        const params: GetBrightCoveVideoInfoRequest.AsObject = {
            accountId: "accountId",
            videoId: "videoId_1",
        };
        (brightcoveYasuo.retrieveBrightcoveVideoInfo as jest.Mock).mockResolvedValue(response);

        const result = await brightcoveService.query.syllabusBrightcoveGetVideoInfo(params);

        expect(result).toEqual(response);
        expect(brightcoveYasuo.retrieveBrightcoveVideoInfo).toBeCalledWith(params);
    });
});
