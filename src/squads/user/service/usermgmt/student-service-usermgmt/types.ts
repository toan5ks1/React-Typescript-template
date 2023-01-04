import {
    UpsertStudentFormProps,
    CreateParentFormProps,
    StudentPackageCourseForm,
} from "src/squads/user/common/types";

import {
    CreateParentsAndAssignToStudentRequest,
    UpdateParentsAndFamilyRelationshipRequest,
    ReissueUserPasswordRequest,
    ReissueUserPasswordResponse,
    UpdateStudentRequest,
    UpdateStudentResponse,
    CreateStudentRequest,
    CreateStudentResponse,
    Student,
    UserProfile,
    UpsertStudentCoursePackageRequest,
    UpsertStudentCoursePackageResponse,
    RemoveParentFromStudentRequest,
} from "manabuf/usermgmt/v2/users_pb";

interface UpsertStudentPayloadOptionsType {
    isUseEnrollmentStatusStr?: boolean;
    isShowNamePhonetic?: boolean;
}
export declare namespace NsUsermgmtStudentService {
    export type CreateParentsAndAssignToStudent = CreateParentsAndAssignToStudentRequest.AsObject;

    export type CreateParentProfile = CreateParentsAndAssignToStudentRequest.ParentProfile.AsObject;

    export type UpdateParentsAndFamilyRelationship =
        UpdateParentsAndFamilyRelationshipRequest.AsObject;

    export type UpdateParentProfile =
        UpdateParentsAndFamilyRelationshipRequest.ParentProfile.AsObject;

    export interface UpsertParent {
        studentId:
            | CreateParentsAndAssignToStudent["studentId"]
            | UpdateParentsAndFamilyRelationship["studentId"];
        parent: CreateParentFormProps;
    }

    export interface ReissueUserPasswordResp extends ReissueUserPasswordResponse.AsObject {
        userId: ReissueUserPasswordRequest.AsObject["userId"];
        newPassword: ReissueUserPasswordRequest.AsObject["newPassword"];
    }
    export interface ReissueUserPasswordReq {
        userId: ReissueUserPasswordRequest.AsObject["userId"];
    }

    export interface UpdateStudentReq extends UpdateStudentRequest.AsObject {}
    export interface UpsertStudentFormPropsReq extends UpsertStudentFormProps {}

    export interface UpdateStudentResp extends UpdateStudentResponse.StudentProfile.AsObject {}

    export interface CreateStudentReq extends CreateStudentRequest.AsObject {}
    export interface CreateStudentResp extends CreateStudentResponse.StudentProfile.AsObject {}
    export interface StudentResp extends Student.AsObject {}
    export interface UserProfileResp extends UserProfile.AsObject {}

    export interface UpsertStudentCoursePackageReq
        extends UpsertStudentCoursePackageRequest.AsObject {}

    export interface StudentPackageProfileReqAndResp
        extends UpsertStudentCoursePackageRequest.StudentPackageProfile.AsObject {}

    export interface UpsertStudentCoursePackageResp
        extends UpsertStudentCoursePackageResponse.AsObject {}
    export interface UpsertStudentCoursePackageFormReq extends StudentPackageCourseForm {
        studentId: UpsertStudentCoursePackageReq["studentId"];
    }
    export type RemoveParentReq = RemoveParentFromStudentRequest.AsObject;

    export type UpsertStudentPayloadType = {
        data: UpsertStudentFormPropsReq;
        options?: UpsertStudentPayloadOptionsType;
    };
}
