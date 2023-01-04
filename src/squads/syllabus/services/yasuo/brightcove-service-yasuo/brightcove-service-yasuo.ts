import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { BrightcoveServicePromiseClient } from "manabuf/yasuo/v1/brightcove_grpc_web_pb";
import {
    GetBrightCoveVideoInfoRequest,
    RetrieveBrightCoveProfileDataRequest,
} from "manabuf/yasuo/v1/brightcove_pb";

class BrightcoveServiceYasuo extends InheritedGrpcServiceClient<BrightcoveServicePromiseClient> {
    async retrieveBrightcoveProfileData() {
        const req = new RetrieveBrightCoveProfileDataRequest();

        const resp = await this._call("retrieveBrightCoveProfileData", req);

        return resp.toObject();
    }

    async retrieveBrightcoveVideoInfo({
        videoId,
        accountId,
    }: GetBrightCoveVideoInfoRequest.AsObject) {
        const req = new GetBrightCoveVideoInfoRequest();
        req.setAccountId(accountId);
        req.setVideoId(videoId);

        const resp = await this._call("getBrightcoveVideoInfo", req);

        return resp.toObject();
    }
}

const brightcoveServiceYasuo = new BrightcoveServiceYasuo(
    BrightcoveServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default brightcoveServiceYasuo;
