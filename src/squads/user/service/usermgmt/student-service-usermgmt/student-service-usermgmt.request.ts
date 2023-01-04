import { arrayHasItem } from "src/common/utils/other";

import {
    CreateParentsAndAssignToStudentRequest,
    UpdateParentsAndFamilyRelationshipRequest,
    ReissueUserPasswordRequest,
    UpdateStudentRequest,
    CreateStudentRequest,
    UpsertStudentCoursePackageRequest,
    RemoveParentFromStudentRequest,
} from "manabuf/usermgmt/v2/users_pb";

import { NsUsermgmtStudentService } from "./types";
import {
    getSchoolId,
    randomUserPassword,
    convertToCreateParentRequest,
    convertToUpdateParentRequest,
    convertStudentFormToUpdateStudentProfile,
    convertStudentFormToCreateStudentProfile,
    convertStudentPackagesProfile,
    setCreateParentProfile,
    setUpdateParentProfile,
    validateUpsertStudentCoursePackageReq,
} from "./utils";

// Student
export function createStudentReq(payload: NsUsermgmtStudentService.UpsertStudentPayloadType) {
    const req = new CreateStudentRequest();
    const {
        data: { generalInfo },
        options,
    } = payload;

    const generalInfoReq = createStudentGeneralInfoReq({
        data: generalInfo,
        options,
    });

    req.setSchoolId(getSchoolId());
    req.setStudentProfile(generalInfoReq);

    return req;
}

export function createStudentGeneralInfoReq(payload: {
    data?: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"];
    options?: NsUsermgmtStudentService.UpsertStudentPayloadType["options"];
}) {
    const generalInfoData = convertStudentFormToCreateStudentProfile(payload);

    const {
        email,
        enrollmentStatus,
        grade,
        name,
        studentExternalId,
        studentNote,
        countryCode,
        password,
        phoneNumber,
        gender,
        birthday,
        locationIdsList,
        enrollmentStatusStr,
        firstName,
        lastName,
        firstNamePhonetic,
        lastNamePhonetic,
    } = generalInfoData!;

    const studentGeneralInfoReq = new CreateStudentRequest.StudentProfile();

    studentGeneralInfoReq.setEmail(email);
    studentGeneralInfoReq.setEnrollmentStatus(enrollmentStatus);
    studentGeneralInfoReq.setGrade(grade);
    studentGeneralInfoReq.setName(name);
    studentGeneralInfoReq.setFirstName(firstName);
    studentGeneralInfoReq.setLastName(lastName);
    studentGeneralInfoReq.setFirstNamePhonetic(firstNamePhonetic);
    studentGeneralInfoReq.setLastNamePhonetic(lastNamePhonetic);
    studentGeneralInfoReq.setStudentExternalId(studentExternalId);
    studentGeneralInfoReq.setStudentNote(studentNote);
    studentGeneralInfoReq.setCountryCode(countryCode);
    studentGeneralInfoReq.setPassword(password);
    studentGeneralInfoReq.setPhoneNumber(phoneNumber);
    studentGeneralInfoReq.setGender(gender);
    studentGeneralInfoReq.setBirthday(birthday);
    studentGeneralInfoReq.setLocationIdsList(locationIdsList);
    studentGeneralInfoReq.setEnrollmentStatusStr(
        payload.options?.isUseEnrollmentStatusStr ? enrollmentStatusStr : ""
    );
    return studentGeneralInfoReq;
}

export function updateStudentReq(payload: NsUsermgmtStudentService.UpsertStudentPayloadType) {
    const req = new UpdateStudentRequest();
    const {
        data: { generalInfo },
        options,
    } = payload;

    const generalInfoReq = updateStudentGeneralInfoReq({
        data: generalInfo,
        options,
    });

    req.setSchoolId(getSchoolId());
    req.setStudentProfile(generalInfoReq);

    return req;
}

export function updateStudentGeneralInfoReq(payload: {
    data?: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"];
    options?: NsUsermgmtStudentService.UpsertStudentPayloadType["options"];
}) {
    const generalInfoData = convertStudentFormToUpdateStudentProfile(payload);

    const {
        id,
        email,
        enrollmentStatus,
        grade,
        name,
        studentExternalId,
        studentNote,
        gender,
        birthday,
        locationIdsList,
        enrollmentStatusStr,
        firstName,
        lastName,
        firstNamePhonetic,
        lastNamePhonetic,
    } = generalInfoData!;

    const studentGeneralInfoReq = new UpdateStudentRequest.StudentProfile();

    studentGeneralInfoReq.setId(id);
    studentGeneralInfoReq.setEmail(email);
    studentGeneralInfoReq.setEnrollmentStatus(enrollmentStatus);
    studentGeneralInfoReq.setGrade(grade);
    studentGeneralInfoReq.setName(name);
    studentGeneralInfoReq.setFirstName(firstName);
    studentGeneralInfoReq.setLastName(lastName);
    studentGeneralInfoReq.setFirstNamePhonetic(firstNamePhonetic);
    studentGeneralInfoReq.setLastNamePhonetic(lastNamePhonetic);
    studentGeneralInfoReq.setStudentExternalId(studentExternalId);
    studentGeneralInfoReq.setStudentNote(studentNote);
    studentGeneralInfoReq.setGender(gender);
    studentGeneralInfoReq.setBirthday(birthday);
    studentGeneralInfoReq.setLocationIdsList(locationIdsList);
    studentGeneralInfoReq.setEnrollmentStatusStr(
        payload.options?.isUseEnrollmentStatusStr ? enrollmentStatusStr : ""
    );

    return studentGeneralInfoReq;
}

// Parent
export function createParentReq(data: NsUsermgmtStudentService.UpsertParent) {
    const req = new CreateParentsAndAssignToStudentRequest();

    const createParentData = convertToCreateParentRequest(data);

    const { schoolId, parentProfilesList, studentId } = createParentData;

    req.setSchoolId(schoolId);

    req.setStudentId(studentId);

    if (arrayHasItem(parentProfilesList)) {
        req.setParentProfilesList(
            parentProfilesList.map((parent) => setCreateParentProfile(parent))
        );
    }

    return req;
}

export function updateParentReq(data: NsUsermgmtStudentService.UpsertParent) {
    const req = new UpdateParentsAndFamilyRelationshipRequest();

    const updateParentData = convertToUpdateParentRequest(data);
    const { schoolId, parentProfilesList, studentId } = updateParentData;

    req.setSchoolId(schoolId);
    req.setStudentId(studentId);
    if (arrayHasItem(parentProfilesList)) {
        req.setParentProfilesList(
            parentProfilesList.map((parent) => setUpdateParentProfile(parent))
        );
    }

    return req;
}

export function removeParentReq(data: NsUsermgmtStudentService.RemoveParentReq) {
    const request = new RemoveParentFromStudentRequest();

    request.setParentId(data.parentId);

    request.setStudentId(data.studentId);

    return request;
}

// Reissue Password
export function reissueUserPasswordReq(data: NsUsermgmtStudentService.ReissueUserPasswordReq) {
    const req = new ReissueUserPasswordRequest();

    req.setUserId(data.userId);

    req.setNewPassword(randomUserPassword());

    return req;
}

// Courses
export function upsertStudentCoursePackageReq(
    data: NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq
) {
    validateUpsertStudentCoursePackageReq(data);

    const { studentId, studentPackages } = data;

    const req = new UpsertStudentCoursePackageRequest();

    const reqStudentPackages = studentPackages.map((studentPackage) => {
        return convertStudentPackagesProfile(studentPackage);
    });

    req.setStudentId(studentId);

    req.setStudentPackageProfilesList(reqStudentPackages);

    return req;
}
