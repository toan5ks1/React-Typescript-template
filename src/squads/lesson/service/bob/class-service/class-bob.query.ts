import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    Lesson_ClassByClassIdForLessonManagementQuery,
    Lesson_ClassByClassIdForLessonManagementQueryVariables,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_ClassManyForLessonManagementQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";
import { getSearchString } from "src/squads/lesson/service/utils/utils";

const getOne = gql`
    query Lesson_ClassByClassIdForLessonManagement($class_id: String!) {
        class(where: { class_id: { _eq: $class_id } }) {
            class_id
            name
        }
    }
`;

const getMany = gql`
    query Lesson_ClassManyForLessonManagement($class_ids: [String!] = []) {
        class(where: { class_id: { _in: $class_ids } }) {
            class_id
            name
        }
    }
`;

// @ts-ignore:unused variable
const getManyReferenceQuery = gql`
    query Lesson_ClassManyReferenceByNameAndCourseId(
        $location_id: String!
        $course_id: String!
        $name: String
        $limit: Int = 30
        $order_by: [class_order_by!] = { name: asc }
    ) {
        class(
            where: {
                _and: [
                    { course_id: { _eq: $course_id } }
                    { location_id: { _eq: $location_id } }
                    { name: { _ilike: $name } }
                ]
            }
            limit: $limit
            order_by: $order_by
        ) {
            class_id
            name
        }
    }
`;

const lessonGetManyByNullableCourseIdsAndNameQuery = gql`
    query Lesson_ClassManyByNullableCourseIdsAndName(
        $course_ids: [String!]
        $name: String
        $limit: Int = 30
        $order_by: [class_order_by!] = { name: asc }
    ) {
        class(
            where: { _and: [{ course_id: { _in: $course_ids } }, { name: { _ilike: $name } }] }
            limit: $limit
            order_by: $order_by
        ) {
            class_id
            name
        }
    }
`;

const lessonGetManyByLocationIdAndCourseIdAndNameQuery = gql`
    query Lesson_ClassManyByLocationIdAndCourseIdAndName(
        $location_id: String!
        $course_id: String!
        $name: String
        $limit: Int = 30
        $order_by: [class_order_by!] = { name: asc }
    ) {
        class(
            where: {
                _and: [
                    { location_id: { _eq: $location_id } }
                    { course_id: { _eq: $course_id } }
                    { name: { _ilike: $name } }
                ]
            }
            limit: $limit
            order_by: $order_by
        ) {
            class_id
            name
        }
    }
`;

class ClassBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: Lesson_ClassByClassIdForLessonManagementQueryVariables
    ): Promise<ArrayElement<Lesson_ClassByClassIdForLessonManagementQuery["class"]> | undefined> {
        const response = await this._call<Lesson_ClassByClassIdForLessonManagementQuery>({
            query: getOne,
            variables,
        });

        return response.data?.class[0];
    }

    async getMany(
        variables: Lesson_ClassManyForLessonManagementQueryVariables
    ): Promise<Lesson_ClassManyForLessonManagementQuery["class"] | undefined> {
        const response = await this._call<any>({ query: getMany, variables });

        return response.data?.class;
    }

    async lessonGetManyByNullableCourseIdAndNameQuery(
        variables: Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables
    ): Promise<Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"] | undefined> {
        const { name, ...rest } = variables;

        const response = await this._call<Lesson_ClassManyByNullableCourseIdsAndNameQuery>({
            query: lessonGetManyByNullableCourseIdsAndNameQuery,
            variables: {
                name: getSearchString(name),
                ...rest,
            },
        });

        return response.data?.class;
    }

    async lessonGetManyByLocationIdAndCourseIdAndNameQuery(
        variables: Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables
    ): Promise<Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery["class"] | undefined> {
        const { name, ...rest } = variables;

        const response = await this._call<Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery>({
            query: lessonGetManyByLocationIdAndCourseIdAndNameQuery,
            variables: {
                name: getSearchString(name),
                ...rest,
            },
        });

        return response.data?.class;
    }
}

const classQueriesBob = new ClassBobQuery(appConfigs, "bobGraphQL", doQuery);

export default classQueriesBob;
