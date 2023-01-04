import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_BillItemsQueryVariables,
    Invoice_BillItemsQuery,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

const getManyQuery = gql`
    query Invoice_BillItems(
        $student_id: String
        $billing_statuses: [String!] = []
        $limit: Int = 10
        $offset: Int = 0
    ) {
        bill_item(
            where: { student_id: { _eq: $student_id }, billing_status: { _in: $billing_statuses } }
            limit: $limit
            offset: $offset
            order_by: { bill_item_sequence_number: asc }
        ) {
            billing_item_description
            final_price
            student_id
            billing_date
            billing_status
            bill_item_sequence_number
        }
        bill_item_aggregate(
            where: { student_id: { _eq: $student_id }, billing_status: { _in: $billing_statuses } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class BillItemsInvoiceMgmtQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: Invoice_BillItemsQueryVariables
    ): Promise<DataWithTotal<Invoice_BillItemsQuery["bill_item"] | undefined>> {
        const response = await this._call<Invoice_BillItemsQuery>({
            query: getManyQuery,
            variables,
        });

        return {
            data: response.data?.bill_item,
            total: response.data?.bill_item_aggregate.aggregate?.count ?? 0,
        };
    }
}

const billItemsQueryInvoiceMgmt = new BillItemsInvoiceMgmtQuery(
    appConfigs,
    "invoicemgmtGraphQL",
    doQuery
);

export default billItemsQueryInvoiceMgmt;
