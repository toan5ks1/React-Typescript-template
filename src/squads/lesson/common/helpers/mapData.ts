// TODO: Refactor this file after this PR is merged
// map dynamic form field with real data of a student
import { ArrayElement } from "src/common/constants/types";
import {
    LessonReportBusinessRuleFieldIds,
    DynamicFieldProps,
    DynamicLabelValue,
    DynamicLabelValuesListWithStudentId,
    DynamicSection,
    PartnerFormDynamicFieldValueByPreviousReportQueried,
    LessonMemberByPreviousReportQueried,
} from "src/squads/lesson/common/types";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";
import { $enum } from "ts-enum-util";
import { StringKeyOf } from "ts-enum-util/src/types";

/**
 * @param studentLessonReportDetail - lesson report detail of student including dynamic data, get it from Lesson Report Details Table.
 * @param {DynamicFieldProps} field - dynamic field from dataConfig
 * @return {string | number} - value of dynamic label
 */
export const findValueOfDynamicLabel = (
    partnerDynamicFormValues: ArrayElement<
        ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_report_details"]
    >["partner_dynamic_form_field_values"],
    field: DynamicFieldProps
) => {
    const currentDynamicValue = partnerDynamicFormValues.find((dynamicFormField) => {
        return dynamicFormField.field_id === field.field_id;
    });

    switch (currentDynamicValue?.value_type) {
        case "VALUE_TYPE_INT":
            return currentDynamicValue.int_value;

        case "VALUE_TYPE_STRING":
            return currentDynamicValue.string_value;

        default:
            return currentDynamicValue?.string_value;
    }
};

// map dynamic sections with real data of a student
/**
 * @param studentLessonReportDetail - lesson report detail of student including dynamic data, get it from Lesson Report Details Table.
 * @param {{ sections: DynamicSection[] }} dataConfig - Data config, take it from partner_form_configs table
 * @return {DynamicLabelValue[]} - an array of dynamic label - value object
 */
export const mapDataConfigWithRealData = (
    studentLessonReportDetail: ArrayElement<
        ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_report_details"]
    >,
    dataConfig: { sections: DynamicSection[] }
) => {
    const dynamicLabelValues: DynamicLabelValue[] = [];
    dataConfig.sections.forEach((section) => {
        section.fields.forEach((field) => {
            if (field.value_type === "VALUE_TYPE_NULL") return;

            const isAttendanceFields = [
                String(LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS),
                String(LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK),
            ].includes(field.field_id);

            if (isAttendanceFields) return;

            const value = findValueOfDynamicLabel(
                studentLessonReportDetail.partner_dynamic_form_field_values,
                field
            );

            if (value)
                dynamicLabelValues.push({
                    field_id: field.field_id,
                    value,
                });
        });
    });
    return dynamicLabelValues;
};

// map dynamic sections with real data of a student
/**
 * @param lessonReportDetailsList - list of lesson report detail of student including dynamic data, get it from Lesson Report Details Table.
 * @param {{ sections: DynamicSection[] }} dataConfig - Data config, take it from partner_form_configs table
 * @return {DynamicLabelValuesListWithStudentId[]} - an array of list of dynamic label-values and student id
 */
export const transformIntoDynamicLabelValueList = (
    lessonReportDetailsList: ArrayElement<
        LessonReportByLessonIdQuery["lesson_reports"]
    >["lesson_report_details"],
    dataConfig: { sections: DynamicSection[] }
): DynamicLabelValuesListWithStudentId[] => {
    return lessonReportDetailsList.map((lessonReportDetail) => {
        return {
            studentId: lessonReportDetail.student.student_id,
            dynamicLabelValues: mapDataConfigWithRealData(lessonReportDetail, dataConfig),
        };
    });
};

/// PREVIOUS REPORT ///

/**
 * @returns  previous report details of student include fields and values
 * @param dataConfig all fields config of one partner in partner form config
 * @param dynamicValues all values for one lesson report details of student in partner form dynamic field values
 * @param attendance include atendance status and attendance remark
 */
export const mapDataForPreviousReport = (
    dataConfig: DynamicSection[],
    dynamicValues: ArrayElement<PartnerFormDynamicFieldValueByPreviousReportQueried>[],
    attendance: ArrayElement<LessonMemberByPreviousReportQueried>
): DynamicLabelValue[] => {
    const dynamicConfigFields: DynamicFieldProps[] = dataConfig.flatMap(
        (section) => section.fields
    );

    const dynamicLabelValues: DynamicLabelValue[] = [];

    dynamicConfigFields.forEach((field) => {
        if (field.value_type === "VALUE_TYPE_NULL") return;

        let value = null;
        switch (field.field_id) {
            case LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS:
                value = attendance.attendance_status;
                break;

            case LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK:
                value = attendance.attendance_remark;
                break;

            default:
                value = findValueOfDynamicLabelPreviousReport(dynamicValues, field);
                break;
        }

        if (value) dynamicLabelValues.push({ field_id: field.field_id, value });
    });

    return dynamicLabelValues;
};

/**
 * @returns value of field in partner form dynamic field values
 * @param dynamicValues all values for one lesson report details of student in partner form dynamic field values
 * @param field field in partner form config
 */
export const findValueOfDynamicLabelPreviousReport = (
    dynamicValues: ArrayElement<PartnerFormDynamicFieldValueByPreviousReportQueried>[],
    field: DynamicFieldProps
) => {
    const value = dynamicValues.find((dynamicValue) => dynamicValue.field_id === field.field_id);

    switch (value?.value_type) {
        case "VALUE_TYPE_INT":
            return value.int_value;

        case "VALUE_TYPE_STRING":
            return value.string_value;

        default:
            return value?.string_value;
    }
};

export type EnumKeysReturn<T> = Record<StringKeyOf<T>, StringKeyOf<T>>;

export function convertEnumKeys<T extends Record<StringKeyOf<T>, number | string>>(
    enumObj: T
): EnumKeysReturn<T> {
    const keys: StringKeyOf<T>[] = $enum(enumObj).getKeys();

    return keys.reduce((result, key: StringKeyOf<T>) => {
        result[key] = String(key) as StringKeyOf<T>;
        return result;
    }, {} as EnumKeysReturn<T>);
}
