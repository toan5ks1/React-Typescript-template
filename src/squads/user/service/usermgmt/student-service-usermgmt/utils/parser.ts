import { convertString } from "src/common/constants/helper";
import { toTimestampNewProto } from "src/common/utils/timezone";
import {
    CreateParentFormProps,
    StudentPackageClientWithLocation,
} from "src/squads/user/common/types";

import { Country } from "manabuf/common/v1/enums_pb";
import { Gender } from "manabuf/usermgmt/v2/enums_pb";
import {
    CreateParentsAndAssignToStudentRequest,
    UpdateParentsAndFamilyRelationshipRequest,
    UpsertStudentCoursePackageRequest,
    StudentPackageExtra,
} from "manabuf/usermgmt/v2/users_pb";

import { NsUsermgmtStudentService } from "../types";
import { getSchoolId, randomUserPassword, getEnrollmentStatus, getLocationIdsList } from "./common";
import { validateUpsertCourseReq } from "./validation";

export const convertToUpdateParentRequest = ({
    studentId,
    parent,
}: NsUsermgmtStudentService.UpsertParent): NsUsermgmtStudentService.UpdateParentsAndFamilyRelationship => {
    const req: NsUsermgmtStudentService.UpdateParentsAndFamilyRelationship = {
        schoolId: getSchoolId(),
        studentId: studentId,
        parentProfilesList: [convertParentFormToUpdateParentProfile(parent)],
    };

    return req;
};

const convertParentFormToUpdateParentProfile = (
    parent: CreateParentFormProps
): NsUsermgmtStudentService.UpdateParentProfile => {
    return {
        id: convertString(parent.userId),
        email: convertString(parent.email).trim(),
        relationship: parent.relationship,
    };
};

export const convertStudentFormToUpdateStudentProfile = ({
    data,
    options,
}: {
    data?: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"];
    options?: NsUsermgmtStudentService.UpsertStudentPayloadType["options"];
}): NsUsermgmtStudentService.UpdateStudentReq["studentProfile"] => {
    const student = data!;
    return {
        id: student.studentId!,
        name: options?.isShowNamePhonetic
            ? `${student.firstName?.trim()} ${student.lastName?.trim()}`
            : student.name?.trim() || "", // TODO: update when integrating with API
        firstName: options?.isShowNamePhonetic ? convertString(student.firstName) : "",
        lastName: options?.isShowNamePhonetic ? convertString(student.lastName) : "",
        firstNamePhonetic: options?.isShowNamePhonetic
            ? convertString(student.firstNamePhonetic)
            : "",
        lastNamePhonetic: options?.isShowNamePhonetic
            ? convertString(student.lastNamePhonetic)
            : "",
        email: student.email,
        grade: student.grade.id,
        enrollmentStatus: getEnrollmentStatus(student.enrollmentStatus),
        studentExternalId: convertString(student.studentExternalId).trim(),
        studentNote: convertString(student.studentNote).trim(),
        gender: Gender[student.gender],
        birthday:
            student?.birthday &&
            toTimestampNewProto({
                originDate: student.birthday,
                origin: false,
                start: false,
                type: "day",
            }),
        locationIdsList: getLocationIdsList(student.locations),
        enrollmentStatusStr: `${student.enrollmentStatus.id}`,
    };
};

export const convertStudentFormToCreateStudentProfile = ({
    data,
    options,
}: {
    data?: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"];
    options?: NsUsermgmtStudentService.UpsertStudentPayloadType["options"];
}): NsUsermgmtStudentService.CreateStudentReq["studentProfile"] => {
    const student = data!;
    return {
        name: options?.isShowNamePhonetic
            ? `${student.lastName?.trim()} ${student.firstName?.trim()}`
            : student.name?.trim() || "", // TODO: update when integrating with API
        firstName: options?.isShowNamePhonetic ? convertString(student.firstName) : "",
        lastName: options?.isShowNamePhonetic ? convertString(student.lastName) : "",
        firstNamePhonetic: options?.isShowNamePhonetic
            ? convertString(student.firstNamePhonetic)
            : "",
        lastNamePhonetic: options?.isShowNamePhonetic
            ? convertString(student.lastNamePhonetic)
            : "",
        countryCode: student.countryCode || Country.COUNTRY_NONE,
        phoneNumber: convertString(student.phoneNumber).trim(),
        email: convertString(student.email).trim(),
        password: randomUserPassword(),
        grade: student.grade.id,
        enrollmentStatus: getEnrollmentStatus(student.enrollmentStatus),
        studentExternalId: convertString(student.studentExternalId).trim(),
        studentNote: convertString(student.studentNote).trim(),
        gender: Gender[student.gender as keyof typeof Gender],
        birthday:
            student?.birthday &&
            toTimestampNewProto({
                originDate: student.birthday,
                origin: false,
                start: false,
                type: "day",
            }),
        locationIdsList: getLocationIdsList(student.locations),
        enrollmentStatusStr: `${student.enrollmentStatus.id}`,
    };
};

// Parent
export const convertToCreateParentRequest = ({
    studentId,
    parent,
}: NsUsermgmtStudentService.UpsertParent): NsUsermgmtStudentService.CreateParentsAndAssignToStudent => {
    const req: NsUsermgmtStudentService.CreateParentsAndAssignToStudent = {
        schoolId: getSchoolId(),
        studentId: studentId,
        parentProfilesList: [convertParentFormToCreateParentProfile(parent)],
    };

    return req;
};

const convertParentFormToCreateParentProfile = (
    parent: CreateParentFormProps
): NsUsermgmtStudentService.CreateParentProfile => {
    return {
        name: parent.name.trim(),
        countryCode: parent.countryCode,
        phoneNumber: convertString(parent.phoneNumber)?.trim(),
        email: convertString(parent.email).trim(),
        password: randomUserPassword(),
        relationship: parent.relationship,
    };
};

export const setCreateParentProfile = (
    parent: NsUsermgmtStudentService.CreateParentProfile
): CreateParentsAndAssignToStudentRequest.ParentProfile => {
    const parentProfile = new CreateParentsAndAssignToStudentRequest.ParentProfile();

    parentProfile.setName(parent.name);
    parentProfile.setEmail(parent.email);
    parentProfile.setPassword(parent.password);
    parentProfile.setPhoneNumber(parent.phoneNumber);
    parentProfile.setRelationship(parent.relationship);
    parentProfile.setCountryCode(parent.countryCode);

    return parentProfile;
};

export const setUpdateParentProfile = (
    parent: NsUsermgmtStudentService.UpdateParentProfile
): UpdateParentsAndFamilyRelationshipRequest.ParentProfile => {
    const parentProfile = new UpdateParentsAndFamilyRelationshipRequest.ParentProfile();

    parentProfile.setId(parent.id);
    parentProfile.setEmail(parent.email);
    parentProfile.setRelationship(parent.relationship);

    return parentProfile;
};

// Course
export const convertStudentPackagesProfile = (data: StudentPackageClientWithLocation) => {
    validateUpsertCourseReq(data);

    const reqStudentPackage = new UpsertStudentCoursePackageRequest.StudentPackageProfile();

    if (data.studentPackageId) {
        reqStudentPackage.setStudentPackageId(data.studentPackageId);
    } else {
        reqStudentPackage.setCourseId(data.course.course_id);
    }

    reqStudentPackage.setStartTime(
        toTimestampNewProto({
            originDate: data.start,
            origin: false,
            start: true,
            type: "day",
        })
    );

    reqStudentPackage.setEndTime(
        toTimestampNewProto({
            originDate: data.end,
            origin: false,
            start: false,
            type: "day",
        })
    );
    const locationId = data.location?.location_id;
    const classId = data.class?.class_id || "";

    if (locationId) {
        const studentPackageExtra = new StudentPackageExtra();
        studentPackageExtra.setLocationId(locationId);
        studentPackageExtra.setClassId(classId);
        reqStudentPackage.setStudentPackageExtraList([studentPackageExtra]);
    }

    return reqStudentPackage;
};
