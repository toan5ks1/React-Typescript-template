import { Calendar_LocationsListByLocationTypesQueryVariables } from "src/squads/calendar/service/bob/bob-types";
import { defineService } from "src/squads/calendar/service/service-creator";
import { InvalidParamError } from "src/squads/calendar/service/service-types";

import locationsQueriesBob from "src/squads/calendar/service/bob/locations-service/locations-bob.query";

export const locationsService = defineService({
    query: {
        calendarGetLocationsListByLocationTypes: (
            variables: Calendar_LocationsListByLocationTypesQueryVariables
        ) => {
            if (!variables.location_type_id) {
                throw new InvalidParamError({
                    action: "calendarGetLocationsListByLocationTypes",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "type" }],
                });
            }

            return locationsQueriesBob.calendarGetLocationsListByLocationTypes(variables);
        },
    },
});
