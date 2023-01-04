import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import {
    getMockBillItemsData,
    getMockBillItemsPagination,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import TableWithCheckboxBillingItems, {
    TableWithCheckboxBillingItemsProps,
} from "src/squads/adobo/domains/invoice/pages/student-invoice/components/TableWithCheckboxBillingItems";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { fireEvent, render, screen } from "@testing-library/react";

const renderComponent = (props: TableWithCheckboxBillingItemsProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TableWithCheckboxBillingItems {...props} />
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe("<TableWithCheckboxBillingItems />", () => {
    const mockBillingItems = getMockBillItemsData();
    const mockPagination = getMockBillItemsPagination();
    const mockOnSelect = jest.fn();

    const props: TableWithCheckboxBillingItemsProps = {
        billingItems: mockBillingItems,
        currency: InvoiceCurrency.JAPANESE_YEN,
        isLoading: false,
        pagination: mockPagination,
        onSelect: mockOnSelect,
        selectedBillItems: [],
    };

    beforeEach(() => {
        renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("TableWithCheckboxBillingItems__table")).toMatchSnapshot();
    });

    it("should have the same table content as the mock data", () => {
        for (let i = 1; i < mockBillingItems.length; i++) {
            expect(
                screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingNo")[i + 1]
            ).toHaveTextContent("BI-" + mockBillingItems[i].bill_item_sequence_number.toString());
            expect(
                screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingItem")[i + 1]
            ).toHaveTextContent(mockBillingItems[i].billing_item_description.product_name);
            expect(
                screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingDate")[i + 1]
            ).toHaveTextContent(mockBillingItems[i].billing_date);
            expect(
                screen.getAllByTestId("StudentBillingItemsTableCell__columnAmount")[i + 1]
            ).toHaveTextContent(
                getFormattedItemPrice(
                    InvoiceCurrency.JAPANESE_YEN,
                    false,
                    mockBillingItems[i].final_price
                )
            );
        }

        // Actual words for statuses are displayed on the screen
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnStatus")[1]
        ).toHaveTextContent("Billed");
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnStatus")[2]
        ).toHaveTextContent("Pending");
    });

    it("should call onSelect when a non-header checkbox is clicked on", async () => {
        const firstRowCheckbox = screen.getAllByRole("checkbox")[1];

        fireEvent.click(firstRowCheckbox);

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it("should call onSelect when the header checkbox is clicked", async () => {
        const checkboxHeader = screen
            .getByTestId("TableHeaderWithCheckbox__checkboxHeader")
            .querySelector("input") as HTMLInputElement;

        fireEvent.click(checkboxHeader);

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
});
