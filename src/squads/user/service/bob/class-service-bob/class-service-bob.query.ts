import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_ClassListWithFilterQuery,
    User_ClassListWithFilterQueryVariables,
    User_ClassManyQueryVariables,
    User_ClassManyQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getManyQuery = gql`
    query User_ClassMany($class_ids: [String!] = []) {
        class(where: { class_id: { _in: $class_ids } }) {
            name
            class_id
        }
    }
`;

const getClassListWithFilterQuery = gql`
    query User_ClassListWithFilter($course_id: String!, $location_id: String!) {
        class(where: { course_id: { _eq: $course_id }, location_id: { _eq: $location_id } }) {
            class_id
            name
        }
    }
`;
class ClassBobQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: User_ClassManyQueryVariables
    ): Promise<User_ClassManyQuery["class"] | undefined> {
        const query = {
            query: getManyQuery,
            variables,
        };

        const res = await this._call<User_ClassManyQuery>(query);

        return res.data?.class;
    }
    async getClassListWithFilter(
        variables: User_ClassListWithFilterQueryVariables
    ): Promise<User_ClassListWithFilterQuery["class"] | undefined> {
        const query = {
            query: getClassListWithFilterQuery,
            variables,
        };
        const resp = await this._call<User_ClassListWithFilterQuery>(query);
        return resp.data?.class;
    }
}

const classQueriesBob = new ClassBobQuery(appConfigs, "bobGraphQL", doQuery);

export default classQueriesBob;
