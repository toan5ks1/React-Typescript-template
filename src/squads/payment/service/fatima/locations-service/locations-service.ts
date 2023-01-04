import { Payment_GetLocationNameByLocationIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import locationsQueriesFatima from "src/squads/payment/service/fatima/locations-service/locations-fatima.query";

export const locationsService = defineService({
    query: {
        paymentGetLocationTitleByLocationId: ({
            location_id,
        }: Payment_GetLocationNameByLocationIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(location_id)) {
                throw new InvalidParamError({
                    action: "paymentGetLocationTitleByLocationId",
                    errors: [{ field: "location_id", fieldValueIfNotSensitive: location_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return locationsQueriesFatima.getTitle({
                location_id,
            });
        },
    },

    mutation: {},
});
