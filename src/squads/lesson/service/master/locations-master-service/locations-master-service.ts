import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Master_LocationsService } from "src/squads/lesson/service/master/locations-master-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import { getInvalidParamErrorsOfNonSensitiveNumberVariables } from "src/squads/lesson/service/utils/validation";

import locationsReaderServiceMaster from "src/squads/lesson/service/master/locations-master-service/locations-master-reader.mutation";

export const locationsServiceMaster = defineService({
    query: {
        locationsRetrieveLowestLevelLocations: (
            variables: NsLesson_Master_LocationsService.RetrieveLocationsRequest
        ) => {
            const { limit, offset } = variables;
            const errors = getInvalidParamErrorsOfNonSensitiveNumberVariables({ limit, offset });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "locationsRetrieveLowestLevelLocations",
                    serviceName: "masterGraphQL",
                    errors,
                });
            }

            return locationsReaderServiceMaster.retrieveLowestLevelLocations(variables);
        },
    },
});
