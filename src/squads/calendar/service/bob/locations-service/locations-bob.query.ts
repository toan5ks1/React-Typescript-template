import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/calendar/internals/hasura-client/execute-query";
import {
    Calendar_LocationsListByLocationTypesQuery,
    Calendar_LocationsListByLocationTypesQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/calendar/service/service-types";

const calendarGetLocationsListByLocationTypes = gql`
    query Calendar_LocationsListByLocationTypes($location_type_id: String!, $limit: Int = 100) {
        locations(limit: $limit, where: { location_type: { _eq: $location_type_id } }) {
            location_id
            name
            locations {
                location_id
                name
            }
            location_types {
                location_type_id
                display_name
                name
            }
            is_archived
        }
    }
`;

class LocationsBobQuery extends InheritedHasuraServiceClient {
    async calendarGetLocationsListByLocationTypes(
        variables: Calendar_LocationsListByLocationTypesQueryVariables
    ): Promise<Calendar_LocationsListByLocationTypesQuery["locations"] | undefined> {
        const response = await this._call<Calendar_LocationsListByLocationTypesQuery>({
            query: calendarGetLocationsListByLocationTypes,
            variables,
        });

        return response.data?.locations;
    }
}

const locationsQueriesBob = new LocationsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default locationsQueriesBob;
