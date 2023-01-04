import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Lesson_CoursesListQueryVariables,
    Lesson_CoursesListQuery,
    Lesson_CoursesOneQueryVariables,
    Lesson_CoursesOneQuery,
    CoursesListQuery,
    CoursesListQueryVariables,
    CoursesOneQuery,
    CoursesOneQueryVariables,
    CourseTitleQuery,
    CourseTitleQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";
import { getSearchString } from "src/squads/syllabus/services/utils/utils";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

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

const lessonCoursesFragment = gql`
    fragment Lesson_CoursesAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
        teaching_method
    }
`;

const lessonCourseFragment = gql`
    fragment Lesson_CourseAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
        teaching_method
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

const getOneQueryV2 = gql`
    query Lesson_CoursesOne($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            ...Lesson_CourseAttrs
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
    ${lessonCourseFragment}
`;

const getListQuery = gql`
    query CoursesList(
        $name: String
        $course_id: [String!]
        $course_type: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            ...CourseAttrs
        }
        courses_aggregate(
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${courseFragment}
`;

const getTitleQuery = gql`
    query CourseTitle($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            name
        }
    }
`;

const getListQueryV2 = gql`
    query Lesson_CoursesList(
        $name: String
        $course_id: [String!]
        $course_type: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            ...Lesson_CoursesAttrs
        }
        courses_aggregate(
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${lessonCoursesFragment}
`;

class CoursesBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: CoursesOneQueryVariables
    ): Promise<CoursesOneQuery["courses"][0] | undefined> {
        const body = { query: getOneQuery, variables };

        const resp = await this._call<CoursesOneQuery>(body);

        return toArr(resp.data?.courses)[0];
    }

    async getOneV2(
        variables: Lesson_CoursesOneQueryVariables
    ): Promise<ArrayElement<Lesson_CoursesOneQuery["courses"]> | undefined> {
        const body = { query: getOneQueryV2, variables };

        const resp = await this._call<Lesson_CoursesOneQuery>(body);

        return toArr(resp.data?.courses)[0];
    }

    async getList({
        name,
        ...variables
    }: CoursesListQueryVariables): Promise<DataWithTotal<CoursesListQuery["courses"] | undefined>> {
        const body = {
            query: getListQuery,
            variables: { ...variables, name: getSearchString(name) },
        };

        const resp = await this._call<CoursesListQuery>(body);

        return {
            data: resp.data?.courses,
            total: resp.data?.courses_aggregate.aggregate?.count ?? 0,
        };
    }

    async getTitle(
        variables: CourseTitleQueryVariables
    ): Promise<CourseTitleQuery["courses"][0] | undefined> {
        const body = {
            query: getTitleQuery,
            variables,
        };

        const response = await this._call<CourseTitleQuery>(body);
        return response.data?.courses[0];
    }

    async getListV2({
        name,
        ...variables
    }: Lesson_CoursesListQueryVariables): Promise<
        DataWithTotal<Lesson_CoursesListQuery["courses"] | undefined>
    > {
        const body = {
            query: getListQueryV2,
            variables: { ...variables, name: getSearchString(name) },
        };

        const resp = await this._call<Lesson_CoursesListQuery>(body);

        return {
            data: resp.data?.courses,
            total: resp.data?.courses_aggregate.aggregate?.count ?? 0,
        };
    }
}

const coursesQueriesBob = new CoursesBobQuery(appConfigs, "bobGraphQL", doQuery);

export default coursesQueriesBob;
