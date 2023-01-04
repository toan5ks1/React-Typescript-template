import { formInvalidErr } from "src/internals/errors";

import {
    GenerateImportParentsAndAssignToStudentTemplateRequest,
    ImportParentsAndAssignToStudentRequest,
} from "manabuf/usermgmt/v2/users_pb";

import { NsUsermgmtParentImportService } from "./types";

export function validateImportParentsReq(data?: NsUsermgmtParentImportService.ImportParentsReq) {
    if (!data || !data.payload) {
        throw formInvalidErr;
    }
}

export function generateImportParentsTemplateReq() {
    const req = new GenerateImportParentsAndAssignToStudentTemplateRequest();
    return req;
}

export function importParentsReq({ payload }: NsUsermgmtParentImportService.ImportParentsReq) {
    const req = new ImportParentsAndAssignToStudentRequest();
    req.setPayload(payload);
    return req;
}
