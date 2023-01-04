import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    Lesson_SchedulerBySchedulerIdQuery,
    Lesson_SchedulerBySchedulerIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const schedulerGetOne = gql`
    query Lesson_SchedulerBySchedulerId($scheduler_id: String!) {
        scheduler(where: { scheduler_id: { _eq: $scheduler_id } }) {
            scheduler_id
            start_date
            end_date
            freq
        }
    }
`;

class SchedulerBobQuery extends InheritedHasuraServiceClient {
    async schedulerGetOne(
        variables: Lesson_SchedulerBySchedulerIdQueryVariables
    ): Promise<ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> | undefined> {
        const response = await this._call<Lesson_SchedulerBySchedulerIdQuery>({
            query: schedulerGetOne,
            variables,
        });

        return response.data?.scheduler[0];
    }
}

const schedulerQueriesBob = new SchedulerBobQuery(appConfigs, "bobGraphQL", doQuery);

export default schedulerQueriesBob;
