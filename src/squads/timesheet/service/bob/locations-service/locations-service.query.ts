import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";
import { getSearchString } from "src/squads/timesheet/service/utils";

import {
    Timesheet_LocationListByIdsQuery,
    Timesheet_LocationListByIdsQueryVariables,
    Timesheet_LocationOneQuery,
    Timesheet_LocationOneQueryVariables,
    Timesheet_LocationListQuery,
    Timesheet_LocationListQueryVariables,
} from "../bob-types";

const locationFragment = gql`
    fragment Timesheet_LocationAttrs on locations {
        location_id
        name
    }
`;

const getManyQuery = gql`
    query Timesheet_LocationListByIds($location_ids: [String!] = []) {
        locations(where: { location_id: { _in: $location_ids } }) {
            ...Timesheet_LocationAttrs
        }
    }
    ${locationFragment}
`;

const getOneQuery = gql`
    query Timesheet_LocationOne($location_id: String!) {
        locations(where: { location_id: { _eq: $location_id } }) {
            ...Timesheet_LocationAttrs
        }
    }
    ${locationFragment}
`;

const getListQuery = gql`
    query Timesheet_LocationList($name: String, $limit: Int = 10, $offset: Int = 0) {
        locations(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, name: asc }
            where: { name: { _ilike: $name } }
        ) {
            ...Timesheet_LocationAttrs
        }
    }
    ${locationFragment}
`;
class LocationsQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: Timesheet_LocationListByIdsQueryVariables
    ): Promise<Timesheet_LocationListByIdsQuery["locations"] | undefined> {
        const query = {
            query: getManyQuery,
            variables,
        };

        const res = await this._call<Timesheet_LocationListByIdsQuery>(query);
        return res.data?.locations;
    }
    async getOne(
        variables: Timesheet_LocationOneQueryVariables
    ): Promise<ArrayElement<Timesheet_LocationOneQuery["locations"]> | undefined> {
        const { location_id } = variables;
        const query = {
            query: getOneQuery,
            variables: {
                location_id,
            },
        };
        const res = await this._call<Timesheet_LocationOneQuery>(query);

        return res.data?.locations[0];
    }
    async getListWithFilter(
        variables: Timesheet_LocationListQueryVariables
    ): Promise<Timesheet_LocationListQuery["locations"] | undefined> {
        const query = {
            query: getListQuery,
            variables: {
                name: getSearchString(variables.name),
            },
        };

        const res = await this._call<Timesheet_LocationListQuery>(query);
        return res.data?.locations;
    }
}

const locationsQueries = new LocationsQuery(appConfigs, "bobGraphQL", doQuery);

export default locationsQueries;
