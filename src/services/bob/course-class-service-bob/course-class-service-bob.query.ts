import { gql } from "graphql-tag";

import { User_ClassListWithFilterQueryVariables } from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getListWithFilterQuery = gql`
    query User_ClassListWithFilter($course_id: String!, $location_id: String!) {
        class(where: { course_id: { _eq: $course_id }, location_id: { _eq: $location_id } }) {
            class_id
            name
        }
    }
`;

class CourseClassBobQuery {
    getListWithFilter(
        variables: User_ClassListWithFilterQueryVariables
    ): GraphqlBody<User_ClassListWithFilterQueryVariables> {
        return {
            query: getListWithFilterQuery,
            variables,
        };
    }
}

const courseClassQueriesBob = new CourseClassBobQuery();

export default courseClassQueriesBob;
