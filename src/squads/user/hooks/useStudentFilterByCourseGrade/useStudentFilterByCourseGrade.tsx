import { useMemo } from "react";

import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { Grade } from "src/squads/user/models/grade";
import {
    CoursesOneQuery,
    User_GetManyStudentsFiltersQuery,
    User_GetManyStudentLocationsFiltersQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { CourseStudentsListByCourseIdsQuery } from "src/squads/user/service/eureka/eureka-types";
import { inferQuery, inferQueryPagination } from "src/squads/user/service/infer-service";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import toNumber from "lodash/toNumber";
import type { UsePaginationOptions } from "src/squads/user/hooks/data/usePagination";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export type UseStudentFilterByCourseGradeReturn = {
    data: User_GetManyStudentsFiltersQuery["users"];
    isLoading: boolean;
    pagination: PaginationWithTotal;
    refetchStudents: () => void;
    resetPaginationOffset: () => void;
    isFetching: boolean;
};

export const getEnrollmentStatusAsString = (enumKey?: StudentEnrollmentStatus) => {
    if (enumKey) {
        return Object.keys(StudentEnrollmentStatus)[enumKey];
    }
    return undefined;
};

export interface UseStudentFilterByCourseGradeProps {
    studentName?: string;
    gradeIds?: Grade["id"][];
    courseIds?: ArrayElement<CoursesOneQuery["courses"]>["course_id"][];
    paginationParams?: UsePaginationOptions;
    isNotLogged: boolean;
    enrollmentStatus?: StudentEnrollmentStatus;
    locationIds?: User_GetManyStudentLocationsFiltersQueryVariables["location_ids"];
}

function useStudentFilterByCourseGrade({
    studentName = "",
    gradeIds = [],
    courseIds = [],
    paginationParams = {},
    isNotLogged,
    enrollmentStatus,
    locationIds,
}: UseStudentFilterByCourseGradeProps): UseStudentFilterByCourseGradeReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");

    const { data: listCourseStudentByCourseIds } = inferQuery({
        entity: "courseStudents",
        action: "userGetManyCourseStudentsByCourseIds",
    })(
        {
            filter: {
                course_ids: courseIds,
            },
        },
        {
            enabled: arrayHasItem(courseIds),
            onError: (error) => {
                window.warner?.warn(`userGetManyCourseStudentsByCourseIds`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const mapCourseIdsFilter = () => {
        if (arrayHasItem(courseIds) && listCourseStudentByCourseIds) {
            const idsList = listCourseStudentByCourseIds.map(
                (
                    courseStudent: ArrayElement<
                        CourseStudentsListByCourseIdsQuery["course_students"]
                    >
                ) => courseStudent.student_id
            );

            return idsList;
        }

        return undefined;
    };

    const filterConditions: Record<string, any> = {
        name: studentName,
        grades: arrayHasItem(gradeIds) ? gradeIds : undefined,
        student_ids: mapCourseIdsFilter(),
        enrollment_status: getEnrollmentStatusAsString(enrollmentStatus),
        last_login_date: isNotLogged ? isNotLogged : undefined,
        location_ids: locationIds,
    };

    const userGetManyStudentsLocationWithFilter = isShowNamePhonetic
        ? "userGetManyStudentsLocationWithFilterV2"
        : "userGetManyStudentsLocationWithFilter";
    const userGetManyStudentsWithFilter = isShowNamePhonetic
        ? "userGetManyStudentsWithFilterV2"
        : "userGetManyStudentsWithFilter";

    const {
        result: { isLoading, refetch: refetchStudents, isFetching },
        data: listStudentWithFilter = [],
        pagination: studentPagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "student",
        action: locationIds ? userGetManyStudentsLocationWithFilter : userGetManyStudentsWithFilter,
    })(
        { filter: filterConditions },
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn(`userGetManyStudentsLocationWithFilter`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
            defaultLimit: paginationParams?.defaultLimit,
        }
    );

    const userCountStudentLocation = isShowNamePhonetic
        ? "userCountStudentLocationV2"
        : "userCountStudentLocation";
    const userCountStudent = isShowNamePhonetic ? "userCountStudentV2" : "userCountStudent";

    const { data: studentCount, isLoading: paginationLoading } = inferQuery({
        entity: "student",
        action: locationIds ? userCountStudentLocation : userCountStudent,
    })(
        { filter: filterConditions },
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn(`userCountStudent`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const paginationReturn: PaginationWithTotal = useMemo(
        () => ({
            count: paginationLoading ? 0 : toNumber(studentCount?.aggregate?.count),
            limit: studentPagination.limit,
            offset: studentPagination.offset,
            onPageChange: studentPagination.onPageChange,
            onRowsPerPageChange: studentPagination.onRowsPerPageChange,
            page: studentPagination.page,
            rowsPerPage: studentPagination.rowsPerPage,
        }),
        [
            paginationLoading,
            studentCount?.aggregate?.count,
            studentPagination.limit,
            studentPagination.offset,
            studentPagination.onPageChange,
            studentPagination.onRowsPerPageChange,
            studentPagination.page,
            studentPagination.rowsPerPage,
        ]
    );

    return {
        data: listStudentWithFilter,
        isLoading,
        pagination: paginationReturn,
        refetchStudents,
        resetPaginationOffset,
        isFetching,
    };
}

export default useStudentFilterByCourseGrade;
