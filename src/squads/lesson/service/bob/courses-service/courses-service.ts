import { arrayHasItem } from "src/common/utils/other";
import {
    CoursesManyQueryVariables,
    CoursesManyReferenceQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import { getInvalidParamErrorsOfNonSensitiveNumberVariables } from "src/squads/lesson/service/utils/validation";

import coursesQueriesBob from "src/squads/lesson/service/bob/courses-service/courses-bob.query";

export const coursesService = defineService({
    query: {
        coursesGetMany: ({ course_id }: CoursesManyQueryVariables) => {
            const isInvalidString = !course_id;
            const isEmptyArrayCourseId = Array.isArray(course_id) && !arrayHasItem(course_id);

            if (isInvalidString || isEmptyArrayCourseId) {
                throw new InvalidParamError({
                    action: "coursesGetMany",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "course_id" }],
                });
            }

            return coursesQueriesBob.getMany({ course_id });
        },
        coursesGetManyReference: (variables: CoursesManyReferenceQueryVariables) => {
            const { limit, offset } = variables;

            const errors = getInvalidParamErrorsOfNonSensitiveNumberVariables({ limit, offset });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "coursesGetManyReference",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return coursesQueriesBob.getManyReference(variables);
        },
    },
});
