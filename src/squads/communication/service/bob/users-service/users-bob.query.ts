import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    StudentsManyQuery,
    StudentsManyQueryVariables,
    StudentsManyReferenceQuery,
    StudentsManyReferenceQueryVariables,
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";
import { getSearchString } from "src/squads/communication/service/utils/utils";

export const userFragment = gql`
    fragment UserAttrs on users {
        user_id
        name
        email
        avatar
        phone_number
        user_group
        country
    }
`;

const studentUserFragment = gql`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
`;

const getUserNameByIdsQuery = gql`
    query UserNameByIds($user_id: [String!] = []) {
        users(where: { user_id: { _in: $user_id } }) {
            user_id
            name
        }
    }
`;

const getStudentsManyQuery = gql`
    query StudentsMany($user_ids: [String!] = []) {
        users(where: { user_group: { _eq: "USER_GROUP_STUDENT" }, user_id: { _in: $user_ids } }) {
            ...StudentUserAttrs
        }
    }
    ${studentUserFragment}
`;

const getManyReferenceQuery = gql`
    query StudentsManyReference(
        $user_ids: [String!]
        $name: String
        $email: String
        $limit: Int = 30
        $offset: Int = 0
    ) {
        users(
            where: {
                user_group: { _eq: "USER_GROUP_STUDENT" }
                user_id: { _in: $user_ids }
                name: { _ilike: $name }
                email: { _ilike: $email }
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            ...StudentUserAttrs
        }
    }
    ${studentUserFragment}
`;

class UsersQueriesBob extends InheritedHasuraServiceClient {
    async getUserNameList(
        variables: UserNameByIdsQueryVariables
    ): Promise<UserNameByIdsQuery["users"] | undefined> {
        const res = await this._call<UserNameByIdsQuery>({
            query: getUserNameByIdsQuery,
            variables,
        });

        return res.data?.users;
    }

    async getStudentsMany(
        variables: StudentsManyQueryVariables
    ): Promise<StudentsManyQuery["users"] | undefined> {
        const res = await this._call<StudentsManyQuery>({ query: getStudentsManyQuery, variables });

        return res.data?.users;
    }

    async getManyReference(
        variables: StudentsManyReferenceQueryVariables
    ): Promise<StudentsManyReferenceQuery["users"] | undefined> {
        const { name, email, ...rest } = variables;

        const query = {
            query: getManyReferenceQuery,
            variables: {
                name: getSearchString(name),
                email: getSearchString(email),
                ...rest,
            },
        };

        const res = await this._call<StudentsManyReferenceQuery>(query);
        return res.data?.users;
    }
}

const usersQueriesBob = new UsersQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default usersQueriesBob;
