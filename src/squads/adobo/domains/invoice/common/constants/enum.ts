export enum CreateInvoiceBillingItemsStatus {
    BILLING_STATUS_PENDING = "BILLING_STATUS_PENDING",
    BILLING_STATUS_BILLED = "BILLING_STATUS_BILLED",
    BILLING_STATUS_INVOICED = "BILLING_STATUS_INVOICED",
}

export enum InvoiceCurrency {
    JAPANESE_YEN = "JPY",
}

export enum InvoiceCurrencySymbol {
    JAPANESE_YEN = "￥",
}

export enum InvoiceStatus {
    DRAFT = "DRAFT",
    ISSUED = "ISSUED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    PAID = "PAID",
    VOID = "VOID",
}

export enum InvoiceNumberCode {
    INVOICE_CODE = "IV",
    BILL_ITEM = "BL",
    PAYMENT_HISTORY = "PV",
}

export enum InvoicePaymentMethods {
    CASH = "cash",
    DIRECT_DEBIT = "directDebit",
    CONVENIENCE_STORE = "convenienceStore",
}

export enum InvoiceTypes {
    MANUAL = "manual",
    SCHEDULED = "scheduled",
}

export enum MutationMenus {
    INVOICE_DETAIL_VOID_INVOICE = "voidInvoice",
    INVOICE_DETAIL_ISSUE_INVOICE = "issueInvoice",
    INVOICE_DETAIL_EDIT_CREDIT_NOTE = "editCreditNote",
    APPROVE_PAYMENT = "approvePayment",
    CANCEL_PAYMENT = "cancelPayment",
}

export enum IssueInvoiceFormFields {
    PAYMENT_METHOD = "paymentMethod",
    DUE_DATE = "dueDate",
    EXPIRY_DATE = "expiryDate",
    REMARKS = "remarks",
}

export enum voidInvoiceFormFields {
    REMARKS = "remarks",
}

export enum PaymentMethods {
    PAYMENT_METHOD_CONVENIENCE_STORE = "convenienceStore",
    PAYMENT_METHOD_DEBIT_CARD = "directDebit",
}

export enum PaymentStatus {
    PAYMENT_PENDING = "Pending",
    PAYMENT_SUCCESSFUL = "Successful",
    PAYMENT_FAILED = "Failed",
}

export enum PaymentMethod {
    DIRECT_DEBIT = "Direct Debit",
    CONVENIENCE_STORE = "Convenience Store",
}

export enum InvoiceActions {
    BULK_ISSUE_INVOICE = "bulkIssueInvoice",
    SCHEDULED_INVOICE_HISTORY = "scheduledInvoiceHistory",
}

export enum ScheduledInvoiceStatus {
    COMPLETED = "COMPLETED",
    INCOMPLETE = "INCOMPLETE",
}
