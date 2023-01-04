import { UpsertStaffFormProps } from "src/squads/user/common/types";

import {
    CreateStaffRequest,
    CreateStaffResponse,
    UpdateStaffResponse,
    UpdateStaffSettingRequest,
    UpdateStaffSettingResponse,
} from "manabuf/usermgmt/v2/users_pb";

export declare namespace NsUsermgmtStaffService {
    export interface CreateStaffReq
        extends Omit<CreateStaffRequest.StaffProfile.AsObject, "userGroupIdsList"> {
        userGroupsList: UpsertStaffFormProps["userGroupsList"];
    }

    export interface CreateStaffResp extends CreateStaffResponse.AsObject {}

    export interface UpdateStaffReq extends UpsertStaffFormProps {}

    export interface UpdateStaffResp extends UpdateStaffResponse.AsObject {}

    export interface UpdateStaffSettingReq extends UpdateStaffSettingRequest.AsObject {}

    export interface UpdateStaffSettingResp extends UpdateStaffSettingResponse.AsObject {}
}
