import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

export const pathInvoiceDetailPage = (invoiceId: string) =>
    `/${MicroFrontendTypes.INVOICE}/${ERPModules.INVOICE_MANAGEMENT}/${invoiceId}/show`;

export const pathStudentDetailPage = (studentId: string) =>
    `/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${studentId}/show`;
