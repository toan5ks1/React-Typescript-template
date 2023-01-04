import { toNonUndefinedArrayValueList } from "src/services/utils";

import {
    WriteLessonReportRequest,
    DynamicFieldValue,
    ValueType,
    DeleteLessonReportRequest,
} from "manabuf/bob/v1/lessons_pb";

import { NsBobLessonReportService } from "./types";

const getFieldValuesList = (valuesList: DynamicFieldValue.AsObject[]): DynamicFieldValue[] => {
    const fieldValuesList = valuesList.map((fieldValue) => {
        let dynamicFieldValueData = new DynamicFieldValue();

        // Mandatory fields
        const { valueType, dynamicFieldId, fieldRenderGuide, boolValue, intValue, stringValue } =
            fieldValue;

        // Undefinable fields
        const { intArrayValue, intSetValue, stringArrayValue, stringSetValue } = fieldValue;

        dynamicFieldValueData.setValueType(valueType);
        dynamicFieldValueData.setDynamicFieldId(dynamicFieldId);
        dynamicFieldValueData.setFieldRenderGuide(fieldRenderGuide);

        switch (valueType) {
            case ValueType.VALUE_TYPE_BOOL:
                dynamicFieldValueData.setBoolValue(boolValue);
                break;

            case ValueType.VALUE_TYPE_INT:
                dynamicFieldValueData.setIntValue(intValue);
                break;

            case ValueType.VALUE_TYPE_STRING:
                dynamicFieldValueData.setStringValue(stringValue);
                break;

            case ValueType.VALUE_TYPE_INT_ARRAY: {
                const intArrayValueType = new DynamicFieldValue.IntArrayValue();

                const arrayValueList = toNonUndefinedArrayValueList(intArrayValue?.arrayValueList);
                intArrayValueType.setArrayValueList(arrayValueList);
                dynamicFieldValueData.setIntArrayValue(intArrayValueType);

                break;
            }

            case ValueType.VALUE_TYPE_INT_SET: {
                const intSetValueType = new DynamicFieldValue.IntSetValue();

                const arrayValueList = toNonUndefinedArrayValueList(intSetValue?.arrayValueList);
                intSetValueType.setArrayValueList(arrayValueList);
                dynamicFieldValueData.setIntSetValue(intSetValueType);

                break;
            }

            case ValueType.VALUE_TYPE_STRING_ARRAY: {
                const stringArrayValueType = new DynamicFieldValue.StringArrayValue();

                const arrayValueList = toNonUndefinedArrayValueList(
                    stringArrayValue?.arrayValueList
                );
                stringArrayValueType.setArrayValueList(arrayValueList);
                dynamicFieldValueData.setStringArrayValue(stringArrayValueType);

                break;
            }

            case ValueType.VALUE_TYPE_STRING_SET:
            default: {
                const stringSetValueType = new DynamicFieldValue.StringSetValue();

                const arrayValueList = toNonUndefinedArrayValueList(stringSetValue?.arrayValueList);
                stringSetValueType.setArrayValueList(arrayValueList);
                dynamicFieldValueData.setStringSetValue(stringSetValueType);

                break;
            }
        }

        return dynamicFieldValueData;
    });

    return fieldValuesList;
};

export function upsertLessonReportRequest(
    lessonReport: NsBobLessonReportService.UpsertLessonReport
) {
    const req = new WriteLessonReportRequest();

    const { lessonId, lessonReportId, detailsList } = lessonReport;

    const lessonReportDetails = detailsList.map((detail) => {
        const lessonReportDetailData = new WriteLessonReportRequest.LessonReportDetail();

        const { courseId, studentId, attendanceStatus, attendanceRemark } = detail;
        const fieldValuesList = getFieldValuesList(detail.fieldValuesList);

        lessonReportDetailData.setCourseId(courseId);
        lessonReportDetailData.setStudentId(studentId);
        lessonReportDetailData.setAttendanceStatus(attendanceStatus);
        lessonReportDetailData.setAttendanceRemark(attendanceRemark);
        lessonReportDetailData.setFieldValuesList(fieldValuesList);

        return lessonReportDetailData;
    });

    req.setLessonId(lessonId);
    req.setLessonReportId(lessonReportId);
    req.setDetailsList(lessonReportDetails);

    return req;
}

export function deleteLessonReportRequest(
    lessonReportId: NsBobLessonReportService.DeleteLessonReport["lessonReportId"]
) {
    const req = new DeleteLessonReportRequest();
    req.setLessonReportId(lessonReportId);

    return req;
}
