import { CSSProperties, ReactNode } from "react";

import { FieldArrayWithId } from "react-hook-form";
import { convertEnumKeys } from "src/common/constants/helper";
import { ArrayElement } from "src/common/constants/types";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";
import { LessonReportSubmittingStatus } from "src/squads/lesson/common/constants";
import {
    DynamicAutocompleteOptionProps,
    DynamicFormFieldValue,
    LessonForLessonReportQueried,
    LessonManagementStudentInfo,
    StudentCourseSubscriptionsQueried,
} from "src/squads/lesson/common/types";
import { Grade } from "src/squads/lesson/models/grade";
import { TeacherMany } from "src/squads/lesson/service/bob/bob-modify-types";
import {
    CoursesManyQuery,
    LessonReportByLessonIdQuery,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
    Lesson_CourseManyReferenceByNameAndLocationIdQuery,
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_SchedulerBySchedulerIdQuery,
    MediasManyQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";

import { GridSize } from "@mui/material/Grid";
import { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";
import { TypographyBaseProps } from "src/components/Typographys/TypographyBase";
import { AutocompleteHFProps } from "src/squads/lesson/components/Autocompletes/AutocompleteHF";
import { SelectIconHFProps } from "src/squads/lesson/pages/LessonManagement/components/Selects/SelectIconHF";

import {
    CreateLessonSavingMethod,
    LessonTime,
    RetrieveLessonsFilterV2,
    RetrieveLessonsRequestV2,
    ValueType,
} from "manabuf/bob/v1/lessons_pb";
import {
    LessonSchedulingStatus,
    LessonTeachingMedium,
    LessonTeachingMethod,
} from "manabuf/common/v1/enums_pb";

import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

export interface LessonManagementReportsIndividualData {
    lessonId: LessonForLessonReportQueried["lesson_id"];
    lessonReportId: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_report_id"];
    students: LessonForLessonReportQueried["lesson_members"];
    lessonReportDetails: LessonManagementLessonReportDetailData[];
}

export interface LessonManagementLessonReportDetailData {
    lessonId: LessonForLessonReportQueried["lesson_id"];
    student: ArrayElement<LessonForLessonReportQueried["lesson_members"]>;
    dynamicFields: {
        [key: string]: DynamicFormFieldValue;
    };
}

export interface StudentWithAttendanceStatus extends DynamicAutocompleteOptionProps {
    student: ArrayElement<LessonManagementReportsIndividualData["students"]>;
}

export enum LessonReportTabs {
    LESSON_INFO = 0,
    REPORTS = 1,
}
// Lesson Management List
export const LessonTimeKeys = convertEnumKeys(LessonTime);
export type LessonTimeType = keyof typeof LessonTimeKeys;

export interface LessonItem {
    id: string;
    lessonDate?: string;
    lessonStatus: LessonStatusType;
    lessonReportStatus?: LessonReportSubmittingStatusType;
    lessonTime?: string;
    centerName?: string;
    teacherNames?: string;
    courseName?: string;
    className?: string;
    teachingMethod: LessonTeachingMethodType;
    teachingMedium: LessonTeachingMediumType;
}

export type FilterLessonsParamsType = RetrieveLessonsFilterV2.AsObject;

export type RetrieveLessonsParamsType = RetrieveLessonsRequestV2.AsObject;

export interface TeacherAndCenterIdList {
    teacherIdList: string[];
    centerIdList: string[];
    courseIdsList: string[];
    classIdsList: string[];
    lessonIdList: string[];
}
export type FilterAdvancedStudentSubscriptions = {
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
};

// Lesson Management Upsert
export const LessonTeachingMediumKeys = convertEnumKeys(LessonTeachingMedium);
export type LessonTeachingMediumType = keyof typeof LessonTeachingMediumKeys;

export const LessonTeachingMethodKeys = convertEnumKeys(LessonTeachingMethod);
export type LessonTeachingMethodType = keyof typeof LessonTeachingMethodKeys;

export const LessonStatusKeys = convertEnumKeys(LessonSchedulingStatus);
export type LessonStatusType = keyof typeof LessonStatusKeys;

export const LessonReportSubmittingStatusKeys = convertEnumKeys(LessonReportSubmittingStatus);
export type LessonReportSubmittingStatusType = keyof typeof LessonReportSubmittingStatusKeys;

export const LessonSavingMethodKeys = convertEnumKeys(CreateLessonSavingMethod);
export type LessonSavingMethodType = keyof typeof LessonSavingMethodKeys;

export type CourseManyReferenceQueried = ArrayElement<
    Lesson_CourseManyReferenceByNameAndLocationIdQuery["course_access_paths"]
>["course"];
export type ClassManyReferenceQueried = ArrayElement<
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery["class"]
>;

export interface LessonManagementUpsertFormType {
    teachers: TeacherMany[];
    learners: LessonManagementStudentInfo[];
    materialsList: (ArrayElement<MediasManyQuery["media"]> | File)[];
    date: Date;
    startTime: Date;
    endTime: Date;
    teachingMethod: LessonTeachingMethodType;
    teachingMedium: LessonTeachingMediumType;
    method: LessonSavingMethodType;
    center: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation;

    // TODO: Refactor on release epic https://manabie.atlassian.net/browse/LT-13374
    location?: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation;
    course?: CourseManyReferenceQueried;
    classData?: ClassManyReferenceQueried;

    startTimeAutocomplete?: TimeAutocompleteOption;
    endTimeAutocomplete?: TimeAutocompleteOption;
    endDate?: Date | null;
    methodSaving?: LessonSavingMethodType; // This type for updating recurring lesson
}

export type LessonDataWithStudentSubscriptions = ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
> & {
    studentSubscriptions?: StudentCourseSubscriptionsQueried;
};

export type LessonUpsertMode = "CREATE" | "EDIT";
export type LessonReportUpsertMode = "INIT" | LessonUpsertMode;
export type LessonManagementReportIndividualSubmitType = "SUBMIT" | "SAVE_DRAFT";

export interface LessonUpsertProps {
    isOpen: boolean;
    mode: LessonUpsertMode;
    isEnabledLessonGroup: boolean;

    lesson?: LessonDataWithStudentSubscriptions;
    centerName?: string;
    className?: string;
    mediasList?: MediasManyQuery["media"] | undefined;
    scheduler?: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]>;

    onUpsertSuccessfully: (data: NsLesson_Bob_LessonsService.UpsertLessons) => Promise<void>;
    onCloseUpsertDialog: () => void;
}

export enum LessonListTabs {
    FUTURE_LESSON = 0,
    PAST_LESSON = 1,
}

export type SingleReportType = FieldArrayWithId<
    LessonManagementReportsIndividualData,
    "lessonReportDetails"
>;

export type FilterAdvancedLessonStudentInfo = {
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
    locations: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[];
    classes: Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"];
};

export enum SavingOptionType {
    once = "once",
    weekly = "weekly",
}

// Update Lesson Report
export interface DynamicFieldLabel {
    i18n: {
        fallback_language: LanguageEnums;
        translations: {
            [LanguageEnums.EN]?: string;
            [LanguageEnums.JA]?: string;
            [LanguageEnums.VI]?: string;
        };
    };
}

export interface DynamicFieldQuestionMark {
    message: DynamicFieldLabel;
}

export interface AutocompleteTextOption {
    label: string;
    key: string;
}

export interface DynamicFieldAutocompleteTextOption {
    label: DynamicFieldLabel;
    key: string;
}

export interface SelectIconOption {
    icon: ReactNode;
    key: string;
}

export interface DynamicFieldSelectIconOption {
    // TODO: Confirm with PdM the number of icons that can be used
    icon: "CircleOutlined" | "ChangeHistoryOutlined" | "CloseOutlined";
    key: string;
}

enum ValueTypeNull {
    VALUE_TYPE_NULL = 7,
}

export enum DynamicFieldComponent {
    TEXT_FIELD = "TEXT_FIELD",
    TYPOGRAPHY = "TYPOGRAPHY",
    TEXT_FIELD_AREA = "TEXT_FIELD_AREA",
    AUTOCOMPLETE_TEXT = "AUTOCOMPLETE_TEXT",
    SELECT_ICON = "SELECT_ICON",
    TEXT_FIELD_PERCENTAGE = "TEXT_FIELD_PERCENTAGE",
}

export enum StaticFieldComponent {
    ATTENDANCE_STATUS = "ATTENDANCE_STATUS",
    ATTENDANCE_REMARK = "ATTENDANCE_REMARK",
    BUTTON_PREVIOUS_REPORT = "BUTTON_PREVIOUS_REPORT",
    LINK_VIEW_STUDY_PLAN = "LINK_VIEW_STUDY_PLAN",
    TOGGLE_TABLE = "TOGGLE_TABLE",
}

type ComponentProps = TextFieldHFProps &
    AutocompleteHFProps<DynamicFieldAutocompleteTextOption> &
    SelectIconHFProps<DynamicFieldSelectIconOption> &
    DynamicToggleTable &
    TypographyBaseProps;

interface DynamicFieldComponentProps extends Omit<ComponentProps, "placeholder"> {
    placeholder: DynamicFieldLabel;
}

export interface DynamicField {
    field_id: string;
    label?: DynamicFieldLabel;
    value_type: keyof typeof ValueType | keyof typeof ValueTypeNull;
    is_required: boolean;
    is_internal: boolean;
    component_props?: DynamicFieldComponentProps;
    component_config: {
        type: DynamicFieldComponent | StaticFieldComponent;
        question_mark?: DynamicFieldQuestionMark;
    };
    display_config: {
        grid_size?: {
            xs: GridSize;
            md?: GridSize;
            lg?: GridSize;
        };
        table_size?: {
            width: CSSProperties["width"];
        };
    };
}

export interface DynamicFormSection {
    section_id: string;
    section_name: string;
    fields: DynamicField[];
}

export interface DynamicToggleButton {
    field_id: string;
    label: DynamicFieldLabel;
}

export interface DynamicFieldInTable extends Omit<DynamicField, "component_config"> {
    component_config: DynamicField["component_config"] & {
        table_key: string;
        has_bulk_action?: boolean;
    };
}

export interface DynamicToggleTable {
    toggleButtons: DynamicToggleButton[];
    dynamicFields: DynamicFieldInTable[];
}

export interface ToggleTableLessonReportButton {
    tableKey: string;
    label: string;
}

export interface ToggleTableLessonReport {
    toggleButtons: ToggleTableLessonReportButton[];
    dynamicFields: DynamicFieldInTable[];
}

type ReportDynamicFieldValue = null | string | number | AutocompleteTextOption;
type ReportDynamicFieldValueAsObject = Record<string, ReportDynamicFieldValue>;

export type ReportDetailFieldValue = Record<
    string,
    ReportDynamicFieldValue | ReportDynamicFieldValueAsObject
>;

export interface LessonReportGroupData {
    lessonId: string;
    lessonReportId: string;
    dynamicFieldDetails: ReportDynamicFieldValue;
}

export interface BulkActionForTable {
    isApplyToBlankFieldOnly: boolean;
    value: ReportDetailFieldValue;
    dynamicField: DynamicFieldInTable;
}
