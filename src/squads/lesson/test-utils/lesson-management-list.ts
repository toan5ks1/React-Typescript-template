import {
    CourseManyType,
    CourseObjectType,
    LessonReportManyType,
    LessonReportObjectType,
    LocationManyType,
    LocationObjectType,
    PagingRequest,
    TeacherManyType,
    TeacherObjectType,
} from "src/common/constants/types";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { ClassManyType, ClassObjectType } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import { TableLessonsWithPagingProps } from "src/squads/lesson/pages/LessonManagement/components/Tables/TableLessonsWithPaging";

import { Timestamp } from "manabie-bob/google/protobuf/timestamp_pb";
import { RetrieveLessonsResponseV2 } from "manabuf/bob/v1/lessons_pb";
import {
    LessonSchedulingStatus,
    LessonTeachingMedium,
    LessonTeachingMethod,
} from "manabuf/common/v1/enums_pb";

import {
    LessonItem,
    LessonReportSubmittingStatusKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";

type MissingFieldsDataListLesson = "teacherNames";

// useLessonList hook
export const createMockPagingObject = (offsetString: string = ""): PagingRequest => ({
    limit: 10,
    offsetInteger: 0,
    offsetString: offsetString,
});

export const createMockTeacherMany = (id: string): TeacherManyType => {
    return {
        user_id: id,
        name: `Teacher ${id}`,
    };
};

export const createMockTeacherManyList = (): TeacherManyType[] => {
    const teacher01 = createMockTeacherMany("01");
    const teacher02 = createMockTeacherMany("02");
    return [teacher01, teacher02];
};

export const createMockTeacherObject = (): TeacherObjectType => {
    const teacher01 = createMockTeacherMany("01");
    const teacher02 = createMockTeacherMany("02");
    return { [teacher01.user_id]: teacher01?.name, [teacher02.user_id]: teacher02?.name };
};

const createMockLessonReportStatusMany = (id: string): LessonReportManyType => ({
    lesson_id: id,
    lesson_report_id: `lesson_report_id_${id}`,
    report_submitting_status:
        LessonReportSubmittingStatusKeys.LESSON_REPORT_SUBMITTING_STATUS_SAVED,
});

const createMockLocationMany = (id: string): LocationManyType => ({
    location_id: `location_id_${id}`,
    name: `Location ${id}`,
});

const createMockCoursesMany = (id: string): CourseManyType => ({
    course_id: `courseId_${id}`,
    name: `Course ${id}`,
    school_id: 123,
});

const createMockClassesMany = (id: string): ClassManyType => ({
    class_id: `classId_${id}`,
    name: `Class ${id}`,
});

export const createMockLessonReportManyList = (lesson_ids: string[]): LessonReportManyType[] => {
    const lessonReportList: LessonReportManyType[] = lesson_ids.map((lessonId) => {
        return createMockLessonReportStatusMany(lessonId);
    });

    return lessonReportList;
};

export const createMockLocationManyList = (): LocationManyType[] => {
    const location = createMockLocationMany("01");
    return [location];
};

export const createMockCourseManyList = (): CourseManyType[] => {
    const course = createMockCoursesMany("01");
    return [course];
};

export const createMockClassManyList = (): ClassManyType[] => {
    const classes = createMockClassesMany("01");
    return [classes];
};

export const createMockLessonReportObject = (
    lessonReportList: LessonReportManyType[]
): LessonReportObjectType => {
    return lessonReportList.reduce(
        (result: LessonReportObjectType, lessonReport: LessonReportManyType) => {
            if (lessonReport.lesson_id)
                result[lessonReport.lesson_id] = lessonReport.report_submitting_status;
            return result;
        },
        {}
    );
};

export const createMockLocationObject = (): LocationObjectType => {
    const location1 = createMockLocationMany("01");
    return { [location1.location_id]: location1.name };
};

export const createMockCourseObject = (): CourseObjectType => {
    const course1 = createMockCoursesMany("01");
    return { [course1.course_id]: course1.name };
};

export const createMockClassObject = (): ClassObjectType => {
    const class1 = createMockClassesMany("01");
    return { [class1.class_id]: class1.name };
};

export const createMockRetrieveLessonsReponseItemList = (
    numberOfItems: number
): NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson[] => {
    const teacher1 = createMockTeacherMany("01");
    const teacher2 = createMockTeacherMany("02");
    const location = createMockLocationMany("01");
    const course = createMockCoursesMany("01");
    const classData = createMockClassesMany("01");
    const result: NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson[] = [];

    for (let index = 1; index <= numberOfItems; index++) {
        const item: NsLesson_Bob_LessonsService.RetrieveLessonsResponseLesson = {
            id: `Lesson_${index}`,
            name: `Lesson Name ${index}`,
            teacherIdsList: [teacher1.user_id, teacher2.user_id],
            centerId: location.location_id,
            startTime: { seconds: 1624400000, nanos: 0 },
            endTime: { seconds: 1624600000, nanos: 0 },
            teachingMedium: LessonTeachingMedium.LESSON_TEACHING_MEDIUM_ONLINE,
            teachingMethod: LessonTeachingMethod.LESSON_TEACHING_METHOD_INDIVIDUAL,
            courseId: course.course_id,
            classId: classData.class_id,
            schedulingStatus: LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        };

        result.push(item);
    }

    return result;
};

export const createMockRetrieveLesson = (): RetrieveLessonsResponseV2.AsObject => {
    return {
        itemsList: createMockRetrieveLessonsReponseItemList(10),
        nextPage: createMockPagingObject("Lesson_10"),
        previousPage: createMockPagingObject(),
        totalLesson: 10,
        totalItems: 10,
    };
};

// LessonManagementList
export const createMockLessonItemList = (
    numberOfIndividualLesson: number,
    hasLessonGroup?: boolean,
    missingFields?: Array<MissingFieldsDataListLesson>
): LessonItem[] => {
    const result: LessonItem[] = [];

    // I have hard-coded the TimeStamp object.
    // Because I want to assume the data returns the correct value when fetching from the Back End
    const startTimeOrigin: Timestamp.AsObject = { seconds: 1624400000, nanos: 0 };
    const endTimeOrigin: Timestamp.AsObject = { seconds: 1624600000, nanos: 0 };

    const startDateValue = convertTimestampToDate(startTimeOrigin);
    const endDateValue = convertTimestampToDate(endTimeOrigin);

    const lessonDateFormat = formatDate(startDateValue, "yyyy/LL/dd");
    const startTimeFormat = formatDate(startDateValue, "HH:mm");
    const endTimeFormat = formatDate(endDateValue, "HH:mm");

    const teacher1 = createMockTeacherMany("01");
    const teacher2 = createMockTeacherMany("02");
    const location = createMockLocationMany("01");

    const teacherNames = missingFields?.includes("teacherNames")
        ? undefined
        : `${teacher1.name}, ${teacher2.name}`;

    for (let index = 1; index <= numberOfIndividualLesson; index++) {
        const item: LessonItem = {
            id: `Lesson_${index}`,
            lessonReportStatus: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
            centerName: location.name,
            lessonDate: lessonDateFormat,
            lessonTime: `${startTimeFormat} - ${endTimeFormat}`,
            teacherNames,
            teachingMethod: "LESSON_TEACHING_METHOD_INDIVIDUAL",
            teachingMedium: "LESSON_TEACHING_MEDIUM_ONLINE",
            className: "Class 01",
            courseName: "Course 01",
            lessonStatus: "LESSON_SCHEDULING_STATUS_DRAFT",
        };

        result.push(item);
    }

    if (hasLessonGroup) {
        // Group Teaching Lesson
        const groupLesson: LessonItem = {
            id: `Lesson_${numberOfIndividualLesson + 1}`,
            lessonReportStatus: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
            centerName: location.name,
            lessonDate: lessonDateFormat,
            lessonTime: `${startTimeFormat} - ${endTimeFormat}`,
            teacherNames,
            teachingMethod: "LESSON_TEACHING_METHOD_GROUP",
            teachingMedium: "LESSON_TEACHING_MEDIUM_ONLINE",
            courseName: "Course Name 01",
            className: "Class 01",
            lessonStatus: "LESSON_SCHEDULING_STATUS_DRAFT",
        };
        result.push(groupLesson);
    }

    return result;
};

export const createMockTableLessonsWithPaging = ({
    isLoadingLesson,
    isLoadingLessonReport,
    isLoadingCenter,
    isLoadingTeacher,
    isLoadingCourse,
    isLoadingClass,
    missingFields,
}: {
    isLoadingLesson: boolean;
    isLoadingLessonReport: boolean;
    isLoadingCenter: boolean;
    isLoadingTeacher: boolean;
    isLoadingCourse: boolean;
    isLoadingClass: boolean;
    missingFields?: Array<MissingFieldsDataListLesson>;
}): TableLessonsWithPagingProps => ({
    data: [...createMockLessonItemList(1, true, missingFields)],
    pagination: createMockPaginationWithTotalObject(10, 0),
    isLoadingLesson: isLoadingLesson,
    isLoadingLessonReport: isLoadingLessonReport,
    isLoadingCenter: isLoadingCenter,
    isLoadingTeacher: isLoadingTeacher,
    isLoadingCourse: isLoadingCourse,
    isLoadingClass: isLoadingClass,
});
