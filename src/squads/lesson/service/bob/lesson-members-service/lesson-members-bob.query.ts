import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    LessonMemberByUserIdAndCourseIdAndLessonIdV2Query,
    LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const getOneByUserIdAndCourseIdAndLessonIdQuery = gql`
    query LessonMemberByUserIdAndCourseIdAndLessonIdV2(
        $user_id: String!
        $course_id: String!
        $lesson_id: String!
    ) {
        lesson_members(
            where: {
                user_id: { _eq: $user_id }
                course_id: { _eq: $course_id }
                lesson_id: { _eq: $lesson_id }
            }
        ) {
            attendance_remark
            attendance_status
        }
    }
`;

class LessonMembersBobQuery extends InheritedHasuraServiceClient {
    async getOneByUserIdAndCourseIdAndLessonId(
        variables: LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables
    ): Promise<
        | ArrayElement<LessonMemberByUserIdAndCourseIdAndLessonIdV2Query["lesson_members"]>
        | undefined
    > {
        const response = await this._call<LessonMemberByUserIdAndCourseIdAndLessonIdV2Query>({
            query: getOneByUserIdAndCourseIdAndLessonIdQuery,
            variables,
        });

        return response.data?.lesson_members[0];
    }
}

const lessonMembersQueriesBob = new LessonMembersBobQuery(appConfigs, "bobGraphQL", doQuery);

export default lessonMembersQueriesBob;
