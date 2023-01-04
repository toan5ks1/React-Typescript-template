import { isEmpty } from "lodash";
import { getEnumString } from "src/common/constants/helper";
import {
    ArrayElement,
    CourseObjectType,
    LessonReportObjectType,
    LocationObjectType,
    TeacherObjectType,
} from "src/common/constants/types";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    ClassObjectType,
    LessonManagementStudentInfo,
    StudentCourseSubscriptionsQueried,
} from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";
import {
    LessonSchedulingStatus,
    LessonTeachingMedium,
    LessonTeachingMethod,
} from "manabuf/common/v1/enums_pb";

import {
    LessonItem,
    LessonManagementUpsertFormType,
    LessonUpsertProps,
    LessonSavingMethodKeys,
    LessonSavingMethodType,
    LessonTeachingMediumKeys,
    LessonTeachingMediumType,
    LessonTeachingMethodKeys,
    LessonTeachingMethodType,
    SavingOptionType,
    LessonStatusType,
} from "./types";

import { isLessonReportStatusType } from "src/squads/lesson/pages/LessonManagement/common/utils";

export const mapDataToLessonListItem = (
    lessonResponseItemList: NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson[],
    lessonReportObject?: LessonReportObjectType,
    teacherObject?: TeacherObjectType,
    centerObject?: LocationObjectType,
    courseObject?: CourseObjectType,
    classObject?: ClassObjectType
): LessonItem[] => {
    if (!arrayHasItem(lessonResponseItemList)) return [];

    const lessonList: LessonItem[] = [];

    lessonResponseItemList.map(
        (originLesson: NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson) => {
            const teachingMethod = getEnumString(
                LessonTeachingMethod,
                originLesson.teachingMethod
            ) as LessonTeachingMethodType;

            const teachingMedium = getEnumString(
                LessonTeachingMedium,
                originLesson.teachingMedium
            ) as LessonTeachingMediumType;

            const lessonStatus = getEnumString(
                LessonSchedulingStatus,
                originLesson.schedulingStatus
            ) as LessonStatusType;

            const lessonItem: LessonItem = {
                id: originLesson.id,
                teachingMethod,
                teachingMedium,
                lessonStatus,
            };

            if (
                !lessonItem.lessonReportStatus &&
                lessonReportObject &&
                !isEmpty(lessonReportObject)
            ) {
                const lessonReportStatus = lessonReportObject[originLesson.id];

                if (isLessonReportStatusType(lessonReportStatus))
                    lessonItem.lessonReportStatus = lessonReportStatus;
            }

            if (!lessonItem.teacherNames && teacherObject && !isEmpty(teacherObject)) {
                const teachers: string[] = [];

                originLesson.teacherIdsList.forEach((id: string) => {
                    teacherObject[id] && teachers.push(teacherObject[id]);
                });

                lessonItem.teacherNames = teachers.join(", ");
            }

            if (!lessonItem.centerName && centerObject && !isEmpty(centerObject)) {
                const centerName = centerObject[originLesson.centerId] || "";

                lessonItem.centerName = centerName;
            }

            if (!lessonItem.courseName && courseObject && !isEmpty(courseObject)) {
                const courseName = courseObject[originLesson.courseId] || "";

                lessonItem.courseName = courseName;
            }

            if (!lessonItem.className && classObject && !isEmpty(classObject)) {
                const className = classObject[originLesson.classId] || "";

                lessonItem.className = className;
            }

            if (!lessonItem.lessonDate && !lessonItem.lessonTime) {
                const startDateValue = convertTimestampToDate(originLesson.startTime);
                const endDateValue = convertTimestampToDate(originLesson.endTime);
                const startTime = formatDate(startDateValue, "HH:mm");
                const endTime = formatDate(endDateValue, "HH:mm");

                lessonItem.lessonDate = formatDate(startDateValue, "yyyy/LL/dd");
                lessonItem.lessonTime = `${startTime} - ${endTime}`;
            }

            lessonList.push(lessonItem);
        }
    );

    return lessonList;
};

// Edit page

const mapTeachersDetailsTypeToFormType = (
    lessonId: NonNullable<LessonUpsertProps["lesson"]>["lesson_id"],
    lessonDetailsTeachers: NonNullable<LessonUpsertProps["lesson"]>["lessons_teachers"]
): LessonManagementUpsertFormType["teachers"] => {
    const teachers: LessonManagementUpsertFormType["teachers"] =
        lessonDetailsTeachers.map((teacher) => {
            if (!teacher.teacher.users) {
                window.warner?.warn(`Missing teacher for lesson: ${lessonId}`);
                return {
                    name: "Missing teacher name",
                    user_id: "",
                };
            }

            return {
                ...teacher.teacher.users,
            };
        }) || [];

    return teachers;
};

const findLocationIdFromSubscriptionsData = (
    lessonMember: ArrayElement<NonNullable<LessonUpsertProps["lesson"]>["lesson_members"]>,
    studentSubscriptions: StudentCourseSubscriptionsQueried | undefined
) => {
    if (!studentSubscriptions || !arrayHasItem(studentSubscriptions)) return undefined;

    const location = studentSubscriptions.find((subscription) => {
        const matchCourse = subscription.courseId === lessonMember.course?.course_id;
        const matchStudent = subscription.studentId === lessonMember.user.user_id;

        return matchCourse && matchStudent;
    });

    return location ? pick1stElement(location.locationIdsList) : undefined;
};

const mapLearnersDetailsTypeToFormType = (
    lessonMembers: NonNullable<LessonUpsertProps["lesson"]>["lesson_members"],
    studentSubscriptions: StudentCourseSubscriptionsQueried | undefined
): LessonManagementStudentInfo[] => {
    const learners: LessonManagementStudentInfo[] = lessonMembers.map((lessonMember) => {
        const attendanceStatus: StudentAttendStatus = lessonMember.attendance_status
            ? StudentAttendStatus[lessonMember.attendance_status]
            : StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY;

        const courseId = lessonMember.course?.course_id || "MISSING COURSE ID";
        // TODO: Decide unique id for student info table
        // Because lesson_member does not include student_subscription_id
        // We have no unique id for student info table
        const studentSubscriptionId = lessonMember.user.user_id + courseId;

        return {
            course: {
                courseId,
                courseName: lessonMember.course?.name || "MISSING COURSE NAME",
            },
            grade: lessonMember.user.student?.current_grade,
            student: {
                studentName: lessonMember.user.name,
                studentId: lessonMember.user.user_id,
            },
            attendanceStatus,
            studentSubscriptionId,
            locationId: findLocationIdFromSubscriptionsData(lessonMember, studentSubscriptions),
        };
    });
    return learners;
};

const isLessonTeachingMethodType = (
    teachingMethod: string | undefined | null
): teachingMethod is LessonTeachingMethodType => {
    if (!teachingMethod) return false;
    return Object.keys(LessonTeachingMethodKeys).includes(teachingMethod);
};

const isLessonTeachingMediumType = (
    teachingMedium: string | undefined | null
): teachingMedium is LessonTeachingMediumType => {
    if (!teachingMedium) return false;
    return Object.keys(LessonTeachingMediumKeys).includes(teachingMedium);
};

export const mapLessonDetailsTypeToFormType = (
    lesson: NonNullable<LessonUpsertProps["lesson"]>,
    centerName: LessonUpsertProps["centerName"],
    className: LessonUpsertProps["className"],
    mediasList: LessonUpsertProps["mediasList"],
    scheduler?: LessonUpsertProps["scheduler"]
): LessonManagementUpsertFormType => {
    const {
        lesson_id,
        class_id,
        center_id,
        start_time,
        end_time,
        lessons_teachers,
        teaching_method,
        teaching_medium,
        lesson_members,
        studentSubscriptions,
        course,
    } = lesson;

    const teachingMedium = isLessonTeachingMediumType(teaching_medium)
        ? teaching_medium
        : "LESSON_TEACHING_MEDIUM_ONLINE";

    const teachingMethod = isLessonTeachingMethodType(teaching_method)
        ? teaching_method
        : "LESSON_TEACHING_METHOD_INDIVIDUAL";

    const courseAndClass: Pick<LessonManagementUpsertFormType, "course" | "classData"> = {
        course: undefined,
        classData: undefined,
    };

    const isIndividualMethod = teachingMethod === "LESSON_TEACHING_METHOD_INDIVIDUAL";

    if (!isIndividualMethod && course) {
        Object.assign(courseAndClass, {
            course: { course_id: course.course_id, name: course.name },
        });
    }

    if (!isIndividualMethod && class_id && className) {
        Object.assign(courseAndClass, {
            classData: { class_id, name: className },
        });
    }

    let method: LessonSavingMethodType;
    if (!scheduler) {
        method = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
    } else {
        method =
            scheduler.freq === SavingOptionType.once
                ? LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME
                : LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
    }

    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    const setEndDate = () => {
        if (method === LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME) return null;
        if (scheduler?.end_date) return new Date(scheduler.end_date);
        return null;
    };
    const result: LessonManagementUpsertFormType = {
        teachers: mapTeachersDetailsTypeToFormType(lesson_id, lessons_teachers),
        teachingMethod,
        teachingMedium,
        // There's no way to set default behavior for center based on assumption
        // It is possible to set this using the center of the current account but it depends on what PMs wants to do
        // TODO: confirm with PMs
        center: {
            locationId: center_id || "",
            name: centerName || "MISSING CENTER NAME",
        },
        date: startTime,
        startTime,
        endTime,
        method,
        materialsList: mediasList || [],
        learners: mapLearnersDetailsTypeToFormType(lesson_members, studentSubscriptions),

        startTimeAutocomplete: {
            label: formatDate(startTime, "HH:mm"),
            value: startTime,
        },
        endTimeAutocomplete: {
            label: formatDate(endTime, "HH:mm"),
            value: endTime,
        },

        location: center_id && centerName ? { locationId: center_id, name: centerName } : undefined,
        endDate: setEndDate(),
        methodSaving: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME, // for edit recurring lesson
        ...courseAndClass,
    };

    return result;
};
