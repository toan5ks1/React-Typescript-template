import { invoiceBillItemsService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items-service";
import {
    Invoice_BillItemManyQueryVariables,
    Invoice_BillItemsListQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import {
    getMockInvoiceBillItems,
    getMockInvoiceInfo,
    invoiceId,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import invoiceBillItemsListQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items.query";

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-bill-items-service/invoice-bill-items.query",
    () => ({
        __esModule: true,
        default: {
            getInvoiceBillItemsList: jest.fn(),
            getBillItems: jest.fn(),
        },
    })
);

const mockInvoiceBillItems = getMockInvoiceBillItems();
const mockBillItems = getMockInvoiceInfo();
const mockBillItemIds = [1, 4];

describe("Invoice Bill Items", () => {
    it("should return invoice bill items when calling invoiceBillItemsGetMany", async () => {
        const variables: Invoice_BillItemsListQueryVariables = {
            invoice_id: invoiceId,
        };

        (
            invoiceBillItemsListQueryInvoiceMgmt.getInvoiceBillItemsList as jest.Mock
        ).mockResolvedValue(mockInvoiceBillItems);

        const result = await invoiceBillItemsService.query.invoiceBillItemsGetMany(variables);

        expect(invoiceBillItemsListQueryInvoiceMgmt.getInvoiceBillItemsList).toBeCalledWith(
            variables
        );
        expect(invoiceBillItemsListQueryInvoiceMgmt.getInvoiceBillItemsList).toBeCalledTimes(1);
        expect(result).toEqual(mockInvoiceBillItems);
    });

    it("should return bill items when calling billItemGetMany", async () => {
        const variables: Invoice_BillItemManyQueryVariables = {
            bill_item_sequence_number: mockBillItemIds,
        };

        (invoiceBillItemsListQueryInvoiceMgmt.getBillItems as jest.Mock).mockResolvedValue(
            mockBillItems
        );

        const result = await invoiceBillItemsService.query.billItemGetMany(variables);

        expect(invoiceBillItemsListQueryInvoiceMgmt.getBillItems).toBeCalledWith(variables);
        expect(invoiceBillItemsListQueryInvoiceMgmt.getBillItems).toBeCalledTimes(1);
        expect(result).toEqual(mockBillItems);
    });
});
