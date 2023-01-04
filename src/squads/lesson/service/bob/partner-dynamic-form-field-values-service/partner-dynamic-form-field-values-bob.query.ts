import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery,
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const getOneByLessonReportDetailsIdAndStudentIdQuery = gql`
    query PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentId(
        $user_id: String!
        $report_id: String!
    ) {
        get_partner_dynamic_form_field_values_by_student(
            args: { report_id: $report_id, user_id: $user_id }
        ) {
            value_type
            string_value
            string_set_value
            string_array_value
            int_set_value
            int_array_value
            field_id
            bool_value
            int_value
        }
    }
`;

class PartnerDynamicFormFieldValuesBobQuery extends InheritedHasuraServiceClient {
    async getOneByLessonReportDetailsIdAndStudentId(
        variables: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables
    ): Promise<
        | PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery["get_partner_dynamic_form_field_values_by_student"]
        | undefined
    > {
        const response =
            await this._call<PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery>(
                {
                    query: getOneByLessonReportDetailsIdAndStudentIdQuery,
                    variables,
                }
            );

        return response.data?.get_partner_dynamic_form_field_values_by_student;
    }
}

const partnerDynamicFormFieldValuesQueriesBob = new PartnerDynamicFormFieldValuesBobQuery(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default partnerDynamicFormFieldValuesQueriesBob;
