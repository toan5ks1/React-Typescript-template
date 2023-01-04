import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_ActionLogQuery,
    Invoice_ActionLogQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockInvoiceActionLogData } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoice-action-log";

import invoiceActionLogQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockInvoiceActionLog = getMockInvoiceActionLogData();

describe("Invoice Action Log Query", () => {
    it("should return invoice action log items when calling getInvoiceActionLogList", async () => {
        const variables: Invoice_ActionLogQueryVariables = {
            invoice_id: "1",
            limit: 5,
            offset: 0,
        };

        const mockInvoiceActionLogQuery: HasuraAndDefaultResponse<Invoice_ActionLogQuery> = {
            data: {
                invoice_action_log: mockInvoiceActionLog,
                invoice_action_log_aggregate: {
                    aggregate: {
                        count: mockInvoiceActionLog.length,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockInvoiceActionLogQuery);

        const result = await invoiceActionLogQueryInvoiceMgmt.getInvoiceActionLogList(variables);

        expect(result).toEqual({
            data: mockInvoiceActionLog,
            total: mockInvoiceActionLog.length,
        });
    });
});
