import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockCancelInvoicePaymentPayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/cancel-payment";
import { getMockInvoiceDetail } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    DialogCancelPayment,
    DialogCancelPaymentProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCancelInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useCancelInvoicePayment";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useCancelInvoicePayment", () => ({
    __esModule: true,
    default: jest.fn(),
}));

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

const mockCancelInvoicePaymentPayload = getMockCancelInvoicePaymentPayload();

const renderComponent = (props: DialogCancelPaymentProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider>
                    <DialogCancelPayment {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogCancelPayment.name, () => {
    const mockOnCancelInvoicePayment = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    const props: DialogCancelPaymentProps = {
        open: true,
        onClose: mockOnClose,
        onSave: mockOnSave,
    };

    beforeEach(() => {
        (useCancelInvoicePayment as jest.Mock).mockImplementation(() => ({
            cancelInvoicePayment: async (
                data: NsInvoiceService.CancelInvoicePaymentRequest,
                options: UseMutationOptions<
                    NsInvoiceService.CancelInvoicePaymentRequest,
                    NsInvoiceService.CancelInvoicePaymentResponse
                >
            ) => {
                await options?.onSuccess?.(
                    { successful: true },
                    mockCancelInvoicePaymentPayload,
                    undefined
                );
                await mockOnCancelInvoicePayment(data, options);
            },
            isLoading: false,
        }));

        renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("DialogCancelPayment__root")).toMatchSnapshot();
    });

    it("should call onSave after cancel payment is successful", async () => {
        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(saveBtn);

        // TODO: Change to hook call when grpc endpoint is called
        await waitFor(() => {
            expect(mockOnSave).toBeCalledTimes(1);
        });
    });

    it("should display form", () => {
        expect(screen.getByTestId("RemarksForm__inputInvoiceRemark")).toBeInTheDocument();
    });

    it("should call the onClose function when cancelling cancel payment", async () => {
        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        await waitFor(() => {
            expect(mockOnClose).toBeCalledTimes(1);
        });
    });
});
