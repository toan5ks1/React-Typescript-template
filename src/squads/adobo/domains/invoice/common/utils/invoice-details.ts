import { InvoiceNumberCode } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { Invoice_UsersQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

//TODO: Add prefix for Invoice Codes
export const formatDiscountText = (discountType?: string, discountAmount?: number) =>
    `${discountType} - ${discountAmount}%`;

export const getBillItemPrefix = (billSequenceNumber: number) =>
    `${InvoiceNumberCode.BILL_ITEM}-${billSequenceNumber}`;

export const getInvoicePrefix = (invoiceSequenceNumber: number) =>
    `${InvoiceNumberCode.INVOICE_CODE}-${invoiceSequenceNumber}`;

export const getTaxPrefix = (taxPercentage: number) => `${taxPercentage}%`;

export const getPaymentHistoryItemPrefix = (paymentSequenceNumber: number | null | undefined) =>
    paymentSequenceNumber
        ? `${InvoiceNumberCode.PAYMENT_HISTORY}-${paymentSequenceNumber}`
        : `${InvoiceNumberCode.PAYMENT_HISTORY}-0`;

export const getUserByUserId = (userId: string, users?: Invoice_UsersQuery["users"]) =>
    users?.find((user) => user.user_id === userId)?.name || "";

export const checkUndefined = (content: string) => (content ? content : "--");
