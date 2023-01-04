import { formInvalidErr } from "src/internals/errors";

import {
    GenerateImportStudentTemplateResponse,
    ImportStudentRequest,
} from "manabuf/usermgmt/v2/student_pb";

import { NsUsermgmtStudentImportService } from "./types";

export function validateImportStudentReq(data?: NsUsermgmtStudentImportService.ImportStudentReq) {
    if (!data || !data.payload) {
        throw formInvalidErr;
    }
}

export function generateImportStudentTemplateReq() {
    const req = new GenerateImportStudentTemplateResponse();
    return req;
}

export function importStudentReq({ payload }: NsUsermgmtStudentImportService.ImportStudentReq) {
    const req = new ImportStudentRequest();
    req.setPayload(payload);
    return req;
}
