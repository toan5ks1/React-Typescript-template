import { defineService } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import {
    Invoice_BillItemManyQueryVariables,
    Invoice_BillItemsListQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import invoiceBillItemsListQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items.query";

export const invoiceBillItemsService = defineService({
    query: {
        invoiceBillItemsGetMany: (variables: Invoice_BillItemsListQueryVariables) => {
            return invoiceBillItemsListQueryInvoiceMgmt.getInvoiceBillItemsList(variables);
        },
        billItemGetMany: (variables: Invoice_BillItemManyQueryVariables) => {
            return invoiceBillItemsListQueryInvoiceMgmt.getBillItems(variables);
        },
    },
});
