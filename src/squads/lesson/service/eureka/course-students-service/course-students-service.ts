import { arrayHasItem } from "src/common/utils/other";
import { CourseStudentsListByCourseIdsQueryVariables } from "src/squads/lesson/service/eureka/eureka-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import courseStudentsQueriesEureka from "src/squads/lesson/service/eureka/course-students-service/course-students-eureka.query";

export const courseStudentsService = defineService({
    query: {
        courseStudentsGetListWithFilter: (
            variables: CourseStudentsListByCourseIdsQueryVariables
        ) => {
            const { course_ids } = variables;
            const isInvalidString = !course_ids;
            const isEmptyArrayCourseIds = Array.isArray(course_ids) && !arrayHasItem(course_ids);

            if (isInvalidString || isEmptyArrayCourseIds) {
                throw new InvalidParamError({
                    action: "courseStudentsGetListWithFilter",
                    serviceName: "eurekaGraphQL",
                    errors: [{ field: "course_ids", fieldValueIfNotSensitive: course_ids }],
                });
            }
            return courseStudentsQueriesEureka.getListWithFilter(variables);
        },
    },
});
