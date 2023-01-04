import { useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import {
    BooksManyQuery,
    StudyPlanAttrsV2Fragment,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { PaginationWithTotal } from "src/squads/syllabus/services/service-creator";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { StudyPlanStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import { getBookIdsFromStudyplanList } from "src/squads/syllabus/pages/StudyPlan/common/helpers";
import { StudyPlanFilter } from "src/squads/syllabus/pages/StudyPlan/common/types";

export interface CourseStudyplanTable {
    bookName?: string;
    grades: StudyPlanAttrsV2Fragment["grades"];
    studyplanId: StudyPlanAttrsV2Fragment["study_plan_id"];
    name: StudyPlanAttrsV2Fragment["name"];
    status?: StudyPlanAttrsV2Fragment["status"];
}

export interface UseGetCourseStudyplanValues {
    isLoading: boolean;
    isFetching: boolean;
    isFetchingBook: boolean;
    data: CourseStudyplanTable[];
    resetPaginationOffset: () => void;
    pagination: PaginationWithTotal;
}

export interface UseGetCourseStudyplanProps {
    filter: StudyPlanFilter;
    courseId: string;
    searchText: string;
}

const useGetCourseStudyplan = (props: UseGetCourseStudyplanProps): UseGetCourseStudyplanValues => {
    const { filter, courseId, searchText } = props;
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const {
        result: { isLoading, isFetching },
        data: courseStudyplanWithTotal = {
            data: [],
            total: 0,
        },
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "courseStudyPlan",
        action: "COURSE_STUDY_PLAN_GET_LIST_FILTER",
    })(
        {
            courseId,
            search: searchText,
            status: [StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE].concat(
                filter.archived ? StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED : []
            ),
            bookIds: filter.bookIds,
            grades: filter.grades,
        },
        {
            enabled: Boolean(courseId),
            onError: (error) => {
                logger.warn("[useGetCourseStudyPlan]", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const bookIds = getBookIdsFromStudyplanList(
        (courseStudyplanWithTotal.data || []).map((item) => item.study_plan)
    );

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

    const data = useMemo<CourseStudyplanTable[]>(() => {
        return (courseStudyplanWithTotal.data || []).map((courseStudyplan) => {
            const { study_plan } = courseStudyplan;
            const { name, grades, study_plan_id: studyplanId, status } = study_plan;

            const defaultValue: CourseStudyplanTable = {
                grades,
                name,
                studyplanId,
                status,
            };

            const currentBookId = study_plan.book_id;

            if (currentBookId && bookNameRecords[currentBookId]) {
                return { ...defaultValue, bookName: bookNameRecords[currentBookId] };
            }

            return defaultValue;
        });
    }, [bookNameRecords, courseStudyplanWithTotal]);

    return {
        data,
        isLoading,
        isFetching,
        isFetchingBook,
        pagination,
        resetPaginationOffset,
    };
};

export default useGetCourseStudyplan;
