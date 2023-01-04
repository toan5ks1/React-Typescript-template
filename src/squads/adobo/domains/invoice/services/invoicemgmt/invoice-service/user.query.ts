import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_UsersQuery,
    Invoice_UsersQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

const getUsersQuery = gql`
    query Invoice_Users($user_ids: [String!] = []) {
        users(where: { user_id: { _in: $user_ids } }) {
            user_id
            name
        }
    }
`;

class UserInvoiceMgmtQuery extends InheritedHasuraServiceClient {
    async getUsers(
        variables: Invoice_UsersQueryVariables
    ): Promise<Invoice_UsersQuery["users"] | undefined> {
        const response = await this._call<Invoice_UsersQuery>({
            query: getUsersQuery,
            variables,
        });

        return response.data?.users;
    }
}

const userQueryInvoiceMgmt = new UserInvoiceMgmtQuery(appConfigs, "invoicemgmtGraphQL", doQuery);

export default userQueryInvoiceMgmt;
