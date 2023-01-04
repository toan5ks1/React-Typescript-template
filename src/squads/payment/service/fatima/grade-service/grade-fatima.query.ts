import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountGradesByIdsQueryVariables,
    User_CountGradesByIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const countGradeByIds = gql`
    query User_CountGradesByIds($gradeIds: [String!]!) {
        grade_aggregate(where: { grade_id: { _in: $gradeIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class GradeQueriesFatima extends InheritedHasuraServiceClient {
    async countGradeByIds(
        variables: User_CountGradesByIdsQueryVariables
    ): Promise<User_CountGradesByIdsQuery["grade_aggregate"]["aggregate"] | undefined> {
        const res = await this._call<User_CountGradesByIdsQuery>({
            query: countGradeByIds,
            variables,
        });

        return res.data?.grade_aggregate.aggregate;
    }
}

const gradeQueriesFatima = new GradeQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default gradeQueriesFatima;
