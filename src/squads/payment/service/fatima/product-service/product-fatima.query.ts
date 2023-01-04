import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
    Payment_GetManyProductsReferenceQuery,
    Payment_GetManyProductsReferenceQueryVariables,
    Payment_GetManyProductsByProductIdsQueryVariables,
    Payment_GetManyProductsByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { getSearchString } from "src/squads/payment/service/utils/utils";

export const productFragment = gql`
    fragment ProductAttrs on product {
        product_id
        available_from
        available_until
        billing_schedule_id
        created_at
        custom_billing_period
        disable_pro_rating_flag
        name
        product_type
        remarks
        tax_id
        updated_at
    }
`;

const GetManyProductsByProductIdsAndAvailableDate = gql`
    query Payment_GetManyProductsByProductIdsAndAvailableDate(
        $name: String
        $product_ids: [String!] = []
        $available_from: timestamptz
        $available_until: timestamptz
    ) {
        product(
            where: {
                available_from: { _lte: $available_from }
                available_until: { _gte: $available_until }
                name: { _ilike: $name }
                product_id: { _in: $product_ids }
            }
            order_by: { created_at: desc }
        ) {
            ...ProductAttrs
        }
    }

    ${productFragment}
`;

const GetManyProductsReference = gql`
    query Payment_GetManyProductsReference($name: String, $limit: Int = 30) {
        product(limit: $limit, where: { name: { _ilike: $name } }) {
            ...ProductAttrs
        }
    }

    ${productFragment}
`;

const GetManyProductsByProductIds = gql`
    query Payment_GetManyProductsByProductIds($productIds: [String!]) {
        product(where: { product_id: { _in: $productIds } }, order_by: { product_id: asc }) {
            ...ProductAttrs
        }
    }

    ${productFragment}
`;

class ProductQueriesFatima extends InheritedHasuraServiceClient {
    async getManyByIncludedAndExcludedProductIds(
        variables: Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables
    ): Promise<Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] | undefined> {
        const res = await this._call<Payment_GetManyProductsByProductIdsAndAvailableDateQuery>({
            query: GetManyProductsByProductIdsAndAvailableDate,
            variables: {
                name: getSearchString(variables.name),
                product_ids: variables.product_ids,
                available_from: variables.available_from,
                available_until: variables.available_until,
            },
        });

        return res.data?.product;
    }

    async getManyReference({
        name,
        limit,
    }: Payment_GetManyProductsReferenceQueryVariables): Promise<
        Payment_GetManyProductsReferenceQuery["product"] | undefined
    > {
        const res = await this._call<Payment_GetManyProductsReferenceQuery>({
            query: GetManyProductsReference,
            variables: {
                name: getSearchString(name),
                limit,
            },
        });

        return res.data?.product;
    }

    async getProductByIds(
        variables: Payment_GetManyProductsByProductIdsQueryVariables
    ): Promise<Payment_GetManyProductsByProductIdsQuery["product"] | undefined> {
        const res = await this._call<Payment_GetManyProductsByProductIdsQuery>({
            query: GetManyProductsByProductIds,
            variables,
        });
        return res.data?.product;
    }
}

const productQueriesFatima = new ProductQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default productQueriesFatima;
