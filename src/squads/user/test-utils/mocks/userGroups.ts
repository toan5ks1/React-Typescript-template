import type { Role, UserGroup } from "src/squads/user/common/types/user-group";
import { GrantedPermission, GrantedRoleAccessPath } from "src/squads/user/common/types/user-group";
import { User_UserGroupListV2Query } from "src/squads/user/service/bob/bob-types";
import { NsUsermgmtUserGroupService } from "src/squads/user/service/usermgmt/user-group-service-user-mgmt/types";

import { Platform } from "manabuf/common/v1/enums_pb";
import {
    CreateUserGroupResponse,
    UpdateUserGroupResponse,
    ValidateUserLoginResponse,
} from "manabuf/usermgmt/v2/user_groups_pb";

import { getMockLocations, mockTreeLocations } from "./locations";

import { GrantedRoleListQueryReturn } from "src/squads/user/service/bob/granted-role-service-bob/granted-role-service-bob.query";

export const mockGrantedPermissionPackage: GrantedPermission[] = [...Array(5).keys()].map(
    (value) => ({
        id: `field_id_${value}`,
        granted_role_id: `granted_role_id_${value}`,
        role: {
            role_id: `role_id_${value}`,
            role_name: value === 0 ? "School Admin" : `role_name_${value}`,
        },
        locations: value === 0 ? [mockTreeLocations[0]] : getMockLocations(value, 1),
    })
);

export const mockReturnGrantedRoleList: GrantedRoleListQueryReturn = {
    data: [...Array(5).keys()].map((value) => ({
        granted_role_id: `granted_role_id_${value}`,
        role: {
            role_id: `role_id_${value}`,
            role_name: value === 0 ? "School Admin" : `role_name_${value}`,
        },
    })),
    total: 5,
};
export const mockReturnGrantedRoleAccessPath: GrantedRoleAccessPath[] =
    mockReturnGrantedRoleList.data!.map((value, index) => ({
        granted_role_id: value.granted_role_id,
        location: {
            location_id: `location_id${index}`,
            name: `location_name_${index}`,
            parent_location_id: "",
            location_type: "",
            access_path: "",
            is_archived: false,
        },
    }));

export const createUserGroupReq: NsUsermgmtUserGroupService.CreateUserGroupReq = {
    userGroupName: "user_group_name",
    roleWithLocationsList: mockGrantedPermissionPackage.map((grantedPermission) => ({
        roleId: grantedPermission.role.role_id,
        locationIdsList: grantedPermission.locations.map((l) => l.locationId),
    })),
};

export const updateUserGroupReq: NsUsermgmtUserGroupService.UpdateUserGroupReq = {
    userGroupId: "user_group_id",
    userGroupName: "user_group_name",
    roleWithLocationsList: mockGrantedPermissionPackage.map((grantedPermission) => ({
        roleId: grantedPermission.role.role_id,
        locationIdsList: grantedPermission.locations.map((l) => l.locationId),
    })),
};

export const validateUserLoginReq: NsUsermgmtUserGroupService.ValidateUserLoginReq = {
    platform: Platform.PLATFORM_BACKOFFICE,
};

export const createMockCreateUserGroupResponse = (): CreateUserGroupResponse => {
    const createUserGroupResp = new CreateUserGroupResponse();
    createUserGroupResp.setUserGroupId("user_group_id");
    return createUserGroupResp;
};

export const createMockUpdateUserGroupResponse = (): UpdateUserGroupResponse => {
    const updateUserGroupResp = new UpdateUserGroupResponse();
    updateUserGroupResp.setSuccessful(true);
    return updateUserGroupResp;
};

export const createMockValidateUserLogin = (): ValidateUserLoginResponse => {
    const validateUserLoginResp = new ValidateUserLoginResponse();
    validateUserLoginResp.setAllowable(true);

    return validateUserLoginResp;
};

export const mockUserGroupList: User_UserGroupListV2Query["user_group"] = [...Array(10).keys()].map(
    (value) => ({
        user_group_name: `User Group 0${value}`,
        user_group_id: `user${value}`,
    })
);

export const mockUserGroupListWithDuplicatedLabel: User_UserGroupListV2Query["user_group"] = [
    {
        user_group_name: "User Group 00",
        user_group_id: "user10",
    },
    ...mockUserGroupList,
];

export const mockUserGroup: UserGroup = {
    user_group_id: "user-group-id",
    user_group_name: "user-group-name",
};

export const mockRoleList: Role[] = [
    {
        role_name: "Admin",
        role_id: "Admin",
    },
    {
        role_name: "Teacher",
        role_id: "Teacher",
    },
];
