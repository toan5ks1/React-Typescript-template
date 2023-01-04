import { ERPModules } from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";
import { omitProp } from "src/common/utils/other";

import { FamilyRelationship, StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import { AddParentType, AddStudentType } from "./enum";
import { StudentKeys } from "./student";

export const choicesAddParentType = convertToChoices(
    AddParentType,
    StudentKeys.ADD_PARENT,
    ERPModules.STUDENTS
);

export const choicesAddStudentType = convertToChoices(
    AddStudentType,
    StudentKeys.ADD_STUDENT,
    ERPModules.STUDENTS
);

export const availableFamilyRelationships: FamilyRelationship[] = [
    FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
    FamilyRelationship.FAMILY_RELATIONSHIP_MOTHER,
    FamilyRelationship.FAMILY_RELATIONSHIP_GRANDFATHER,
    FamilyRelationship.FAMILY_RELATIONSHIP_GRANDMOTHER,
    FamilyRelationship.FAMILY_RELATIONSHIP_UNCLE,
    FamilyRelationship.FAMILY_RELATIONSHIP_AUNT,
    FamilyRelationship.FAMILY_RELATIONSHIP_OTHER,
];

export enum CustomFamilyRelationship {
    FAMILY_RELATIONSHIP_FATHER = FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
    FAMILY_RELATIONSHIP_MOTHER = FamilyRelationship.FAMILY_RELATIONSHIP_MOTHER,
}

export enum CustomFamilyRelationshipV2 {
    FAMILY_RELATIONSHIP_FATHER = FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
    FAMILY_RELATIONSHIP_MOTHER = FamilyRelationship.FAMILY_RELATIONSHIP_MOTHER,
    FAMILY_RELATIONSHIP_GRANDFATHER = FamilyRelationship.FAMILY_RELATIONSHIP_GRANDFATHER,
    FAMILY_RELATIONSHIP_GRANDMOTHER = FamilyRelationship.FAMILY_RELATIONSHIP_GRANDMOTHER,
    FAMILY_RELATIONSHIP_UNCLE = FamilyRelationship.FAMILY_RELATIONSHIP_UNCLE,
    FAMILY_RELATIONSHIP_AUNT = FamilyRelationship.FAMILY_RELATIONSHIP_AUNT,
    FAMILY_RELATIONSHIP_OTHER = FamilyRelationship.FAMILY_RELATIONSHIP_OTHER,
}

export const choiceRelationship = convertToChoices(
    CustomFamilyRelationship,
    StudentKeys.RELATIONSHIP,
    ERPModules.STUDENTS
);

export const choiceRelationshipV2 = convertToChoices(
    CustomFamilyRelationshipV2,
    StudentKeys.RELATIONSHIP,
    ERPModules.STUDENTS
);

export const choiceStatus = convertToChoices(
    omitProp(StudentEnrollmentStatus, "STUDENT_ENROLLMENT_STATUS_NONE"),
    StudentKeys.STUDENTS_STATUS,
    ERPModules.STUDENTS
);
