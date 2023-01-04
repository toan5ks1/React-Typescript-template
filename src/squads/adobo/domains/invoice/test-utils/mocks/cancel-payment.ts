import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

const remarks = "remarks";

export function getMockCancelInvoicePaymentPayload(): NsInvoiceService.CancelInvoicePaymentRequest {
    return {
        invoiceId: "invoice_id_1",
        remarks,
    };
}

export function getMockNewCancelInvoicePaymentRequest(): NsInvoiceService.CancelInvoicePaymentRequest {
    return {
        invoiceId: "invoice_id_1",
        remarks: "remarks",
    };
}
