import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_PaymentHistoryQuery,
    Invoice_PaymentHistoryQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

const getPaymentHistoryList = gql`
    query Invoice_PaymentHistory(
        $invoice_id: String
        $payment_status: String
        $limit: Int = 10
        $offset: Int = 0
        $payment_order_by: payment_order_by! = { payment_sequence_number: asc }
    ) {
        payment(
            where: { invoice_id: { _eq: $invoice_id }, payment_status: { _eq: $payment_status } }
            limit: $limit
            offset: $offset
            order_by: [$payment_order_by]
        ) {
            invoice_id
            payment_date
            payment_due_date
            payment_expiry_date
            payment_id
            payment_method
            payment_sequence_number
            payment_status
            result
            created_at
            updated_at
        }
        payment_aggregate(
            where: { invoice_id: { _eq: $invoice_id }, payment_status: { _eq: $payment_status } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class PaymentHistoryInvoiceMgmtQuery extends InheritedHasuraServiceClient {
    async getPaymentHistoryList(
        variables: Invoice_PaymentHistoryQueryVariables
    ): Promise<DataWithTotal<Invoice_PaymentHistoryQuery["payment"] | undefined>> {
        const response = await this._call<Invoice_PaymentHistoryQuery>({
            query: getPaymentHistoryList,
            variables,
        });

        return {
            data: response.data?.payment,
            total: response.data?.payment_aggregate.aggregate?.count ?? 0,
        };
    }
}

const paymentHistoryQueryInvoiceMgmt = new PaymentHistoryInvoiceMgmtQuery(
    appConfigs,
    "invoicemgmtGraphQL",
    doQuery
);

export default paymentHistoryQueryInvoiceMgmt;
