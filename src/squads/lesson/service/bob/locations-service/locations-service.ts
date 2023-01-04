import { arrayHasItem } from "src/common/utils/other";
import {
    LocationByLocationIdQueryVariables,
    LocationListByIdsQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import locationsQueriesBob from "src/squads/lesson/service/bob/locations-service/locations-bob.query";

export const locationsService = defineService({
    query: {
        locationsGetOne: ({ location_id }: Partial<LocationByLocationIdQueryVariables>) => {
            if (!location_id) {
                throw new InvalidParamError({
                    action: "locationsGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "location_id" }],
                });
            }

            return locationsQueriesBob.getOne({ location_id });
        },
        locationsGetMany: ({ location_ids }: Partial<LocationListByIdsQueryVariables>) => {
            const isInvalidString = !location_ids;
            const isEmptyArray = Array.isArray(location_ids) && !arrayHasItem(location_ids);

            if (isInvalidString || isEmptyArray) {
                throw new InvalidParamError({
                    action: "locationsGetMany",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "location_ids" }],
                });
            }

            return locationsQueriesBob.getMany({ location_ids });
        },
    },
});
