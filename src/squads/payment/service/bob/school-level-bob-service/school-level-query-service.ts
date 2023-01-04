import { User_CountSchoolLevelByIdsQueryVariables } from "src/squads/payment/service/bob/bob-types";

import schoolLevelQueriesBob from "./school-level-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const schoolLevelQueryService = defineService({
    query: {
        userCountSchoolLevelByIds: ({
            schoolLevelIds,
        }: User_CountSchoolLevelByIdsQueryVariables) => {
            return schoolLevelQueriesBob.countSchoolLevelByIds({ schoolLevelIds });
        },
    },

    mutation: {},
});
