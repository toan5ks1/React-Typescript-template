import { getMockInvoiceDetail } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    DialogScheduledInvoiceHistory,
    DialogScheduledInvoiceHistoryProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

const mockInvoice = getMockInvoiceDetail();

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: mockInvoice.invoice_id,
        }),
    };
});

const renderComponent = (props: DialogScheduledInvoiceHistoryProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <DialogScheduledInvoiceHistory {...props} />
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogScheduledInvoiceHistory.name, () => {
    const mockOnClose = jest.fn();

    const props: DialogScheduledInvoiceHistoryProps = {
        open: true,
        onClose: mockOnClose,
    };

    beforeEach(() => {
        renderComponent(props);
    });

    it("should call the onClose function when clicking the Close button", async () => {
        // Close uses the data-testid of Save
        const button = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(button);

        await waitFor(() => {
            expect(mockOnClose).toBeCalledTimes(1);
        });
    });
});
