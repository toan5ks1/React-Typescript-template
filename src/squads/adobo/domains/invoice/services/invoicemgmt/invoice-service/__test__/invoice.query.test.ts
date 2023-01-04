import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_InvoiceOneQuery,
    Invoice_InvoiceOneQueryVariables,
    Invoice_InvoicesByStatusQuery,
    Invoice_InvoicesByStatusQueryVariables,
    Invoice_InvoicesByStudentIdQuery,
    Invoice_InvoicesByStudentIdQueryVariables,
    Invoice_InvoicesQuery,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import {
    getMockInvoiceDetail,
    getMockInvoicesData,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import invoiceQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockInvoice = getMockInvoiceDetail();
const mockInvoiceList = getMockInvoicesData();

describe("invoiceQueryInvoiceMgmt", () => {
    it("getInvoice", async () => {
        const variables: Invoice_InvoiceOneQueryVariables = {
            invoice_id: "01G7DWMBQTV5414QRMFWZ8BN54",
        };

        const mockInvoiceQuery: HasuraAndDefaultResponse<Invoice_InvoiceOneQuery> = {
            data: {
                invoice: [mockInvoice],
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceQuery);

        const result = await invoiceQueryInvoiceMgmt.getInvoice(variables);

        expect(result).toEqual(mockInvoice);
    });

    it("getInvoices", async () => {
        const mockInvoiceQuery: HasuraAndDefaultResponse<Invoice_InvoicesQuery> = {
            data: {
                invoice: mockInvoiceList,
                invoice_aggregate: {
                    aggregate: {
                        count: 5,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceQuery);

        const result = await invoiceQueryInvoiceMgmt.getInvoices({});

        expect(result).toEqual({
            data: mockInvoiceList,
            total: mockInvoiceList.length,
        });
    });

    it("getInvoicesByStatus", async () => {
        const variables: Invoice_InvoicesByStatusQueryVariables = {
            status: "DRAFT",
        };

        const mockInvoiceQuery: HasuraAndDefaultResponse<Invoice_InvoicesByStatusQuery> = {
            data: {
                invoice: [mockInvoiceList[0]],
                invoice_aggregate: {
                    aggregate: {
                        count: 1,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceQuery);

        const result = await invoiceQueryInvoiceMgmt.getInvoicesByStatus(variables);

        expect(result).toEqual({
            data: [mockInvoiceList[0]],
            total: 1,
        });
    });

    it("getInvoicesByStudentId", async () => {
        const variables: Invoice_InvoicesByStudentIdQueryVariables = {
            studentId: "student_id_2",
        };

        const mockInvoiceQuery: HasuraAndDefaultResponse<Invoice_InvoicesByStudentIdQuery> = {
            data: {
                invoice: [mockInvoiceList[1]],
                invoice_aggregate: {
                    aggregate: {
                        count: 1,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceQuery);

        const result = await invoiceQueryInvoiceMgmt.getInvoicesByStudentId(variables);

        expect(result).toEqual({
            data: [mockInvoiceList[1]],
            total: 1,
        });
    });
});
