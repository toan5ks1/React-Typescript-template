import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetStudentsManyV3Query,
    Payment_GetStudentsManyV3QueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { InheritedHasuraServiceClient } from "../../service-types";

const getManyQueryV3 = gql`
    query Payment_GetStudentsManyV3($studentIds: [String!]!) {
        students(where: { student_id: { _in: $studentIds } }) {
            enrollment_status
            student_external_id
            student_note
            student_id
            current_grade
            user {
                user_id
                email
                user_group
                country
                first_name
                last_name
            }
        }
    }
`;

class StudentsQueriesBob extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetStudentsManyV3QueryVariables
    ): Promise<ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined> {
        const response = await this._call<Payment_GetStudentsManyV3Query>({
            query: getManyQueryV3,
            variables,
        });

        return response.data?.students[0];
    }

    async getMany(
        variables: Payment_GetStudentsManyV3QueryVariables
    ): Promise<Payment_GetStudentsManyV3Query["students"] | undefined> {
        const response = await this._call<Payment_GetStudentsManyV3Query>({
            query: getManyQueryV3,
            variables,
        });
        return response.data?.students;
    }
}

const studentsQueriesBob = new StudentsQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default studentsQueriesBob;
