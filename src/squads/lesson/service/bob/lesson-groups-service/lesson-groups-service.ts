import { LessonGroupByIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import lessonGroupsQueriesBob from "src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-bob.query";

export const lessonGroupsService = defineService({
    query: {
        lessonGroupsGetOne: ({ lesson_group_id }: Partial<LessonGroupByIdQueryVariables>) => {
            if (!lesson_group_id) {
                throw new InvalidParamError({
                    action: "lessonGroupsGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lesson_group_id" }],
                });
            }

            return lessonGroupsQueriesBob.getOne({ lesson_group_id });
        },
    },
});
