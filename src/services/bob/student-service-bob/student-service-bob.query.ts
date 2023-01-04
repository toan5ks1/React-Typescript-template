import "graphql";
import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import {
    CountStudentWithFilterQueryVariables,
    GradesOfStudentsListQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    StudentsManyQueryVariables,
    StudentsManyReferenceByNameAndEmailQueryVariables,
    StudentsManyReferenceQueryVariables,
    StudentsOneV3QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables,
    User_CountStudentWithFilterV2QueryVariables,
} from "../bob-types";
import { userFragment } from "../user-service-bob";

import { GraphqlBody } from "@manabie-com/graphql-client";

const studentFragment = gql`
    fragment StudentFrg on students {
        student_id
        current_grade
        user {
            ...UserAttrs
            last_login_date
            gender
            birthday
        }
    }
    ${userFragment}
`;

const studentWithoutGradeFragment = gql(`
    fragment StudentWithoutGradeFrg on users {
        user_id
        name
        email
        phone_number
        country
        last_login_date
    }
`);

const studentUserFragment = gql`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
`;

const getListWithFilterQuery = gql`
    query StudentsListByFiltersWithoutGradeAndAggregate(
        $name: String
        $email: String
        $limit: Int = 10
        $offset: Int = 0
        $order_by: users_order_by! = { created_at: desc }
        $student_ids: [String!]
        $grades: [smallint!]
        $enrollment_status: String
        $last_login_date: Boolean
    ) {
        users(
            where: {
                name: { _ilike: $name }
                email: { _ilike: $email }
                user_id: { _in: $student_ids }
                user_group: { _eq: "USER_GROUP_STUDENT" }
                last_login_date: { _is_null: $last_login_date }
                student: {
                    current_grade: { _in: $grades }
                    enrollment_status: { _eq: $enrollment_status }
                }
            }
            limit: $limit
            offset: $offset
            order_by: [$order_by]
        ) {
            ...StudentWithoutGradeFrg
        }
    }
    ${studentWithoutGradeFragment}
`;

const getManyQuery = gql`
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

const getManyReferenceQueryByNameAndEmail = gql`
    query StudentsManyReferenceByNameAndEmail(
        $keyword: String
        $limit: Int = 30
        $offset: Int = 0
    ) {
        users(
            where: {
                user_group: { _eq: "USER_GROUP_STUDENT" }
                _or: [{ email: { _ilike: $keyword } }, { name: { _ilike: $keyword } }]
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

const getOneQuery = gql`
    query StudentsOneV3($id: String!) {
        students(where: { student_id: { _eq: $id } }) {
            enrollment_status
            student_external_id
            student_note
            ...StudentFrg
        }
    }
    ${studentFragment}
`;

const getGradesOfStudentsListQuery = gql`
    query GradesOfStudentsList($student_ids: [String!] = []) {
        students(where: { student_id: { _in: $student_ids } }) {
            student_id
            current_grade
            enrollment_status
        }
    }
`;

const getCountStudentWithFilter = gql`
    query CountStudentWithFilter(
        $name: String
        $email: String
        $grades: [smallint!]
        $student_ids: [String!]
        $enrollment_status: String
        $last_login_date: Boolean
    ) {
        users_aggregate(
            where: {
                name: { _ilike: $name }
                email: { _ilike: $email }
                user_id: { _in: $student_ids }
                user_group: { _eq: "USER_GROUP_STUDENT" }
                last_login_date: { _is_null: $last_login_date }
                student: {
                    current_grade: { _in: $grades }
                    enrollment_status: { _eq: $enrollment_status }
                }
            }
        ) {
            aggregate {
                count(columns: user_id)
            }
        }
    }
`;

const getListWithFilterQueryV2 = gql`
    query User_StudentsListByFiltersWithoutGradeAndAggregateV2(
        $name: String
        $email: String
        $limit: Int = 10
        $offset: Int = 0
        $order_by: users_order_by! = { created_at: desc }
        $student_ids: [String!]
        $grades: [smallint!]
        $enrollment_status: String
        $last_login_date: Boolean
        $location_ids: [String!]
    ) {
        users(
            where: {
                name: { _ilike: $name }
                email: { _ilike: $email }
                user_id: { _in: $student_ids }
                user_group: { _eq: "USER_GROUP_STUDENT" }
                last_login_date: { _is_null: $last_login_date }
                student: {
                    current_grade: { _in: $grades }
                    enrollment_status: { _eq: $enrollment_status }
                }
                user_access_paths: { location_id: { _in: $location_ids } }
            }
            limit: $limit
            offset: $offset
            order_by: [$order_by]
        ) {
            ...StudentWithoutGradeFrg
        }
    }

    ${studentWithoutGradeFragment}
`;

const getCountStudentWithFilterV2 = gql`
    query User_CountStudentWithFilterV2(
        $name: String
        $email: String
        $grades: [smallint!]
        $student_ids: [String!]
        $enrollment_status: String
        $last_login_date: Boolean
        $location_ids: [String!]
    ) {
        users_aggregate(
            where: {
                name: { _ilike: $name }
                email: { _ilike: $email }
                user_id: { _in: $student_ids }
                user_group: { _eq: "USER_GROUP_STUDENT" }
                last_login_date: { _is_null: $last_login_date }
                student: {
                    current_grade: { _in: $grades }
                    enrollment_status: { _eq: $enrollment_status }
                }
                user_access_paths: { location_id: { _in: $location_ids } }
            }
        ) {
            aggregate {
                count(columns: user_id)
            }
        }
    }
`;

class StudentQueryBob {
    async getListWithFilter(
        variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables
    ): Promise<GraphqlBody> {
        const { name, email, grades, ...rest } = variables;

        return {
            query: getListWithFilterQuery,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
    }
    async getListWithFilterV2(
        variables: User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables
    ): Promise<GraphqlBody> {
        const { name, email, grades, ...rest } = variables;

        return {
            query: getListWithFilterQueryV2,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
    }

    async getMany(
        variables: StudentsManyQueryVariables
    ): Promise<GraphqlBody<StudentsManyQueryVariables>> {
        const { user_ids } = variables;

        return {
            query: getManyQuery,
            variables: {
                user_ids,
            },
        };
    }

    async getManyReference(variables: StudentsManyReferenceQueryVariables): Promise<GraphqlBody> {
        const { name, email, limit, offset, user_ids } = variables;
        return {
            query: getManyReferenceQuery,
            variables: {
                user_ids,
                limit,
                offset,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
    }

    async getManyReferenceByNameAndEmail(
        variables: StudentsManyReferenceByNameAndEmailQueryVariables
    ): Promise<GraphqlBody> {
        const { keyword, limit, offset } = variables;
        return {
            query: getManyReferenceQueryByNameAndEmail,
            variables: {
                limit,
                offset,
                keyword: getSearchString(keyword),
            },
        };
    }

    async getOne(variables: StudentsOneV3QueryVariables): Promise<GraphqlBody> {
        return {
            query: getOneQuery,
            variables: {
                id: variables.id,
            },
        };
    }

    getGradesOfStudentsList(
        variables: GradesOfStudentsListQueryVariables
    ): GraphqlBody<GradesOfStudentsListQueryVariables> {
        return {
            query: getGradesOfStudentsListQuery,
            variables: {
                student_ids: variables.student_ids,
            },
        };
    }

    async getCountStudentWithFilter(
        variables: CountStudentWithFilterQueryVariables
    ): Promise<GraphqlBody> {
        const { name, email, grades, ...rest } = variables;

        return {
            query: getCountStudentWithFilter,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
    }

    async getCountStudentWithFilterV2(
        variables: User_CountStudentWithFilterV2QueryVariables
    ): Promise<GraphqlBody> {
        const { name, email, grades, ...rest } = variables;

        return {
            query: getCountStudentWithFilterV2,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
    }
}

const studentQueriesBob = new StudentQueryBob();

export default studentQueriesBob;
