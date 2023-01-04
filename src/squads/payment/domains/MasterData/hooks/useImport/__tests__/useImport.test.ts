import { useDispatch } from "react-redux";
import { OrderManagementCategory } from "src/squads/payment/constants/master";
import inferMutation from "src/squads/payment/service/infer-mutation";
import { masterImportPaymentService } from "src/squads/payment/service/payment/master-import-payment-service/master-import-payment-service";
import { NsPaymentMasterImportService } from "src/squads/payment/service/payment/master-import-payment-service/types";
import { ActionTypes, NsAction } from "src/squads/payment/stores/master/types";
import { createMockFiles } from "src/squads/payment/test-utils/mocks/file";
import { createMockMasterImportPayload } from "src/squads/payment/test-utils/mocks/master";

import { UseMutationOptions } from "@manabie-com/react-utils";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useImport from "src/squads/payment/domains/MasterData/hooks/useImport";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/hooks/useResourceTranslate");
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/payment/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));

const mockFiles: File[] = createMockFiles(2);
const mockMasterImportPayload = createMockMasterImportPayload();

const fakeMutateAsync = jest.fn();
const fakeShowSnackbar = jest.fn();
const dispatchFunction = jest.fn();

const mockInferMutationSuccess = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "masterImportPayment";
                action: keyof typeof masterImportPaymentService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsPaymentMasterImportService.ImportMasterRequest,
                    NsPaymentMasterImportService.ImportMasterResponse
                >
            ) => {
                switch (resource.action) {
                    case "paymentImportMasterData":
                        return {
                            mutateAsync: async () => {
                                await options?.onSuccess?.(
                                    { errorsList: [] },
                                    {
                                        payload: {
                                            category: OrderManagementCategory.AccountingCategory,
                                            file: mockFiles[0],
                                        },
                                    },
                                    undefined
                                );
                            },
                            isLoading: false,
                        };
                    default:
                        break;
                }

                return { mutateAsync: fakeMutateAsync };
            }
    );
};

const mockInferMutationError = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "masterImportPayment";
                action: keyof typeof masterImportPaymentService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsPaymentMasterImportService.ImportMasterRequest,
                    NsPaymentMasterImportService.ImportMasterResponse
                >
            ) => {
                switch (resource.action) {
                    case "paymentImportMasterData":
                        return {
                            mutateAsync: async () => {
                                await options?.onError?.(
                                    Error("Error Import Master"),
                                    {
                                        payload: {
                                            category: OrderManagementCategory.AccountingCategory,
                                            file: mockFiles[0],
                                        },
                                    },
                                    undefined
                                );
                            },
                        };
                    default:
                        break;
                }

                return { mutateAsync: fakeMutateAsync };
            }
    );
};

describe("master-import > useImport", () => {
    beforeEach(() => {
        (useDispatch as jest.Mock).mockImplementation(() => dispatchFunction);
    });

    it("should call the onSuccess callbacks", async () => {
        mockInferMutationSuccess();
        (useShowSnackbar as jest.Mock).mockImplementation(() => fakeShowSnackbar);

        const { result } = renderHook(() => useImport());

        await result.current.onImportFile(
            mockMasterImportPayload.file,
            mockMasterImportPayload.category
        );

        expect(fakeShowSnackbar).toHaveBeenCalledWith("message.importedSuccess");
    });

    it("should call the onSuccess callbacks with Error in response", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (resource: {
                    entity: "masterImportPayment";
                    action: keyof typeof masterImportPaymentService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        NsPaymentMasterImportService.ImportMasterRequest,
                        NsPaymentMasterImportService.ImportMasterResponse
                    >
                ) => {
                    switch (resource.action) {
                        case "paymentImportMasterData":
                            return {
                                mutateAsync: async () => {
                                    await options?.onSuccess?.(
                                        { errorsList: [{ error: "error", rowNumber: 1 }] },
                                        {
                                            payload: {
                                                category:
                                                    OrderManagementCategory.AccountingCategory,
                                                file: mockFiles[0],
                                            },
                                        },
                                        undefined
                                    );
                                },
                                isLoading: false,
                            };
                        default:
                            break;
                    }

                    return { mutateAsync: fakeMutateAsync };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => fakeShowSnackbar);

        const { result } = renderHook(() => useImport());

        await result.current.onImportFile(
            mockMasterImportPayload.file,
            mockMasterImportPayload.category
        );

        expect(fakeShowSnackbar).toHaveBeenCalledWith("message.importedFailure", "error");
    });

    it("should call the onError callbacks", async () => {
        mockInferMutationError();
        (useShowSnackbar as jest.Mock).mockImplementation(() => fakeShowSnackbar);

        const { result } = renderHook(() => useImport());

        await result.current.onImportFile(
            mockMasterImportPayload.file,
            mockMasterImportPayload.category
        );

        expect(fakeShowSnackbar).toHaveBeenCalledWith("Error Import Master", "error");
    });

    it("should import a file correct", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: fakeMutateAsync,
        }));

        const { result } = renderHook(() => useImport());

        await result.current.onImportFile(
            mockMasterImportPayload.file,
            mockMasterImportPayload.category
        );

        expect(dispatchFunction).toHaveBeenCalledWith({
            type: ActionTypes.IMPORT_MASTER,
            payload: {
                file: mockMasterImportPayload.file,
                isImporting: true,
            },
        } as NsAction.ImportMaster);

        await waitFor(() => {
            expect(fakeMutateAsync).toHaveBeenCalledWith({
                payload: {
                    file: mockMasterImportPayload.file,
                    category: mockMasterImportPayload.category,
                },
            });
        });

        expect(dispatchFunction).toHaveBeenCalledWith({
            type: ActionTypes.IMPORT_MASTER,
            payload: {
                file: mockFiles[0],
                isImporting: false,
            },
        } as NsAction.ImportMaster);
    });

    it("should import files correct", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: fakeMutateAsync,
        }));
        (useDispatch as jest.Mock).mockImplementation(() => dispatchFunction);

        const { result } = renderHook(() => useImport());

        await result.current.onImportFiles(mockFiles, mockMasterImportPayload.category);

        expect(fakeMutateAsync).toHaveBeenCalledTimes(mockFiles.length);
    });
});
