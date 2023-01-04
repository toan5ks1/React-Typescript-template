import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Lesson_ClassAssociationByClassIdQuery,
    Lesson_ClassAssociationByClassIdQueryVariables,
    Lesson_ClassListByCourseIdV3Query,
    Lesson_ClassListByCourseIdV3QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";

// @ts-ignore no-unused-vars
const getListQuery = gql`
    query Lesson_ClassListByCourseID($course_id: String!, $limit: Int = 5, $offset: Int = 0) {
        class(
            where: { course: { course_id: { _eq: $course_id } } }
            limit: $limit
            offset: $offset
        ) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course: { course_id: { _eq: $course_id } } }) {
            aggregate {
                count
            }
        }
    }
`;

// @ts-ignore no-unused-vars
const getListQueryV2 = gql`
    query Lesson_ClassListByCourseIdV2($course_id: String!, $limit: Int = 5, $offset: Int = 0) {
        class(where: { course_id: { _eq: $course_id } }, limit: $limit, offset: $offset) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const getListQueryV3 = gql`
    query Lesson_ClassListByCourseIdV3(
        $course_id: String!
        $limit: Int = 5
        $offset: Int = 0
        $order_by: [class_order_by!] = { name: asc }
    ) {
        class(
            where: { course_id: { _eq: $course_id } }
            limit: $limit
            offset: $offset
            order_by: $order_by
        ) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const getClassAssociationQuery = gql`
    query Lesson_ClassAssociationByClassId($class_id: String!) {
        class_member_aggregate(where: { class_id: { _eq: $class_id } }, limit: 1) {
            aggregate {
                count
            }
        }
        lessons_aggregate(where: { class_id: { _eq: $class_id } }, limit: 1) {
            aggregate {
                count
            }
        }
    }
`;

class ClassBobQuery extends InheritedHasuraServiceClient {
    async getListByCourseId(
        variables: Lesson_ClassListByCourseIdV3QueryVariables
    ): Promise<DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"] | undefined>> {
        const response = await this._call<Lesson_ClassListByCourseIdV3Query>({
            query: getListQueryV3,
            variables,
        });

        return {
            data: response.data?.class,
            total: response.data?.class_aggregate.aggregate?.count ?? 0,
        };
    }

    async getClassAssociationByCourseId(
        variables: Lesson_ClassAssociationByClassIdQueryVariables
    ): Promise<Lesson_ClassAssociationByClassIdQuery | null> {
        const response = await this._call<Lesson_ClassAssociationByClassIdQuery>({
            query: getClassAssociationQuery,
            variables,
        });

        return response.data;
    }
}

const classQueriesBob = new ClassBobQuery(appConfigs, "bobGraphQL", doQuery);

export default classQueriesBob;
