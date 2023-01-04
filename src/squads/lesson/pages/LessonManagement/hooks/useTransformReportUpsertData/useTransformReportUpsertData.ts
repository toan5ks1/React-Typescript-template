import { useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import {
    DynamicAutocompleteOptionProps,
    DynamicFieldsComponentType,
    DynamicSection,
    LessonForLessonReportQueried,
    LessonReportBusinessRuleFieldIds,
    PartnerFormConfigLatestQueried,
} from "src/squads/lesson/common/types";
import {
    convertToArray,
    convertToBoolean,
    convertToNumber,
    convertToString,
} from "src/squads/lesson/common/utils";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { ValueType } from "manabuf/bob/v1/lessons_pb";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    LessonManagementLessonReportDetailData,
    LessonManagementReportsIndividualData,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import {
    getAttendanceStatusOption,
    getComponentType,
    getNonNullableValueType,
} from "src/squads/lesson/pages/LessonManagement/common/utils";
import useGetAutocompleteOptionForUpsertForm from "src/squads/lesson/pages/LessonManagement/hooks/useGetAutocompleteOptionForUpsertForm";

type LessonData = LessonForLessonReportQueried;
type LessonReports = ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>;
type Students = LessonData["lesson_members"];
type LessonReportDetails = LessonReports["lesson_report_details"];
type PartnerDynamicFormFieldValues =
    ArrayElement<LessonReportDetails>["partner_dynamic_form_field_values"];

export type ConvertLessonReportDataProps = {
    lessonData: LessonData;
    lessonReports?: LessonReports | null;
};

export interface ConvertLessonReportDataReturn {
    lessonReportData: LessonManagementReportsIndividualData;
    partnerFormConfig?: PartnerFormConfigLatestQueried;
}

export interface UseTransformReportUpsertDataReturn {
    convertLessonReportData: (props: ConvertLessonReportDataProps) => ConvertLessonReportDataReturn;
}

const getValueAndComponentType = (
    fieldId: ArrayElement<PartnerDynamicFormFieldValues>["field_id"],
    formSections: DynamicSection[]
) => {
    const valueType = getNonNullableValueType(fieldId, formSections);
    const componentType = getComponentType(fieldId, formSections);

    return {
        valueType,
        componentType,
    };
};

type PartnerDynamicFormFieldValue =
    | DynamicAutocompleteOptionProps
    | string
    | number
    | boolean
    | undefined;

type PartnerDynamicFormFieldObject = { [key: string]: PartnerDynamicFormFieldValue };

type AttendanceValue = {
    [LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS]: DynamicAutocompleteOptionProps | null;
    [LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK]: string | null;
};

/**
 * @returns the function change lesson report details values to default values for upsert form
 * @param lessonData include lesson information, such as lessonId, teachers, lessonMembers, start/end time
 * @param lessonReports reports of above lesson
 */
const useTransformReportUpsertData = (): UseTransformReportUpsertDataReturn => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const getAutocompleteOption = useGetAutocompleteOptionForUpsertForm();

    const getAttendanceValues = useCallback(
        (student: ArrayElement<Students>): AttendanceValue => {
            const attendanceValues: AttendanceValue = {
                attendance_status: null,
                attendance_remark: null,
            };

            const attendance = getAttendanceStatusOption(
                convertToString(student.attendance_status),
                tLessonManagement
            );

            if (attendance) {
                Object.assign(attendanceValues, {
                    [LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS]: attendance,
                });
            }

            const attendanceRemark = student.attendance_remark;

            if (attendanceRemark) {
                Object.assign(attendanceValues, {
                    [LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK]: attendanceRemark,
                });
            }

            return attendanceValues;
        },
        [tLessonManagement]
    );

    const getPartnerDynamicFormFieldValues = useCallback(
        (
            partnerDynamicFormFields: PartnerDynamicFormFieldValues | undefined,
            formSections: DynamicSection[]
        ): PartnerDynamicFormFieldObject => {
            if (!partnerDynamicFormFields) return {};

            const partnerDynamicFormFieldValues = {};
            const assignValue = (key: string, value: PartnerDynamicFormFieldValue) => {
                Object.assign(partnerDynamicFormFieldValues, { [key]: value });
            };

            partnerDynamicFormFields.forEach((formFieldValue) => {
                const formFieldKey = formFieldValue.field_id;

                const { valueType, componentType } = getValueAndComponentType(
                    formFieldValue.field_id,
                    formSections
                );

                const isAutocompleteComponent =
                    valueType !== undefined &&
                    componentType === DynamicFieldsComponentType.AUTOCOMPLETE;

                if (isAutocompleteComponent) {
                    /**
                     * Transform to autocomplete option
                     * @field formFieldValue.field_id - homework_status
                     * @field formFieldValue.string_value - "COMPLETED"
                     *
                     * @returns { homework_status: { key: "COMPLETED", value: "translatedValue" } }
                     */
                    const value = getAutocompleteOption({
                        fieldId: formFieldValue.field_id,
                        fieldValue: convertToString(formFieldValue.string_value),
                        formSections,
                    });

                    assignValue(formFieldKey, value);
                } else {
                    /**
                     * @field formFieldValue.field_id - homework_remark
                     * @field formFieldValue[value_type] - value
                     *
                     * @returns { homework_remark: value_based_on_value_type }
                     */
                    switch (valueType) {
                        case ValueType.VALUE_TYPE_STRING:
                            assignValue(formFieldKey, convertToString(formFieldValue.string_value));
                            break;

                        case ValueType.VALUE_TYPE_INT:
                            assignValue(formFieldKey, convertToNumber(formFieldValue.int_value));
                            break;

                        case ValueType.VALUE_TYPE_BOOL:
                            assignValue(formFieldKey, convertToBoolean(formFieldValue.bool_value));
                            break;

                        // TODO: Implement cases for list/set value type
                        default:
                            break;
                    }
                }
            });

            return partnerDynamicFormFieldValues;
        },
        [getAutocompleteOption]
    );

    const convertLessonReportData = useCallback(
        ({ lessonData, lessonReports }: ConvertLessonReportDataProps) => {
            const lessonId = lessonData.lesson_id;
            const students = lessonData.lesson_members;
            const lessonReportId = convertToString(lessonReports?.lesson_report_id);

            const partnerFormConfig: ConvertLessonReportDataReturn["partnerFormConfig"] = {
                form_config_id: convertToString(lessonReports?.partner_form_config?.form_config_id),
                form_config_data: lessonReports?.partner_form_config?.form_config_data,
            };

            const formSections: DynamicSection[] = convertToArray(
                partnerFormConfig?.form_config_data?.sections
            );

            const lessonReportDetails: LessonManagementLessonReportDetailData[] = students.map(
                (student) => {
                    const studentReport = lessonReports?.lesson_report_details.find(
                        (reportDetail) => {
                            return reportDetail.student.student_id === student.user.user_id;
                        }
                    );

                    const attendanceValues = getAttendanceValues(student);

                    const partnerDynamicFormFieldValues = getPartnerDynamicFormFieldValues(
                        studentReport?.partner_dynamic_form_field_values,
                        formSections
                    );

                    return {
                        student,
                        lessonId: convertToString(lessonReports?.lesson_id),
                        dynamicFields: {
                            ...attendanceValues,
                            ...partnerDynamicFormFieldValues,
                        },
                    };
                }
            );

            const lessonReportData: ConvertLessonReportDataReturn["lessonReportData"] = {
                lessonId,
                students,
                lessonReportId,
                lessonReportDetails,
            };

            return { lessonReportData, partnerFormConfig };
        },
        [getAttendanceValues, getPartnerDynamicFormFieldValues]
    );

    return { convertLessonReportData };
};

export default useTransformReportUpsertData;
