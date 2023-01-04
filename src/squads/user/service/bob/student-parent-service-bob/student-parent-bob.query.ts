import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    ParentRelationshipsByUserIdQuery,
    ParentRelationshipsByUserIdQueryVariables,
    ParentsManyQuery,
    ParentsManyQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const studentParentFragment = gql`
    fragment StudentParentAttrs on student_parents {
        parent_id
        student_id
        relationship
        parent_user {
            name
            email
            phone_number
            country
        }
    }
`;

const getManyQuery = gql`
    query ParentsMany($student_ids: [String!]!) {
        student_parents(where: { student_id: { _in: $student_ids } }) {
            ...StudentParentAttrs
            parent_user {
                name
                email
                phone_number
                country
            }
        }
    }
    ${studentParentFragment}
`;

const getParentRelationships = gql`
    query ParentRelationshipsByUserId($userId: String, $limit: Int = 1) {
        student_parents(limit: $limit, where: { parent_id: { _eq: $userId } }) {
            relationship
        }
    }
`;

class StudentParentQueriesBob extends InheritedHasuraServiceClient {
    async getManyParentIDs(
        variables: ParentsManyQueryVariables
    ): Promise<ParentsManyQuery["student_parents"] | undefined> {
        const query = {
            query: getManyQuery,
            variables,
        };

        const res = await this._call<ParentsManyQuery>(query);

        return res.data?.student_parents;
    }

    async getParentRelationships(
        variables: ParentRelationshipsByUserIdQueryVariables
    ): Promise<ParentRelationshipsByUserIdQuery["student_parents"] | undefined> {
        const query = {
            query: getParentRelationships,
            variables,
        };

        const res = await this._call<ParentsManyQuery>(query);

        return res.data?.student_parents;
    }
}

const studentParentQueriesBob = new StudentParentQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default studentParentQueriesBob;
