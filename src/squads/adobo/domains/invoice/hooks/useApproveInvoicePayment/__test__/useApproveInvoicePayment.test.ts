import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockApproveInvoicePaymentPayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/approve-payment";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useApproveInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useApproveInvoicePayment";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe(useApproveInvoicePayment.name, () => {
    const mockApproveInvoicePaymentPayload = getMockApproveInvoicePaymentPayload();

    const mockOnIssueInvoice = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const mockInferMutation = (error?: Error) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "approveInvoicePayment" }) =>
                (
                    options?: UseMutationOptions<
                        NsInvoiceService.ApproveInvoicePaymentRequest,
                        NsInvoiceService.ApproveInvoicePaymentResponse
                    >
                ) => {
                    return {
                        mutate: mockOnIssueInvoice.mockImplementation(async () => {
                            if (!error) {
                                await options?.onSuccess?.(
                                    {
                                        successful: true,
                                    },
                                    mockApproveInvoicePaymentPayload,
                                    undefined
                                );
                            } else {
                                await options?.onError?.(
                                    error,
                                    mockApproveInvoicePaymentPayload,
                                    undefined
                                );
                            }
                        }),
                    };
                }
        );
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbarFn);
    });

    it("should call inferMutation", () => {
        mockInferMutation();

        const {
            result: { current },
        } = renderHook(() => useApproveInvoicePayment(mockApproveInvoicePaymentPayload.invoiceId));

        act(() => {
            current.approveInvoicePayment(mockApproveInvoicePaymentPayload, {
                onSuccess: mockSuccess,
            });
        });

        expect(mockOnIssueInvoice).toBeCalledWith(mockApproveInvoicePaymentPayload, {
            onSuccess: mockSuccess,
        });
    });

    it("should call onSuccess and show snackbar with success message", async () => {
        mockInferMutation();

        const {
            result: { current },
        } = renderHook(() => useApproveInvoicePayment(mockApproveInvoicePaymentPayload.invoiceId));

        await act(async () => {
            await current.approveInvoicePayment(mockApproveInvoicePaymentPayload, {
                onSuccess: mockSuccess,
            });
        });

        await waitFor(() =>
            expect(showSnackbarFn).toBeCalledWith(
                "resources.invoice.messages.approveInvoicePayment.success"
            )
        );
    });

    it("should call onError and show snackbar with error message", async () => {
        mockInferMutation(new Error("Error!"));

        const {
            result: { current },
        } = renderHook(() => useApproveInvoicePayment(mockApproveInvoicePaymentPayload.invoiceId));

        await act(async () => {
            await current.approveInvoicePayment(mockApproveInvoicePaymentPayload, {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "resources.invoice.messages.approveInvoicePayment.failed",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(new AppError("ra.manabie-error.internal.error"));

        const {
            result: { current },
        } = renderHook(() => useApproveInvoicePayment(mockApproveInvoicePaymentPayload.invoiceId));

        current.approveInvoicePayment(mockApproveInvoicePaymentPayload, {
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.internal.error", "error");
    });
});
