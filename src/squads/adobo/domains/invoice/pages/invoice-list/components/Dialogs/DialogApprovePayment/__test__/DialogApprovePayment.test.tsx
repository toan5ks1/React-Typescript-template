import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import {
    getMockApproveInvoicePaymentInvoiceFormValues,
    getMockApproveInvoicePaymentPayload,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/approve-payment";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    DialogApprovePayment,
    DialogApprovePaymentProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useApproveInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useApproveInvoicePayment";

const mockApproveInvoicePaymentPayload = getMockApproveInvoicePaymentPayload();
const mockApproveInvoicePaymentFormValues = getMockApproveInvoicePaymentInvoiceFormValues();

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useApproveInvoicePayment", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: mockApproveInvoicePaymentPayload.invoiceId,
        }),
    };
});

const renderComponent = (props: DialogApprovePaymentProps) => {
    const { defaultValues } = props;
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues,
                        mode: "onChange",
                    }}
                >
                    <DialogApprovePayment {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogApprovePayment.name, () => {
    const mockOnApproveInvoicePayment = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    const props: DialogApprovePaymentProps = {
        open: true,
        onClose: mockOnClose,
        onSave: mockOnSave,
        defaultValues: {
            paymentDate: "",
            remarks: "",
        },
    };

    beforeEach(() => {
        (useApproveInvoicePayment as jest.Mock).mockImplementation(() => ({
            approveInvoicePayment: async (
                data: NsInvoiceService.ApproveInvoicePaymentRequest,
                options: UseMutationOptions<
                    NsInvoiceService.ApproveInvoicePaymentRequest,
                    NsInvoiceService.ApproveInvoicePaymentResponse
                >
            ) => {
                await options?.onSuccess?.(
                    { successful: true },
                    mockApproveInvoicePaymentPayload,
                    undefined
                );
                await mockOnApproveInvoicePayment(data, options);
            },
            isLoading: false,
        }));
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should display form", async () => {
        renderComponent(props);
        await waitFor(() => {
            expect(screen.getByTestId("FormApprovePayment__inputPaymentDate")).toBeInTheDocument();
        });
        expect(screen.getByTestId("FormApprovePayment__inputRemark")).toBeInTheDocument();
    });

    it("should click Save button", async () => {
        const newProps: DialogApprovePaymentProps = {
            ...props,
            defaultValues: mockApproveInvoicePaymentFormValues,
        };

        renderComponent(newProps);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        await waitFor(() => {
            expect(saveBtn).not.toBeDisabled();
        });

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockOnSave).toBeCalledTimes(1);
        });
    });

    it("should call the onClose function", async () => {
        renderComponent(props);
        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        await waitFor(() => {
            expect(mockOnClose).toBeCalledTimes(1);
        });
    });
});
