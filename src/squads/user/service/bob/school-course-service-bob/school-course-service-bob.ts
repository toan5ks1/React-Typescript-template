import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_GetManyReferenceSchoolCourseQueryVariables,
    User_GetManyReferenceSchoolCourseQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getManyReferenceSchoolCourse = gql`
    query User_GetManyReferenceSchoolCourse(
        $school_id: String! = ""
        $name: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        school_course(
            limit: $limit
            offset: $offset
            where: { school_id: { _eq: $school_id }, school_course_name: { _ilike: $name } }
        ) {
            school_course_id
            school_course_name
            is_archived
        }
    }
`;

class SchoolCourseBobQuery extends InheritedHasuraServiceClient {
    async getManyReferenceSchoolCourse(
        variables: User_GetManyReferenceSchoolCourseQueryVariables
    ): Promise<User_GetManyReferenceSchoolCourseQuery["school_course"] | undefined> {
        const query = {
            query: getManyReferenceSchoolCourse,
            variables,
        };

        const res = await this._call<User_GetManyReferenceSchoolCourseQuery>(query);

        return res.data?.school_course;
    }
}

const schoolCourseQueriesBob = new SchoolCourseBobQuery(appConfigs, "bobGraphQL", doQuery);

export default schoolCourseQueriesBob;
