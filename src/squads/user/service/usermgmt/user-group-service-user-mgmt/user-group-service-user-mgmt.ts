import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { UserGroupMgmtServicePromiseClient } from "manabuf/usermgmt/v2/user_groups_grpc_web_pb";

import { NsUsermgmtUserGroupService } from "./types";
import {
    createUserGroupReq,
    updateUserGroupReq,
    validateUserLoginReq,
    validateCreateUserGroupReq,
    validateUpdateUserGroupReq,
    validateParamValidateUserLoginReq,
} from "./user-group-service-user-mgmt.request";

class UserGroupServiceUsermgmt extends InheritedGrpcServiceClient<UserGroupMgmtServicePromiseClient> {
    async createUserGroup(data: NsUsermgmtUserGroupService.CreateUserGroupReq) {
        validateCreateUserGroupReq(data);

        const req = createUserGroupReq(data);

        const resp = await this._call("createUserGroup", req);

        return resp.toObject();
    }

    async updateUserGroup(data: NsUsermgmtUserGroupService.UpdateUserGroupReq) {
        validateUpdateUserGroupReq(data);

        const req = updateUserGroupReq(data);

        const resp = await this._call("updateUserGroup", req);

        return resp.toObject();
    }

    async validateUserLogin(data: NsUsermgmtUserGroupService.ValidateUserLoginReq) {
        validateParamValidateUserLoginReq(data);

        const req = validateUserLoginReq(data);

        const resp = await this._call("validateUserLogin", req);

        return resp.toObject();
    }
}

const userGroupServiceUsermgmt = new UserGroupServiceUsermgmt(
    UserGroupMgmtServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default userGroupServiceUsermgmt;
