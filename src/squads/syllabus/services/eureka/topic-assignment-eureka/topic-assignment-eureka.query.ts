import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    TopicAssignmentManyQuery,
    TopicAssignmentManyQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { InheritedHasuraServiceClient } from "../../service-types";
import { assignmentsFragment } from "../assignment-eureka/assignment-eureka.query";

const getManyQuery = gql`
    query TopicAssignmentMany($topic_id: String!) {
        topics_assignments(
            where: { topic_id: { _eq: $topic_id } }
            order_by: { display_order: asc }
        ) {
            display_order
            assignment {
                ...AssignmentAttrs
            }
        }
    }
    ${assignmentsFragment}
`;

class TopicAssignmentQueriesEureka extends InheritedHasuraServiceClient {
    async getManyByTopicId(
        variables: TopicAssignmentManyQueryVariables
    ): Promise<TopicAssignmentManyQuery["topics_assignments"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<TopicAssignmentManyQuery>(body);

        return resp.data?.topics_assignments;
    }
}

const topicAssignmentQueriesEureka = new TopicAssignmentQueriesEureka(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default topicAssignmentQueriesEureka;
