import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import { ParentsManyReferenceQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const parentFragment = gql`
    fragment ParentAttrs on users {
        user_id
        name
        email
        phone_number
        country
    }
`;
const getListQuery = gql`
    query ParentsManyReference($email: String, $name: String, $limit: Int = 10, $offset: Int = 0) {
        users(
            limit: $limit
            offset: $offset
            where: {
                _and: [
                    { user_group: { _eq: "USER_GROUP_PARENT" } }
                    { _or: [{ email: { _ilike: $email } }, { name: { _ilike: $name } }] }
                ]
            }
        ) {
            ...ParentAttrs
        }
    }
    ${parentFragment}
`;
class ParentBobQuery {
    getParentsList(
        params: ParentsManyReferenceQueryVariables
    ): GraphqlBody<ParentsManyReferenceQueryVariables> {
        return {
            query: getListQuery,
            variables: {
                email: getSearchString(params.email),
                name: getSearchString(params.name),
            },
        };
    }
}

export default new ParentBobQuery();
