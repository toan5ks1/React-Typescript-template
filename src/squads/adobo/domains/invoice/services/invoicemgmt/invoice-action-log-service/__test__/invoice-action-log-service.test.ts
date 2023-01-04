import { invoiceActionLogService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log-service";
import { Invoice_ActionLogQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockInvoiceActionLogData } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoice-action-log";

import invoiceActionLogQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log.query";

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log.query.ts",
    () => ({
        __esModule: true,
        default: {
            getInvoiceActionLogList: jest.fn(),
        },
    })
);

const mockInvoiceActionLog = getMockInvoiceActionLogData();

describe("Invoice Action Log service", () => {
    it("should return invoice action log when calling getInvoiceActionLogList", async () => {
        const variables: Invoice_ActionLogQueryVariables = {
            invoice_id: "1",
            limit: 5,
            offset: 0,
        };

        (invoiceActionLogQueryInvoiceMgmt.getInvoiceActionLogList as jest.Mock).mockResolvedValue(
            mockInvoiceActionLog
        );

        const result = await invoiceActionLogService.query.invoiceActionLogMany(variables);

        expect(invoiceActionLogQueryInvoiceMgmt.getInvoiceActionLogList).toBeCalledWith(variables);
        expect(invoiceActionLogQueryInvoiceMgmt.getInvoiceActionLogList).toBeCalledTimes(1);
        expect(result).toEqual(mockInvoiceActionLog);
    });
});
