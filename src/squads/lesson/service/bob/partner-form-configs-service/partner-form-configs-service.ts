import {
    PartnerFormConfigByIdQueryVariables,
    PartnerFormConfigsOneQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import partnerFormConfigsQueriesBob from "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-bob.query";

export const partnerFormConfigsService = defineService({
    query: {
        partnerFormConfigsGetOne: (variables: PartnerFormConfigByIdQueryVariables) => {
            if (!variables.form_config_id) {
                throw new InvalidParamError({
                    action: "partnerFormConfigsGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "form_config_id" }],
                });
            }

            return partnerFormConfigsQueriesBob.getOne(variables);
        },
        partnerFormConfigsGetOneLatestConfig: (variables: PartnerFormConfigsOneQueryVariables) => {
            if (!variables.feature_name) {
                throw new InvalidParamError({
                    action: "partnerFormConfigsGetOneLatestConfig",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "feature_name" }],
                });
            }

            return partnerFormConfigsQueriesBob.getOneLatestConfig(variables);
        },
    },
});
