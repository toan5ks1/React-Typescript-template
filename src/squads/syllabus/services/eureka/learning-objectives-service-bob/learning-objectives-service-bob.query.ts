import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import { getSearchString } from "src/squads/syllabus/services/utils/utils";

import { InheritedHasuraServiceClient } from "../../service-types";
import {
    LearningObjectivesManyQuery,
    LearningObjectivesManyQueryVariables,
    LearningObjectivesOneQuery,
    LearningObjectivesOneQueryVariables,
    Syllabus_LearningObjectivesOneQuery,
    Syllabus_LearningObjectivesOneQueryVariables,
    Syllabus_LearningObjectiveListQuery,
    Syllabus_LearningObjectiveListQueryVariables,
} from "../eureka-types";

export const learningObjectivesFragment = gql`
    fragment LearningObjectiveAttrs on learning_objectives {
        lo_id
        topic_id
        name
        video
        country
        study_guide
        display_order
        master_lo_id
        prerequisites
        video_script
        school_id
        subject
        grade
        type
        created_at
        updated_at
    }
`;

const getOneQuery = gql`
    query LearningObjectivesOne($lo_id: String!) {
        learning_objectives(where: { lo_id: { _eq: $lo_id } }) {
            ...LearningObjectiveAttrs
            quiz_sets {
                quiz_external_ids
            }
        }
    }
    ${learningObjectivesFragment}
`;

const getOneQueryV2 = gql`
    query Syllabus_LearningObjectivesOne($lo_id: String!) {
        learning_objectives(where: { lo_id: { _eq: $lo_id } }) {
            lo_id
            topic_id
            name
            video
            study_guide
            display_order
            prerequisites
            school_id
            type
        }
    }
`;

const getManyQuery = gql`
    query LearningObjectivesMany($lo_id: [String!] = []) {
        learning_objectives(order_by: { display_order: asc }, where: { lo_id: { _in: $lo_id } }) {
            ...LearningObjectiveAttrs
        }
    }
    ${learningObjectivesFragment}
`;

export const getListQuery = gql`
    query Syllabus_LearningObjectiveList(
        $name: String
        $limit: Int = 10
        $offset: Int = 0
        $order_by: learning_objectives_order_by! = { created_at: desc, name: desc }
    ) {
        learning_objectives(
            limit: $limit
            offset: $offset
            where: { name: { _ilike: $name } }
            order_by: [$order_by]
        ) {
            lo_id
            name
        }
    }
`;

class LearningObjectivesBobQuery extends InheritedHasuraServiceClient {
    async getOneV2(
        variables: Syllabus_LearningObjectivesOneQueryVariables
    ): Promise<Syllabus_LearningObjectivesOneQuery["learning_objectives"][0] | undefined> {
        const body = {
            query: getOneQueryV2,
            variables,
        };

        const resp = await this._call<LearningObjectivesOneQuery>(body);

        return toArr(resp.data?.learning_objectives)[0];
    }

    async getOne(
        variables: LearningObjectivesOneQueryVariables
    ): Promise<LearningObjectivesOneQuery["learning_objectives"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<LearningObjectivesOneQuery>(body);

        return toArr(resp.data?.learning_objectives)[0];
    }

    async getMany(
        variables: LearningObjectivesManyQueryVariables
    ): Promise<LearningObjectivesManyQuery["learning_objectives"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<LearningObjectivesManyQuery>(body);

        return resp.data?.learning_objectives;
    }

    async getList({
        name,
        ...variables
    }: Syllabus_LearningObjectiveListQueryVariables): Promise<
        Syllabus_LearningObjectiveListQuery["learning_objectives"] | undefined
    > {
        const body = {
            query: getListQuery,
            variables: {
                ...variables,
                name: getSearchString(name),
            },
        };

        const resp = await this._call<Syllabus_LearningObjectiveListQuery>(body);
        return resp.data?.learning_objectives;
    }
}

const learningObjectivesBobQuery = new LearningObjectivesBobQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default learningObjectivesBobQuery;
