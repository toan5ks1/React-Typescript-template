import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import {
    InvalidParamError,
    MutationLessonIndividualReportParams,
} from "src/squads/lesson/service/service-types";
import { createEmptyResponse } from "src/squads/lesson/service/utils/utils";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

export function validateEmptyArray(
    params: string | string[] | number | number[] | null | undefined
) {
    if (typeof params === "undefined" || !arrayHasItem(params)) {
        return createEmptyResponse([]);
    }
}

export function validateEmptyVariables(
    param: string | number | undefined | null,
    result: undefined | [] = undefined
) {
    if (typeof param === "undefined" || param === "") {
        return createEmptyResponse(result);
    }
}

export const getInvalidParamErrorsOfNonSensitiveStringVariables = (
    stringVariable: Record<string, string | undefined | null>
): NonNullable<InvalidParamError["errors"]> => {
    const variableKeys = Object.keys(stringVariable);

    const errors: InvalidParamError["errors"] = [];

    variableKeys.forEach((key) => {
        if (!Boolean(stringVariable[key])) errors.push({ field: key });
    });

    return errors;
};

export const getInvalidParamErrorsOfNonSensitiveNumberVariables = (
    stringVariable: Record<string, number | undefined | null>
): NonNullable<InvalidParamError["errors"]> => {
    const variableKeys = Object.keys(stringVariable);

    const errors: InvalidParamError["errors"] = [];

    variableKeys.forEach((key) => {
        if (typeof stringVariable[key] !== "number") errors.push({ field: key });
    });

    return errors;
};

export const getInvalidParamErrorsOfLessonUpsertPayload = (
    data: NsLesson_Bob_LessonsService.UpsertLessons,
    isSavingDraftLesson?: boolean
): NonNullable<InvalidParamError["errors"]> => {
    const {
        centerId,
        teacherIdsList,
        studentInfoListList,
        teachingMedium,
        teachingMethod,
        savingOption,
    } = data;

    const errors: InvalidParamError["errors"] = [];

    if (!centerId) errors.push({ field: "centerId" });

    if (!savingOption) errors.push({ field: "savingOption" });
    else if (!Object.values(CreateLessonSavingMethod).includes(savingOption.method))
        errors.push({ field: "savingOption" });

    if (!Object.values(LessonTeachingMedium).includes(teachingMedium))
        errors.push({ field: "teachingMedium" });

    if (!Object.values(LessonTeachingMethod).includes(teachingMethod))
        errors.push({ field: "teachingMethod" });

    if (!isSavingDraftLesson && !arrayHasItem(teacherIdsList))
        errors.push({ field: "teacherIdsList" });
    if (!isSavingDraftLesson && !arrayHasItem(studentInfoListList))
        errors.push({ field: "studentInfoListList" });

    return errors;
};

export const getInvalidParamErrorsOfLessonReportPayload = (
    data: Required<
        MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
    >,
    isSubmittedLessonReport: boolean
): NonNullable<InvalidParamError["errors"]> => {
    const { lessonId, lessonReportId, detailsList } = data.data;

    const errors: InvalidParamError["errors"] = [];

    if (!lessonId) errors.push({ field: "lessonId", fieldValueIfNotSensitive: lessonId });

    if (typeof lessonReportId === "undefined")
        errors.push({ field: "lessonReportId", fieldValueIfNotSensitive: lessonReportId });

    detailsList.forEach((detail) => {
        const { studentId, courseId, attendanceStatus } = detail;
        if (!studentId) errors.push({ field: "studentId" });
        if (!courseId) errors.push({ field: "courseId", fieldValueIfNotSensitive: courseId });
        if (isSubmittedLessonReport && !attendanceStatus)
            errors.push({ field: "attendanceStatus", fieldValueIfNotSensitive: attendanceStatus });
    });

    return errors;
};
