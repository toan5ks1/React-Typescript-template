import { arrayHasItem } from "src/common/utils/other";
import { CourseStudyPlansListByFilterQueryVariables } from "src/squads/syllabus/services/eureka/eureka-types";

import { courseStudyPlanQueriesEureka } from "./eureka/course-study-plan-service-eureka";
import { defineService } from "./service-creator";
import { convertArrayToHasuraArrayString } from "./utils/hasura-convert-data-type";
import { createEmptyResponse } from "./utils/utils";

export const eurekaCourseStudyPlanService = defineService({
    query: {
        COURSE_STUDY_PLAN_GET_LIST_FILTER: (params: CourseStudyPlansListByFilterQueryVariables) => {
            const { courseId, limit, search, offset, grades, bookIds, status } = params;

            if (courseId && limit) {
                return courseStudyPlanQueriesEureka.getListFilter({
                    grades: arrayHasItem(grades)
                        ? convertArrayToHasuraArrayString(grades)
                        : undefined,
                    bookIds: arrayHasItem(bookIds)
                        ? convertArrayToHasuraArrayString(bookIds)
                        : undefined,
                    status: arrayHasItem(status)
                        ? convertArrayToHasuraArrayString(status)
                        : undefined,
                    search,
                    courseId,
                    limit,
                    offset,
                });
            }

            return createEmptyResponse(undefined);
        },
    },
});
