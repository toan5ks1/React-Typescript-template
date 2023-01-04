import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    TopicOneQueryVariables,
    TopicsManyQueryVariables,
    TopicTitleQueryVariables,
    TopicsManyQuery,
    TopicOneQuery,
    TopicTitleQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const topicFragment = gql`
    fragment TopicAttrs on topics {
        topic_id
        name
        country
        school_id
        subject
        grade
        display_order
        topic_type
        status
        chapter_id
        school_id
        instruction
        icon_url
        essay_required
        created_at
        updated_at
    }
`;

const getTitleQuery = gql`
    query TopicTitle($topic_id: String = "") {
        topics(where: { topic_id: { _eq: $topic_id } }) {
            name
        }
    }
`;

const getOneQuery = gql`
    query TopicOne($topic_id: String = "") {
        topics(where: { topic_id: { _eq: $topic_id } }) {
            ...TopicAttrs
        }
    }
    ${topicFragment}
`;

const getManyQuery = gql`
    query TopicsMany($topic_id: [String!], $chapter_id: String) {
        topics(
            order_by: { display_order: asc, created_at: desc, topic_id: desc }
            where: { chapter_id: { _eq: $chapter_id }, topic_id: { _in: $topic_id } }
        ) {
            ...TopicAttrs
        }
    }
    ${topicFragment}
`;

class TopicBobQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: TopicOneQueryVariables
    ): Promise<TopicOneQuery["topics"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<TopicOneQuery>(body);

        return toArr(resp.data?.topics)[0];
    }
    async getTitle(
        variables: TopicTitleQueryVariables
    ): Promise<TopicTitleQuery["topics"][0] | undefined> {
        const body = {
            query: getTitleQuery,
            variables,
        };

        const resp = await this._call<TopicTitleQuery>(body);

        return resp.data?.topics[0];
    }

    async getMany(
        variables: TopicsManyQueryVariables
    ): Promise<TopicsManyQuery["topics"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<TopicsManyQuery>(body);

        return resp.data?.topics;
    }
}

const topicQueriesBob = new TopicBobQuery(appConfigs, "eurekaGraphQL", doQuery);

export default topicQueriesBob;
