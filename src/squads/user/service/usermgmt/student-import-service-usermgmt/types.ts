import {
    GenerateImportStudentTemplateRequest,
    GenerateImportStudentTemplateResponse,
    ImportStudentRequest,
    ImportStudentResponse,
} from "manabuf/usermgmt/v2/student_pb";

export declare namespace NsUsermgmtStudentImportService {
    export type GenerateImportStudentTemplateReq = GenerateImportStudentTemplateRequest.AsObject;
    export type GenerateImportStudentTemplateResp = GenerateImportStudentTemplateResponse.AsObject;

    export type ImportStudentReq = ImportStudentRequest.AsObject;
    export type ImportStudentResp = ImportStudentResponse.AsObject;
    export type ImportStudentRespError = ImportStudentResponse.ImportStudentError.AsObject;
}
