import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockVoidInvoicePayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";
import useVoidInvoice from "src/squads/adobo/domains/invoice/hooks/useVoidInvoice";

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

describe(useVoidInvoice.name, () => {
    const mockVoidInvoicePayload = getMockVoidInvoicePayload();

    const mockOnVoidInvoice = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const mockInferMutation = (error?: Error) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "voidInvoice" }) =>
                (
                    options?: UseMutationOptions<
                        NsInvoiceService.VoidInvoiceRequest,
                        NsInvoiceService.VoidInvoiceResponse
                    >
                ) => {
                    return {
                        mutate: mockOnVoidInvoice.mockImplementation(async () => {
                            if (!error) {
                                await options?.onSuccess?.(
                                    {
                                        successful: true,
                                    },
                                    mockVoidInvoicePayload,
                                    undefined
                                );
                            } else {
                                await options?.onError?.(error, mockVoidInvoicePayload, undefined);
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
        } = renderHook(() => useVoidInvoice(mockVoidInvoicePayload.invoiceId));

        act(() => {
            current.voidInvoice(mockVoidInvoicePayload, { onSuccess: mockSuccess });
        });

        expect(mockOnVoidInvoice).toBeCalledWith(mockVoidInvoicePayload, {
            onSuccess: mockSuccess,
        });
    });

    it("should call onSuccess and show snackbar with updatedSuccess message", async () => {
        mockInferMutation();

        const {
            result: { current },
        } = renderHook(() => useVoidInvoice(mockVoidInvoicePayload.invoiceId));

        await act(async () => {
            await current.voidInvoice(mockVoidInvoicePayload, { onSuccess: mockSuccess });
        });

        await waitFor(() => expect(showSnackbarFn).toBeCalledWith("ra.common.updatedSuccess"));
    });

    it("should call onError and show snackbar with updatedFail message", async () => {
        mockInferMutation(new Error("Mock void invoice error :)"));

        const {
            result: { current },
        } = renderHook(() => useVoidInvoice(mockVoidInvoicePayload.invoiceId));

        await act(async () => {
            await current.voidInvoice(mockVoidInvoicePayload, {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "ra.common.updatedFail: ra.manabie-error.unknown",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(new AppError("ra.manabie-error.updatedFail"));

        const {
            result: { current },
        } = renderHook(() => useVoidInvoice(mockVoidInvoicePayload.invoiceId));

        current.voidInvoice(mockVoidInvoicePayload, {
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.updatedFail", "error");
    });
});
