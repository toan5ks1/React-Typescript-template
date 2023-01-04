import {
    StudentsManyQueryVariables,
    StudentsManyReferenceQueryVariables,
    UserNameByIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import { createEmptyResponse } from "src/squads/communication/service/utils/utils";
import { isInvalidOrEmptyArray } from "src/squads/communication/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import usersQueriesBob from "src/squads/communication/service/bob/users-service/users-bob.query";

export const usersService = defineService({
    query: {
        communicationGetUsernames: ({ user_id }: UserNameByIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(user_id)) {
                throw new InvalidParamError({
                    action: "communicationGetUsernames",
                    errors: [
                        {
                            field: "user_id",
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return usersQueriesBob.getUserNameList({ user_id });
        },
        communicationGetManyStudents: ({ user_ids }: StudentsManyQueryVariables) => {
            if (isInvalidOrEmptyArray(user_ids)) {
                return createEmptyResponse([]);
            }

            return usersQueriesBob.getStudentsMany({
                user_ids,
            });
        },

        communicationGetManyReferenceStudents: ({
            email,
            limit,
            name,
            offset,
            user_ids,
        }: StudentsManyReferenceQueryVariables) => {
            return usersQueriesBob.getManyReference({
                email,
                limit,
                name,
                offset,
                user_ids,
            });
        },
    },
});
