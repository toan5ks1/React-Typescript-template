import { NsUsermgmtParentImportService } from "src/squads/user/service/usermgmt/parent-import-service-usermgmt/types";
import { NsUsermgmtStudentImportService } from "src/squads/user/service/usermgmt/student-import-service-usermgmt/types";

export enum ActionImportUsers {
    IMPORT_STUDENTS = "IMPORT_STUDENTS",
    IMPORT_STUDENTS_FINISH = "IMPORT_STUDENTS_FINISH",
    IMPORT_PARENTS = "IMPORT_PARENTS",
    IMPORT_PARENTS_FINISH = "IMPORT_PARENTS_FINISH",
}

export type ActionImportUserTypes = keyof typeof ActionImportUsers;
interface ImportUserActions {
    type: ActionImportUserTypes;
    options?: OptionsImportUser;
}
// Student
export type ImportStudentResp = NsUsermgmtStudentImportService.ImportStudentResp;

export interface ImportStudentAction extends ImportUserActions {
    payload: NsUsermgmtStudentImportService.ImportStudentReq["payload"];
}

// Parent
export type ImportParentResp = NsUsermgmtParentImportService.ImportParentsResp;

export interface ImportParentAction extends ImportUserActions {
    payload: NsUsermgmtParentImportService.ImportParentsReq["payload"];
}

export interface ImportUserState {
    student: ImportStudentAction["payload"];
    isStudentImporting: boolean;
    parent: ImportStudentAction["payload"];
    isParentImporting: boolean;
}

export interface OptionsImportUser {
    displayImproveErrorMessage: boolean;
}
