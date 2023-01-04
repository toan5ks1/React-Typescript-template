import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    TeacherManyQuery,
    TeacherManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const getManyQuery = gql`
    query TeacherMany($user_id: [String!] = [], $school_id: Int = 0) {
        find_teacher_by_school_id(
            args: { school_id: $school_id }
            where: { user_id: { _in: $user_id } }
        ) {
            name
            email
            user_id
        }
    }
`;

class TeacherQueryBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: TeacherManyQueryVariables
    ): Promise<TeacherManyQuery["find_teacher_by_school_id"] | undefined> {
        const response = await this._call<TeacherManyQuery>({
            query: getManyQuery,
            variables,
        });

        return response.data?.find_teacher_by_school_id;
    }
}

const teachersQueriesBob = new TeacherQueryBob(appConfigs, "bobGraphQL", doQuery);

export default teachersQueriesBob;
