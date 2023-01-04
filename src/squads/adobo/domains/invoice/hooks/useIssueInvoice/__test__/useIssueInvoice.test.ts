import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockIssueInvoicePayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useIssueInvoice from "src/squads/adobo/domains/invoice/hooks/useIssueInvoice/useIssueInvoice";
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

describe(useIssueInvoice.name, () => {
    const mockIssueInvoicePayload = getMockIssueInvoicePayload();

    const mockOnIssueInvoice = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const mockInferMutation = (error?: Error) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "issueInvoice" }) =>
                (
                    options?: UseMutationOptions<
                        NsInvoiceService.IssueInvoiceRequest,
                        NsInvoiceService.IssueInvoiceResponse
                    >
                ) => {
                    return {
                        mutate: mockOnIssueInvoice.mockImplementation(async () => {
                            if (!error) {
                                await options?.onSuccess?.(
                                    {
                                        successful: true,
                                    },
                                    mockIssueInvoicePayload,
                                    undefined
                                );
                            } else {
                                await options?.onError?.(error, mockIssueInvoicePayload, undefined);
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
        } = renderHook(() => useIssueInvoice(mockIssueInvoicePayload.invoiceIdString));

        act(() => {
            current.issueInvoice(mockIssueInvoicePayload, { onSuccess: mockSuccess });
        });

        expect(mockOnIssueInvoice).toBeCalledWith(mockIssueInvoicePayload, {
            onSuccess: mockSuccess,
        });
    });

    it("should call onSuccess and show snackbar with createdSuccess message", async () => {
        mockInferMutation();

        const {
            result: { current },
        } = renderHook(() => useIssueInvoice(mockIssueInvoicePayload.invoiceIdString));

        await act(async () => {
            await current.issueInvoice(mockIssueInvoicePayload, { onSuccess: mockSuccess });
        });

        await waitFor(() =>
            expect(showSnackbarFn).toBeCalledWith("resources.invoice.messages.issueInvoice.success")
        );
    });

    it("should call onError and show snackbar with createdFail message", async () => {
        mockInferMutation(new Error("Mock issue invoice error :)"));

        const {
            result: { current },
        } = renderHook(() => useIssueInvoice(mockIssueInvoicePayload.invoiceIdString));

        await act(async () => {
            await current.issueInvoice(mockIssueInvoicePayload, {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "resources.invoice.messages.issueInvoice.failed",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        const errorCode = "mock error";
        const error = new AppError(errorCode);

        mockInferMutation(error);

        const {
            result: { current },
        } = renderHook(() => useIssueInvoice(mockIssueInvoicePayload.invoiceIdString));

        current.issueInvoice(mockIssueInvoicePayload, {
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith(errorCode, "error");
    });
});
