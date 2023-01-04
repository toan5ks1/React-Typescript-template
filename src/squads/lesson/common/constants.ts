import { TypographyBaseProps } from "src/components/Typographys/TypographyBase";
import { TypographyWithValueProps } from "src/components/Typographys/TypographyWithValue";

import { UserGroup } from "manabie-bob/enum_pb";

import { DynamicAutocompleteOptionProps, StudentAttendStatusType } from "./types";

import { convertEnumKeys } from "src/squads/lesson/common/helpers/mapData";
import { UseResourceTranslateReturn } from "src/squads/lesson/hooks/useResourceTranslate";

export enum LabelComponentType {
    TYPOGRAPHY = "TYPOGRAPHY",
    TYPOGRAPHY_WITH_VALUE = "TYPOGRAPHY_WITH_VALUE",
    TYPOGRAPHY_WITH_VALUE_PERCENTAGE = "TYPOGRAPHY_WITH_VALUE_PERCENTAGE",
}

export type LabelComponentTypeRecord = {
    [LabelComponentType.TYPOGRAPHY]: TypographyBaseProps;
    [LabelComponentType.TYPOGRAPHY_WITH_VALUE]: TypographyWithValueProps;
    [LabelComponentType.TYPOGRAPHY_WITH_VALUE_PERCENTAGE]: TypographyWithValueProps;
};

export const generateTranslatedAttendanceStatusOptions = (
    translator: UseResourceTranslateReturn
): DynamicAutocompleteOptionProps[] => {
    const attendanceValuesWithOrder: StudentAttendStatusType[] = [
        "STUDENT_ATTEND_STATUS_ATTEND",
        "STUDENT_ATTEND_STATUS_ABSENT",
        "STUDENT_ATTEND_STATUS_INFORMED_ABSENT",
        "STUDENT_ATTEND_STATUS_LATE",
        "STUDENT_ATTEND_STATUS_INFORMED_LATE",
        "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
    ];

    return attendanceValuesWithOrder.map((attendanceValue) => {
        const attendanceOption: DynamicAutocompleteOptionProps = {
            key: attendanceValue,
            label: translator(`studentAttendanceStatus.${attendanceValue}`),
        };

        return attendanceOption;
    });
};

type LessonReportDetailsKeyPath = `lessonReportDetails.${number}.dynamicFields.${string}`;
export const lessonReportDetailsFormKeyName = (
    fieldIndex: number,
    fieldName: string
): LessonReportDetailsKeyPath => {
    const key = `lessonReportDetails.${fieldIndex}.dynamicFields.${fieldName}`;
    return key as LessonReportDetailsKeyPath;
};

// TODO: talk to BE team to decide on a rule for this name when we have multiple dynamic forms in our system
export const FEATURE_NAME_INDIVIDUAL_LESSON_REPORT_FORM_CONFIG =
    "FEATURE_NAME_INDIVIDUAL_LESSON_REPORT";

export const FEATURE_NAME_GROUP_LESSON_REPORT_FORM_CONFIG = "FEATURE_NAME_GROUP_LESSON_REPORT";

export enum LessonReportSubmittingStatus {
    LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED = "LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED",
    LESSON_REPORT_SUBMITTING_STATUS_SAVED = "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
}

export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);

export const UserRoles = convertEnumKeys(UserGroupUnion);
