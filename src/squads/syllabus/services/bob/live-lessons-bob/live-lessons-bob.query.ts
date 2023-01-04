import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    LessonsByCourseIdQuery,
    LessonsByCourseIdQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";

const getManyQuery = gql`
    query LessonsByCourseId($course_id: String!) {
        lessons(where: { course_id: { _eq: $course_id }, deleted_at: { _is_null: true } }) {
            name
            lesson_group_id
        }
    }
`;

class LiveLessonsBobQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: LessonsByCourseIdQueryVariables
    ): Promise<LessonsByCourseIdQuery["lessons"] | undefined | null> {
        const body = {
            query: getManyQuery,
            variables,
        };
        const resp = await this._call<LessonsByCourseIdQuery>(body);
        return resp.data?.lessons;
    }
}

const liveLessonsQueriesBob = new LiveLessonsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default liveLessonsQueriesBob;
