import { GetBrightCoveVideoInfoRequest } from "manabuf/yasuo/v1/brightcove_pb";

import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";
import { brightcoveYasuo } from "./yasuo/brightcove-service-yasuo";

export const brightcoveService = defineService({
    query: {
        syllabusBrightcoveGetProfile: () => {
            return brightcoveYasuo.retrieveBrightcoveProfileData();
        },
        syllabusBrightcoveGetVideoInfo: (params: GetBrightCoveVideoInfoRequest.AsObject) => {
            const { accountId, videoId } = params;

            if (accountId && videoId) return brightcoveYasuo.retrieveBrightcoveVideoInfo(params);

            return createEmptyResponse(undefined);
        },
    },
});
