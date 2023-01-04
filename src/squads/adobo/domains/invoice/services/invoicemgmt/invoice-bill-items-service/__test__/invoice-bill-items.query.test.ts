import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_BillItemManyQuery,
    Invoice_BillItemManyQueryVariables,
    Invoice_BillItemsListQuery,
    Invoice_BillItemsListQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import {
    getMockInvoiceBillItems,
    getMockInvoiceInfo,
    invoiceId,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import invoiceBillItemsListQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockInvoiceBillItems = getMockInvoiceBillItems();
const mockBillItems = getMockInvoiceInfo();

describe("invoiceQueryInvoiceMgmt", () => {
    it("getInvoiceBillItems", async () => {
        const variables: Invoice_BillItemsListQueryVariables = {
            invoice_id: invoiceId,
        };

        const mockInvoiceBillItemsQuery: HasuraAndDefaultResponse<Invoice_BillItemsListQuery> = {
            data: {
                invoice_bill_item: mockInvoiceBillItems,
                invoice_bill_item_aggregate: {
                    aggregate: {
                        count: mockInvoiceBillItems.length,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceBillItemsQuery);

        const result = await invoiceBillItemsListQueryInvoiceMgmt.getInvoiceBillItemsList(
            variables
        );

        expect(result).toEqual({
            data: mockInvoiceBillItems,
            total: mockBillItems.length,
        });
    });

    it("getBillItems", async () => {
        const variables: Invoice_BillItemManyQueryVariables = {
            bill_item_sequence_number: [1, 4],
        };

        const mockBillItemsQuery: HasuraAndDefaultResponse<Invoice_BillItemManyQuery> = {
            data: {
                bill_item: mockBillItems,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockBillItemsQuery);

        const result = await invoiceBillItemsListQueryInvoiceMgmt.getBillItems(variables);

        expect(result).toEqual(mockBillItems);
    });
});
