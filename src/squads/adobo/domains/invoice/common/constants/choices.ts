import { OptionSelectType } from "src/common/constants/types";
import {
    InvoiceActions,
    PaymentMethods,
} from "src/squads/adobo/domains/invoice/common/constants/enum";

import { PaymentMethod } from "manabuf/invoicemgmt/v1/enums_pb";

import type { UseResourceTranslateReturn } from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export const getChoices = (tInvoice: UseResourceTranslateReturn): OptionSelectType[] => {
    return [
        {
            id: PaymentMethods.PAYMENT_METHOD_DEBIT_CARD,
            label: PaymentMethods[PaymentMethod.DIRECT_DEBIT],
            value: tInvoice("invoiceManagement.paymentMethods.directDebit"),
        },
        {
            id: PaymentMethods.PAYMENT_METHOD_CONVENIENCE_STORE,
            label: PaymentMethods[PaymentMethod.CONVENIENCE_STORE],
            value: tInvoice("invoiceManagement.paymentMethods.convenienceStore"),
        },
    ];
};

export const choicesInvoiceAction = (tInvoice: UseResourceTranslateReturn): OptionSelectType[] => {
    return [
        {
            id: InvoiceActions.BULK_ISSUE_INVOICE,
            label: InvoiceActions.BULK_ISSUE_INVOICE,
            value: tInvoice("actions.bulkIssueInvoice"),
        },
        {
            id: InvoiceActions.SCHEDULED_INVOICE_HISTORY,
            label: InvoiceActions.SCHEDULED_INVOICE_HISTORY,
            value: tInvoice("actions.scheduledInvoiceHistory"),
        },
    ];
};
