import { Invoice_ActionLogQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { defineService } from "src/squads/adobo/domains/invoice/services/service-creator";

import invoiceActionLogInvoiceMgmt from "./invoice-action-log.query";

export const invoiceActionLogService = defineService({
    query: {
        invoiceActionLogMany: (variables: Invoice_ActionLogQueryVariables) => {
            return invoiceActionLogInvoiceMgmt.getInvoiceActionLogList(variables);
        },
    },
});
