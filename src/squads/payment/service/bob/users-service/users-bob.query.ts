import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const getUserNameByIdsQuery = gql`
    query UserNameByIds($user_id: [String!] = []) {
        users(where: { user_id: { _in: $user_id } }) {
            user_id
            name
        }
    }
`;

class UsersQueriesBob extends InheritedHasuraServiceClient {
    async getUserNameList(
        variables: UserNameByIdsQueryVariables
    ): Promise<UserNameByIdsQuery["users"] | undefined> {
        const res = await this._call<UserNameByIdsQuery>({
            query: getUserNameByIdsQuery,
            variables,
        });

        return res.data?.users;
    }
}

const usersQueriesBob = new UsersQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default usersQueriesBob;
