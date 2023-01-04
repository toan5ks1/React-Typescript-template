import { gql } from "graphql-tag";

import { ParentRelationshipsByUserIdQueryVariables, ParentsManyQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

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

const getParentRelationShips = gql`
    query ParentRelationshipsByUserId($userId: String, $limit: Int = 1) {
        student_parents(limit: $limit, where: { parent_id: { _eq: $userId } }) {
            relationship
        }
    }
`;

class StudentParentBobQuery {
    getManyParentIDs(params: ParentsManyQueryVariables): GraphqlBody<ParentsManyQueryVariables> {
        return {
            query: getManyQuery,
            variables: params,
        };
    }
    getParentRelationships(
        params: ParentRelationshipsByUserIdQueryVariables
    ): GraphqlBody<ParentRelationshipsByUserIdQueryVariables> {
        return {
            query: getParentRelationShips,
            variables: {
                userId: params.userId,
            },
        };
    }
}

export default new StudentParentBobQuery();
