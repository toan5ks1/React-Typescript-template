import { arrayHasItem } from "src/common/utils/other";
import {
    Lesson_ClassByClassIdForLessonManagementQueryVariables,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
    Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables,
    Lesson_ClassManyForLessonManagementQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import classQueriesBob from "src/squads/lesson/service/bob/class-service/class-bob.query";

export const classService = defineService({
    query: {
        classGetOne: ({
            class_id,
        }: Partial<Lesson_ClassByClassIdForLessonManagementQueryVariables>) => {
            if (!class_id) {
                throw new InvalidParamError({
                    action: "classGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "class_id" }],
                });
            }

            return classQueriesBob.getOne({ class_id });
        },

        classGetMany: ({ class_ids }: Lesson_ClassManyForLessonManagementQueryVariables) => {
            const isInvalidString = !class_ids;
            const isEmptyArrayClassIds = Array.isArray(class_ids) && !arrayHasItem(class_ids);

            if (isInvalidString || isEmptyArrayClassIds) {
                throw new InvalidParamError({
                    action: "classGetMany",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "class_ids" }],
                });
            }

            return classQueriesBob.getMany({ class_ids });
        },

        classGetManyByNullableCourseAndName: (
            variables: Partial<Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables>
        ) => {
            return classQueriesBob.lessonGetManyByNullableCourseIdAndNameQuery(variables);
        },

        classGetManyByLocationIdAndCourseIdAndName: (
            variables: Partial<Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables>
        ) => {
            const { course_id, location_id, ...rest } = variables;

            if (!location_id)
                throw new InvalidParamError({
                    action: "classGetManyByLocationIdAndCourseIdAndName",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "location_id" }],
                });

            if (!course_id)
                throw new InvalidParamError({
                    action: "classGetManyByLocationIdAndCourseIdAndName",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "course_id" }],
                });

            return classQueriesBob.lessonGetManyByLocationIdAndCourseIdAndNameQuery({
                course_id,
                location_id,
                ...rest,
            });
        },
    },
});
