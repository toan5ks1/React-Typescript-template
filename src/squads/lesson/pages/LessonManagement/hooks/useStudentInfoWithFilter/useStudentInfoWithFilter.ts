import { useMemo, useState } from "react";

import { PagingRequest } from "src/common/constants/types";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import isEqual from "lodash/isEqual";
import useGetGradeAndStatusOfStudents from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { FilterAdvancedLessonStudentInfo } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface UseLessonStudentInfoListFilterReturn {
    studentInfosList: LessonManagementStudentInfo[];
    pagination: PaginationWithTotal;
    isLoadingStudentsCourses: boolean;
    isLoadingGrades: boolean;
    isLoadingClass: boolean;
    handleEnterSearchBar: (searchString: string) => void;
    handleApplyFilterCriteria: (filters: FilterAdvancedLessonStudentInfo) => void;
}

export type FilterAdvancedStudentInfoCriteria = FilterAdvancedLessonStudentInfo & {
    studentName: string;
};

const defaultFilterCriteria: FilterAdvancedLessonStudentInfo = {
    grades: [],
    courses: [],
    classes: [],
    locations: [],
};

const defaultPagingObject: PagingRequest = {
    limit: 5,
    offsetInteger: 0,
    offsetString: "",
};

type RetrieveStudentInfoRequest =
    NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest;

type RetrieveStudentInfoResponse =
    NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionResponse["itemsList"];

type RetrieveStudentInfoFilter = NonNullable<RetrieveStudentInfoRequest["filter"]>;

const useStudentInfoWithFilter = (
    limit: PagingRequest["limit"] = defaultPagingObject.limit
): UseLessonStudentInfoListFilterReturn => {
    const [searchText, setSearchText] = useState<string>("");

    const [filterCriteria, setFilterCriteria] =
        useState<FilterAdvancedLessonStudentInfo>(defaultFilterCriteria);

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const filterObject: RetrieveStudentInfoFilter = useMemo(() => {
        const { courses, grades, locations, classes } = filterCriteria;

        const courseIdList: RetrieveStudentInfoFilter["courseIdList"] = courses.map(
            (course) => course.course_id
        );

        const gradeList: RetrieveStudentInfoFilter["gradeList"] = grades.map(
            (grade) => `${grade.id}`
        );

        const locationIdList: RetrieveStudentInfoFilter["locationIdList"] = locations.map(
            (location) => location.locationId
        );
        const classIdList: RetrieveStudentInfoFilter["classIdList"] = classes.map(
            (classData) => classData.class_id
        );

        return { courseIdList, gradeList, locationIdList, classIdList };
    }, [filterCriteria]);

    const retrieveParam: RetrieveStudentInfoRequest = { filter: filterObject, keyword: searchText };

    const {
        results: { data: studentInfos, isFetching: isFetchingStudentInfos },
        goToFirstPage,
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "lessonStudentSubscriptions",
        action: "lessonStudentSubscriptionsRetrieveStudentSubscription",
    })(retrieveParam, {
        enabled: Boolean(retrieveParam),
        defaultPaging: {
            ...defaultPagingObject,
            limit,
        },
        onError: (error) => {
            showSnackbar(t("ra.message.unableToLoadData"), "error");
            window.warner?.warn(
                "[useStudentInfoWithFilter] [lessonStudentSubscriptionsRetrieveStudentSubscription]: ",
                error
            );
        },
    });

    const studentInfosQueried: RetrieveStudentInfoResponse = useMemo(() => {
        if (!studentInfos) return [];
        return studentInfos.itemsList;
    }, [studentInfos]);

    const studentIdsQueried: string[] = useMemo(
        () => studentInfosQueried.map((studentSubs) => studentSubs.studentId),
        [studentInfosQueried]
    );

    const courseIdsQueried: string[] = useMemo(
        () => studentInfosQueried.map((studentSubs) => studentSubs.courseId),
        [studentInfosQueried]
    );

    const classIdsQueried: string[] = useMemo(
        () => studentInfosQueried.map((studentSubs) => studentSubs.classId),
        [studentInfosQueried]
    );

    const { data: studentsData = [], isFetching: isFetchingStudents } = inferQuery({
        entity: "students",
        action: "studentsGetMany",
    })(
        { user_ids: studentIdsQueried },
        {
            enabled: arrayHasItem(studentIdsQueried),
            onError: (error) => {
                showSnackbar(t("ra.message.unableToLoadData"), "error");
                window.warner?.warn("[useStudentInfoWithFilter] [studentsGetMany]: ", error);
            },
        }
    );

    const { data: coursesData = [], isFetching: isFetchingCourses } = inferQuery({
        entity: "courses",
        action: "coursesGetMany",
    })(
        { course_id: courseIdsQueried },
        {
            enabled: arrayHasItem(courseIdsQueried),
            onError(error) {
                showSnackbar(t("ra.message.unableToLoadData"), "error");
                window.warner?.warn("[useStudentInfoWithFilter] [coursesGetMany]: ", error);
            },
        }
    );

    const { data: classesData, isFetching: isClassesFetching } = inferQuery({
        entity: "class",
        action: "classGetMany",
    })(
        { class_ids: classIdsQueried },
        {
            enabled: arrayHasItem(classIdsQueried),
            onError(error: Error) {
                showSnackbar(t("ra.message.unableToLoadData"), "error");
                window.warner?.warn("[useStudentInfoWithFilter] [classGetMany]: ", error);
            },
        }
    );

    const { mapGradeOfStudents, isLoading: isLoadingGrade } =
        useGetGradeAndStatusOfStudents(studentIdsQueried);

    const studentInfosList: LessonManagementStudentInfo[] = useMemo(() => {
        if (!arrayHasItem(coursesData) || !arrayHasItem(studentsData)) return [];

        const studentInfosList: LessonManagementStudentInfo[] = studentInfosQueried.reduce(
            (studentInfos: LessonManagementStudentInfo[], studentSubs) => {
                const student = studentsData.find(
                    (student) => student.user_id === studentSubs.studentId
                );

                const course = coursesData.find(
                    (course) => course.course_id === studentSubs.courseId
                );

                const grade = mapGradeOfStudents.get(studentSubs.studentId)?.current_grade;

                const classData = classesData?.find(
                    (classElement) => classElement.class_id === studentSubs.classId
                );

                if (student && course)
                    studentInfos.push({
                        studentSubscriptionId: studentSubs.studentId + studentSubs.courseId,
                        student: {
                            studentId: studentSubs.studentId,
                            studentName: student.name,
                        },
                        course: {
                            courseId: studentSubs.courseId,
                            courseName: course.name,
                        },
                        grade,
                        attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
                        locationId: pick1stElement(studentSubs.locationIdsList),
                        classData,
                    });

                return studentInfos;
            },
            []
        );

        return studentInfosList;
    }, [coursesData, studentsData, studentInfosQueried, mapGradeOfStudents, classesData]);

    const handleEnterSearchBar = (searchString: string) => {
        if (searchString !== searchText) {
            setSearchText(searchString);
            goToFirstPage();
        }
    };

    const handleApplyFilterCriteria = (filters: FilterAdvancedLessonStudentInfo) => {
        if (!isEqual(filterCriteria, filters)) {
            setFilterCriteria(filters);
            goToFirstPage();
        }
    };

    return {
        studentInfosList,
        pagination,
        isLoadingStudentsCourses: isFetchingStudentInfos || isFetchingStudents || isFetchingCourses,
        isLoadingGrades: isFetchingStudentInfos || isLoadingGrade,
        isLoadingClass: isClassesFetching,
        handleEnterSearchBar,
        handleApplyFilterCriteria,
    };
};

export default useStudentInfoWithFilter;
