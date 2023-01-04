import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    ParentsManyReferenceQueryVariables,
    ParentsManyReferenceQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { getSearchString } from "src/squads/user/service/utils";

const parentFragment = gql`
    fragment ParentAttrs on users {
        user_id
        name
        email
        phone_number
        country
    }
`;
const getListQuery = gql`
    query ParentsManyReference($email: String, $name: String, $limit: Int = 10, $offset: Int = 0) {
        users(
            limit: $limit
            offset: $offset
            where: {
                _and: [
                    { user_group: { _eq: "USER_GROUP_PARENT" } }
                    { _or: [{ email: { _ilike: $email } }, { name: { _ilike: $name } }] }
                ]
            }
        ) {
            ...ParentAttrs
        }
    }
    ${parentFragment}
`;
class ParentBobQuery extends InheritedHasuraServiceClient {
    async getParentsList(
        variables: ParentsManyReferenceQueryVariables
    ): Promise<ParentsManyReferenceQuery["users"] | undefined> {
        const query = {
            query: getListQuery,
            variables: {
                email: getSearchString(variables.email),
                name: getSearchString(variables.name),
            },
        };

        const res = await this._call<ParentsManyReferenceQuery>(query);

        return res.data?.users;
    }
}

const parentQueriesBob = new ParentBobQuery(appConfigs, "bobGraphQL", doQuery);

export default parentQueriesBob;
