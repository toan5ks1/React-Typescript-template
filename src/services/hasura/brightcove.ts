import { ProviderTypes } from "src/common/constants/enum";
import brightcoveServiceYasuo from "src/services/yasuo/brightcove-service-yasuo";

import { GetBrightCoveVideoInfoRequest } from "manabuf/yasuo/v1/brightcove_pb";

import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.ONE;
      }
    | {
          type: ProviderTypes.GET_BRIGHTCOVE_VIDEO_INFO;
          payload: GetBrightCoveVideoInfoRequest.AsObject;
      };

const brightcoveProvider = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.ONE:
            return brightcoveServiceYasuo.retrieveBrightcoveProfileData();
        case ProviderTypes.GET_BRIGHTCOVE_VIDEO_INFO:
            return brightcoveServiceYasuo.retrieveBrightcoveVideoInfo(params.payload);
        default:
            return getEmptyResponse();
    }
};

export default brightcoveProvider;
