import { arrayHasItem } from "src/common/utils/other";
import { GetManyStudentStudyPlansByFilterQueryVariables } from "src/squads/syllabus/services/eureka/eureka-types";

import { studentStudyPlanQueriesEureka } from "./eureka/student-study-plan-service-eureka";
import { defineService } from "./service-creator";
import { convertArrayToHasuraArrayString } from "./utils/hasura-convert-data-type";
import { createEmptyResponse } from "./utils/utils";

export const eurekaStudentStudyPlanService = defineService({
    query: {
        STUDENT_STUDY_PLAN_GET_MANY_BY_FILTER: (
            params: GetManyStudentStudyPlansByFilterQueryVariables
        ) => {
            const { courseId, search, studentIds, grades, bookIds } = params;

            if (courseId && arrayHasItem(studentIds)) {
                return studentStudyPlanQueriesEureka.getManyV2({
                    courseId,
                    grades: arrayHasItem(grades)
                        ? convertArrayToHasuraArrayString(grades)
                        : undefined,
                    bookIds: arrayHasItem(bookIds)
                        ? convertArrayToHasuraArrayString(bookIds)
                        : undefined,
                    search,
                    studentIds: arrayHasItem(studentIds)
                        ? convertArrayToHasuraArrayString(studentIds)
                        : undefined,
                });
            }

            return createEmptyResponse(undefined);
        },
    },
});
