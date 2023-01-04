import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    Users_PrefectureListQuery,
    Users_PrefectureListQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getListQuery = gql`
    query Users_PrefectureList {
        prefecture(order_by: { prefecture_code: asc }) {
            prefecture_id
            name
        }
    }
`;

class PrefectureQueryBob extends InheritedHasuraServiceClient {
    async getList(
        variables: Users_PrefectureListQueryVariables
    ): Promise<Users_PrefectureListQuery["prefecture"] | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<Users_PrefectureListQuery>(query);
        return res.data?.prefecture;
    }
}

const prefectureQueriesBob = new PrefectureQueryBob(appConfigs, "bobGraphQL", doQuery);

export default prefectureQueriesBob;
