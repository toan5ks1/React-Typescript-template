import { defineService } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import { Invoice_BillItemsQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import billItemsQueryInvoiceMgmt from "./bill-items-invoicemgmt.query";

export const billItemsService = defineService({
    query: {
        billItemsGetMany: (variables: Invoice_BillItemsQueryVariables) => {
            return billItemsQueryInvoiceMgmt.getMany(variables);
        },
    },
});
