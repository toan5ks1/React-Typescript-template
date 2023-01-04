import appConfigs from "src/internals/configuration";

import { UserServicePromiseClient } from "manabie-bob/user_grpc_web_pb";

import { commonGrpcOptions } from "../../../internals/grpc";
import { InheritedGrpcServiceClient } from "../../service-types";
import { NsBobUserService } from "./types";
import { validateUpdateUserProfile, newUpdateUserProfileRequest } from "./user-service-bob.request";

class UserServiceBob extends InheritedGrpcServiceClient<UserServicePromiseClient> {
    async updateUserProfile(params: NsBobUserService.UpdateUser) {
        const { data } = params;
        validateUpdateUserProfile(data);

        const req = newUpdateUserProfileRequest(data);
        const resp = await this._call("updateUserProfile", req);

        if (resp.toObject().successful) {
            return {
                data,
            };
        }
    }
}

const userServiceBob = new UserServiceBob(UserServicePromiseClient, appConfigs, commonGrpcOptions);

export default userServiceBob;
