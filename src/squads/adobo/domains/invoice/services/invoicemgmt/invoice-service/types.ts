import {
    GenerateInvoicesRequest,
    GenerateInvoicesResponse,
    GenerateInvoiceDetail,
    IssueInvoiceRequest,
    IssueInvoiceResponse,
    VoidInvoiceRequest,
    VoidInvoiceResponse,
    ApproveInvoicePaymentRequest,
    ApproveInvoicePaymentResponse,
    CancelInvoicePaymentRequest,
    CancelInvoicePaymentResponse,
} from "manabuf/invoicemgmt/v1/invoice_pb";

export declare namespace NsInvoiceService {
    export interface GenerateInvoicesRequest extends GenerateInvoicesRequest.AsObject {}
    export interface GenerateInvoicesResponse extends GenerateInvoicesResponse.AsObject {}

    export interface GenerateInvoiceDetail extends GenerateInvoiceDetail.AsObject {}

    export interface IssueInvoiceRequest extends IssueInvoiceRequest.AsObject {}
    export interface IssueInvoiceResponse extends IssueInvoiceResponse.AsObject {}

    export interface VoidInvoiceRequest extends VoidInvoiceRequest.AsObject {}
    export interface VoidInvoiceResponse extends VoidInvoiceResponse.AsObject {}

    export interface ApproveInvoicePaymentRequest extends ApproveInvoicePaymentRequest.AsObject {}
    export interface ApproveInvoicePaymentResponse extends ApproveInvoicePaymentResponse.AsObject {}

    export interface CancelInvoicePaymentRequest extends CancelInvoicePaymentRequest.AsObject {}
    export interface CancelInvoicePaymentResponse extends CancelInvoicePaymentResponse.AsObject {}
}
