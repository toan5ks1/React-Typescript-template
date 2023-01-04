import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { UserModifierServicePromiseClient } from "manabuf/usermgmt/v2/users_grpc_web_pb";

import {
    createParentReq,
    createStudentReq,
    updateStudentReq,
    updateParentReq,
    reissueUserPasswordReq,
    upsertStudentCoursePackageReq,
    removeParentReq,
} from "./student-service-usermgmt.request";
import { NsUsermgmtStudentService } from "./types";
import {
    validateCreateStudentReq,
    validateUpsertParentReq,
    validateReissueUserPasswordReq,
    validateUpdateStudentReq,
    validateRemoveParentReq,
} from "./utils";

class StudentServiceUsermgmt extends InheritedGrpcServiceClient<UserModifierServicePromiseClient> {
    async createParent(data: NsUsermgmtStudentService.UpsertParent) {
        validateUpsertParentReq(data);

        const req = createParentReq(data);

        await this._call("createParentsAndAssignToStudent", req);

        return req.toObject();
    }

    async updateParent(data: NsUsermgmtStudentService.UpsertParent) {
        validateUpsertParentReq(data);

        const req = updateParentReq(data);

        const resp = await this._call("updateParentsAndFamilyRelationship", req);

        return {
            ...req.toObject(),
            ...resp.toObject(),
        };
    }

    async reissueUserPassword(data: NsUsermgmtStudentService.ReissueUserPasswordReq) {
        validateReissueUserPasswordReq(data);

        const req = reissueUserPasswordReq(data);

        const resp = await this._call("reissueUserPassword", req);

        return {
            ...req.toObject(),
            ...resp.toObject(),
        };
    }

    async updateStudent(payload: NsUsermgmtStudentService.UpsertStudentPayloadType) {
        validateUpdateStudentReq(payload);
        const req = updateStudentReq(payload);

        const resp = await this._call("updateStudent", req);

        return resp.toObject().studentProfile;
    }

    async createStudent(payload: NsUsermgmtStudentService.UpsertStudentPayloadType) {
        validateCreateStudentReq(payload);
        const req = createStudentReq(payload);

        const resp = await this._call("createStudent", req);

        return resp.toObject().studentProfile;
    }

    async upsertStudentCoursePackage(
        data: NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq
    ) {
        const req = upsertStudentCoursePackageReq(data);

        const resp = await this._call("upsertStudentCoursePackage", req);

        return resp.toObject();
    }
    async removeParent(data: NsUsermgmtStudentService.RemoveParentReq) {
        validateRemoveParentReq(data);

        const req = removeParentReq(data);

        await this._call("removeParentFromStudent", req);

        return {};
    }
}

const studentServiceUsermgmt = new StudentServiceUsermgmt(
    UserModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default studentServiceUsermgmt;
