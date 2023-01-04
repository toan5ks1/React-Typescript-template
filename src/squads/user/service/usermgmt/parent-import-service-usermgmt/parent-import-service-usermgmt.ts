import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { UserModifierServicePromiseClient } from "manabuf/usermgmt/v2/users_grpc_web_pb";

import {
    generateImportParentsTemplateReq,
    importParentsReq,
    validateImportParentsReq,
} from "./parent-import-service-usermgmt.request";
import { NsUsermgmtParentImportService } from "./types";

class ParentImportServiceUsermgmt extends InheritedGrpcServiceClient<UserModifierServicePromiseClient> {
    async generateImportParentTemplate() {
        const req = generateImportParentsTemplateReq();

        const resp = await this._call("generateImportParentsAndAssignToStudentTemplate", req);

        return resp.toObject().data;
    }

    async importParent(data: NsUsermgmtParentImportService.ImportParentsReq) {
        validateImportParentsReq(data);

        const req = importParentsReq(data);

        const resp = await this._call("importParentsAndAssignToStudent", req);

        return resp.toObject();
    }
}

const parentImportServiceUsermgmt = new ParentImportServiceUsermgmt(
    UserModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default parentImportServiceUsermgmt;
