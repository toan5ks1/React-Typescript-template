import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolCourseByIdsQuery,
    User_CountSchoolCourseByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countSchoolCourseByIds = gql`
    query User_CountSchoolCourseByIds($schoolCourseIds: [String!]!) {
        school_course_aggregate(where: { school_course_id: { _in: $schoolCourseIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class SchoolCourseQueryBob extends InheritedHasuraServiceClient {
    async countSchoolCourseByIds(
        variables: User_CountSchoolCourseByIdsQueryVariables
    ): Promise<User_CountSchoolCourseByIdsQuery["school_course_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountSchoolCourseByIdsQuery>({
            query: countSchoolCourseByIds,
            variables,
        });

        return response.data?.school_course_aggregate.aggregate;
    }
}

const schoolCourseQueryBob = new SchoolCourseQueryBob(appConfigs, "bobGraphQL", doQuery);

export default schoolCourseQueryBob;
