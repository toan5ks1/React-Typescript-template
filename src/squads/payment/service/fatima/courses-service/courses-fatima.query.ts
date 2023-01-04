import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyCourseByCourseIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetManyCourseByCourseIds = gql`
    query Payment_GetManyCourseByCourseIds($course_ids: [String!] = []) {
        courses(where: { course_id: { _in: $course_ids } }) {
            course_id
            grade
            name
        }
    }
`;

class CourseFatimaQueries extends InheritedHasuraServiceClient {
    async getManyCourseByCourseIds(
        variables: Payment_GetManyCourseByCourseIdsQueryVariables
    ): Promise<Payment_GetManyCourseByCourseIdsQuery["courses"] | undefined> {
        const response = await this._call<Payment_GetManyCourseByCourseIdsQuery>({
            query: GetManyCourseByCourseIds,
            variables,
        });

        return response.data?.courses;
    }
}

const courseFatimaQueries = new CourseFatimaQueries(appConfigs, "fatimaGraphQL", doQuery);

export default courseFatimaQueries;
