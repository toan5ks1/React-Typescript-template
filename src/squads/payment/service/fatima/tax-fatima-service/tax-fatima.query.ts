import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesByTaxIdsQueryVariables,
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesReferenceQueryVariables,
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export const taxFragment = gql`
    fragment TaxAttrs on tax {
        tax_percentage
        tax_category
    }
`;

const GetTaxByTaxId = gql`
    query Payment_GetTaxByTaxIdV2($tax_id: String!) {
        tax(where: { tax_id: { _eq: $tax_id } }) {
            ...TaxAttrs
        }
    }

    ${taxFragment}
`;

const GetManyTaxesByTaxIds = gql`
    query Payment_GetManyTaxesByTaxIds($tax_ids: [String!]) {
        tax(where: { tax_id: { _in: $tax_ids } }) {
            ...TaxAttrs
            tax_id
        }
    }

    ${taxFragment}
`;

const GetManyTaxesReference = gql`
    query Payment_GetManyTaxesReference($name: String, $limit: Int = 30) {
        tax(limit: $limit, where: { name: { _ilike: $name } }) {
            ...TaxAttrs
            tax_id
            name
        }
    }

    ${taxFragment}
`;

class TaxQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetTaxByTaxIdV2QueryVariables
    ): Promise<ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]> | undefined> {
        const res = await this._call<Payment_GetTaxByTaxIdV2Query>({
            query: GetTaxByTaxId,
            variables,
        });

        return res.data?.tax[0];
    }

    async getManyTaxesByTaxIds(
        variables: Payment_GetManyTaxesByTaxIdsQueryVariables
    ): Promise<Payment_GetManyTaxesByTaxIdsQuery["tax"] | undefined> {
        const res = await this._call<Payment_GetManyTaxesByTaxIdsQuery>({
            query: GetManyTaxesByTaxIds,
            variables,
        });
        return res.data?.tax;
    }

    async getManyReference(
        variables: Payment_GetManyTaxesReferenceQueryVariables
    ): Promise<Payment_GetManyTaxesReferenceQuery["tax"] | undefined> {
        const res = await this._call<Payment_GetManyTaxesReferenceQuery>({
            query: GetManyTaxesReference,
            variables,
        });

        return res.data?.tax;
    }
}

const taxFatimaQueries = new TaxQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default taxFatimaQueries;
