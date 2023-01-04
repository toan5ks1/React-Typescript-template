import { User_CountGradesByIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import gradeQueriesFatima from "src/squads/payment/service/fatima/grade-service/grade-fatima.query";

export const gradeService = defineService({
    query: {
        userCountGradeByIds: ({ gradeIds }: User_CountGradesByIdsQueryVariables) => {
            if (isInvalidOrEmptyVariable(gradeIds)) {
                throw new InvalidParamError({
                    action: "userCountGradeByIds",
                    errors: [{ field: "gradeIds", fieldValueIfNotSensitive: gradeIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return gradeQueriesFatima.countGradeByIds({
                gradeIds,
            });
        },
    },

    mutation: {},
});
