import { useCallback } from "react";

import { DynamicSection, LessonReportBusinessRuleFieldIds } from "src/squads/lesson/common/types";
import {
    isDynamicAutocompleteOptionProps,
    convertToBoolean,
    convertToNumber,
    convertToString,
} from "src/squads/lesson/common/utils";
import { WriteLessonReportRequestType } from "src/squads/lesson/service/bob/lesson-reports-service/types";

import { DynamicFieldValue, StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import {
    LessonManagementLessonReportDetailData,
    LessonManagementReportsIndividualData,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { getNonNullableValueType } from "src/squads/lesson/pages/LessonManagement/common/utils";

export interface UseTransformReportSubmitDataProps {
    rawData: LessonManagementReportsIndividualData;
    formSections: DynamicSection[];
}

/**
 * Transform lesson report detail to manabuf type
 * @param lessonReportDetail report detail of lesson report
 * @param lessonReportDetail.lessonId lesson id of lesson report
 * @param lessonReportDetail.student lesson member of lesson report
 *
 * @param lessonReportDetail.dynamicFields object includes dynamic field values
 * @example { score: 100, homework: "completed" }
 *
 * @param formSections sections of "partner form config" - Example: "mockDataConfig" from {@link src/squads/lesson/test-utils/lesson-report.ts}
 *
 * @returns the object match with manabuf of submit data object type
 */
const transformLessonReportDetail = (
    lessonReportDetail: LessonManagementLessonReportDetailData,
    formSections: DynamicSection[]
) => {
    let dynamicFields = lessonReportDetail.dynamicFields;

    const attendanceStatusField = dynamicFields[LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS];
    const attendanceStatus = isDynamicAutocompleteOptionProps(attendanceStatusField)
        ? StudentAttendStatus[attendanceStatusField.key]
        : StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY;

    const attendanceRemark = convertToString(
        dynamicFields[LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK]
    );

    delete dynamicFields[LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS];
    delete dynamicFields[LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK];

    const fieldValuesList = Object.keys(lessonReportDetail.dynamicFields).reduce(
        (dynamicFieldValues: DynamicFieldValue.AsObject[], section_id) => {
            const valueType = getNonNullableValueType(section_id, formSections);

            if (valueType !== undefined) {
                const originFieldValue = dynamicFields[section_id];
                const fieldValue = isDynamicAutocompleteOptionProps(originFieldValue)
                    ? originFieldValue.key
                    : originFieldValue;

                const dynamicValue: DynamicFieldValue.AsObject = {
                    dynamicFieldId: section_id,
                    valueType,
                    boolValue: convertToBoolean(fieldValue),
                    intValue: convertToNumber(fieldValue),
                    stringValue: convertToString(fieldValue),
                    fieldRenderGuide: "",
                };

                dynamicFieldValues.push(dynamicValue);
            }

            return dynamicFieldValues;
        },
        []
    );

    return {
        attendanceStatus,
        attendanceRemark,
        fieldValuesList,
        courseId: convertToString(lessonReportDetail.student.course?.course_id),
        studentId: lessonReportDetail.student.user.user_id,
    };
};

export type UseTransformReportSubmitDataReturn = (
    props: UseTransformReportSubmitDataProps
) => WriteLessonReportRequestType;

const useTransformReportSubmitData = (): UseTransformReportSubmitDataReturn => {
    const transformReportSubmitData = useCallback(
        ({ rawData, formSections }: UseTransformReportSubmitDataProps) => {
            const cloneData: LessonManagementReportsIndividualData = JSON.parse(
                JSON.stringify(rawData)
            );

            const writeLessonReportData: WriteLessonReportRequestType = {
                lessonId: cloneData.lessonId,
                lessonReportId: cloneData.lessonReportId,
                detailsList: cloneData.lessonReportDetails.map((lessonReportDetail) =>
                    transformLessonReportDetail(lessonReportDetail, formSections)
                ),
            };

            return writeLessonReportData;
        },
        []
    );

    return transformReportSubmitData;
};

export default useTransformReportSubmitData;
