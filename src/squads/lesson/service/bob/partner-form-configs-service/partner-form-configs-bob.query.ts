import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    PartnerFormConfigByIdQuery,
    PartnerFormConfigByIdQueryVariables,
    PartnerFormConfigsOneQuery,
    PartnerFormConfigsOneQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const getOneLatestQuery = gql`
    query PartnerFormConfigsOne($feature_name: String, $school_id: Int) {
        partner_form_configs(
            where: {
                _and: [{ feature_name: { _eq: $feature_name }, partner_id: { _eq: $school_id } }]
            }
            order_by: { created_at: desc }
            limit: 1
        ) {
            form_config_id
            form_config_data
        }
    }
`;

const getOneQuery = gql`
    query PartnerFormConfigById($form_config_id: String!) {
        partner_form_configs(where: { form_config_id: { _eq: $form_config_id } }) {
            form_config_data
        }
    }
`;

class PartnerFormConfigBobQuery extends InheritedHasuraServiceClient {
    async getOneLatestConfig(
        variables: PartnerFormConfigsOneQueryVariables
    ): Promise<ArrayElement<PartnerFormConfigsOneQuery["partner_form_configs"]> | undefined> {
        const response = await this._call<PartnerFormConfigsOneQuery>({
            query: getOneLatestQuery,
            variables,
        });

        return response.data?.partner_form_configs[0];
    }

    async getOne(
        variables: PartnerFormConfigByIdQueryVariables
    ): Promise<ArrayElement<PartnerFormConfigByIdQuery["partner_form_configs"]> | undefined> {
        const response = await this._call<PartnerFormConfigByIdQuery>({
            query: getOneQuery,
            variables,
        });

        return response.data?.partner_form_configs[0];
    }
}

const partnerFormConfigsQueriesBob = new PartnerFormConfigBobQuery(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default partnerFormConfigsQueriesBob;
