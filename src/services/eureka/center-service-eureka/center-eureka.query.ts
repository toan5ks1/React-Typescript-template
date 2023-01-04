import { gql } from "graphql-tag";

import { CentersListQueryVariables } from "../eureka-types";

const centerFragment = gql`
    fragment CenterAttrs on centers {
        center_id
        name
        owner
    }
`;

const getListQuery = gql`
    query CentersList($limit: Int, $offset: Int) {
        centers(limit: $limit, offset: $offset) {
            ...CenterAttrs
        }
    }
    ${centerFragment}
`;

class CenterEurekaQuery {
    getList(variables: CentersListQueryVariables) {
        return {
            query: getListQuery,
            variables,
        };
    }
}

const centerQueriesEureka = new CenterEurekaQuery();

export default centerQueriesEureka;
