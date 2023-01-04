import { toTimestampNewProto } from "src/common/utils/timezone";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import { PaymentMethod } from "manabuf/invoicemgmt/v1/enums_pb";
import {
    GenerateInvoiceDetail,
    GenerateInvoicesRequest,
    IssueInvoiceRequest,
    VoidInvoiceRequest,
    ApproveInvoicePaymentRequest,
    CancelInvoicePaymentRequest,
} from "manabuf/invoicemgmt/v1/invoice_pb";

export function generateInvoicesReq(invoices: NsInvoiceService.GenerateInvoicesRequest) {
    const req = new GenerateInvoicesRequest();
    const invoiceList = new Array<GenerateInvoiceDetail>();

    invoices.invoicesList.forEach((invoice) => {
        const newInvoiceDetail = new GenerateInvoiceDetail();

        newInvoiceDetail.setStudentId(invoice.studentId);
        newInvoiceDetail.setBillItemIdsList(invoice.billItemIdsList);
        newInvoiceDetail.setSubTotal(invoice.subTotal);
        newInvoiceDetail.setTotal(invoice.total);
        newInvoiceDetail.setInvoiceType(invoice.invoiceType);

        invoiceList.push(newInvoiceDetail);
    });

    req.setInvoicesList(invoiceList);

    return req;
}

export function issueInvoiceReq(payload: NsInvoiceService.IssueInvoiceRequest) {
    const req = new IssueInvoiceRequest();

    const { dueDate, expiryDate, remarks, paymentMethod, invoiceIdString } = payload;

    const PAYMENT_METHOD_MAPPING = {
        directDebit: PaymentMethod.DIRECT_DEBIT,
        convenienceStore: PaymentMethod.CONVENIENCE_STORE,
    };

    req.setDueDate(
        toTimestampNewProto({
            originDate: dueDate,
            origin: false,
            start: true,
            type: null,
        })
    );
    req.setExpiryDate(
        toTimestampNewProto({
            originDate: expiryDate,
            origin: false,
            start: true,
            type: null,
        })
    );
    req.setRemarks(remarks);
    req.setPaymentMethod(PAYMENT_METHOD_MAPPING[paymentMethod]);
    req.setInvoiceIdString(invoiceIdString);

    return req;
}

export function voidInvoiceReq(payload: NsInvoiceService.VoidInvoiceRequest) {
    const req = new VoidInvoiceRequest();

    const { remarks, invoiceId } = payload;

    req.setInvoiceId(invoiceId);
    req.setRemarks(remarks);

    return req;
}

export function approveInvoicePaymentReq(payload: NsInvoiceService.ApproveInvoicePaymentRequest) {
    const req = new ApproveInvoicePaymentRequest();

    const { invoiceId, paymentDate, remarks } = payload;

    req.setInvoiceId(invoiceId);
    req.setPaymentDate(
        toTimestampNewProto({
            originDate: paymentDate,
            origin: false,
            start: true,
            type: null,
        })
    );
    req.setRemarks(remarks);

    return req;
}

export function cancelInvoicePaymentReq(payload: NsInvoiceService.CancelInvoicePaymentRequest) {
    const req = new CancelInvoicePaymentRequest();

    const { remarks, invoiceId } = payload;

    req.setInvoiceId(invoiceId);
    req.setRemarks(remarks);

    return req;
}
