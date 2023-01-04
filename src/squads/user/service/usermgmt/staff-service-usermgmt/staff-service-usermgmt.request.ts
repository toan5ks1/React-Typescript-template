import { formInvalidErr } from "src/internals/errors";
import { UpsertStaffFormProps } from "src/squads/user/common/types";

import {
    CreateStaffRequest,
    UpdateStaffRequest,
    UpdateStaffSettingRequest,
} from "manabuf/usermgmt/v2/users_pb";

import { NsUsermgmtStaffService } from "./types";

export function validateCreateStaffReq(data?: NsUsermgmtStaffService.CreateStaffReq) {
    if (!data || !data.name || !data.email) {
        throw formInvalidErr;
    }
}

export function validateUpdateStaffReq(data?: NsUsermgmtStaffService.UpdateStaffReq) {
    if (!data || !data.name || !data.staffId || !data.email) {
        throw formInvalidErr;
    }
}

export function validateUpdateStaffSettingReq(data?: NsUsermgmtStaffService.UpdateStaffSettingReq) {
    if (!data || !data.staffId) {
        throw formInvalidErr;
    }
}

export function createStaffReq(data: NsUsermgmtStaffService.CreateStaffReq) {
    const staffReq = new CreateStaffRequest();
    const staffProfile = new CreateStaffRequest.StaffProfile();
    const { name, email, avatar, phoneNumber, country, userGroup, organizationId, userGroupsList } =
        data;
    const userGroupIdsList: string[] = userGroupsListToUserGroupIdsList(userGroupsList);

    staffProfile.setName(name);
    staffProfile.setEmail(email);
    staffProfile.setAvatar(avatar);
    staffProfile.setPhoneNumber(phoneNumber);
    staffProfile.setCountry(country);
    staffProfile.setUserGroup(userGroup);
    staffProfile.setOrganizationId(organizationId);
    staffProfile.setUserGroupIdsList(userGroupIdsList);

    staffReq.setStaff(staffProfile);
    return staffReq;
}

export function updateStaffReq(data: NsUsermgmtStaffService.UpdateStaffReq) {
    const staffReq = new UpdateStaffRequest();
    const staffProfile = new UpdateStaffRequest.StaffProfile();
    const { staffId, name, email, userGroupsList } = data;
    const userGroupIdsList = userGroupsListToUserGroupIdsList(userGroupsList);

    staffProfile.setStaffId(staffId!);
    staffProfile.setName(name);
    staffProfile.setEmail(email);
    staffProfile.setUserGroupIdsList(userGroupIdsList);

    staffReq.setStaff(staffProfile);

    return staffReq;
}

export function updateStaffSettingReq(data: NsUsermgmtStaffService.UpdateStaffSettingReq) {
    const { staffId, autoCreateTimesheet } = data;
    const staffReq = new UpdateStaffSettingRequest();

    staffReq.setStaffId(staffId!);
    staffReq.setAutoCreateTimesheet(autoCreateTimesheet);

    return staffReq;
}

export function userGroupsListToUserGroupIdsList(
    userGroupList: UpsertStaffFormProps["userGroupsList"]
) {
    return userGroupList?.map((userGroup) => userGroup?.user_group_id);
}
