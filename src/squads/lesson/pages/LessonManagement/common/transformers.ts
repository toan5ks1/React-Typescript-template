import { combineDateAndTime } from "src/common/utils/time";
import { Media } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";

import { CreateLessonSavingMethod, LessonStatus } from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import { Lessons } from "src/squads/lesson/__generated__/bob/root-types";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

export const transformDataToUpsertLessonManagement = (
    data: LessonManagementUpsertFormType,
    mediaIds: Media["media_id"][],
    schedulingStatus: LessonStatus,
    lessonId?: Lessons["lesson_id"]
): NsLesson_Bob_LessonsService.UpsertLessons => {
    const startTime = combineDateAndTime(data.date, data.startTime);
    const endTime = combineDateAndTime(data.date, data.endTime);

    const studentsInfoList: NsLesson_Bob_LessonsService.UpsertLessons["studentInfoListList"] =
        data.learners.map((studentInfo) => {
            return {
                attendanceStatus: studentInfo.attendanceStatus,
                courseId: studentInfo.course.courseId,
                studentId: studentInfo.student.studentId,
                locationId: studentInfo.locationId || "",
            };
        });

    const teacherIds = data.teachers.map((teacher) => {
        return teacher.user_id;
    });

    const { method, endDate } = data;

    const savingOption: NsLesson_Bob_LessonsService.UpsertLessons["savingOption"] = {
        method: CreateLessonSavingMethod[method],
    };

    if (endDate && method === "CREATE_LESSON_SAVING_METHOD_RECURRENCE") {
        const combineEndDateWithEndTime = combineDateAndTime(endDate, data.endTime); // To be able to write unit test
        savingOption.recurrence = { endDate: combineEndDateWithEndTime };
    }

    const result: NsLesson_Bob_LessonsService.UpsertLessons = {
        lessonId,
        startTime,
        endTime,
        centerId: data.center.locationId,
        mediaIds,
        teachingMedium: LessonTeachingMedium[data.teachingMedium],
        teachingMethod: LessonTeachingMethod[data.teachingMethod],
        studentInfoListList: studentsInfoList,
        teacherIdsList: teacherIds,
        savingOption: savingOption,
        classId: "",
        courseId: "",
        schedulingStatus,
    };

    return result;
};

export const transformDataToUpsertLessonManagementV2 = (
    data: LessonManagementUpsertFormType,
    mediaIds: Media["media_id"][],
    schedulingStatus: LessonStatus,
    lessonId?: Lessons["lesson_id"]
): NsLesson_Bob_LessonsService.UpsertLessons => {
    const {
        date,
        learners,
        teachers,
        teachingMedium,
        teachingMethod,
        method,
        endDate,
        ...nullableRest
    } = data;
    const { startTimeAutocomplete, endTimeAutocomplete, location, course, classData } =
        nullableRest;

    if (!startTimeAutocomplete?.value || !endTimeAutocomplete?.value || !location) {
        throw new Error("Invalid Params");
    }

    const startTime = combineDateAndTime(date, startTimeAutocomplete.value);
    const endTime = combineDateAndTime(date, endTimeAutocomplete.value);

    const studentInfoListList: NsLesson_Bob_LessonsService.UpsertLessons["studentInfoListList"] =
        learners.map((studentInfo) => {
            return {
                attendanceStatus: studentInfo.attendanceStatus,
                courseId: studentInfo.course.courseId,
                studentId: studentInfo.student.studentId,
                locationId: studentInfo.locationId || "",
            };
        });

    const teacherIdsList = teachers.map((teacher) => teacher.user_id);

    const teachingMethodValue = LessonTeachingMethod[teachingMethod];

    const groupTeachingFieldId = (fieldId: string | undefined) => {
        if (teachingMethod === "LESSON_TEACHING_METHOD_INDIVIDUAL" || !fieldId) return "";
        return fieldId;
    };

    const savingOption: NsLesson_Bob_LessonsService.UpsertLessons["savingOption"] = {
        method: CreateLessonSavingMethod[method],
    };

    if (endDate && method === "CREATE_LESSON_SAVING_METHOD_RECURRENCE") {
        const combineEndDateWithEndTime = combineDateAndTime(endDate, endTimeAutocomplete.value); // To be able to write unit test
        savingOption.recurrence = { endDate: combineEndDateWithEndTime };
    }

    const result: NsLesson_Bob_LessonsService.UpsertLessons = {
        lessonId,
        startTime,
        endTime,
        teacherIdsList,
        studentInfoListList,
        mediaIds,

        teachingMedium: LessonTeachingMedium[teachingMedium],
        teachingMethod: teachingMethodValue,
        savingOption,

        centerId: location.locationId,
        courseId: groupTeachingFieldId(course?.course_id),
        classId: groupTeachingFieldId(classData?.class_id),
        schedulingStatus,
    };

    return result;
};
