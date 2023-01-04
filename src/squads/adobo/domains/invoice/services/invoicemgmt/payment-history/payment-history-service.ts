import { defineService } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import { Invoice_PaymentHistoryQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import paymentHistoryInvoiceMgmt from "./payment-history.query";

export const paymentHistoryService = defineService({
    query: {
        paymentHistoryMany: (variables: Invoice_PaymentHistoryQueryVariables) => {
            return paymentHistoryInvoiceMgmt.getPaymentHistoryList(variables);
        },
    },
});
