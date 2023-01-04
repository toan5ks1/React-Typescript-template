import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
    CoursesManyReferenceQuery,
    CoursesManyReferenceQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";
import { getSearchString } from "src/squads/communication/service/utils/utils";

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

class CoursesQueriesBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: CoursesManyQueryVariables
    ): Promise<CoursesManyQuery["courses"] | undefined> {
        const res = await this._call<CoursesManyQuery>({
            query: getManyQuery,
            variables,
        });

        return res.data?.courses;
    }

    async getManyReferenceAutocomplete(
        variables: CoursesManyReferenceQueryVariables
    ): Promise<CoursesManyReferenceQuery["courses"] | undefined> {
        const { name, limit, offset } = variables;

        const response = await this._call<CoursesManyReferenceQuery>({
            query: getManyReferenceQuery,
            variables: {
                name: getSearchString(name),
                limit,
                offset,
            },
        });

        return response.data?.courses;
    }
}

const coursesQueriesBob = new CoursesQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default coursesQueriesBob;
