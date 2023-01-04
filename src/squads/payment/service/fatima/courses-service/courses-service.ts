import { Payment_GetManyCourseByCourseIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyArray } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import courseQueriesFatima from "src/squads/payment/service/fatima/courses-service/courses-fatima.query";

export const coursesService = defineService({
    query: {
        paymentGetManyCoursesByCourseIds: ({
            course_ids,
        }: Partial<Payment_GetManyCourseByCourseIdsQueryVariables>) => {
            if (isInvalidOrEmptyArray(course_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyCoursesByCourseIds",
                    errors: [{ field: "course_ids", fieldValueIfNotSensitive: course_ids }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return courseQueriesFatima.getManyCourseByCourseIds({
                course_ids,
            });
        },
    },

    mutation: {},
});
