import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetProductPriceByProductIdQuery,
    Payment_GetProductPriceByProductIdQueryVariables,
    Payment_GetManyProductPricesByProductIdsQueryVariables,
    Payment_GetManyProductPricesByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export const productPriceFragment = gql`
    fragment ProductPriceAttrs on product_price {
        product_price_id
        billing_schedule_period_id
        created_at
        price
        product_id
        quantity
    }
`;

const GetProductPriceByProductId = gql`
    query Payment_GetProductPriceByProductId($product_id: String!) {
        product_price(where: { product_id: { _eq: $product_id } }) {
            ...ProductPriceAttrs
        }
    }

    ${productPriceFragment}
`;

const GetManyProductPricesByProductIds = gql`
    query Payment_GetManyProductPricesByProductIds($productIds: [String!]) {
        product_price(where: { product_id: { _in: $productIds } }, order_by: { product_id: asc }) {
            ...ProductPriceAttrs
        }
    }

    ${productPriceFragment}
`;

class ProductPriceQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetProductPriceByProductIdQueryVariables
    ): Promise<ArrayElement<Payment_GetProductPriceByProductIdQuery["product_price"]> | undefined> {
        const res = await this._call<Payment_GetProductPriceByProductIdQuery>({
            query: GetProductPriceByProductId,
            variables,
        });

        return res.data?.product_price[0];
    }
    async getMany(
        variables: Payment_GetProductPriceByProductIdQueryVariables
    ): Promise<Payment_GetProductPriceByProductIdQuery["product_price"] | undefined> {
        const res = await this._call<Payment_GetProductPriceByProductIdQuery>({
            query: GetProductPriceByProductId,
            variables,
        });

        return res.data?.product_price;
    }
    async getManyPricesByIds(
        variables: Payment_GetManyProductPricesByProductIdsQueryVariables
    ): Promise<Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined> {
        const response = await this._call<Payment_GetManyProductPricesByProductIdsQuery>({
            query: GetManyProductPricesByProductIds,
            variables,
        });

        return response.data?.product_price;
    }
}

const productPriceQueriesFatima = new ProductPriceQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default productPriceQueriesFatima;
