import { UserNameByIdsQueryVariables } from "src/squads/payment/service/bob/bob-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import usersQueriesBob from "src/squads/payment/service/bob/users-service/users-bob.query";

export const usersService = defineService({
    query: {
        paymentGetTitleListByUserId: ({ user_id }: UserNameByIdsQueryVariables) => {
            if (
                Array.isArray(user_id)
                    ? isInvalidOrEmptyArray(user_id)
                    : isInvalidOrEmptyVariable(user_id)
            ) {
                throw new InvalidParamError({
                    action: "paymentGetTitleListByUserId",
                    errors: [{ field: "user_id", fieldValueIfNotSensitive: user_id }],
                    serviceName: "bobGraphQL",
                });
            }

            return usersQueriesBob.getUserNameList({ user_id });
        },
    },
    mutation: {},
});
