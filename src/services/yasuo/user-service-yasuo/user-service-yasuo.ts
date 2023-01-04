import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { GrpcUserProfile } from "src/typings/auth-provider";

import { UserServicePromiseClient } from "manabie-yasuo/user_grpc_web_pb";
import { GetBasicProfileRequest } from "manabie-yasuo/user_pb";

import { InheritedGrpcServiceClient } from "../../service-types";

class UserServiceYasuo extends InheritedGrpcServiceClient<UserServicePromiseClient> {
    async getBasicUserProfile(params: {
        token: string;
    }): Promise<{ data: GrpcUserProfile | undefined }> {
        const request = new GetBasicProfileRequest();

        const profile = await this._call("getBasicProfile", request, { token: params.token });

        return {
            data: profile.toObject().user,
        };
    }
}

const userServiceYasuo = new UserServiceYasuo(
    UserServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default userServiceYasuo;
