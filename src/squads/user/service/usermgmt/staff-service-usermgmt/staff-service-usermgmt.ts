import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { StaffServicePromiseClient } from "manabuf/usermgmt/v2/users_grpc_web_pb";

import {
    createStaffReq,
    updateStaffReq,
    updateStaffSettingReq,
    validateCreateStaffReq,
    validateUpdateStaffReq,
    validateUpdateStaffSettingReq,
} from "./staff-service-usermgmt.request";
import { NsUsermgmtStaffService } from "./types";

class StaffServiceUsermgmt extends InheritedGrpcServiceClient<StaffServicePromiseClient> {
    async createStaff(data: NsUsermgmtStaffService.CreateStaffReq) {
        validateCreateStaffReq(data);

        const req = createStaffReq(data);

        const resp = await this._call("createStaff", req);

        return resp.toObject();
    }
    async updateStaff(data: NsUsermgmtStaffService.UpdateStaffReq) {
        validateUpdateStaffReq(data);

        const req = updateStaffReq(data);

        const resp = await this._call("updateStaff", req);

        return resp.toObject();
    }
    async updateStaffSetting(data: NsUsermgmtStaffService.UpdateStaffSettingReq) {
        validateUpdateStaffSettingReq(data);

        const req = updateStaffSettingReq(data);

        const resp = await this._call("updateStaffSetting", req);

        return resp.toObject();
    }
}

const staffServiceUsermgmt = new StaffServiceUsermgmt(
    StaffServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default staffServiceUsermgmt;
