import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import {
    getMockErrorsListInvoiceCreation,
    getMockInvoicePayload,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { mockWarner } from "src/squads/adobo/domains/invoice/test-utils/warner";

import useGenerateInvoices from "../useGenerateInvoices";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
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

const studentId = "student_id_1";

const mockMutateData: NsInvoiceService.GenerateInvoicesRequest = {
    invoicesList: [],
};

const mockInferMutation = (isSuccess: boolean, isAppError?: boolean) => {
    const error = isAppError
        ? new AppError("ra.manabie-error.addFail")
        : new Error("Mock add record error");
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: { entity: "invoice"; action: "CREATE" }) =>
            (
                options?: UseMutationOptions<
                    NsInvoiceService.GenerateInvoicesRequest,
                    NsInvoiceService.GenerateInvoicesResponse
                >
            ) => {
                return {
                    mutate: jest.fn(async () => {
                        isSuccess
                            ? await options?.onSuccess?.(
                                  {
                                      successful: true,
                                      errorsList: [],
                                  },
                                  mockMutateData,
                                  undefined
                              )
                            : await options?.onError?.(error, mockMutateData, undefined);
                    }),
                };
            }
    );
};

describe("useGenerateInvoices", () => {
    const mutateFn = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const std = mockWarner();

    const toGenerateInvoice: NsInvoiceService.GenerateInvoiceDetail =
        getMockInvoicePayload(studentId);

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "CREATE" }) =>
                (
                    _options?: UseMutationOptions<
                        NsInvoiceService.GenerateInvoicesRequest,
                        NsInvoiceService.GenerateInvoicesResponse
                    >
                ) => {
                    return {
                        mutate: mutateFn,
                    };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbarFn);
    });

    it("should call inferMutation", () => {
        const {
            result: { current },
        } = renderHook(() => useGenerateInvoices());

        act(() => {
            current.generateInvoices([toGenerateInvoice], { onSuccess: mockSuccess });
        });

        expect(mutateFn).toBeCalledWith(
            {
                invoicesList: [toGenerateInvoice],
            },
            {
                onSuccess: mockSuccess,
            }
        );
    });

    it("should call onSuccess and show snackbar with createdSuccess message", async () => {
        mockInferMutation(true);

        const {
            result: { current },
        } = renderHook(() => useGenerateInvoices());

        await act(async () => {
            await current.generateInvoices([toGenerateInvoice], { onSuccess: mockSuccess });
        });

        await waitFor(() => expect(showSnackbarFn).toBeCalledWith("ra.common.createdSuccess"));
    });

    it("should call onError and show snackbar with createdFail message", async () => {
        mockInferMutation(false);

        const {
            result: { current },
        } = renderHook(() => useGenerateInvoices());

        await act(async () => {
            await current.generateInvoices([toGenerateInvoice], {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "ra.common.createdFail: ra.manabie-error.unknown",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(false, true);

        const {
            result: { current },
        } = renderHook(() => useGenerateInvoices());

        current.generateInvoices([toGenerateInvoice], {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.addFail", "error");
    });

    it("should call error snackbar when response has errorsList", async () => {
        const mockErrorsListInvoiceCreation = getMockErrorsListInvoiceCreation();

        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "invoice"; action: "CREATE" }) =>
                (
                    options?: UseMutationOptions<
                        NsInvoiceService.GenerateInvoicesRequest,
                        NsInvoiceService.GenerateInvoicesResponse
                    >
                ) => {
                    return {
                        mutate: jest.fn(async () => {
                            await options?.onSuccess?.(
                                {
                                    successful: false,
                                    errorsList: mockErrorsListInvoiceCreation,
                                },
                                mockMutateData,
                                undefined
                            );
                        }),
                    };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useGenerateInvoices());

        current.generateInvoices([toGenerateInvoice], {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith(
            "ra.common.createdFail: ra.manabie-error.unknown",
            "error"
        );

        expect(std.warn).toBeCalledTimes(mockErrorsListInvoiceCreation.length);
        mockErrorsListInvoiceCreation.forEach((e) => {
            expect(std.warn).toBeCalledWith(e.error);
        });
    });
});
