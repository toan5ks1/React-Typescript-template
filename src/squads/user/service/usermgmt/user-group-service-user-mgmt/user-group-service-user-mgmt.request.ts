import { formInvalidErr } from "src/internals/errors";

import {
    CreateUserGroupRequest,
    RoleWithLocations,
    UpdateUserGroupRequest,
    ValidateUserLoginRequest,
} from "manabuf/usermgmt/v2/user_groups_pb";

import { NsUsermgmtUserGroupService } from "./types";

export function validateGrantedPermissionPackage(
    _package: NsUsermgmtUserGroupService.CreateUserGroupReq["roleWithLocationsList"]
) {
    const isValid = _package.every((grantedRole) => {
        return !!grantedRole.roleId && !!grantedRole.locationIdsList.length;
    });

    if (!isValid) throw formInvalidErr;
}

export function validateCreateUserGroupReq(data: NsUsermgmtUserGroupService.CreateUserGroupReq) {
    if (!data.userGroupName) throw formInvalidErr;
    validateGrantedPermissionPackage(data.roleWithLocationsList);
}

export function validateUpdateUserGroupReq(data: NsUsermgmtUserGroupService.UpdateUserGroupReq) {
    if (!data.userGroupId || !data.userGroupName) throw formInvalidErr;
    validateGrantedPermissionPackage(data.roleWithLocationsList);
}

export function validateParamValidateUserLoginReq(
    data: NsUsermgmtUserGroupService.ValidateUserLoginReq
) {
    if (data.platform === undefined || data.platform === null) throw formInvalidErr;
}

export function createUserGroupReq(data: NsUsermgmtUserGroupService.CreateUserGroupReq) {
    const userGroupReq = new CreateUserGroupRequest();

    const { userGroupName, roleWithLocationsList } = data;
    const grantedPermissionPackage: RoleWithLocations[] = [];

    roleWithLocationsList.forEach((data) => {
        const grantedRole = new RoleWithLocations();
        grantedRole.setRoleId(data.roleId);
        grantedRole.setLocationIdsList(data.locationIdsList);
        grantedPermissionPackage.push(grantedRole);
    });

    userGroupReq.setUserGroupName(userGroupName);
    userGroupReq.setRoleWithLocationsList(grantedPermissionPackage);

    return userGroupReq;
}

export function updateUserGroupReq(data: NsUsermgmtUserGroupService.UpdateUserGroupReq) {
    const userGroupReq = new UpdateUserGroupRequest();

    const { userGroupId, userGroupName, roleWithLocationsList } = data;
    const grantedPermissionPackage: RoleWithLocations[] = [];

    roleWithLocationsList.forEach((data) => {
        const grantedRole = new RoleWithLocations();
        grantedRole.setRoleId(data.roleId);
        grantedRole.setLocationIdsList(data.locationIdsList);
        grantedPermissionPackage.push(grantedRole);
    });

    userGroupReq.setUserGroupId(userGroupId);
    userGroupReq.setUserGroupName(userGroupName);
    userGroupReq.setRoleWithLocationsList(grantedPermissionPackage);

    return userGroupReq;
}

export function validateUserLoginReq(data: NsUsermgmtUserGroupService.ValidateUserLoginReq) {
    const validateUserLoginReq = new ValidateUserLoginRequest();

    validateUserLoginReq.setPlatform(data.platform);

    return validateUserLoginReq;
}
