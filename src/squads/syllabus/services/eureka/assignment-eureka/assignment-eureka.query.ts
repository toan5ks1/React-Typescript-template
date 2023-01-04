import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";

import { InheritedHasuraServiceClient } from "../../service-types";
import {
    AssignmentOneQuery,
    AssignmentOneQueryVariables,
    AssignmentsManyQuery,
    AssignmentsManyQueryVariables,
} from "../eureka-types";

export const assignmentsFragment = gql`
    fragment AssignmentAttrs on assignments {
        assignment_id
        instruction
        content
        check_list
        attachment
        type
        name
        max_grade
        settings
        is_required_grade
        created_at
        display_order
    }
`;

const getOneQuery = gql`
    query AssignmentOne($assignment_id: String) {
        assignments(where: { assignment_id: { _eq: $assignment_id } }) {
            ...AssignmentAttrs
        }
    }
    ${assignmentsFragment}
`;

const getManyQuery = gql`
    query AssignmentsMany($assignment_id: [String!] = []) {
        assignments(
            order_by: { display_order: asc }
            where: { assignment_id: { _in: $assignment_id } }
        ) {
            ...AssignmentAttrs
        }
    }
    ${assignmentsFragment}
`;

class AssignmentEurekaQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: AssignmentOneQueryVariables
    ): Promise<AssignmentOneQuery["assignments"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<AssignmentOneQuery>(body);

        return toArr(resp.data?.assignments)[0];
    }
    async getMany(
        variables: AssignmentsManyQueryVariables
    ): Promise<AssignmentsManyQuery["assignments"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<AssignmentsManyQuery>(body);

        return resp.data?.assignments;
    }
}

const assignmentEurekaQuery = new AssignmentEurekaQuery(appConfigs, "eurekaGraphQL", doQuery);

export default assignmentEurekaQuery;
