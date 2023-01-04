import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import {
    getMockInvoiceDetail,
    getMockVoidInvoiceFormValues,
    getMockVoidInvoicePayload,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    DialogVoidInvoice,
    DialogVoidInvoiceProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import { FormVoidInvoiceValues } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs/DialogVoidInvoice";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useVoidInvoice from "src/squads/adobo/domains/invoice/hooks/useVoidInvoice";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useVoidInvoice", () => ({
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

const mockVoidInvoicePayload = getMockVoidInvoicePayload();
const mockVoidInvoiceFormValues = getMockVoidInvoiceFormValues();

const renderComponent = (
    props: DialogVoidInvoiceProps,
    defaultValues: FormVoidInvoiceValues = mockVoidInvoiceFormValues
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
                    <DialogVoidInvoice {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe(DialogVoidInvoice.name, () => {
    const mockOnVoidInvoice = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    const props: DialogVoidInvoiceProps = {
        open: true,
        onClose: mockOnClose,
        onSave: mockOnSave,
        defaultValues: mockVoidInvoiceFormValues,
    };

    beforeEach(() => {
        (useVoidInvoice as jest.Mock).mockImplementation(() => ({
            voidInvoice: async (
                data: NsInvoiceService.VoidInvoiceRequest,
                options: UseMutationOptions<
                    NsInvoiceService.VoidInvoiceRequest,
                    NsInvoiceService.VoidInvoiceResponse
                >
            ) => {
                await options?.onSuccess?.({ successful: true }, mockVoidInvoicePayload, undefined);
                await mockOnVoidInvoice(data, options);
            },
            isLoading: false,
        }));
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should call void invoice when required form values are met", async () => {
        renderComponent(props);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockOnVoidInvoice).toBeCalledTimes(1);
        });
    });

    it("should call onSave after void invoice is success", async () => {
        const props: DialogVoidInvoiceProps = {
            open: true,
            onSave: mockOnSave,
            onClose: mockOnClose,
            defaultValues: mockVoidInvoiceFormValues,
        };

        renderComponent(props);

        const saveBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockOnSave).toBeCalledTimes(1);
        });
    });

    it("should call the onClose function when cancelling void invoice", async () => {
        renderComponent(props);

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        await waitFor(() => {
            expect(mockOnClose).toBeCalledTimes(1);
        });
    });
});
