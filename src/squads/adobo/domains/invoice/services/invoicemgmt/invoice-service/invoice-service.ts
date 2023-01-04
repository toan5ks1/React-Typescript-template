import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { InheritedGrpcServiceClient } from "src/squads/adobo/domains/invoice/services/service-types";

import { InvoiceServicePromiseClient } from "manabuf/invoicemgmt/v1/invoice_grpc_web_pb";

import {
    generateInvoicesReq,
    issueInvoiceReq,
    voidInvoiceReq,
    approveInvoicePaymentReq,
    cancelInvoicePaymentReq,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice-service.request";

class InvoiceService extends InheritedGrpcServiceClient<InvoiceServicePromiseClient> {
    async generateInvoices(invoices: NsInvoiceService.GenerateInvoicesRequest) {
        const req = generateInvoicesReq(invoices);

        const resp = await this._call("generateInvoices", req);

        return resp.toObject();
    }

    async issueInvoice(data: NsInvoiceService.IssueInvoiceRequest) {
        const req = issueInvoiceReq(data);

        const resp = await this._call("issueInvoice", req);

        return resp.toObject();
    }

    async voidInvoice(data: NsInvoiceService.VoidInvoiceRequest) {
        const req = voidInvoiceReq(data);

        const resp = await this._call("voidInvoice", req);

        return resp.toObject();
    }

    async approveInvoicePayment(data: NsInvoiceService.ApproveInvoicePaymentRequest) {
        const req = approveInvoicePaymentReq(data);

        const resp = await this._call("approveInvoicePayment", req);

        return resp.toObject();
    }

    async cancelInvoicePayment(data: NsInvoiceService.CancelInvoicePaymentRequest) {
        const req = cancelInvoicePaymentReq(data);

        const resp = await this._call("cancelInvoicePayment", req);

        return resp.toObject();
    }
}

const invoiceService = new InvoiceService(
    InvoiceServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default invoiceService;
