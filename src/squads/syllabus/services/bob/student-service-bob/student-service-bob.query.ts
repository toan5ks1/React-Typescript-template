import "graphql";
import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    StudentsManyQueryVariables,
    StudentsManyQuery,
} from "src/squads/syllabus/services/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const studentUserFragment = gql`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
`;

const getManyQuery = gql`
    query StudentsMany($user_ids: [String!] = []) {
        users(where: { user_group: { _eq: "USER_GROUP_STUDENT" }, user_id: { _in: $user_ids } }) {
            ...StudentUserAttrs
        }
    }
    ${studentUserFragment}
`;

class StudentQueryBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: StudentsManyQueryVariables
    ): Promise<StudentsManyQuery["users"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<StudentsManyQuery>(body);

        return resp.data?.users;
    }
}

const studentQueriesBob = new StudentQueryBob(appConfigs, "bobGraphQL", doQuery);

export default studentQueriesBob;
