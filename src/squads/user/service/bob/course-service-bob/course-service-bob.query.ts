import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    CoursesOneQueryVariables,
    CoursesManyQueryVariables,
    CoursesManyReferenceQueryVariables,
    User_CoursesManyWithLocationQueryVariables,
    User_CoursesManyWithLocationQuery,
    User_CoursesManyReferenceWithLocationV2Query,
    User_CoursesManyReferenceWithLocationV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { getSearchString } from "src/squads/user/service/utils";
import { GraphqlBody } from "src/typings/graphql";

const courseFragment = gql`
    fragment CourseAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
    }
`;

const getOneQuery = gql`
    query CoursesOne($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            ...CourseAttrs
            course_books {
                book_id
                books {
                    book_chapters {
                        chapter_id
                    }
                }
            }
        }
    }
    ${courseFragment}
`;

const getManyQuery = gql`
    query CoursesMany($course_id: [String!] = []) {
        courses(where: { course_id: { _in: $course_id } }) {
            ...CourseAttrs
        }
    }
    ${courseFragment}
`;

const getManyReferenceQuery = gql`
    query CoursesManyReference($name: String, $limit: Int = 10, $offset: Int = 0) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: { name: { _ilike: $name } }
        ) {
            ...CourseAttrs
        }
        courses_aggregate(where: { name: { _ilike: $name } }) {
            aggregate {
                count
            }
        }
    }
    ${courseFragment}
`;

const courseWithLocationFragment = gql`
    fragment User_CourseWithLocationAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
        course_access_paths {
            location {
                name
                location_type
                location_id
                parent_location_id
                access_path
            }
        }
    }
`;

const getManyWithLocationQuery = gql`
    query User_CoursesManyWithLocation($course_id: [String!] = []) {
        courses(where: { course_id: { _in: $course_id } }) {
            ...User_CourseWithLocationAttrs
        }
    }
    ${courseWithLocationFragment}
`;

const getManyReferenceWithLocationQueryV2 = gql`
    query User_CoursesManyReferenceWithLocationV2(
        $name: String
        $location_ids: [String!]
        $limit: Int = 10
        $offset: Int = 0
    ) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: {
                name: { _ilike: $name }
                course_access_paths: { location_id: { _in: $location_ids } }
            }
        ) {
            ...CourseAttrs
        }
    }
    ${courseFragment}
`;

class CourseBobQuery extends InheritedHasuraServiceClient {
    getOne(variables: CoursesOneQueryVariables): GraphqlBody<CoursesOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }

    getMany(variables: CoursesManyQueryVariables): GraphqlBody<CoursesManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getManyReference(
        variables: CoursesManyReferenceQueryVariables
    ): GraphqlBody<CoursesManyReferenceQueryVariables> {
        const { name, limit, offset } = variables;

        return {
            query: getManyReferenceQuery,
            variables: {
                name: getSearchString(name),
                limit,
                offset,
            },
        };
    }

    async getManyWithLocation(
        variables: User_CoursesManyWithLocationQueryVariables
    ): Promise<User_CoursesManyWithLocationQuery["courses"] | undefined> {
        const query = {
            query: getManyWithLocationQuery,
            variables,
        };

        const res = await this._call<User_CoursesManyWithLocationQuery>(query);

        return res.data?.courses;
    }
    async getManyReferenceWithLocationQueryV2(
        variables: User_CoursesManyReferenceWithLocationV2QueryVariables
    ): Promise<User_CoursesManyReferenceWithLocationV2Query["courses"] | undefined> {
        const query = {
            query: getManyReferenceWithLocationQueryV2,
            variables,
        };

        const res = await this._call<User_CoursesManyReferenceWithLocationV2Query>(query);

        return res.data?.courses;
    }
}

const courseQueriesBob = new CourseBobQuery(appConfigs, "bobGraphQL", doQuery);

export default courseQueriesBob;
