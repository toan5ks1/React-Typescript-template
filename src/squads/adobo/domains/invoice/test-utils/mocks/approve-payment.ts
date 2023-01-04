import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import { FormApprovePaymentValues } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";

const paymentDate = "2022/07/28";
const remarks = "remarks";

export function getMockApproveInvoicePaymentInvoiceFormValues(): FormApprovePaymentValues {
    return {
        paymentDate,
        remarks,
    };
}

export function getMockApproveInvoicePaymentPayload(): NsInvoiceService.ApproveInvoicePaymentRequest {
    return {
        invoiceId: "1",
        remarks,
        paymentDate,
    };
}

export function getMockNewApproveInvoicePaymentRequest(): NsInvoiceService.ApproveInvoicePaymentRequest {
    return {
        paymentDate: { nanos: 0, seconds: 1658966400 },
        invoiceId: "1",
        remarks: "remarks",
    };
}
