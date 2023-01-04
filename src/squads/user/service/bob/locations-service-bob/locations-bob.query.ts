import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_LocationListByIdsQueryVariables,
    User_LocationListByIdsQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getListWithFilterQuery = gql`
    query User_LocationListByIds($location_ids: [String!] = []) {
        locations(where: { location_id: { _in: $location_ids } }) {
            location_id
            name
            access_path
            location_type
            parent_location_id
        }
    }
`;

class LocationsBobQuery extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: User_LocationListByIdsQueryVariables
    ): Promise<User_LocationListByIdsQuery["locations"] | undefined> {
        const response = await this._call<User_LocationListByIdsQuery>({
            query: getListWithFilterQuery,
            variables,
        });

        return response.data?.locations;
    }
}

const locationsQueriesBob = new LocationsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default locationsQueriesBob;
