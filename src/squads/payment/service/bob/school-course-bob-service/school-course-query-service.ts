import { User_CountSchoolCourseByIdsQueryVariables } from "src/squads/payment/service/bob/bob-types";

import schoolCourseQueriesBob from "./school-course-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const schoolCourseQueryService = defineService({
    query: {
        userCountSchoolCourseByIds: ({
            schoolCourseIds,
        }: User_CountSchoolCourseByIdsQueryVariables) => {
            return schoolCourseQueriesBob.countSchoolCourseByIds({ schoolCourseIds });
        },
    },

    mutation: {},
});
