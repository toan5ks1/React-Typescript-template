import { convertEnumKeys } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { generateTranslatedAttendanceStatusOptions } from "src/squads/lesson/common/constants";
import {
    DynamicAutocompleteOptionProps,
    DynamicFieldProps,
    DynamicSection,
    ValueTypeNull,
} from "src/squads/lesson/common/types";

import { ValueType } from "manabuf/bob/v1/lessons_pb";
import { LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";

import { UseResourceTranslateReturn } from "src/squads/lesson/hooks/useResourceTranslate";
import {
    DynamicFieldComponent,
    LessonReportSubmittingStatusKeys,
    LessonReportSubmittingStatusType,
    LessonStatusType,
    StaticFieldComponent,
} from "src/squads/lesson/pages/LessonManagement/common/types";

/**
 * Get value type of a dynamic field
 * @param fieldId id of a dynamic field which is contained by sections of formSections
 * @param formSections sections of "partner form config" - Example: "mockDataConfig" from {@link src/squads/lesson/test-utils/lesson-report.ts}
 *
 * @returns value type in manabuf {@link ValueType from "manabuf/bob/v1/lessons_pb"} (mean not include VALUE_TYPE_NULL)
 * or undefined if @param formSections not contain dynamic field has @param fieldId
 */
export const getNonNullableValueType = (
    fieldId: DynamicFieldProps["field_id"],
    formSections: DynamicSection[]
): ValueType | undefined => {
    if (!formSections || !arrayHasItem(formSections)) return undefined;

    const valueTypeNull: keyof typeof ValueTypeNull = "VALUE_TYPE_NULL";
    let valueType: ValueType | undefined = undefined;

    const allSectionFields = formSections.flatMap((section) => section.fields);

    const targetField = allSectionFields.find((field) => field.field_id === fieldId);

    const isValuableType = targetField && targetField.value_type !== valueTypeNull;

    if (isValuableType && targetField) {
        valueType = ValueType[targetField.value_type];
    }

    return valueType;
};

/**
 * Get component type of dynamic field
 * @param fieldId id of a dynamic field which is contained by sections of formSections
 * @param formSections sections of "partner form config" - Example: "mockDataConfig" from {@link src/squads/lesson/test-utils/lesson-report.ts}
 *
 * @returns component type of {@link DynamicFieldsComponentType/LessonReportIndividualDynamicComponentType from "src/squads/lesson/common/types"}
 * or undefined if @param formSections not contain dynamic field has @param fieldId
 */
export const getComponentType = (
    fieldId: DynamicFieldProps["field_id"],
    formSections: DynamicSection[]
) => {
    if (!formSections || !arrayHasItem(formSections)) return undefined;

    let componentType: DynamicFieldProps["component_config"]["type"] | undefined = undefined;

    const allSectionFields = formSections.flatMap((section) => section.fields);

    const targetField = allSectionFields.find((field) => field.field_id === fieldId);

    if (targetField) {
        componentType = targetField.component_config.type;
    }

    return componentType;
};

/**
 * Get attendance status option for autocomplete
 * @param fieldId string value from lesson report detail
 * @param translator translate function
 *
 * @returns option for autocomplete {@link DynamicAutocompleteOptionProps src/squads/lesson/common/types}
 */
export const getAttendanceStatusOption = (
    fieldValue: DynamicAutocompleteOptionProps["key"],
    translator: UseResourceTranslateReturn
) => {
    const attendanceStatus = generateTranslatedAttendanceStatusOptions(translator);
    return attendanceStatus.find((status) => status.key === fieldValue);
};

export const isDynamicFieldComponent = (
    type: DynamicFieldComponent | StaticFieldComponent
): type is DynamicFieldComponent => {
    return Object.keys(convertEnumKeys(DynamicFieldComponent)).includes(type);
};

type AllowSaveDraftLessonType = Exclude<
    LessonStatusType,
    "LESSON_SCHEDULING_STATUS_COMPLETED" | "LESSON_SCHEDULING_STATUS_CANCELED"
>;

export const isAllowSaveDraftLesson = (
    lessonStatus: string
): lessonStatus is AllowSaveDraftLessonType => {
    if (!lessonStatus) return true;

    return [
        LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
    ].includes(LessonSchedulingStatus[lessonStatus]);
};

export const isLessonReportStatusType = (
    lessonReportStatus: string
): lessonReportStatus is LessonReportSubmittingStatusType => {
    if (!lessonReportStatus) return false;
    return Object.keys(LessonReportSubmittingStatusKeys).includes(lessonReportStatus);
};
