import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyDiscountsQuery,
    Payment_GetManyDiscountsQueryVariables,
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { getSearchString } from "src/squads/payment/service/utils/utils";

export const discountFragment = gql`
    fragment DiscountAttrs on discount {
        available_from
        available_until
        created_at
        discount_amount_type
        discount_amount_value
        discount_type
        discount_id
        name
        recurring_valid_duration
        remarks
        updated_at
    }
`;

const GetManyDiscounts = gql`
    query Payment_GetManyDiscounts($current_date: timestamptz!, $name: String, $limit: Int = 30) {
        discount(
            limit: $limit
            where: {
                _and: [
                    { available_from: { _lte: $current_date } }
                    { available_until: { _gte: $current_date } }
                    { name: { _ilike: $name } }
                ]
            }
        ) {
            ...DiscountAttrs
        }
    }

    ${discountFragment}
`;

const GetManyDiscountsByDiscountIds = gql`
    query Payment_GetManyDiscountsByDiscountIds($discountIds: [String!]) {
        discount(where: { discount_id: { _in: $discountIds } }, order_by: { discount_id: asc }) {
            ...DiscountAttrs
        }
    }

    ${discountFragment}
`;

class DiscountQueriesFatima extends InheritedHasuraServiceClient {
    async getMany(
        variables: Payment_GetManyDiscountsQueryVariables
    ): Promise<Payment_GetManyDiscountsQuery["discount"] | undefined> {
        const res = await this._call<Payment_GetManyDiscountsQuery>({
            query: GetManyDiscounts,
            variables: {
                current_date: variables.current_date,
                name: getSearchString(variables.name),
                limit: variables.limit,
            },
        });

        return res.data?.discount;
    }
    async getManyDiscountByIds(
        variables: Payment_GetManyDiscountsByDiscountIdsQueryVariables
    ): Promise<Payment_GetManyDiscountsByDiscountIdsQuery["discount"] | undefined> {
        const res = await this._call<Payment_GetManyDiscountsByDiscountIdsQuery>({
            query: GetManyDiscountsByDiscountIds,
            variables,
        });
        return res.data?.discount;
    }
}

const discountQueriesFatima = new DiscountQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default discountQueriesFatima;
