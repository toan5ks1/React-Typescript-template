import {
    GenerateImportParentsAndAssignToStudentTemplateRequest,
    GenerateImportParentsAndAssignToStudentTemplateResponse,
    ImportParentsAndAssignToStudentRequest,
    ImportParentsAndAssignToStudentResponse,
} from "manabuf/usermgmt/v2/users_pb";

export declare namespace NsUsermgmtParentImportService {
    export type GenerateImportParentsTemplateReq =
        GenerateImportParentsAndAssignToStudentTemplateRequest.AsObject;
    export type GenerateImportParentsTemplateResp =
        GenerateImportParentsAndAssignToStudentTemplateResponse.AsObject;

    export type ImportParentsReq = ImportParentsAndAssignToStudentRequest.AsObject;
    export type ImportParentsResp = ImportParentsAndAssignToStudentResponse.AsObject;
    export type ImportParentsRespError =
        ImportParentsAndAssignToStudentResponse.ImportParentsAndAssignToStudentError.AsObject;
}
