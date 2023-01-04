import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockCancelInvoicePaymentPayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/cancel-payment";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useCancelInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useCancelInvoicePayment";
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

describe(useCancelInvoicePayment.name, () => {
    const mockCancelInvoicePaymentPayload = getMockCancelInvoicePaymentPayload();

    const mockOnIssueInvoice = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const mockInferMutation = (error?: Error) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "cancelInvoicePayment" }) =>
                (
                    options?: UseMutationOptions<
                        NsInvoiceService.CancelInvoicePaymentRequest,
                        NsInvoiceService.CancelInvoicePaymentResponse
                    >
                ) => {
                    return {
                        mutate: mockOnIssueInvoice.mockImplementation(async () => {
                            if (!error) {
                                await options?.onSuccess?.(
                                    {
                                        successful: true,
                                    },
                                    mockCancelInvoicePaymentPayload,
                                    undefined
                                );
                            } else {
                                await options?.onError?.(
                                    error,
                                    mockCancelInvoicePaymentPayload,
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
        } = renderHook(() => useCancelInvoicePayment(mockCancelInvoicePaymentPayload.invoiceId));

        act(() => {
            current.cancelInvoicePayment(mockCancelInvoicePaymentPayload, {
                onSuccess: mockSuccess,
            });
        });

        expect(mockOnIssueInvoice).toBeCalledWith(mockCancelInvoicePaymentPayload, {
            onSuccess: mockSuccess,
        });
    });

    it("should call onSuccess and show snackbar with success message", async () => {
        mockInferMutation();

        const {
            result: { current },
        } = renderHook(() => useCancelInvoicePayment(mockCancelInvoicePaymentPayload.invoiceId));

        await act(async () => {
            await current.cancelInvoicePayment(mockCancelInvoicePaymentPayload, {
                onSuccess: mockSuccess,
            });
        });

        await waitFor(() =>
            expect(showSnackbarFn).toBeCalledWith(
                "resources.invoice.messages.cancelInvoicePayment.success"
            )
        );
    });

    it("should call onError and show snackbar with error message", async () => {
        mockInferMutation(new Error("Error!"));

        const {
            result: { current },
        } = renderHook(() => useCancelInvoicePayment(mockCancelInvoicePaymentPayload.invoiceId));

        await act(async () => {
            await current.cancelInvoicePayment(mockCancelInvoicePaymentPayload, {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "resources.invoice.messages.cancelInvoicePayment.failed",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(new AppError("ra.manabie-error.internal.error"));

        const {
            result: { current },
        } = renderHook(() => useCancelInvoicePayment(mockCancelInvoicePaymentPayload.invoiceId));

        current.cancelInvoicePayment(mockCancelInvoicePaymentPayload, {
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.internal.error", "error");
    });
});
