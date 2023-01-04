import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import {
    getMockApproveInvoicePaymentPayload,
    getMockNewApproveInvoicePaymentRequest,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/approve-payment";
import { getMockBillItemsData } from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";
import {
    getMockCancelInvoicePaymentPayload,
    getMockNewCancelInvoicePaymentRequest,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/cancel-payment";
import {
    getMockIssueInvoicePayload,
    getMockNewIssueInvoiceRequest,
    getMockVoidInvoicePayload,
    getMockNewVoidInvoiceRequest,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import { InvoiceType } from "manabuf/invoicemgmt/v1/enums_pb";

import {
    approveInvoicePaymentReq,
    cancelInvoicePaymentReq,
    generateInvoicesReq,
    issueInvoiceReq,
    voidInvoiceReq,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice-service.request";

jest.mock("@manabie-com/graphql-client");

const studentId = "student_id_1";
const mockBillingItems = getMockBillItemsData();
const mockIssueInvoicePayload = getMockIssueInvoicePayload();
const mockNewIssueInvoiceRequest = getMockNewIssueInvoiceRequest();

const mockVoidInvoicePayload = getMockVoidInvoicePayload();
const mockNewVoidInvoiceRequest = getMockNewVoidInvoiceRequest();

const mockApproveInvoicePaymentPayload = getMockApproveInvoicePaymentPayload();
const mockNewApproveInvoicePaymentRequest = getMockNewApproveInvoicePaymentRequest();

const mockCancelInvoicePaymentPayload = getMockCancelInvoicePaymentPayload();
const mockNewCancelInvoicePaymentRequest = getMockNewCancelInvoicePaymentRequest();

describe(generateInvoicesReq.name, () => {
    const mockBillItemIdsList = [
        mockBillingItems[0].bill_item_sequence_number,
        mockBillingItems[1].bill_item_sequence_number,
    ];
    const mockSubTotal = mockBillingItems[0].final_price + mockBillingItems[1].final_price;
    const mockTotal = mockSubTotal;

    const mockNewInvoice: NsInvoiceService.GenerateInvoiceDetail = {
        studentId: studentId,
        billItemIdsList: mockBillItemIdsList,
        subTotal: mockSubTotal,
        total: mockTotal,
        invoiceType: InvoiceType.MANUAL,
    };

    const request = generateInvoicesReq({
        invoicesList: [mockNewInvoice],
    });

    it("should return generateInvoiceReq request correctly", async () => {
        expect(request.toObject().invoicesList[0]).toEqual(mockNewInvoice);
    });
});

describe(issueInvoiceReq.name, () => {
    const request = issueInvoiceReq(mockIssueInvoicePayload);

    it("should return issueInvoice request correctly", async () => {
        expect(request.toObject()).toEqual(mockNewIssueInvoiceRequest);
    });
});

describe(voidInvoiceReq.name, () => {
    const request = voidInvoiceReq(mockVoidInvoicePayload);

    it("should return voidIssue request correctly", async () => {
        expect(request.toObject()).toEqual(mockNewVoidInvoiceRequest);
    });
});

describe(approveInvoicePaymentReq.name, () => {
    const request = approveInvoicePaymentReq(mockApproveInvoicePaymentPayload);

    it("should return approveInvoicePayment request correctly", async () => {
        expect(request.toObject()).toEqual(mockNewApproveInvoicePaymentRequest);
    });
});

describe(cancelInvoicePaymentReq.name, () => {
    const request = cancelInvoicePaymentReq(mockCancelInvoicePaymentPayload);

    it("should return cancelInvoicePayment request correctly", async () => {
        expect(request.toObject()).toEqual(mockNewCancelInvoicePaymentRequest);
    });
});
