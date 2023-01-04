import "graphql";
import { gql } from "graphql-tag";

import { Users_OrganizationsManyReferenceQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getOrganizationsManyReferenceQuery = gql`
    query Users_OrganizationsManyReference($domain_name: String) {
        organizations(where: { domain_name: { _eq: $domain_name } }) {
            tenant_id
            domain_name
        }
    }
`;

class OrganizationsQueryBob {
    async getOrganizationsManyReference(
        variables: Users_OrganizationsManyReferenceQueryVariables
    ): Promise<GraphqlBody> {
        const { domain_name } = variables;

        return {
            query: getOrganizationsManyReferenceQuery,
            variables: {
                domain_name,
            },
        };
    }
}

const organizationsQueryBob = new OrganizationsQueryBob();

export default organizationsQueryBob;
