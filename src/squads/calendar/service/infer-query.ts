import { locationTypesService } from "src/squads/calendar/service/bob/location-types-service/location-types-service";
import { locationsService } from "src/squads/calendar/service/bob/locations-service/locations-service";

import {
    composeServices,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "./service-creator";

// compose all services into service map
const rootService = composeServices({
    locations: locationsService,
    locationTypes: locationTypesService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);
