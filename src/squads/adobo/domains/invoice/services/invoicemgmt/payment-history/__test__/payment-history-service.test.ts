import { Invoice_PaymentHistoryQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { paymentHistoryService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/payment-history/payment-history-service";
import { getMockPaymentHistoryList } from "src/squads/adobo/domains/invoice/test-utils/mocks/payment-history";

import paymentHistoryQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/payment-history/payment-history.query";

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/payment-history/payment-history.query",
    () => ({
        __esModule: true,
        default: {
            getPaymentHistoryList: jest.fn(),
        },
    })
);

const mockPaymentHistory = getMockPaymentHistoryList();

describe("Payment history service", () => {
    it("should return payment history when calling getPaymentHistoryList", async () => {
        const variables: Invoice_PaymentHistoryQueryVariables = {
            invoice_id: "1",
            limit: 10,
            offset: 0,
        };

        (paymentHistoryQueryInvoiceMgmt.getPaymentHistoryList as jest.Mock).mockResolvedValue(
            mockPaymentHistory
        );

        const result = await paymentHistoryService.query.paymentHistoryMany(variables);

        expect(paymentHistoryQueryInvoiceMgmt.getPaymentHistoryList).toBeCalledWith(variables);
        expect(paymentHistoryQueryInvoiceMgmt.getPaymentHistoryList).toBeCalledTimes(1);
        expect(result).toEqual(mockPaymentHistory);
    });
});
