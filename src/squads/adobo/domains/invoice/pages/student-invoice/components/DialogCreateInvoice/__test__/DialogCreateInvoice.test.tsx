import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { inferQueryPagination } from "src/squads/adobo/domains/invoice/services/infer-service";
import {
    getMockBillItemsData,
    getMockBillItemsPagination,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import DialogCreateInvoice, {
    DialogCreateInvoiceProps,
} from "src/squads/adobo/domains/invoice/pages/student-invoice/components/DialogCreateInvoice";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
}));

const renderComponent = (props: DialogCreateInvoiceProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <DialogCreateInvoice {...props} />
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogCreateInvoice.name, () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnSelect = jest.fn();

    const props: DialogCreateInvoiceProps = {
        open: true,
        onClose: mockOnClose,
        onSave: mockOnSave,
        onSelect: mockOnSelect,
        selectedBillItems: [],
        currency: InvoiceCurrency.JAPANESE_YEN,
        studentId: "student_id_1",
        loading: false,
    };

    const mockBillingItems = getMockBillItemsData();

    beforeEach(() => {
        (inferQueryPagination as jest.Mock).mockImplementation(
            (__: { entity: "billItems"; action: "billItemsGetMany" }) => () => {
                return {
                    result: {
                        isFetching: false,
                    },
                    data: mockBillingItems,
                    pagination: getMockBillItemsPagination(mockBillingItems.length),
                };
            }
        );
    });

    it("should match snapshot", () => {
        renderComponent(props);
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should display the table column names correctly", () => {
        renderComponent(props);
        // TODO: Add location column
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingNo")[0]
        ).toHaveTextContent("createInvoice.columns.billingNo");
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingItem")[0]
        ).toHaveTextContent("createInvoice.columns.billingItem");
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnStatus")[0]
        ).toHaveTextContent("createInvoice.columns.status");
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnBillingDate")[0]
        ).toHaveTextContent("createInvoice.columns.billingDate");
        expect(
            screen.getAllByTestId("StudentBillingItemsTableCell__columnAmount")[0]
        ).toHaveTextContent("createInvoice.columns.amount");
    });

    it("should display the Student Billing Items table", () => {
        renderComponent(props);
        expect(screen.getByTestId("TableWithCheckboxBillingItems__table")).toBeInTheDocument;
    });

    it("should show the Save button disabled if there are no billing items selected", () => {
        renderComponent(props);
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeDisabled();
    });

    it("should call the onSave function when clicking the Save button", async () => {
        props.selectedBillItems = mockBillingItems;
        renderComponent(props);

        const btnSave = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(btnSave).not.toBeDisabled();

        userEvent.click(btnSave);

        await waitFor(() => {
            expect(mockOnSave).toBeCalledTimes(1);
        });
    });

    it("should call the onClose function", () => {
        renderComponent(props);
        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        expect(mockOnClose).toBeCalledTimes(1);
    });
});
