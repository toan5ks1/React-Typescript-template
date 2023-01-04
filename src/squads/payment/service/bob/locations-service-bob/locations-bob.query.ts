import { gql } from "graphql-tag";
import {
    LocationByLocationIdQueryVariables,
    LocationListByIdsQueryVariables,
    LocationsListByNameLowestLevelQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { GraphqlBody } from "src/typings/graphql";

const getManyReferenceQuery = gql`
    query LocationsListByNameLowestLevel($limit: Int = 10, $offset: Int = 0, $name: String = "") {
        get_locations_lowest_level(
            args: { location_limit: $limit, location_offset: $offset, location_search_name: $name }
        ) {
            name
            location_id
        }
    }
`;

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

class LocationsBobQuery {
    getManyReference(
        variables: LocationsListByNameLowestLevelQueryVariables
    ): GraphqlBody<LocationsListByNameLowestLevelQueryVariables> {
        return {
            query: getManyReferenceQuery,
            variables,
        };
    }

    getOne(
        variables: LocationByLocationIdQueryVariables
    ): GraphqlBody<LocationByLocationIdQueryVariables> {
        return {
            query: getOne,
            variables,
        };
    }

    getMany(
        variables: LocationListByIdsQueryVariables
    ): GraphqlBody<LocationListByIdsQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getListWithFilter(
        variables: LocationListByIdsQueryVariables
    ): GraphqlBody<LocationListByIdsQueryVariables> {
        return {
            query: getListWithFilterQuery,
            variables,
        };
    }
}

const locationsQueriesBob = new LocationsBobQuery();

export default locationsQueriesBob;
