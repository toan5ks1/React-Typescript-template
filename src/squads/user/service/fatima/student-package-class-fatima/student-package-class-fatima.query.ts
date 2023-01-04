import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";

import { InheritedHasuraServiceClient } from "../../service-types";
import {
    User_StudentPackagesClassListWithFilterQuery,
    User_StudentPackagesClassListWithFilterQueryVariables,
} from "../fatima-types";

const getListWithFilterQuery = gql`
    query User_StudentPackagesClassListWithFilter(
        $student_id: String!
        $student_package_ids: [String!] = []
    ) {
        student_package_class(
            where: {
                student_package_id: { _in: $student_package_ids }
                student_id: { _eq: $student_id }
            }
        ) {
            class_id
            course_id
            location_id
            student_package_id
        }
    }
`;

class StudentPackageFatimaClassQuery extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: User_StudentPackagesClassListWithFilterQueryVariables
    ): Promise<User_StudentPackagesClassListWithFilterQuery["student_package_class"] | undefined> {
        const query = {
            query: getListWithFilterQuery,
            variables,
        };

        const res = await this._call<User_StudentPackagesClassListWithFilterQuery>(query);
        return res.data?.student_package_class;
    }
}

const studentPackageFatimaClassQuery = new StudentPackageFatimaClassQuery(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default studentPackageFatimaClassQuery;
