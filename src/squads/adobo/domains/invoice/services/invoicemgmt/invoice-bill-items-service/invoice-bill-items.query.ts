import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_BillItemsListQuery,
    Invoice_BillItemsListQueryVariables,
    Invoice_BillItemManyQuery,
    Invoice_BillItemManyQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

export interface BillItemsReturn {
    data: Invoice_BillItemsListQuery["invoice_bill_item"];
    total: number | null | undefined;
}
const getInvoiceBillItemsListQuery = gql`
    query Invoice_BillItemsList($invoice_id: String, $limit: Int = 10, $offset: Int = 0) {
        invoice_bill_item(
            where: { invoice_id: { _eq: $invoice_id } }
            limit: $limit
            offset: $offset
            order_by: { bill_item_sequence_number: asc }
        ) {
            invoice_bill_item_id
            invoice_id
            bill_item_sequence_number
        }
        invoice_bill_item_aggregate(where: { invoice_id: { _eq: $invoice_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const getBillItemsQuery = gql`
    query Invoice_BillItemMany(
        $bill_item_sequence_number: [Int!]
        $limit: Int = 10
        $offset: Int = 0
    ) {
        bill_item(
            where: { bill_item_sequence_number: { _in: $bill_item_sequence_number } }
            limit: $limit
            offset: $offset
        ) {
            bill_item_sequence_number
            billing_item_description
            billing_date
            discount_amount
            discount_amount_type
            discount_amount_value
            tax_amount
            tax_percentage
            tax_id
            tax_category
            final_price
        }
    }
`;

class InvoiceBillItemsListMgmtQuery extends InheritedHasuraServiceClient {
    async getInvoiceBillItemsList(
        variables: Invoice_BillItemsListQueryVariables
    ): Promise<DataWithTotal<Invoice_BillItemsListQuery["invoice_bill_item"] | undefined>> {
        const query = {
            query: getInvoiceBillItemsListQuery,
            variables,
        };

        const response = await this._call<Invoice_BillItemsListQuery>(query);

        return {
            data: response.data?.invoice_bill_item || [],
            total: response.data?.invoice_bill_item_aggregate?.aggregate?.count ?? 0,
        };
    }

    async getBillItems(
        variables: Invoice_BillItemManyQueryVariables
    ): Promise<Invoice_BillItemManyQuery["bill_item"] | undefined> {
        const response = await this._call<Invoice_BillItemManyQuery>({
            query: getBillItemsQuery,
            variables,
        });

        return response.data?.bill_item;
    }
}

const invoiceBillItemsListQueryInvoiceMgmt = new InvoiceBillItemsListMgmtQuery(
    appConfigs,
    "invoicemgmtGraphQL",
    doQuery
);

export default invoiceBillItemsListQueryInvoiceMgmt;
