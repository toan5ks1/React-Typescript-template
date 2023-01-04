import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";

import { InheritedHasuraServiceClient } from "../../service-types";
import {
    TopicLearningObjectiveManyQuery,
    TopicLearningObjectiveManyQueryVariables,
} from "../eureka-types";
import { learningObjectivesFragment } from "../learning-objectives-service-bob";

const getManyQuery = gql`
    query TopicLearningObjectiveMany($topic_id: String!) {
        topics_learning_objectives(
            where: { topic_id: { _eq: $topic_id } }
            order_by: { display_order: desc }
        ) {
            display_order
            learning_objective {
                ...LearningObjectiveAttrs
            }
        }
    }
    ${learningObjectivesFragment}
`;

class TopicLearningObjectiveQueryBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: TopicLearningObjectiveManyQueryVariables
    ): Promise<TopicLearningObjectiveManyQuery["topics_learning_objectives"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<TopicLearningObjectiveManyQuery>(body);

        return resp.data?.topics_learning_objectives;
    }
}

const topicLearningObjectiveQueriesBob = new TopicLearningObjectiveQueryBob(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default topicLearningObjectiveQueriesBob;
