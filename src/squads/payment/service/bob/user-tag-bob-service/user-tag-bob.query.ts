import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountUserTagByIdsQuery,
    User_CountUserTagByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countUserTagByIds = gql`
    query User_CountUserTagByIds($userTagIds: [String!]!) {
        user_tag_aggregate(where: { user_tag_id: { _in: $userTagIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class UserTagQueryBob extends InheritedHasuraServiceClient {
    async countUserTagByIds(
        variables: User_CountUserTagByIdsQueryVariables
    ): Promise<User_CountUserTagByIdsQuery["user_tag_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountUserTagByIdsQuery>({
            query: countUserTagByIds,
            variables,
        });

        return response.data?.user_tag_aggregate.aggregate;
    }
}

const userTagQueryBob = new UserTagQueryBob(appConfigs, "bobGraphQL", doQuery);

export default userTagQueryBob;
