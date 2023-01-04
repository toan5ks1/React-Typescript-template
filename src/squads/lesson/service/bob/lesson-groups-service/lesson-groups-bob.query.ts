import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    LessonGroupByIdQuery,
    LessonGroupByIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const lessonGroupFragment = gql`
    fragment LessonGroupAttrs on lesson_groups {
        media_ids
        lesson_group_id
    }
`;

const getOneQuery = gql`
    query LessonGroupById($lesson_group_id: String!) {
        lesson_groups(where: { lesson_group_id: { _eq: $lesson_group_id } }) {
            ...LessonGroupAttrs
        }
    }
    ${lessonGroupFragment}
`;

class LessonGroupsBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: LessonGroupByIdQueryVariables
    ): Promise<ArrayElement<LessonGroupByIdQuery["lesson_groups"]> | undefined> {
        const response = await this._call<LessonGroupByIdQuery>({
            query: getOneQuery,
            variables,
        });

        return response.data?.lesson_groups[0];
    }
}

const lessonGroupsQueriesBob = new LessonGroupsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default lessonGroupsQueriesBob;
