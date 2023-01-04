import {
    CreateUserGroupRequest,
    CreateUserGroupResponse,
    UpdateUserGroupRequest,
    UpdateUserGroupResponse,
    RoleWithLocations,
    ValidateUserLoginRequest,
} from "manabuf/usermgmt/v2/user_groups_pb";

export declare namespace NsUsermgmtUserGroupService {
    export interface CreateUserGroupReq extends CreateUserGroupRequest.AsObject {}

    export interface CreateUserGroupResp extends CreateUserGroupResponse.AsObject {}

    export interface UpdateUserGroupReq extends UpdateUserGroupRequest.AsObject {}

    export interface UpdateUserGroupResp extends UpdateUserGroupResponse.AsObject {}

    export interface RoleWithLocation extends RoleWithLocations.AsObject {}

    export interface ValidateUserLoginReq extends ValidateUserLoginRequest.AsObject {}
}
