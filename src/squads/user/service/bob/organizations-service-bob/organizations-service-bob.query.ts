import "graphql";
import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    Users_OrganizationsManyReferenceQueryVariables,
    Users_OrganizationsManyReferenceQuery,
} from "src/squads/user/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const getOrganizationsManyReferenceQuery = gql`
    query Users_OrganizationsManyReference($domain_name: String) {
        organizations(where: { domain_name: { _eq: $domain_name } }) {
            tenant_id
            domain_name
        }
    }
`;

class OrganizationsQueryBob extends InheritedHasuraServiceClient {
    async getOrganizationsManyReference(
        variables: Users_OrganizationsManyReferenceQueryVariables
    ): Promise<Users_OrganizationsManyReferenceQuery["organizations"] | undefined> {
        const query = {
            query: getOrganizationsManyReferenceQuery,
            variables,
        };

        const resp = await this._call<Users_OrganizationsManyReferenceQuery>(query);

        return resp.data?.organizations;
    }
}

const organizationsQueryBob = new OrganizationsQueryBob(appConfigs, "bobGraphQL", doQuery);

export default organizationsQueryBob;
