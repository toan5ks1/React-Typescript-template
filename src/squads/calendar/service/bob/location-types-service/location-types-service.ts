import { Calendar_LocationTypesListQueryVariables } from "src/squads/calendar/service/bob/bob-types";
import { defineService } from "src/squads/calendar/service/service-creator";

import locationTypesQueriesBob from "src/squads/calendar/service/bob/location-types-service/location-types-bob.query";

export const locationTypesService = defineService({
    query: {
        calendarGetLocationTypesList: (variables: Calendar_LocationTypesListQueryVariables) => {
            return locationTypesQueriesBob.calendarGetLocationTypesList(variables);
        },
    },
});
