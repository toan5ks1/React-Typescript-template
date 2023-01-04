import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_PaymentHistoryQuery,
    Invoice_PaymentHistoryQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockPaymentHistoryList } from "src/squads/adobo/domains/invoice/test-utils/mocks/payment-history";

import paymentHistoryQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/payment-history/payment-history.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockPaymentHistory = getMockPaymentHistoryList();

describe("Payment History Query", () => {
    it("should return payment history items it when calling getPaymentHistoryList", async () => {
        const variables: Invoice_PaymentHistoryQueryVariables = {
            invoice_id: "1",
            limit: 10,
            offset: 0,
        };

        const mockPaymentHistoryQuery: HasuraAndDefaultResponse<Invoice_PaymentHistoryQuery> = {
            data: {
                payment: mockPaymentHistory,
                payment_aggregate: {
                    aggregate: {
                        count: mockPaymentHistory.length,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockPaymentHistoryQuery);

        const result = await paymentHistoryQueryInvoiceMgmt.getPaymentHistoryList(variables);

        expect(result).toMatchObject({
            data: mockPaymentHistory,
            total: mockPaymentHistory.length,
        });
    });

    it("should return zero payment history and count when ID does not have payment/or invalid", async () => {
        const variables: Invoice_PaymentHistoryQueryVariables = {
            invoice_id: "invalid_id",
            limit: 10,
            offset: 0,
        };

        const mockPaymentHistoryQuery: HasuraAndDefaultResponse<
            Invoice_PaymentHistoryQuery | undefined
        > = {
            data: undefined,
        };

        (doQuery as jest.Mock).mockReturnValue(mockPaymentHistoryQuery);

        const result = await paymentHistoryQueryInvoiceMgmt.getPaymentHistoryList(variables);

        expect(result).toMatchObject({
            data: undefined,
            total: 0,
        });
    });
});
