import { convertDateStringToDuration } from "src/common/utils/time";
import {
    toTimestampStartDate,
    toTimestampOriginDate,
    toTimestampEndDate,
} from "src/common/utils/timezone";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";
import { toBasicPagingProto } from "src/squads/lesson/service/utils";

import { LessonManagementServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import {
    CreateLessonRequest,
    CreateLessonSavingMethod,
    DeleteLessonRequest,
    Material,
    Recurrence,
    RetrieveLessonsFilterV2,
    RetrieveLessonsRequestV2,
    UpdateLessonRequest,
} from "manabuf/bob/v1/lessons_pb";

const setRequestData = (
    req: CreateLessonRequest | UpdateLessonRequest,
    lesson: NsLesson_Bob_LessonsService.UpsertLessons
) => {
    req.setStartTime(toTimestampOriginDate(lesson.startTime));
    req.setEndTime(toTimestampOriginDate(lesson.endTime));
    req.setTeachingMedium(lesson.teachingMedium);
    req.setTeachingMethod(lesson.teachingMethod);
    req.setTeacherIdsList(lesson.teacherIdsList);
    req.setCenterId(lesson.centerId);
    req.setSchedulingStatus(lesson.schedulingStatus);

    if (lesson.savingOption) {
        const savingOption = new CreateLessonRequest.SavingOption();
        savingOption.setMethod(lesson.savingOption.method);

        if (lesson.savingOption.recurrence?.endDate) {
            const recurrence = new Recurrence();
            recurrence.setEndDate(toTimestampOriginDate(lesson.savingOption.recurrence.endDate));
            savingOption.setRecurrence(recurrence);
        }

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
    req.setCourseId(lesson.courseId);
    req.setClassId(lesson.classId);
};

// TODO: Remove it when BE is done for updating publish lesson
const setRequestDataForCreatingLesson = (
    req: CreateLessonRequest,
    lesson: NsLesson_Bob_LessonsService.UpsertLessons
) => {
    req.setStartTime(toTimestampOriginDate(lesson.startTime));
    req.setEndTime(toTimestampOriginDate(lesson.endTime));
    req.setTeachingMedium(lesson.teachingMedium);
    req.setTeachingMethod(lesson.teachingMethod);
    req.setTeacherIdsList(lesson.teacherIdsList);
    req.setCenterId(lesson.centerId);
    req.setSchedulingStatus(lesson.schedulingStatus);

    if (lesson.savingOption) {
        const savingOption = new CreateLessonRequest.SavingOption();
        savingOption.setMethod(lesson.savingOption.method);

        if (lesson.savingOption.recurrence?.endDate) {
            const recurrence = new Recurrence();
            recurrence.setEndDate(toTimestampOriginDate(lesson.savingOption.recurrence.endDate));
            savingOption.setRecurrence(recurrence);
        }

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
    req.setCourseId(lesson.courseId);
    req.setClassId(lesson.classId);
};

export function newCreateLessonRequest(lesson: NsLesson_Bob_LessonsService.UpsertLessons) {
    const req = new CreateLessonRequest();
    setRequestDataForCreatingLesson(req, lesson);
    return req;
}

export function newUpdateLessonRequest(lesson: NsLesson_Bob_LessonsService.UpsertLessons) {
    if (!lesson.lessonId) throw formInvalidErr;

    const req = new UpdateLessonRequest();
    req.setLessonId(lesson.lessonId);
    setRequestData(req, lesson);

    return req;
}

export function newDeleteLessonRequest(
    lessonReportId: NsLesson_Bob_LessonsService.DeleteLessonRequest["lessonId"],
    lessonSavingOption?: CreateLessonSavingMethod
) {
    const req = new DeleteLessonRequest();

    if (lessonSavingOption === CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_RECURRENCE) {
        const savingOption = new DeleteLessonRequest.SavingOption();
        savingOption.setMethod(lessonSavingOption);
        req.setSavingOption(savingOption);
    }

    req.setLessonId(lessonReportId);

    return req;
}

// List
export function newRetrieveLessonsRequestV2Req(
    data: NsLesson_Bob_LessonsService.RetrieveLessonsRequest
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
    filterObj.setSchedulingStatusList(filterParams.schedulingStatusList);
    filterObj.setClassIdsList(filterParams.classIdsList);

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

class LessonManagementServiceBob extends InheritedGrpcServiceClient<LessonManagementServicePromiseClient> {
    async createLesson({ data: lesson }: { data: NsLesson_Bob_LessonsService.UpsertLessons }) {
        const request = newCreateLessonRequest(lesson);

        const response = await this._call("createLesson", request);

        return response.toObject();
    }

    async updateLesson({ data: lesson }: { data: NsLesson_Bob_LessonsService.UpsertLessons }) {
        const request = newUpdateLessonRequest(lesson);

        const response = await this._call("updateLesson", request);

        return response.toObject();
    }

    async deleteLesson({
        data: lesson,
    }: {
        data: NsLesson_Bob_LessonsService.DeleteLessonRequest;
    }) {
        const request = newDeleteLessonRequest(lesson.lessonId, lesson.savingOption?.method);

        const response = await this._call("deleteLesson", request);

        return response.toObject();
    }

    async retrieveLessons(params: NsLesson_Bob_LessonsService.RetrieveLessonsRequest) {
        const request = newRetrieveLessonsRequestV2Req(params);

        const response = await this._call("retrieveLessons", request);

        return response.toObject();
    }
}

const lessonsManagementServiceBob = new LessonManagementServiceBob(
    LessonManagementServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonsManagementServiceBob;
