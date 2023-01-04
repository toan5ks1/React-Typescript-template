import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/calendar/internals/hasura-client/execute-query";
import {
    Calendar_LocationTypesListQuery,
    Calendar_LocationTypesListQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/calendar/service/service-types";

const calendarGetLocationTypesList = gql`
    query Calendar_LocationTypesList($limit: Int = 100) {
        location_types(limit: $limit) {
            name
            display_name
            location_type_id
            parent_location_type_id
            parent_name
            is_archived
        }
    }
`;

class LocationTypesBobQuery extends InheritedHasuraServiceClient {
    async calendarGetLocationTypesList(
        variables: Calendar_LocationTypesListQueryVariables
    ): Promise<Calendar_LocationTypesListQuery["location_types"] | undefined> {
        const response = await this._call<Calendar_LocationTypesListQuery>({
            query: calendarGetLocationTypesList,
            variables,
        });

        return response.data?.location_types;
    }
}

const locationTypesQueriesBob = new LocationTypesBobQuery(appConfigs, "bobGraphQL", doQuery);

export default locationTypesQueriesBob;
