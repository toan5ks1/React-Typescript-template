import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyBillItemsV2QueryVariables,
    Payment_GetManyBillItemsV2Query,
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

import { DataWithTotal } from "@manabie-com/react-utils";

const GetManyBillItems = gql`
    query Payment_GetManyBillItemsV2($order_id: String!, $limit: Int = 5, $offset: Int = 0) {
        bill_item(
            where: { order_id: { _eq: $order_id } }
            limit: $limit
            offset: $offset
            order_by: { bill_item_sequence_number: asc }
        ) {
            bill_item_sequence_number
            product_description
            billing_status
            billing_date
            final_price
            order_id
            product_id
        }
        bill_item_aggregate(where: { order_id: { _eq: $order_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const GetManyBillItemsByStudentProductIds = gql`
    query Payment_GetManyBillItemsByStudentProductIdsV2($student_product_ids: [String!]) {
        bill_item(where: { student_product_id: { _in: $student_product_ids } }) {
            product_id
            product_pricing
            discount_amount_type
            discount_amount_value
            tax_id
            tax_category
            tax_percentage
            order_id
            billing_status
            billing_date
            billing_schedule_period_id
            bill_item_sequence_number
            discount_amount
            tax_amount
            final_price
            billing_approval_status
            billing_item_description
            student_product_id
            previous_bill_item_status
            previous_bill_item_sequence_number
            is_latest_bill_item
            adjustment_price
            price
            old_price
            billing_ratio_numerator
            billing_ratio_denominator
        }
    }
`;

class BillItemQueriesFatima extends InheritedHasuraServiceClient {
    async getList(
        variables: Payment_GetManyBillItemsV2QueryVariables
    ): Promise<DataWithTotal<Payment_GetManyBillItemsV2Query["bill_item"] | undefined>> {
        const res = await this._call<Payment_GetManyBillItemsV2Query>({
            query: GetManyBillItems,
            variables,
        });

        return {
            data: res.data?.bill_item,
            total: res.data?.bill_item_aggregate.aggregate?.count ?? 0,
        };
    }
    async getManyBillItemsByStudentProductIds(
        variables: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables
    ): Promise<Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"] | undefined> {
        const res = await this._call<Payment_GetManyBillItemsByStudentProductIdsV2Query>({
            query: GetManyBillItemsByStudentProductIds,
            variables,
        });

        return res.data?.bill_item;
    }
}

const billItemQueriesFatima = new BillItemQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default billItemQueriesFatima;
