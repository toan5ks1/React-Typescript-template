import { useMemo, useState } from "react";

import { PagingRequest } from "src/common/constants/types";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import {
    FilterAdvancedLessonManagementStudentInfo,
    LessonManagementStudentInfo,
    StudentSubscriptionsQueried,
} from "src/squads/lesson/common/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { RetrieveStudentSubscriptionFilter, StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import isEqual from "lodash/isEqual";
import useGetGradeAndStatusOfStudents from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseLessonStudentInfoListFilterReturn {
    data: LessonManagementStudentInfo[];
    pagination: PaginationWithTotal;
    isFetchingStudentsCourses: boolean;
    isLoadingGrades: boolean;
    handleEnterSearchBar: (searchString: string) => void;
    handleApplyFilterCriteria: (filters: FilterAdvancedLessonManagementStudentInfo) => void;
}

export type FilterAdvancedStudentInfoCriteria = FilterAdvancedLessonManagementStudentInfo & {
    studentName: string;
};

const defaultFilterAdvancedStudentSubscriptionsCriteria: FilterAdvancedLessonManagementStudentInfo =
    {
        grades: [],
        courses: [],
    };

const defaultPagingObject: PagingRequest = {
    limit: 5,
    offsetInteger: 0,
    offsetString: "",
};

const useLessonStudentInfoListFilter = (
    limit: PagingRequest["limit"] = defaultPagingObject.limit
): UseLessonStudentInfoListFilterReturn => {
    const [searchText, setSearchText] = useState<string>("");
    const [filterCriteria, setFilterCriteria] = useState<FilterAdvancedLessonManagementStudentInfo>(
        defaultFilterAdvancedStudentSubscriptionsCriteria
    );

    const courseIdsFilter: RetrieveStudentSubscriptionFilter.AsObject["courseIdList"] =
        filterCriteria.courses.map((course) => course.course_id);

    const gradeIdsFilter: RetrieveStudentSubscriptionFilter.AsObject["gradeList"] =
        filterCriteria.grades.map((grade) => `${grade.id}`);

    const t = useTranslate();
    const showSnackBar = useShowSnackbar();

    const retrieveParam: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest =
        {
            filter: {
                courseIdList: courseIdsFilter,
                gradeList: gradeIdsFilter,
                classIdList: [],
                locationIdList: [],
            },
            keyword: searchText,
        };

    const {
        results: {
            data: studentSubscriptionsDataQueried,
            isFetching: isFetchingStudentSubscriptions,
        },
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
            showSnackBar(t("ra.message.unableToLoadData"), "error");
            window.warner?.warn(
                `Error useLessonStudentSubscriptionsListFilter student subscriptions: ${error.message}`
            );
        },
    });

    const studentSubscriptions = useMemo<StudentSubscriptionsQueried>(() => {
        if (!studentSubscriptionsDataQueried) return [];

        return studentSubscriptionsDataQueried.itemsList;
    }, [studentSubscriptionsDataQueried]);

    const studentIdsQueried = useMemo<string[]>(
        () => studentSubscriptions.map((studentSubs) => studentSubs.studentId),
        [studentSubscriptions]
    );

    const courseIdsQueried = useMemo<string[]>(
        () => studentSubscriptions.map((studentSubs) => studentSubs.courseId),
        [studentSubscriptions]
    );

    const { data: studentsData, isFetching: isFetchingStudents } = inferQuery({
        entity: "students",
        action: "studentsGetMany",
    })(
        { user_ids: studentIdsQueried },
        {
            enabled: arrayHasItem(studentIdsQueried),
            onError: (error) => {
                showSnackBar(t("ra.message.unableToLoadData"), "error");
                window.warner?.warn(
                    `Error useLessonStudentSubscriptionsListFilter students: ${error.message}`
                );
            },
        }
    );

    const { data: coursesData, isFetching: isFetchingCourses } = inferQuery({
        entity: "courses",
        action: "coursesGetMany",
    })(
        { course_id: courseIdsQueried },
        {
            enabled: arrayHasItem(courseIdsQueried),
            onError(error) {
                showSnackBar(t("ra.message.unableToLoadData"), "error");
                window.warner?.warn(
                    `Error useLessonStudentSubscriptionsListFilter courses: ${error.message}`
                );
            },
        }
    );

    const { mapGradeOfStudents, isLoading: isLoadingGrade } =
        useGetGradeAndStatusOfStudents(studentIdsQueried);

    const studentInfosList: LessonManagementStudentInfo[] = useMemo(() => {
        if (
            !coursesData ||
            !studentsData ||
            !arrayHasItem(coursesData) ||
            !arrayHasItem(studentsData)
        )
            return [];

        const studentInfosList: LessonManagementStudentInfo[] = studentSubscriptions.reduce(
            (studentInfos: LessonManagementStudentInfo[], studentSubs) => {
                const student = studentsData.find(
                    (student) => student.user_id === studentSubs.studentId
                );

                const course = coursesData.find(
                    (course) => course.course_id === studentSubs.courseId
                );

                const grade = mapGradeOfStudents.get(studentSubs.studentId)?.current_grade;

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
                    });

                return studentInfos;
            },
            []
        );

        return studentInfosList;
    }, [coursesData, studentsData, studentSubscriptions, mapGradeOfStudents]);

    const handleEnterSearchBar = (searchString: string) => {
        if (searchString !== searchText) {
            setSearchText(searchString);
            goToFirstPage();
        }
    };

    const handleApplyFilterCriteria = (filters: FilterAdvancedLessonManagementStudentInfo) => {
        if (!isEqual(filterCriteria, filters)) {
            setFilterCriteria(filters);
            goToFirstPage();
        }
    };

    return {
        data: studentInfosList,
        pagination,
        isFetchingStudentsCourses:
            isFetchingStudentSubscriptions || isFetchingStudents || isFetchingCourses,
        isLoadingGrades: isFetchingStudentSubscriptions || isLoadingGrade,
        handleEnterSearchBar,
        handleApplyFilterCriteria,
    };
};

export default useLessonStudentInfoListFilter;
