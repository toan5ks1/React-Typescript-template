import { arrayHasItem } from "src/common/utils/other";
import { GetListCourseStudentStudyPlansByFilterQueryVariables } from "src/squads/syllabus/services/eureka/eureka-types";

import { courseStudentQueriesEureka } from "./eureka/course-student-service-eureka";
import { defineService } from "./service-creator";
import { convertArrayToHasuraArrayString } from "./utils/hasura-convert-data-type";
import { createEmptyResponse } from "./utils/utils";

export const eurekaCourseStudentService = defineService({
    query: {
        COURSE_STUDENT_GET_LIST_BY_FILTER: (
            params: GetListCourseStudentStudyPlansByFilterQueryVariables
        ) => {
            const { bookIds, grades, limit, offset, courseId, search } = params;

            if (courseId && limit) {
                return courseStudentQueriesEureka.getListByFilter({
                    grades: arrayHasItem(grades)
                        ? convertArrayToHasuraArrayString(grades)
                        : undefined,
                    bookIds: arrayHasItem(bookIds)
                        ? convertArrayToHasuraArrayString(bookIds)
                        : undefined,
                    courseId,
                    limit,
                    offset,
                    search,
                });
            }

            return createEmptyResponse(undefined);
        },
    },
});
