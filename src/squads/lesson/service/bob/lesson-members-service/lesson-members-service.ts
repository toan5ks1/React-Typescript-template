import { arrayHasItem } from "src/common/utils/other";
import { LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import { getInvalidParamErrorsOfNonSensitiveStringVariables } from "src/squads/lesson/service/utils/validation";

import lessonMembersQueriesBob from "src/squads/lesson/service/bob/lesson-members-service/lesson-members-bob.query";

export const lessonMembersService = defineService({
    query: {
        lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId: (
            variables: LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables
        ) => {
            const errors = getInvalidParamErrorsOfNonSensitiveStringVariables(variables);

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonMembersQueriesBob.getOneByUserIdAndCourseIdAndLessonId(variables);
        },
    },
});
