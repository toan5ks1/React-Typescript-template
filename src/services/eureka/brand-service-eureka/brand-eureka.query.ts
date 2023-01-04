import { gql } from "graphql-tag";

import { BrandsListQueryVariables } from "./../eureka-types";

const brandFragment = gql`
    fragment BrandAttrs on brands {
        brand_id
        name
        owner
    }
`;

const getListQuery = gql`
    query BrandsList($limit: Int, $offset: Int) {
        brands(limit: $limit, offset: $offset) {
            ...BrandAttrs
        }
    }
    ${brandFragment}
`;

class BrandEurekaQuery {
    getList(variables: BrandsListQueryVariables) {
        return {
            query: getListQuery,
            variables,
        };
    }
}

const brandQueriesEureka = new BrandEurekaQuery();

export default brandQueriesEureka;
