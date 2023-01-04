import "graphql";
import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    CountStudentWithFilterQueryVariables,
    GradesOfStudentsListQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    User_GetManyStudentLocationsFiltersQueryVariables,
    User_GetManyStudentsFiltersQueryVariables,
    User_GetManyStudentsFiltersQuery,
    User_GetManyStudentLocationsFiltersQuery,
    User_StudentsOneV4QueryVariables,
    User_StudentsOneV4Query,
    User_CountStudentWithLocationsFilterQueryVariables,
    User_CountStudentWithLocationsFilterQuery,
    User_CountStudentWithFilterV3QueryVariables,
    User_CountStudentWithFilterV3Query,
    StudentsListByFiltersWithoutGradeAndAggregateQuery,
    StudentsManyQueryVariables,
    StudentsOneV3QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables,
    User_CountStudentWithFilterV2QueryVariables,
    User_StudentsListByFiltersWithoutGradeAndAggregateV4Query,
    StudentsOneV3Query,
    GradesOfStudentsListQuery,
    CountStudentWithFilterQuery,
    User_CountStudentWithFilterV2Query,
    StudentsManyQuery,
} from "src/squads/user/service/bob/bob-types";
import { userFragment } from "src/squads/user/service/bob/fragments";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { getSearchString } from "src/squads/user/service/utils";
import { GraphqlBody } from "src/typings/graphql";

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

const studentFragmentV2 = gql`
    fragment StudentFrgV2 on students {
        student_id
        current_grade
        user {
            ...UserAttrs
            last_login_date
            gender
            birthday
            first_name
            last_name
            first_name_phonetic
            last_name_phonetic
            full_name_phonetic
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
        resource_path
    }
`);

const studentWithoutGradeFragmentV2 = gql(`
    fragment StudentWithoutGradeFrgV2 on users {
        user_id
        name
        full_name_phonetic
        email
        phone_number
        country
        last_login_date
        resource_path
    }
`);

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

const studentUserFragment = gql`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
`;

const getListWithFilterQueryV3 = gql`
    query User_StudentsListByFiltersWithoutGradeAndAggregateV3(
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

const User_GetManyStudentsFilters = gql`
    query User_GetManyStudentsFilters(
        $name: String
        $full_name_phonetic: String = ""
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
                _or: [
                    { name: { _ilike: $name } }
                    { full_name_phonetic: { _ilike: $full_name_phonetic } }
                ]
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
            ...StudentWithoutGradeFrgV2
        }
    }
    ${studentWithoutGradeFragmentV2}
`;

const getManyQuery = gql`
    query StudentsMany($user_ids: [String!] = []) {
        users(where: { user_group: { _eq: "USER_GROUP_STUDENT" }, user_id: { _in: $user_ids } }) {
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

const getOneQueryV4 = gql`
    query User_StudentsOneV4($id: String!) {
        students(where: { student_id: { _eq: $id } }) {
            enrollment_status
            student_external_id
            student_note
            ...StudentFrgV2
        }
    }
    ${studentFragmentV2}
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

const getCountStudentWithFilterV3 = gql`
    query User_CountStudentWithFilterV3(
        $name: String
        $full_name_phonetic: String = ""
        $email: String
        $grades: [smallint!]
        $student_ids: [String!]
        $enrollment_status: String
        $last_login_date: Boolean
    ) {
        users_aggregate(
            where: {
                _or: [
                    { name: { _ilike: $name } }
                    { full_name_phonetic: { _ilike: $full_name_phonetic } }
                ]
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

const getListWithFilterQueryV4 = gql`
    query User_StudentsListByFiltersWithoutGradeAndAggregateV4(
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

const User_GetManyStudentLocationsFilters = gql`
    query User_GetManyStudentLocationsFilters(
        $name: String
        $full_name_phonetic: String = ""
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
                _or: [
                    { name: { _ilike: $name } }
                    { full_name_phonetic: { _ilike: $full_name_phonetic } }
                ]
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
            ...StudentWithoutGradeFrgV2
        }
    }

    ${studentWithoutGradeFragmentV2}
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

const getCountStudentWithLocationsFilter = gql`
    query User_CountStudentWithLocationsFilter(
        $name: String
        $full_name_phonetic: String = ""
        $email: String
        $grades: [smallint!]
        $student_ids: [String!]
        $enrollment_status: String
        $last_login_date: Boolean
        $location_ids: [String!]
    ) {
        users_aggregate(
            where: {
                _or: [
                    { name: { _ilike: $name } }
                    { full_name_phonetic: { _ilike: $full_name_phonetic } }
                ]
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

class StudentQueriesBob extends InheritedHasuraServiceClient {
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

    async getListWithFilterV3(
        variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables
    ): Promise<StudentsListByFiltersWithoutGradeAndAggregateQuery["users"] | undefined> {
        const { name, email, ...rest } = variables;

        const query = {
            query: getListWithFilterQueryV3,
            variables: {
                ...rest,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };

        const res = await this._call<StudentsListByFiltersWithoutGradeAndAggregateQuery>(query);

        return res.data?.users;
    }

    async getManyStudentsFilters(
        variables: User_GetManyStudentsFiltersQueryVariables
    ): Promise<User_GetManyStudentsFiltersQuery["users"] | undefined> {
        const { name, email, ...rest } = variables;

        const query = {
            query: User_GetManyStudentsFilters,
            variables: {
                ...rest,
                name: getSearchString(name),
                full_name_phonetic: getSearchString(name),
                email: getSearchString(email),
            },
        };

        const res = await this._call<User_GetManyStudentsFiltersQuery>(query);

        return res.data?.users;
    }

    async getListWithFilterV4(
        variables: User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables
    ): Promise<User_StudentsListByFiltersWithoutGradeAndAggregateV4Query["users"] | undefined> {
        const { name, email, ...rest } = variables;
        const query = {
            query: getListWithFilterQueryV4,
            variables: {
                ...rest,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
        const res = await this._call<User_StudentsListByFiltersWithoutGradeAndAggregateV4Query>(
            query
        );
        return res.data?.users;
    }

    async getManyStudentLocationsFilters(
        variables: User_GetManyStudentLocationsFiltersQueryVariables
    ): Promise<User_GetManyStudentLocationsFiltersQuery["users"] | undefined> {
        const { name, email, ...rest } = variables;
        const query = {
            query: User_GetManyStudentLocationsFilters,
            variables: {
                ...rest,
                name: getSearchString(name),
                full_name_phonetic: getSearchString(name),
                email: getSearchString(email),
            },
        };
        const res = await this._call<User_GetManyStudentLocationsFiltersQuery>(query);
        return res.data?.users;
    }

    async getMany(
        variables: StudentsManyQueryVariables
    ): Promise<StudentsManyQuery["users"] | undefined> {
        const { user_ids } = variables;

        const query = {
            query: getManyQuery,
            variables: {
                user_ids,
            },
        };

        const res = await this._call<StudentsManyQuery>(query);
        return res.data?.users;
    }

    async getOne(
        variables: StudentsOneV3QueryVariables
    ): Promise<ArrayElement<StudentsOneV3Query["students"]> | undefined> {
        const query = {
            query: getOneQuery,
            variables: {
                id: variables.id,
            },
        };
        const res = await this._call<StudentsOneV3Query>(query);
        return res.data?.students[0];
    }

    async getOneV4(
        variables: User_StudentsOneV4QueryVariables
    ): Promise<ArrayElement<User_StudentsOneV4Query["students"]> | undefined> {
        const query = {
            query: getOneQueryV4,
            variables: {
                id: variables.id,
            },
        };
        const res = await this._call<User_StudentsOneV4Query>(query);
        return res.data?.students[0];
    }

    async getGradesOfStudentsList(
        variables: GradesOfStudentsListQueryVariables
    ): Promise<GradesOfStudentsListQuery["students"] | undefined> {
        const query = {
            query: getGradesOfStudentsListQuery,
            variables: {
                student_ids: variables.student_ids,
            },
        };

        const res = await this._call<GradesOfStudentsListQuery>(query);
        return res.data?.students;
    }

    async getCountStudentWithFilter(
        variables: CountStudentWithFilterQueryVariables
    ): Promise<CountStudentWithFilterQuery["users_aggregate"] | undefined> {
        const { name, email, grades, ...rest } = variables;

        const query = {
            query: getCountStudentWithFilter,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };
        const res = await this._call<CountStudentWithFilterQuery>(query);
        return res.data?.users_aggregate;
    }

    async getCountStudentWithFilterV3(
        variables: User_CountStudentWithFilterV3QueryVariables
    ): Promise<User_CountStudentWithFilterV3Query["users_aggregate"] | undefined> {
        const { name, email, grades, ...rest } = variables;

        const query = {
            query: getCountStudentWithFilterV3,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                full_name_phonetic: getSearchString(name),
                email: getSearchString(email),
            },
        };
        const res = await this._call<CountStudentWithFilterQuery>(query);
        return res.data?.users_aggregate;
    }

    async getCountStudentWithFilterV2(
        variables: User_CountStudentWithFilterV2QueryVariables
    ): Promise<User_CountStudentWithFilterV2Query["users_aggregate"] | undefined> {
        const { name, email, grades, ...rest } = variables;

        const query = {
            query: getCountStudentWithFilterV2,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                email: getSearchString(email),
            },
        };

        const res = await this._call<CountStudentWithFilterQuery>(query);
        return res.data?.users_aggregate;
    }

    async getCountStudentWithLocationsFilter(
        variables: User_CountStudentWithLocationsFilterQueryVariables
    ): Promise<User_CountStudentWithLocationsFilterQuery["users_aggregate"] | undefined> {
        const { name, email, grades, ...rest } = variables;

        const query = {
            query: getCountStudentWithLocationsFilter,
            variables: {
                ...rest,
                grades,
                name: getSearchString(name),
                full_name_phonetic: getSearchString(name),
                email: getSearchString(email),
            },
        };

        const res = await this._call<CountStudentWithFilterQuery>(query);
        return res.data?.users_aggregate;
    }
}

const studentQueriesBob = new StudentQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default studentQueriesBob;
