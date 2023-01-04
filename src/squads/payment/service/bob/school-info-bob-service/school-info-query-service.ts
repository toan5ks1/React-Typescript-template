import {
    User_CountSchoolInfoByIdsQueryVariables,
    User_GetSchoolInfoIdByPartnerIdsQueryVariables,
    User_CountSchoolInfoByPartnerIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import schoolInfoQueriesBob from "./school-info-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const schoolInfoQueryService = defineService({
    query: {
        userCountSchoolInfoByIds: ({ schoolInfoIds }: User_CountSchoolInfoByIdsQueryVariables) => {
            return schoolInfoQueriesBob.countSchoolInfoByIds({ schoolInfoIds });
        },
        userCountSchoolInfoByPartnerIds: ({
            schoolPartnerIds,
        }: User_CountSchoolInfoByPartnerIdsQueryVariables) => {
            return schoolInfoQueriesBob.countSchoolInfoByPartnerIds({ schoolPartnerIds });
        },
        getSchoolInfoIdByPartnerIds: ({
            schoolPartnerIds,
        }: User_GetSchoolInfoIdByPartnerIdsQueryVariables) => {
            return schoolInfoQueriesBob.getSchoolInfoIdByPartnerIds({ schoolPartnerIds });
        },
    },

    mutation: {},
});
