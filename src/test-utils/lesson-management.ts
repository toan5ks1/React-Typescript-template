import { NsBobLessonReportService } from "src/services/bob/lesson-reports-modifier-service-bob/types";

import { StudentAttendStatus, ValueType } from "manabuf/bob/v1/lessons_pb";

export const createMockUpsertLessonReportData = (
    valueType: ValueType
): NsBobLessonReportService.UpsertLessonReport => {
    const stringArrayValues = {
        arrayValueList: ["string", "value"],
    };

    const numberArrayValues = {
        arrayValueList: [1, 2, 3],
    };

    return {
        lessonId: "Test Lesson Id",
        lessonReportId: "Test Lesson Report Id",
        detailsList: [
            {
                attendanceRemark: "Test Attendance Remark",
                attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                courseId: "Test Course Id",
                studentId: "Test Student Id",
                fieldValuesList: [
                    {
                        valueType,
                        boolValue: true,
                        dynamicFieldId: "Test Dynamic Field Id",
                        intValue: 1,
                        stringValue: "String Value",
                        intArrayValue: numberArrayValues,
                        intSetValue: numberArrayValues,
                        stringArrayValue: stringArrayValues,
                        stringSetValue: stringArrayValues,
                        fieldRenderGuide: "Test Field Render Guide",
                    },
                ],
            },
        ],
    };
};
