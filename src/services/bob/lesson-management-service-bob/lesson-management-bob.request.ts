import { convertDateStringToDuration } from "src/common/utils/time";
import {
    toTimestampStartDate,
    toTimestampOriginDate,
    toTimestampEndDate,
} from "src/common/utils/timezone";
import { formInvalidErr } from "src/internals/errors";
import { toBasicPagingProto } from "src/services/utils";

import {
    CreateLessonRequest,
    CreateLessonSavingMethod,
    DeleteLessonRequest,
    Material,
    RetrieveLessonsFilterV2,
    RetrieveLessonsRequestV2,
    UpdateLessonRequest,
} from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import { NsBobLessonManagementService } from "./types";

// Upsert
export function validateUpsertLesson(
    data: NsBobLessonManagementService.UpsertLessons,
    mode: "CREATE" | "EDIT"
) {
    if (mode === "EDIT") {
        if (!data.lessonId) throw formInvalidErr;
    }

    if (!(data && data.centerId && data.startTime && data.endTime && data.savingOption)) {
        throw formInvalidErr;
    }

    if (
        !Object.values(LessonTeachingMedium).includes(data.teachingMedium) ||
        !Object.values(LessonTeachingMethod).includes(data.teachingMethod) ||
        !Object.values(CreateLessonSavingMethod).includes(data.savingOption?.method)
    ) {
        throw formInvalidErr;
    }

    if (data.teacherIdsList?.length <= 0 || data.studentInfoListList?.length <= 0) {
        throw formInvalidErr;
    }
}

const setRequestData = (
    req: CreateLessonRequest | UpdateLessonRequest,
    lesson: NsBobLessonManagementService.UpsertLessons
) => {
    req.setStartTime(toTimestampOriginDate(lesson.startTime));
    req.setEndTime(toTimestampOriginDate(lesson.endTime));
    req.setTeachingMedium(lesson.teachingMedium);
    req.setTeachingMethod(lesson.teachingMethod);
    req.setTeacherIdsList(lesson.teacherIdsList);
    req.setCenterId(lesson.centerId);

    if (lesson.savingOption) {
        const savingOption = new CreateLessonRequest.SavingOption();
        savingOption.setMethod(lesson.savingOption.method);
        req.setSavingOption(savingOption);
    }

    const studentInfoListList: CreateLessonRequest.StudentInfo[] = lesson.studentInfoListList.map(
        (studentInfo) => {
            const result = new CreateLessonRequest.StudentInfo();
            result.setCourseId(studentInfo.courseId);
            result.setStudentId(studentInfo.studentId);
            result.setAttendanceStatus(studentInfo.attendanceStatus);
            return result;
        }
    );
    req.setStudentInfoListList(studentInfoListList);
    const materialsList: Material[] = lesson.mediaIds.map((mediaId) => {
        const result = new Material();
        result.setMediaId(mediaId);
        return result;
    });
    req.setMaterialsList(materialsList);
};

export function newCreateLessonRequest(lesson: NsBobLessonManagementService.UpsertLessons) {
    const req = new CreateLessonRequest();
    setRequestData(req, lesson);
    return req;
}

export function newUpdateLessonRequest(lesson: NsBobLessonManagementService.UpsertLessons) {
    if (!lesson.lessonId) throw formInvalidErr;

    const req = new UpdateLessonRequest();
    req.setLessonId(lesson.lessonId);
    setRequestData(req, lesson);

    return req;
}

export function newDeleteLessonRequest(
    lessonReportId: NsBobLessonManagementService.DeleteLessonRequest["lessonId"]
) {
    const req = new DeleteLessonRequest();
    req.setLessonId(lessonReportId);

    return req;
}

// List
export function newRetrieveLessonsRequestV2Req(
    data: NsBobLessonManagementService.RetrieveLessonsRequest
): RetrieveLessonsRequestV2 {
    // TODO: Currently i will return this error because object paging always from BE.
    // I think i will create new error with paging in another PR
    if (!data.paging) throw formInvalidErr;

    const req = new RetrieveLessonsRequestV2();

    const pagingObj = toBasicPagingProto(data.paging);

    const currentTime = toTimestampStartDate(data.currentTime);

    req.setPaging(pagingObj);
    req.setCurrentTime(currentTime);
    req.setLessonTime(data.lessonTime);
    req.setKeyword(data.keyword);
    req.setLocationIdsList(data.locationIdsList);

    const filterParams = data.filter;
    if (!filterParams) return req;

    const filterObj = new RetrieveLessonsFilterV2();
    filterObj.setDateOfWeeksList(filterParams.dateOfWeeksList);
    filterObj.setTimeZone(filterParams.timeZone);
    filterObj.setCenterIdsList(filterParams.centerIdsList);
    filterObj.setCourseIdsList(filterParams.courseIdsList);
    filterObj.setGradesList(filterParams.gradesList);
    filterObj.setStudentIdsList(filterParams.studentIdsList);
    filterObj.setTeacherIdsList(filterParams.teacherIdsList);

    const fromDate = filterParams.fromDate ? toTimestampStartDate(filterParams.fromDate) : null;
    filterObj.setFromDate(fromDate);

    const toDate = filterParams.toDate ? toTimestampEndDate(filterParams.toDate) : null;
    filterObj.setToDate(toDate);

    if (filterParams.fromTime) {
        const fromTimeDuration = convertDateStringToDuration(filterParams.fromTime);
        filterObj.setFromTime(fromTimeDuration);
    }

    if (filterParams.toTime) {
        const toTimeDuration = convertDateStringToDuration(filterParams.toTime);
        filterObj.setToTime(toTimeDuration);
    }

    req.setFilter(filterObj);
    return req;
}
