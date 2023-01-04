import invoiceService from "src/squads/adobo/domains/invoice/services/invoice-service";
import { billItemsService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/bill-items-service-invoicemgmt/bill-items-service";
import { invoiceActionLogService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log-service";
import { invoiceBillItemsService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items-service";
import {
    composeServices,
    createUseMutation,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "src/squads/adobo/domains/invoice/services/service-creator";

import { paymentHistoryService } from "./invoicemgmt/payment-history/payment-history-service";

// compose all services into service map
const rootService = composeServices({
    // Invoice Mgmt
    billItems: billItemsService,
    invoiceBillItems: invoiceBillItemsService,
    invoice: invoiceService,
    paymentHistory: paymentHistoryService,
    invoiceActionLog: invoiceActionLogService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);

export const inferMutation = createUseMutation(rootService);
