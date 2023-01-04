import { convertEnumKeys } from "src/common/constants/helper";
import { ArrayElement, OptionSelectType } from "src/common/constants/types";
import { UserImportType } from "src/squads/user/common/constants/enum";
import { Grade } from "src/squads/user/models/grade";
import {
    CoursesManyReferenceQuery,
    User_LocationListByIdsQuery,
    ParentsManyReferenceQuery,
    User_StudentsOneV4Query,
    UserByEmailQuery,
    ParentsManyQuery,
    CoursesManyQuery,
    User_UserAccessPathWithFilterV3Query,
    User_UserGroupsManyReferenceV2Query,
    Users_UserAddressByUserIdsQuery,
} from "src/squads/user/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/user/service/bob/locations-service-bob/types";
import { StudentPackageByIdQuery } from "src/squads/user/service/fatima/fatima-types";

import { Country } from "manabuf/common/v1/enums_pb";
import { FamilyRelationship, Gender } from "manabuf/usermgmt/v2/enums_pb";

export type UserInformation = Exclude<
    ArrayElement<User_StudentsOneV4Query["students"]>["user"],
    null | undefined
>;

export type NormalizeUserInformation = UserInformation & {
    locations?: LocationInformationHasura[];
};
export interface StudentInformation
    extends Pick<
        ArrayElement<User_StudentsOneV4Query["students"]>,
        | "current_grade"
        | "student_id"
        | "enrollment_status"
        | "student_external_id"
        | "student_note"
    > {
    user: UserInformation;
}

export interface NormalizeStudentInformation
    extends Pick<
        ArrayElement<User_StudentsOneV4Query["students"]>,
        | "current_grade"
        | "student_id"
        | "enrollment_status"
        | "student_external_id"
        | "student_note"
    > {
    user: NormalizeUserInformation;
}

export interface UserAccessPathInformation {
    location: LocationInformationHasura;
    user_id?: UserInformation["user_id"];
}

export const GenderKeys = convertEnumKeys(Gender);
export type GenderType = keyof typeof GenderKeys;

export interface UpsertStudentFormProps {
    generalInfo: StudentGeneralInfoFormProps;
    schoolHistories?: StudentSchoolHistoryFormProps[];
    homeAddress?: StudentHomeAddressFormProps;
}

export interface StudentGeneralInfoFormProps {
    studentId?: UserInformation["user_id"];
    name?: UserInformation["name"];
    phoneNumber: UserInformation["phone_number"];
    email: NonNullable<UserInformation["email"]>;
    grade: Grade;
    countryCode: Country;
    enrollmentStatus: OptionSelectType;
    studentNote: StudentInformation["student_note"];
    studentExternalId: StudentInformation["student_external_id"];
    gender: GenderType;
    birthday?: UserInformation["birthday"];
    locations?: LocationInformation[] | LocationInformationHasura[];
    firstName: UserInformation["first_name"];
    lastName: UserInformation["last_name"];
    firstNamePhonetic?: UserInformation["first_name_phonetic"];
    lastNamePhonetic?: UserInformation["last_name_phonetic"];
}

export interface StudentSchoolHistoryFormProps {
    schoolLevelId: string;
    schoolId: string;
    schoolCourseId: string;
    startDate: Date | string | null;
    endDate: Date | string | null;
    id?: string; // From react-hook-form
}

export interface StudentHomeAddressFormProps {
    postalCode?: string;
    prefecture?: string;
    city?: string;
    firstStreet?: string;
    secondStreet?: string;
}

export interface StudentContactPhoneNumberFormProps {
    studentPhoneNumber?: string;
    homePhoneNumber?: string;
    parentPrimaryPhoneNumber?: string;
    parentSecondaryPhoneNumber?: string;
    preferredContactNumber?: string;
}

export interface CreateCourseFormProps {
    course: Omit<ArrayElement<CoursesManyQuery["courses"]>, "school_id" | "grade">;
    studentPackageId?: ArrayElement<
        StudentPackageByIdQuery["student_packages"]
    >["student_package_id"];
    start?: ArrayElement<StudentPackageByIdQuery["student_packages"]>["start_at"];
    end?: ArrayElement<StudentPackageByIdQuery["student_packages"]>["end_at"];
    isDraft?: boolean;
}

export type CreateParentFormProps = {
    countryCode: Country;
    name: UserInformation["name"];
    userId?: UserInformation["user_id"];
    email: UserInformation["email"];
    phoneNumber: UserInformation["phone_number"];
    relationship: FamilyRelationship;
};

export interface UpsertStaffFormProps {
    staffId?: UserInformation["user_id"];
    name: UserInformation["name"];
    email: NonNullable<UserInformation["email"]>;
    userGroupsList: User_UserGroupsManyReferenceV2Query["user_group"];
}

export type ParentSearch = ArrayElement<ParentsManyReferenceQuery["users"]>;

export type CourseInformation = ArrayElement<CoursesManyReferenceQuery["courses"]>;

export type UserByEmailOrPhoneQuery = ArrayElement<UserByEmailQuery["users"]>;

export type StudentParentDataType = ArrayElement<ParentsManyQuery["student_parents"]>;

export interface ParentUpdateInfo {
    parent: CreateParentFormProps;
    index?: number;
}

export type LocationInformation = NsBobLocationService.LocationObjectResponse & {
    isArchived?: boolean;
    children?: any[];
    level?: number;
};

export type LocationInformationHasura = ArrayElement<
    User_UserAccessPathWithFilterV3Query["user_access_paths"]
>["location"];

export interface UserGroupPackageGrantedRole {
    role_id: string;
    role_name?: string;
}

interface GrantedPermissionPackage {
    role?: UserGroupPackageGrantedRole;
    locations?: User_LocationListByIdsQuery["locations"];
}
export interface UpsertUserGroupFormProps {
    userGroupName: string;
    userGroupId: string;
    userGroupGrantedPermissionPackage: GrantedPermissionPackage[];
}

export type ModeImportUserTypes = keyof typeof UserImportType;

export interface UserAddress
    extends ArrayElement<Users_UserAddressByUserIdsQuery["user_address"]> {}
