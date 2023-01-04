import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import {
    CoursesManyQueryVariables,
    User_CoursesManyWithLocationQueryVariables,
    CoursesManyReferenceQueryVariables,
    User_CoursesManyReferenceWithLocationQueryVariables,
    User_CoursesManyReferenceWithLocationV2QueryVariables,
    CoursesOneQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

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

const getManyWithLocationQuery = gql`
    query User_CoursesManyWithLocation($course_id: [String!] = []) {
        courses(where: { course_id: { _in: $course_id } }) {
            ...User_CourseWithLocationAttrs
        }
    }
    ${courseWithLocationFragment}
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

const getManyReferenceWithLocationQuery = gql`
    query User_CoursesManyReferenceWithLocation(
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
            ...User_CourseWithLocationAttrs
        }
        courses_aggregate(
            where: {
                name: { _ilike: $name }
                course_access_paths: { location_id: { _in: $location_ids } }
            }
        ) {
            aggregate {
                count
            }
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

class CourseBobQuery {
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

    getManyWithLocation(
        variables: User_CoursesManyWithLocationQueryVariables
    ): GraphqlBody<User_CoursesManyWithLocationQueryVariables> {
        return {
            query: getManyWithLocationQuery,
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

    getManyReferenceWithLocation(
        variables: User_CoursesManyReferenceWithLocationQueryVariables
    ): GraphqlBody<User_CoursesManyReferenceWithLocationQueryVariables> {
        const { name, location_ids, limit, offset } = variables;

        return {
            query: getManyReferenceWithLocationQuery,
            variables: {
                name: getSearchString(name),
                location_ids,
                limit,
                offset,
            },
        };
    }

    getManyReferenceWithLocationV2(
        variables: User_CoursesManyReferenceWithLocationV2QueryVariables
    ): GraphqlBody<User_CoursesManyReferenceWithLocationV2QueryVariables> {
        const { name, location_ids, limit, offset } = variables;

        return {
            query: getManyReferenceWithLocationQueryV2,
            variables: {
                name: getSearchString(name),
                location_ids,
                limit,
                offset,
            },
        };
    }
}

const courseQueriesBob = new CourseBobQuery();

export default courseQueriesBob;
