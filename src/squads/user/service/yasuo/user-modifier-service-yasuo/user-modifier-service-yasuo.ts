import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";
import { UserIdentity } from "src/squads/user/typings/auth-provider";

import { UserModifierServicePromiseClient } from "manabuf/yasuo/v1/users_grpc_web_pb";
import { UpdateUserProfileRequest, CreateUserRequest } from "manabuf/yasuo/v1/users_pb";

import { NsYasuoUserService } from "./types";
import {
    newCreateUserReq,
    newUpdateUserProfile,
    validateCreateUser,
} from "./user-modifier-service-yasuo.request";

class UserModifierServiceYasuo extends InheritedGrpcServiceClient<UserModifierServicePromiseClient> {
    async createUser(data: NsYasuoUserService.CreateUser, userLogged: UserIdentity) {
        const {
            user: { name, email },
        } = data;
        validateCreateUser(userLogged!, name, email);

        const req: CreateUserRequest = newCreateUserReq(data!, userLogged!);

        const resp = await this._call("createUser", req);

        const usersList = resp.toObject().usersList;
        return {
            id: usersList.length > 0 ? usersList[0].userId : null,
        };
    }

    async updateUser(data: NsYasuoUserService.UpdateUser) {
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
