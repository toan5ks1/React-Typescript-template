import { brightcoveService } from "src/squads/communication/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-service";

import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import brightcoveServiceYasuo from "src/squads/communication/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-reader.mutation";

jest.mock(
    "src/squads/communication/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-reader.mutation",
    () => ({
        __esModule: true,
        default: {
            retrieveBrightcoveProfileData: jest.fn(),
        },
    })
);

describe("brightcove-service", () => {
    it("should return Brightcove profile", async () => {
        const mockProfileResponse = new RetrieveBrightCoveProfileDataResponse();
        mockProfileResponse.setAccountId("accountId");
        mockProfileResponse.setPolicyKey("policyKey");
        (brightcoveServiceYasuo.retrieveBrightcoveProfileData as jest.Mock).mockResolvedValue(
            mockProfileResponse.toObject()
        );
        const profile = await brightcoveService.query.communicationGetProfile();
        expect(profile).toEqual(mockProfileResponse.toObject());
    });
});
