import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { UserReaderServicePromiseClient } from "manabuf/usermgmt/v2/users_grpc_web_pb";

import { NsUsermgmtUserService } from "./types";
import { createGetBasicProfileRequest } from "./user-service-user-mgmt.request";

class UserServiceUsermgmt extends InheritedGrpcServiceClient<UserReaderServicePromiseClient> {
    async getBasicUserProfile(data?: NsUsermgmtUserService.GetBasicProfileReq) {
        const req = createGetBasicProfileRequest(data);

        const profile = await this._call("getBasicProfile", req);

        return {
            data: profile.toObject().profilesList[0],
        };
    }
}

const userServiceUsermgmt = new UserServiceUsermgmt(
    UserReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default userServiceUsermgmt;
