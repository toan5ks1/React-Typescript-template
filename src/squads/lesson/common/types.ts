import { convertEnumKeys } from "src/common/constants/helper";
import { ArrayElement } from "src/common/constants/types";
import { Grade } from "src/squads/lesson/models/grade";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { NsLesson_Bob_MasterDataReaderService } from "src/squads/lesson/service/bob/master-data-reader-bob/types";

import { GridSize } from "@mui/material";
import { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";
import { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";
import { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

import {
    GetPartnerDomainRequest,
    GetPartnerDomainResponse,
    GetStudentCourseSubscriptionsRequest,
    StudentAttendStatus,
    ValueType,
} from "manabuf/bob/v1/lessons_pb";

import {
    PartnerFormConfigByIdQuery,
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery,
    LessonMemberByUserIdAndCourseIdAndLessonIdV2Query,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query,
    PartnerFormConfigsOneQuery,
    CoursesManyQuery,
    StudentsManyQuery,
    GradesOfStudentsListQuery,
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
} from "../service/bob/bob-types";

import { Media as MediaRoot, Users } from "src/squads/lesson/__generated__/bob/root-types";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

export enum AlphabetOptions {
    OPTION_A = "optionA",
    OPTION_B = "optionB",
    OPTION_C = "optionC",
    OPTION_D = "optionD",
}

export enum CompletionOptions {
    COMPLETED = "completed",
    INCOMPLETE = "incomplete",
}

export enum LessonReportBusinessRuleFieldIds {
    ATTENDANCE_STATUS = "attendance_status",
    ATTENDANCE_REMARK = "attendance_remark",
    BUTTON_PREVIOUS_REPORT = "lesson_previous_report_action",
    LINK_VIEW_STUDY_PLAN = "lesson_view_study_plan_action",
}

export enum DynamicFieldsComponentType {
    AUTOCOMPLETE = "AUTOCOMPLETE",
    TEXT_FIELD = "TEXT_FIELD",
    TEXT_FIELD_PERCENTAGE = "TEXT_FIELD_PERCENTAGE",
    TEXT_FIELD_AREA = "TEXT_FIELD_AREA",
    TYPOGRAPHY = "TYPOGRAPHY",
}

export enum LessonReportIndividualDynamicComponentType {
    ATTENDANCE_STATUS = "ATTENDANCE_STATUS",
    ATTENDANCE_REMARK = "ATTENDANCE_REMARK",
    BUTTON_PREVIOUS_REPORT = "BUTTON_PREVIOUS_REPORT",
    LINK_VIEW_STUDY_PLAN = "LINK_VIEW_STUDY_PLAN",
}

export enum LessonGroupDynamicFieldsComponentType {
    TEXT_FIELD_AREA = "TEXT_FIELD_AREA",
    TYPOGRAPHY = "TYPOGRAPHY",
}

export enum LessonReportGroupDynamicComponentType {
    BUTTON_PREVIOUS_REPORT = "BUTTON_PREVIOUS_REPORT",
}

export interface DynamicFormFieldLabel {
    i18n: {
        fallback_language: LanguageEnums;
        translations: {
            [LanguageEnums.EN]?: string;
            [LanguageEnums.JA]?: string;
            [LanguageEnums.VI]?: string;
        };
    };
}

export type DynamicAutocompleteOptionInConfig = {
    label: DynamicFormFieldLabel;
    key: string;
};

// TODO: Refactor to generic type
export type DynamicAutocompleteOptionProps = {
    key: string;
    label: string;
};

export type DynamicFormFieldValue =
    | string
    | DynamicAutocompleteOptionProps
    | (string | DynamicAutocompleteOptionProps)[] // Autocomplete Type
    | string
    | number
    | boolean
    | string[]
    | number[]
    | null;

export interface DynamicLabelValue {
    field_id: string;
    value: string | number;
}

export enum ComponentType {
    AUTOCOMPLETE = "AUTOCOMPLETE",
    TEXT_FIELD = "TEXT_FIELD",
    TEXT_FIELD_PERCENTAGE = "TEXT_FIELD_PERCENTAGE",
    TEXT_FIELD_AREA = "TEXT_FIELD_AREA",
    TYPOGRAPHY = "TYPOGRAPHY",
    BUTTON_PREVIOUS_REPORT = "BUTTON_PREVIOUS_REPORT",
    LINK_VIEW_STUDY_PLAN = "LINK_VIEW_STUDY_PLAN",
}

export type DynamicAutocompleteProps = {
    label: string;
    key: string;
};

// TODO: Will delete it then use is_label to represent the component being a label
export enum ValueTypeNull {
    VALUE_TYPE_NULL = 7,
}

export interface DynamicFieldProps {
    field_id: string;
    label?: DynamicFormFieldLabel;
    value_type: keyof typeof ValueType | keyof typeof ValueTypeNull;
    is_required: boolean;
    component_props?: TextFieldHFProps &
        AutocompleteHFProps<DynamicAutocompleteOptionInConfig> &
        TypographyBaseProps &
        any; // TODO: Refactor props when fix UnpackNestedValue by useHookFormField
    component_config: {
        type: DynamicFieldsComponentType | LessonReportIndividualDynamicComponentType;
    };
    display_config: {
        size: {
            xs: GridSize;
            md?: GridSize;
            lg?: GridSize;
        };
    };
}

export interface DynamicSection {
    section_id: string;
    section_name: string;
    fields: DynamicFieldProps[];
}

export interface LessonGroupDynamicFieldProps {
    field_id: string;
    label?: DynamicFormFieldLabel;
    value_type: keyof typeof ValueType | keyof typeof ValueTypeNull;
    is_required: boolean;
    is_internal: boolean;
    component_props?: TextFieldHFProps & TypographyBaseProps & any;
    component_config: {
        type: LessonGroupDynamicFieldsComponentType | LessonReportGroupDynamicComponentType;
        question_mark?: {
            message: DynamicFormFieldLabel;
        };
    };
    display_config: {
        size: {
            xs: GridSize;
            md?: GridSize;
            lg?: GridSize;
        };
    };
}

export interface LessonGroupDynamicSection {
    section_id: string;
    section_name: string;
    fields: LessonGroupDynamicFieldProps[];
}

export interface DynamicLabelValue {
    field_id: string;
    value: string | number;
}

export type LessonForLessonReportQueried = ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
>;

export type LessonMember = ArrayElement<LessonForLessonReportQueried["lesson_members"]>;

export interface LessonReportDetailOfStudent {
    course: LessonMember["course"];
    dynamicLessonReportData: DynamicLabelValue[];
}
export interface LessonReportDetailOfStudentWithPreviousReport
    extends StudentAndDynamicLessonReportDetail {
    previousLessonReport?: LessonReportDetailOfStudent;
}

export interface StudentAndDynamicLessonReportDetail extends LessonMember {
    dynamicLessonReportData: DynamicLabelValue[];
}

export type DynamicLabelValuesListWithStudentId = {
    studentId: Users["user_id"];
    dynamicLabelValues: DynamicLabelValue[];
};

// Previous Report
export type PartnerFormConfigByIdQueried = PartnerFormConfigByIdQuery["partner_form_configs"];

export type PartnerFormDynamicFieldValueByPreviousReportQueried =
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery["get_partner_dynamic_form_field_values_by_student"];

export type LessonMemberByPreviousReportQueried =
    LessonMemberByUserIdAndCourseIdAndLessonIdV2Query["lesson_members"];

export type LessonReportByPreviousReportQueried =
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query["get_previous_report_of_student_v3"];

// View Study Plan
export type GetPartnerDomainRequestQuery = GetPartnerDomainRequest.AsObject;

export type GetPartnerDomainResponseQuery = GetPartnerDomainResponse.AsObject;

// LessonReportUpsert & LessonReportDetail
export type PartnerFormConfigLatestQueried = ArrayElement<
    PartnerFormConfigsOneQuery["partner_form_configs"]
>;

// Lesson management student info
export type FilterAdvancedLessonManagementStudentInfo = {
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
};

export type StudentCourseSubscriptionsQueried =
    NsLesson_Bob_LessonStudentSubscriptionsService.GetStudentCourseSubscriptionsResponse["itemsList"];

export type StudentSubscriptionsQueried =
    NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionResponse["itemsList"];

export type LessonManagementStudentInfo = {
    studentSubscriptionId?: ArrayElement<StudentSubscriptionsQueried>["id"];
    course: {
        courseName: ArrayElement<CoursesManyQuery["courses"]>["name"];
        courseId: ArrayElement<CoursesManyQuery["courses"]>["course_id"];
    };
    student: {
        studentName: ArrayElement<StudentsManyQuery["users"]>["name"];
        studentId: ArrayElement<StudentsManyQuery["users"]>["user_id"];
    };
    grade: ArrayElement<GradesOfStudentsListQuery["students"]>["current_grade"];
    attendanceStatus: StudentAttendStatus;
    locationId?: ArrayElement<StudentSubscriptionsQueried>["locationIdsList"][0];
    classData?: ArrayElement<Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"]>;
    teachingType?: string; // TODO: Change this type when lesson table has teaching type field
};

export const StudentAttendStatusKeys = convertEnumKeys(StudentAttendStatus);

export type StudentAttendStatusType = keyof typeof StudentAttendStatusKeys;

export type StudentsMany = StudentsManyQuery["users"];

export type LocationInformation = NsLesson_Bob_MasterDataReaderService.LocationObjectResponse;

export type GetStudentCourseSubscriptionsRequestQuery =
    Array<GetStudentCourseSubscriptionsRequest.StudentCourseSubscription.AsObject>;

export type ClassManyType = ArrayElement<Lesson_ClassManyForLessonManagementQuery["class"]>;

export type ClassObjectType = Record<ClassManyType["class_id"], ClassManyType["name"]>;

export interface TimeAutocompleteOption {
    label: string;
    value: Date | null | undefined;
}

export type FilterTimeType = TimeAutocompleteOption | null;

export type Media = Omit<MediaRoot, "resource_path">;
