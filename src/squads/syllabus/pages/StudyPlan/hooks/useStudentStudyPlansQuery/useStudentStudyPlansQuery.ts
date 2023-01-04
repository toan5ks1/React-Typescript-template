import { useCallback } from "react";

import { arrayHasItem } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import {
    BooksManyQuery,
    GetListCourseStudentStudyPlansByFilterQuery,
    GetManyStudentStudyPlansByFilterQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal, PaginationWithTotal } from "src/squads/syllabus/services/service-creator";

import { StudentStudyPlanInfo, StudyPlanFilter, StudyPlanListByStudent } from "../../common/types";
import { groupStudyPlanByStudent } from "../../common/utils";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { getBookIdsFromStudyplanList } from "src/squads/syllabus/pages/StudyPlan/common/helpers";

export interface StudentStudyPlansByCourseIdProps {
    courseId: string;

    filter: Omit<StudyPlanFilter, "archived">;
    keyword: string;
}

export interface StudentStudyPlansByCourseIdReturn {
    studyPlanListByStudent: StudyPlanListByStudent[];
    isLoading: boolean;
    isFetchingBook: boolean;
    pagination: PaginationWithTotal;
    resetPaginationOffset: () => void;
}

const useStudentStudyPlansQuery = ({
    courseId,
    filter,
    keyword,
}: StudentStudyPlansByCourseIdProps): StudentStudyPlansByCourseIdReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const {
        resetPaginationOffset,
        pagination,
        data: courseStudentIdsWithTotal = {
            data: [],
            total: 0,
        },
        result: { isLoading: isLoadingCourseStudent },
    } = inferQueryPagination({
        entity: "courseStudent",
        action: "COURSE_STUDENT_GET_LIST_BY_FILTER",
    })<
        DataWithTotal<
            GetListCourseStudentStudyPlansByFilterQuery["get_list_course_student_study_plans_by_filter"]
        >,
        DataWithTotal<string[]>
    >(
        {
            courseId,
            search: keyword,
            bookIds: filter.bookIds,
            grades: filter.grades,
        },
        {
            enabled: Boolean(courseId),
            selector: ({ data, total }) => {
                return {
                    data: data?.map((item) => item.student_id),
                    total: total,
                };
            },
            onError: (error) => {
                logger.warn("useStudentStudyPlansQuery", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const { data: studentList = [], isLoading: isLoadingStudentList } = inferQuery({
        entity: "student",
        action: "STUDENT_GET_MANY",
    })(
        {
            user_ids: courseStudentIdsWithTotal.data,
        },
        {
            enabled: arrayHasItem(courseStudentIdsWithTotal.data),
            // TODO: Find spec and write unit test for this selector
            selector: (students) =>
                [...(students || [])].sort(
                    (a, b) =>
                        (courseStudentIdsWithTotal.data || []).indexOf(a.user_id) -
                        (courseStudentIdsWithTotal.data || []).indexOf(b.user_id)
                ),
        }
    );

    const { data: studentStudyPlanList = [], isFetching: isFetchingStudyPlanList } = inferQuery({
        entity: "studentStudyPlan",
        action: "STUDENT_STUDY_PLAN_GET_MANY_BY_FILTER",
    })(
        {
            courseId,
            search: keyword,
            bookIds: filter.bookIds,
            grades: filter.grades,
            studentIds: courseStudentIdsWithTotal.data || [],
        },
        {
            enabled: arrayHasItem(courseStudentIdsWithTotal.data),
        }
    );

    const bookIds = getBookIdsFromStudyplanList(studentStudyPlanList);

    const { data: bookNameRecords = {}, isFetching: isFetchingBook } = inferQuery({
        entity: "book",
        action: "BOOK_GET_MANY",
    })<BooksManyQuery["books"], Record<string, string>>(
        {
            book_id: bookIds,
        },
        {
            enabled: arrayHasItem(bookIds),
            selector: (books) => {
                return books.reduce((result: Record<string, string>, book) => {
                    result[book.book_id] = book.name;
                    return result;
                }, {});
            },
        }
    );

    const mergeStudentStudyplanWithBookInfo = useCallback(
        (
            studyPlanList: GetManyStudentStudyPlansByFilterQuery["get_student_study_plans_by_filter"],
            bookNameRecords: Record<string, string>
        ): StudentStudyPlanInfo[] => {
            return studyPlanList.map((study_plan) => {
                const {
                    name,
                    grades = [],
                    study_plan_id: studyplanId,
                    book_id: bookId,
                    created_at,
                    student_study_plans,
                } = study_plan;

                const { student_id: studentId } = student_study_plans[0];

                const defaultValue: StudentStudyPlanInfo = {
                    grades,
                    name,
                    studyplanId,
                    bookId,
                    created_at,
                    studentId,
                };

                if (bookId && bookNameRecords[bookId]) {
                    return { ...defaultValue, bookName: bookNameRecords[bookId] };
                }

                return defaultValue;
            });
        },
        []
    );

    const studyPlanListByStudent = arrayHasItem(courseStudentIdsWithTotal.data)
        ? groupStudyPlanByStudent({
              studentList,
              studyPlanList: mergeStudentStudyplanWithBookInfo(
                  studentStudyPlanList,
                  bookNameRecords
              ),
          })
        : [];

    return {
        studyPlanListByStudent,
        isFetchingBook,
        isLoading: isLoadingCourseStudent || isLoadingStudentList || isFetchingStudyPlanList,
        pagination,
        resetPaginationOffset,
    };
};

export default useStudentStudyPlansQuery;
