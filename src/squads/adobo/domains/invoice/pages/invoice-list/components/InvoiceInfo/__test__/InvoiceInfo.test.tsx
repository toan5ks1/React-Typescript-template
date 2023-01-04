import { formatDate } from "src/common/utils/time";
import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import {
    formatDiscountText,
    getBillItemPrefix,
    getTaxPrefix,
} from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import { inferQuery } from "src/squads/adobo/domains/invoice/services/infer-service";
import { getMockInvoiceInfo } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import InvoiceInfo from "src/squads/adobo/domains/invoice/pages/invoice-list/components/InvoiceInfo";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";

const mockBillItems = getMockInvoiceInfo();

const renderComponent = () => {
    (inferQuery as jest.Mock).mockReturnValue(() => ({
        data: mockBillItems,
        isLoading: false,
    }));

    return render(
        <TestQueryWrapper>
            <TestCommonAppProvider>
                <MuiPickersUtilsProvider>
                    <InvoiceInfo billItems={mockBillItems} />
                </MuiPickersUtilsProvider>
            </TestCommonAppProvider>
        </TestQueryWrapper>
    );
};

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => {
    const original = jest.requireActual("src/squads/adobo/domains/invoice/services/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

describe("<InvoiceInfo />", () => {
    it("should contain content", () => {
        renderComponent();

        expect(screen.getByTestId("TableInvoice__title")).toBeInTheDocument();
        expect(screen.getByTestId("TablInvoiceInfo__table")).toBeInTheDocument();

        for (let i = 1; i < mockBillItems.length; i++) {
            expect(
                screen.getAllByTestId("InvoiceInfoTableCell__columnId")[i + 1]
            ).toHaveTextContent(getBillItemPrefix(mockBillItems[i].bill_item_sequence_number));
            expect(
                screen.getAllByTestId("InvoiceInfoTableCell__columnBilledDate")[i + 1]
            ).toHaveTextContent(formatDate(mockBillItems[i].billing_date, "yyyy/LL/dd"));
            expect(
                screen.getAllByTestId("InvoiceInfoTableCell__columnDiscount")[i + 1]
            ).toHaveTextContent(
                formatDiscountText(
                    mockBillItems[i].discount_amount_type ?? "",
                    mockBillItems[i].discount_amount_value ?? 0
                )
            );
            expect(
                screen.getAllByTestId("InvoiceInfoTableCell__columnTax")[i + 1]
            ).toHaveTextContent(
                mockBillItems[i].tax_percentage
                    ? getTaxPrefix(mockBillItems[i].tax_percentage ?? 0)
                    : "--"
            );
            expect(
                screen.getAllByTestId("InvoiceInfoTableCell__columnAmount")[i + 1]
            ).toHaveTextContent(
                getFormattedItemPrice(
                    InvoiceCurrency.JAPANESE_YEN,
                    false,
                    mockBillItems[i].final_price ?? 0
                )
            );
        }
    });
});
