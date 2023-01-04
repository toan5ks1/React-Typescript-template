import { FormIssueInvoiceValues } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import {
    getMockInvoiceDetail,
    getMockIssueInvoiceFormValues,
    getMockIssueInvoicePayload,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    DialogIssueInvoice,
    DialogIssueInvoiceProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useIssueInvoice from "src/squads/adobo/domains/invoice/hooks/useIssueInvoice";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useIssueInvoice", () => ({
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

const mockIssueInvoicePayload = getMockIssueInvoicePayload();
const mockIssueInvoiceFormValues = getMockIssueInvoiceFormValues();

const renderComponent = (
    props: DialogIssueInvoiceProps,
    defaultValues: FormIssueInvoiceValues = mockIssueInvoiceFormValues
) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues,
                        mode: "onChange",
                    }}
                >
                    <DialogIssueInvoice {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogIssueInvoice.name, () => {
    const mockOnIssueInvoice = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    const props: DialogIssueInvoiceProps = {
        open: true,
        onSave: mockOnSave,
        onClose: mockOnClose,
        defaultValues: mockIssueInvoiceFormValues,
    };

    beforeEach(() => {
        (useIssueInvoice as jest.Mock).mockImplementation(() => ({
            issueInvoice: async (
                data: NsInvoiceService.IssueInvoiceRequest,
                options: UseMutationOptions<
                    NsInvoiceService.IssueInvoiceRequest,
                    NsInvoiceService.IssueInvoiceResponse
                >
            ) => {
                await options?.onSuccess?.(
                    { successful: true },
                    mockIssueInvoicePayload,
                    undefined
                );
                await mockOnIssueInvoice(data, options);
            },
            isLoading: false,
        }));
    });

    it("should disable save button when required form values are NOT met", async () => {
        const propsWithEmptyFormValues = {
            ...props,
            defaultValues: {
                paymentMethod: "",
                dueDate: new Date(),
                expiryDate: new Date(),
                remarks: "",
            },
        };

        renderComponent(propsWithEmptyFormValues);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        await waitFor(() => {
            expect(saveBtn).toBeDisabled();
        });
    });

    it("should call issue invoice when required form values are met", async () => {
        renderComponent(props);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        await waitFor(() => {
            expect(saveBtn).not.toBeDisabled();
        });

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockOnIssueInvoice).toBeCalledTimes(1);
        });
    });

    it("should call onSave after issue invoice is success", async () => {
        const props: DialogIssueInvoiceProps = {
            open: true,
            onSave: mockOnSave,
            onClose: mockOnClose,
            defaultValues: mockIssueInvoiceFormValues,
        };

        renderComponent(props);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        await waitFor(() => {
            expect(saveBtn).not.toBeDisabled();
        });

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockOnSave).toBeCalledTimes(1);
        });
    });

    it("should call the onClose function when cancelling issue invoice", async () => {
        renderComponent(props);

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        await waitFor(() => {
            expect(mockOnClose).toBeCalledTimes(1);
        });
    });
});
