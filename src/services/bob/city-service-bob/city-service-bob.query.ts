import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import { CityManyQueryVariables, CityOneQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const citiesFragment = gql`
    fragment CityAttrs on cities {
        city_id
        country
        display_order
        name
    }
`;
const getOneQuery = gql`
    query CityOne($city_id: Int = 0) {
        cities(where: { city_id: { _eq: $city_id } }) {
            ...CityAttrs
        }
    }
    ${citiesFragment}
`;

const getManyQuery = gql`
    query CityMany($country: String, $city_id: Int, $name: String) {
        cities(
            where: {
                country: { _eq: $country }
                city_id: { _eq: $city_id }
                name: { _ilike: $name }
            }
        ) {
            ...CityAttrs
        }
    }
    ${citiesFragment}
`;

class CityBobQuery {
    getOne(variables: CityOneQueryVariables): GraphqlBody<CityOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }
    getMany({ name, ...variables }: CityManyQueryVariables): GraphqlBody<CityManyQueryVariables> {
        return {
            query: getManyQuery,
            variables: {
                ...variables,
                name: getSearchString(name),
            },
        };
    }
}

const cityQueriesBob = new CityBobQuery();

export default cityQueriesBob;
