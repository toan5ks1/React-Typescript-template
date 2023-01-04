import { convertEnumKeys } from "src/common/constants/helper";

import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

export const KeyStudentEnrollmentStatus = convertEnumKeys(StudentEnrollmentStatus);

export const StudentNewEnrollmentStatusList = [
    "STUDENT_ENROLLMENT_STATUS_WITHDRAWN",
    "STUDENT_ENROLLMENT_STATUS_GRADUATED",
    "STUDENT_ENROLLMENT_STATUS_LOA",
];

export enum StudentKeys {
    RELATIONSHIP = "relationship",
    STUDENTS_STATUS = "studentsEnrollmentStatus",
    ADD_PARENT = "addParent",
    STUDENT_PACKAGES = "studentPackages",
    ADD_STUDENT = "addStudent",
}
