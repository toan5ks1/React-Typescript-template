import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_ActionLogQuery,
    Invoice_ActionLogQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

const getInvoiceActionLogList = gql`
    query Invoice_ActionLog(
        $invoice_id: String
        $limit: Int = 5
        $offset: Int = 0
        $invoice_action_log_order_by: invoice_action_log_order_by! = { updated_at: desc }
    ) {
        invoice_action_log(
            where: { invoice_id: { _eq: $invoice_id } }
            limit: $limit
            offset: $offset
            order_by: [$invoice_action_log_order_by]
        ) {
            user_id
            action
            action_detail
            action_comment
            invoice_action_id
            created_at
            updated_at
        }
        invoice_action_log_aggregate(where: { invoice_id: { _eq: $invoice_id } }) {
            aggregate {
                count
            }
        }
    }
`;

class InvoiceActionLogInvoiceMgmtQuery extends InheritedHasuraServiceClient {
    async getInvoiceActionLogList(
        variables: Invoice_ActionLogQueryVariables
    ): Promise<DataWithTotal<Invoice_ActionLogQuery["invoice_action_log"] | undefined>> {
        const response = await this._call<Invoice_ActionLogQuery>({
            query: getInvoiceActionLogList,
            variables,
        });

        return {
            data: response.data?.invoice_action_log,
            total: response.data?.invoice_action_log_aggregate.aggregate?.count ?? 0,
        };
    }
}

const invoiceActionLogQueryInvoiceMgmt = new InvoiceActionLogInvoiceMgmtQuery(
    appConfigs,
    "invoicemgmtGraphQL",
    doQuery
);

export default invoiceActionLogQueryInvoiceMgmt;
