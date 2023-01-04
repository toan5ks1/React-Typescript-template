import { ScheduledInvoiceStatus } from "src/squads/adobo/domains/invoice/common/constants/enum";

import { InvoiceStatus, PaymentStatus } from "manabuf/invoicemgmt/v1/enums_pb";

export type InvoiceStatusKeys = keyof typeof InvoiceStatus;
export type PaymentStatusKeys = keyof typeof PaymentStatus;
export type ScheduledInvoiceStatusKeys = keyof typeof ScheduledInvoiceStatus;

export type InvoiceChipStatusKeys =
    | PaymentStatusKeys
    | InvoiceStatusKeys
    | ScheduledInvoiceStatusKeys;
