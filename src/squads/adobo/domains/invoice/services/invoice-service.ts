import invoiceMutation from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import {
    Invoice_InvoiceOneQueryVariables,
    Invoice_UsersQueryVariables,
    Invoice_InvoicesByStatusQueryVariables,
    Invoice_InvoicesByStudentIdQueryVariables,
    Invoice_InvoicesQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { defineService } from "src/squads/adobo/domains/invoice/services/service-creator";

import invoiceQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice.query";
import userQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/user.query";

const invoiceService = defineService({
    query: {
        invoiceGetOne: (variables: Invoice_InvoiceOneQueryVariables) => {
            return invoiceQueryInvoiceMgmt.getInvoice(variables);
        },
        invoiceGetUsers: (variables: Invoice_UsersQueryVariables) => {
            return userQueryInvoiceMgmt.getUsers(variables);
        },
        invoiceGetList: (variables: Invoice_InvoicesQueryVariables) => {
            return invoiceQueryInvoiceMgmt.getInvoices(variables);
        },
        invoiceGetManyByStatus: (variables: Invoice_InvoicesByStatusQueryVariables) => {
            return invoiceQueryInvoiceMgmt.getInvoicesByStatus(variables);
        },
        invoiceGetManyByStudentId: (variables: Invoice_InvoicesByStudentIdQueryVariables) => {
            return invoiceQueryInvoiceMgmt.getInvoicesByStudentId(variables);
        },
    },
    mutation: {
        CREATE: (data: NsInvoiceService.GenerateInvoicesRequest) => {
            return invoiceMutation.generateInvoices(data);
        },
        issueInvoice: (data: NsInvoiceService.IssueInvoiceRequest) => {
            return invoiceMutation.issueInvoice(data);
        },
        voidInvoice: (data: NsInvoiceService.VoidInvoiceRequest) => {
            return invoiceMutation.voidInvoice(data);
        },
        approveInvoicePayment: (data: NsInvoiceService.ApproveInvoicePaymentRequest) => {
            return invoiceMutation.approveInvoicePayment(data);
        },
        cancelInvoicePayment: (data: NsInvoiceService.CancelInvoicePaymentRequest) => {
            return invoiceMutation.cancelInvoicePayment(data);
        },
    },
});

export default invoiceService;
