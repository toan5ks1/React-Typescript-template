import {
    CoursesManyQueryVariables,
    CoursesManyReferenceQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { createEmptyResponse } from "src/squads/communication/service/utils/utils";
import { isInvalidOrEmptyVariable } from "src/squads/communication/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import coursesQueriesBob from "src/squads/communication/service/bob/courses-service/courses-bob.query";

export const coursesService = defineService({
    query: {
        communicationGetManyCourses: ({ course_id }: CoursesManyQueryVariables) => {
            if (isInvalidOrEmptyVariable(course_id)) {
                // We don't need to throw the error here since we have to handle none course on notification detail
                return createEmptyResponse([]);
            }

            return coursesQueriesBob.getMany({
                course_id,
            });
        },
        communicationGetManyReferenceCourses: (variables: CoursesManyReferenceQueryVariables) => {
            return coursesQueriesBob.getManyReferenceAutocomplete(variables);
        },
    },
});
