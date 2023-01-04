import {
    User_CountBankByIdsQueryVariables,
    User_CountBankByBankCodesQueryVariables,
    User_GetBanksByBankCodesQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import bankQueriesBob from "./bank-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const bankQueryService = defineService({
    query: {
        userCountBankByIds: ({ bankIds }: User_CountBankByIdsQueryVariables) => {
            return bankQueriesBob.countBankByIds({ bankIds });
        },
        userCountBankByBankCodes: ({ bankCodes }: User_CountBankByBankCodesQueryVariables) => {
            return bankQueriesBob.countBankByBankCodes({ bankCodes });
        },
        userGetBanksByBankCodes: ({ bankCodes }: User_GetBanksByBankCodesQueryVariables) => {
            return bankQueriesBob.getBanksByBankCodes({ bankCodes });
        },
    },

    mutation: {},
});
