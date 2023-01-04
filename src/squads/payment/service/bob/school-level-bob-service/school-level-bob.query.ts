import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolLevelByIdsQuery,
    User_CountSchoolLevelByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countSchoolLevelByIds = gql`
    query User_CountSchoolLevelByIds($schoolLevelIds: [String!]!) {
        school_level_aggregate(where: { school_level_id: { _in: $schoolLevelIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class SchoolLevelQueryBob extends InheritedHasuraServiceClient {
    async countSchoolLevelByIds(
        variables: User_CountSchoolLevelByIdsQueryVariables
    ): Promise<User_CountSchoolLevelByIdsQuery["school_level_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountSchoolLevelByIdsQuery>({
            query: countSchoolLevelByIds,
            variables,
        });

        return response.data?.school_level_aggregate.aggregate;
    }
}

const schoolLevelQueryBob = new SchoolLevelQueryBob(appConfigs, "bobGraphQL", doQuery);

export default schoolLevelQueryBob;
