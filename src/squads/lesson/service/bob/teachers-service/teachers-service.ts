import { arrayHasItem } from "src/common/utils/other";
import { TeacherManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import teachersQueriesBob from "src/squads/lesson/service/bob/teachers-service/teachers-bob.query";

export const teachersService = defineService({
    query: {
        teachersGetMany: (variables: TeacherManyQueryVariables) => {
            const { user_id } = variables;
            const isInvalidString = !user_id;
            const isEmptyArrayUserIds = Array.isArray(user_id) && !arrayHasItem(user_id);

            if (isInvalidString || isEmptyArrayUserIds) {
                throw new InvalidParamError({
                    action: "teachersGetMany",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "user_id" }],
                });
            }
            return teachersQueriesBob.getMany(variables);
        },
    },
});
