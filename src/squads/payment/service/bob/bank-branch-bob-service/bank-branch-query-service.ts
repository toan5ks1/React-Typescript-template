import { User_CountBankBranchByIdsQueryVariables } from "src/squads/payment/service/bob/bob-types";

import bankBranchQueriesBob from "./bank-branch-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const bankBranchQueryService = defineService({
    query: {
        userCountBankBranchByIds: ({ bankBranchIds }: User_CountBankBranchByIdsQueryVariables) => {
            return bankBranchQueriesBob.countBankBranchByIds({ bankBranchIds });
        },
    },

    mutation: {},
});
