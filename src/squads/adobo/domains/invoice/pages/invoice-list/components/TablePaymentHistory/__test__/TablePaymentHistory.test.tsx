import { Invoice_PaymentHistoryQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import {
    getMockPaymentHistoryList,
    getMockPaymentHistoryTableList,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/payment-history";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import TablePaymentHistory from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TablePaymentHistory";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, within } from "@testing-library/react";

const mockPayments = getMockPaymentHistoryList();
const mockPaymentsTableList = getMockPaymentHistoryTableList();

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

const renderComponent = (mockPaymentsData: Invoice_PaymentHistoryQuery["payment"]) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TablePaymentHistory paymentHistory={mockPaymentsData} />
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

type TPaymentTableCellTestIdsAndKeys = {
    id: string;
    mockKey: string;
}[];

describe(TablePaymentHistory.name, () => {
    it("should contain correct values for columns", () => {
        renderComponent(mockPayments);

        expect(screen.getByTestId("InvoiceDetail__genInfoTitle")).toBeInTheDocument();
        expect(screen.getByTestId("TablePayment__table")).toBeInTheDocument();

        const PAYMENT_TABLE_CELL_TEST_IDS_AND_KEYS: TPaymentTableCellTestIdsAndKeys = [
            {
                id: "PaymentTableCell__columnPaymentStatus",
                mockKey: "payment_status",
            },
            {
                id: "PaymentTableCell__columnPaymentMethod",
                mockKey: "payment_method",
            },
            {
                id: "PaymentTableCell__columnPaymentNo",
                mockKey: "payment_sequence_number",
            },
            {
                id: "PaymentTableCell__columnCreatedDate",
                mockKey: "created_at",
            },
            {
                id: "PaymentTableCell__columnDueDate",
                mockKey: "payment_due_date",
            },
            {
                id: "PaymentTableCell__columnExpiryDate",
                mockKey: "payment_expiry_date",
            },
            {
                id: "PaymentsTableCell__columnResult",
                mockKey: "result",
            },
        ];

        const expectTableCellToHaveTextContent = (columnTestId: string, textContentKey: string) => {
            const paymentRows = screen.getAllByTestId("TableBase__row");

            expect(paymentRows).toHaveLength(mockPaymentsTableList.length);

            paymentRows.forEach((row, idx) => {
                const paymentCell = within(row).getByTestId(columnTestId);

                const mockPayment = mockPaymentsTableList[idx];

                expect(paymentCell).toHaveTextContent(mockPayment![textContentKey]);
            });
        };

        PAYMENT_TABLE_CELL_TEST_IDS_AND_KEYS.forEach(({ id, mockKey }) => {
            expectTableCellToHaveTextContent(id, mockKey);
        });
    });
});
