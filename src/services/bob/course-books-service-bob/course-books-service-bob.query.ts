import { gql } from "graphql-tag";

import { CourseBooksListQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const courseBookFragment = gql`
    fragment CourseBookAttrs on courses_books {
        course_id
        book_id
        books {
            name
        }
    }
`;

const getListQuery = gql`
    query CourseBooksList($course_id: String!, $limit: Int = 10, $offset: Int = 0) {
        courses_books(
            limit: $limit
            offset: $offset
            order_by: { updated_at: desc, created_at: desc, book_id: desc }
            where: { course_id: { _eq: $course_id } }
        ) {
            ...CourseBookAttrs
        }
        courses_books_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
    ${courseBookFragment}
`;

class CourseBooksBobQuery {
    getList(variables: CourseBooksListQueryVariables): GraphqlBody<CourseBooksListQueryVariables> {
        return {
            query: getListQuery,
            variables,
        };
    }
}

const courseBooksQueriesBob = new CourseBooksBobQuery();

export default courseBooksQueriesBob;
