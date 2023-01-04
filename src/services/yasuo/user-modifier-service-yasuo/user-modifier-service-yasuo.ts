import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { UserIdentity } from "src/typings/auth-provider";

import { UserModifierServicePromiseClient } from "manabuf/yasuo/v1/users_grpc_web_pb";
import { UpdateUserProfileRequest, CreateUserRequest } from "manabuf/yasuo/v1/users_pb";

import { MutationParams, InheritedGrpcServiceClient } from "../../service-types";
import { NsYasuoUserService } from "./types";
import {
    newCreateUserReq,
    newUpdateUserProfile,
    validateCreateUser,
} from "./user-modifier-service-yasuo.request";

class UserModifierServiceYasuo extends InheritedGrpcServiceClient<UserModifierServicePromiseClient> {
    async createUser(
        { data }: MutationParams<NsYasuoUserService.CreateUser>,
        userLogged: UserIdentity
    ) {
        validateCreateUser(userLogged, data!.user.email);

        const req: CreateUserRequest = newCreateUserReq(data!, userLogged);

        const resp = await this._call("createUser", req);

        const usersList = resp.toObject().usersList;
        return {
            data: { id: usersList.length > 0 ? usersList[0].userId : null },
        };
    }

    async updateUser({ data }: MutationParams<NsYasuoUserService.UpdateUser>) {
        const req: UpdateUserProfileRequest = newUpdateUserProfile(
            data! as Required<NsYasuoUserService.UpdateUser>
        );

        const resp = await this._call("updateUserProfile", req);

        const usersList = resp.toObject();

        return {
            data: { id: req.getId(), ...usersList },
        };
    }
}

const userModifierYasuo = new UserModifierServiceYasuo(
    UserModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default userModifierYasuo;
