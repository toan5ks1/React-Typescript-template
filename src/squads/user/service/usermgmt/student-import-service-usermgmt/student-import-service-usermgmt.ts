import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/user/service/service-types";

import { StudentServicePromiseClient } from "manabuf/usermgmt/v2/student_grpc_web_pb";

import {
    generateImportStudentTemplateReq,
    importStudentReq,
    validateImportStudentReq,
} from "./student-import-service-usermgmt.request";
import { NsUsermgmtStudentImportService } from "./types";

class StudentServiceImportUsermgmt extends InheritedGrpcServiceClient<StudentServicePromiseClient> {
    async generateImportStudentTemplate() {
        const req = generateImportStudentTemplateReq();

        const resp = await this._call("generateImportStudentTemplate", req);

        return resp.toObject().data;
    }

    async importStudent(data: NsUsermgmtStudentImportService.ImportStudentReq) {
        validateImportStudentReq(data);

        const req = importStudentReq(data);

        const resp = await this._call("importStudent", req);

        return resp.toObject();
    }
}

const studentServiceImportUsermgmt = new StudentServiceImportUsermgmt(
    StudentServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default studentServiceImportUsermgmt;
