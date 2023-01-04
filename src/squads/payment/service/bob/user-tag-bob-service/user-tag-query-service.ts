import { User_CountUserTagByIdsQueryVariables } from "src/squads/payment/service/bob/bob-types";

import userTagQueriesBob from "./user-tag-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const userTagQueryService = defineService({
    query: {
        userCountUserTagByIds: ({ userTagIds }: User_CountUserTagByIdsQueryVariables) => {
            return userTagQueriesBob.countUserTagByIds({ userTagIds });
        },
    },

    mutation: {},
});
