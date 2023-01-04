import "graphql";
import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    StudentsManyQuery,
    StudentsManyQueryVariables,
    GradesOfStudentsListQueryVariables,
    GradesOfStudentsListQuery,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQuery,
    CountStudentWithFilterQueryVariables,
    CountStudentWithFilterQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";
import { getSearchString } from "src/squads/lesson/service/utils/utils";

const studentUserFragment = gql`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
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

const getManyQuery = gql`
    query StudentsMany($user_ids: [String!] = []) {
        users(where: { user_group: { _eq: "USER_GROUP_STUDENT" }, user_id: { _in: $user_ids } }) {
            ...StudentUserAttrs
        }
    }
    ${studentUserFragment}
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

class StudentQueryBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: StudentsManyQueryVariables
    ): Promise<StudentsManyQuery["users"] | undefined> {
        const { user_ids } = variables;

        const response = await this._call<StudentsManyQuery>({
            query: getManyQuery,
            variables: {
                user_ids,
            },
        });

        return response.data?.users;
    }

    async getGradesOfStudentsList(
        variables: GradesOfStudentsListQueryVariables
    ): Promise<GradesOfStudentsListQuery["students"] | undefined> {
        const response = await this._call<GradesOfStudentsListQuery>({
            query: getGradesOfStudentsListQuery,
            variables: {
                student_ids: variables.student_ids,
            },
        });

        return response.data?.students;
    }

    async getListWithFilter(
        variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables
    ): Promise<StudentsListByFiltersWithoutGradeAndAggregateQuery["users"] | undefined> {
        const { name, email, grades, ...rest } = variables;

        const response = await this._call<StudentsListByFiltersWithoutGradeAndAggregateQuery>({
            query: getListWithFilterQuery,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        });

        return response.data?.users;
    }

    async getCountStudentWithFilter(
        variables: CountStudentWithFilterQueryVariables
    ): Promise<CountStudentWithFilterQuery | null> {
        const { name, email, grades, ...rest } = variables;

        const response = await this._call<CountStudentWithFilterQuery>({
            query: getCountStudentWithFilter,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        });

        return response.data;
    }
}

const studentsQueriesBob = new StudentQueryBob(appConfigs, "bobGraphQL", doQuery);

export default studentsQueriesBob;
