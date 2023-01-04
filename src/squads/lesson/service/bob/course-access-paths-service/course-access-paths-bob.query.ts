import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables,
    Lesson_CourseManyReferenceByNameAndLocationIdQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";
import { getSearchString } from "src/squads/lesson/service/utils/utils";

const getManyReferenceQuery = gql`
    query Lesson_CourseManyReferenceByNameAndLocationId(
        $location_id: String!
        $name: String
        $limit: Int = 30
        $order_by: [course_access_paths_order_by!] = { created_at: desc }
    ) {
        course_access_paths(
            where: {
                _and: [
                    { location_id: { _eq: $location_id } }
                    { course: { name: { _ilike: $name } } }
                ]
            }
            limit: $limit
            order_by: $order_by
        ) {
            course {
                course_id
                name
            }
        }
    }
`;

class CourseAccessPathsBobQuery extends InheritedHasuraServiceClient {
    async getManyReference(
        variables: Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables
    ): Promise<
        Lesson_CourseManyReferenceByNameAndLocationIdQuery["course_access_paths"] | undefined
    > {
        const { name, ...rest } = variables;

        const response = await this._call<Lesson_CourseManyReferenceByNameAndLocationIdQuery>({
            query: getManyReferenceQuery,
            variables: {
                name: getSearchString(name),
                ...rest,
            },
        });

        return response.data?.course_access_paths;
    }
}

const courseAccessPathsQueriesBob = new CourseAccessPathsBobQuery(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default courseAccessPathsQueriesBob;
