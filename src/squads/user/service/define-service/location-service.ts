import { User_LocationListByIdsQueryVariables } from "src/squads/user/service/bob/bob-types";
import locationsQueriesBob from "src/squads/user/service/bob/locations-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

import locationsServiceBob from "src/squads/user/service/bob/locations-service-bob/locations-service-bob.mutation";

const locationService = defineService({
    query: {
        userGetManyLocationsWithFilter: (
            variables: ListQuery<User_LocationListByIdsQueryVariables>
        ) => {
            const { filter = {} } = variables;

            return locationsQueriesBob.getListWithFilter(filter);
        },

        userGetManyLocations: ({}) => {
            return locationsServiceBob.retrieveLocations();
        },
    },
});

export default locationService;
