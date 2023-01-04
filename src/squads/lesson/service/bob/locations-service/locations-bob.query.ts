import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    LocationByLocationIdQuery,
    LocationByLocationIdQueryVariables,
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const getOne = gql`
    query LocationByLocationId($location_id: String!) {
        locations(where: { location_id: { _eq: $location_id } }) {
            location_id
            name
        }
    }
`;
const getManyQuery = gql`
    query LocationListByIds($location_ids: [String!] = []) {
        locations(where: { location_id: { _in: $location_ids } }) {
            name
            location_id
        }
    }
`;

class LocationsBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: LocationByLocationIdQueryVariables
    ): Promise<ArrayElement<LocationByLocationIdQuery["locations"]> | undefined> {
        const response = await this._call<LocationByLocationIdQuery>({
            query: getOne,
            variables,
        });

        return response.data?.locations[0];
    }

    async getMany(
        variables: LocationListByIdsQueryVariables
    ): Promise<LocationListByIdsQuery["locations"] | undefined> {
        const response = await this._call<LocationListByIdsQuery>({
            query: getManyQuery,
            variables,
        });

        return response.data?.locations;
    }
}

const locationsQueriesBob = new LocationsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default locationsQueriesBob;
