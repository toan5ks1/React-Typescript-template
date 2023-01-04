import { Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import courseAccessPathsQueriesBob from "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-bob.query";

export const courseAccessPathsService = defineService({
    query: {
        courseAccessPathsGetManyReference: (
            variables: Partial<Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables>
        ) => {
            const { location_id, ...rest } = variables;

            if (!location_id)
                throw new InvalidParamError({
                    action: "courseAccessPathsGetManyReference",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "location_id" }],
                });

            return courseAccessPathsQueriesBob.getManyReference({ location_id, ...rest });
        },
    },
});
