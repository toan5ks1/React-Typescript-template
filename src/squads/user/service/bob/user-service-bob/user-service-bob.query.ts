import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import { UserByEmailQueryVariables, UserByEmailQuery } from "src/squads/user/service/bob/bob-types";
import { userFragment } from "src/squads/user/service/bob/fragments";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getOne = gql`
    query UserByEmail($email: String, $phone_number: String, $user_id: String) {
        users(
            where: {
                email: { _eq: $email }
                phone_number: { _eq: $phone_number }
                user_id: { _neq: $user_id }
            }
        ) {
            ...UserAttrs
        }
    }
    ${userFragment}
`;

class UserBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: UserByEmailQueryVariables
    ): Promise<UserByEmailQuery["users"] | undefined> {
        const query = {
            query: getOne,
            variables,
        };

        const res = await this._call<UserByEmailQuery>(query);
        return res.data?.users;
    }
}

const userQueriesBob = new UserBobQuery(appConfigs, "bobGraphQL", doQuery);

export default userQueriesBob;
