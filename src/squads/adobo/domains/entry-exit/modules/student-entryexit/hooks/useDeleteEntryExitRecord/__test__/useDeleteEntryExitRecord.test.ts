import { AppError } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useDeleteEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useDeleteEntryExitRecord";

jest.mock("src/squads/adobo/domains/entry-exit/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockInferMutation = (isSuccess: boolean, isAppError?: boolean) => {
    const mockMutateData: NsStudentEntryExitService.DeleteEntryExitRequest = {
        entryexitId: 1,
        studentId: "user_id_1",
    };
    const error = isAppError ? new AppError("deleteFail") : new Error("Mock delete record error");
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: {
                entity: "studentEntryExit";
                action: keyof typeof studentEntryExitService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsStudentEntryExitService.DeleteEntryExitRequest,
                    NsStudentEntryExitService.DeleteEntryExitResponse
                >
            ) => {
                return {
                    mutate: jest.fn(async () => {
                        isSuccess
                            ? await options?.onSuccess?.(
                                  {
                                      successful: true,
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

describe("useDeleteEntryExitRecord", () => {
    const mutateFn = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const toDeleteRecord: NsStudentEntryExitService.DeleteEntryExitRequest = {
        entryexitId: 1,
        studentId: "student01",
    };

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    _options?: UseMutationOptions<
                        NsStudentEntryExitService.DeleteEntryExitRequest,
                        NsStudentEntryExitService.DeleteEntryExitRequest
                    >
                ) => {
                    return {
                        mutate: mutateFn,
                    };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbarFn);
    });

    it("should call inferMutation", async () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteEntryExitRecord());

        await act(async () => {
            await current.deleteEntryExitRecord(toDeleteRecord, { onSuccess: mockSuccess });
        });

        await waitFor(() => {
            expect(mutateFn).toBeCalledWith(
                {
                    entryexitId: 1,
                    studentId: "student01",
                },
                {
                    onSuccess: expect.any(Function),
                }
            );
        });
    });

    it("should call onSuccess and show snackbar with deleteSuccess message", async () => {
        mockInferMutation(true);

        const {
            result: { current },
        } = renderHook(() => useDeleteEntryExitRecord());

        await act(async () => {
            await current.deleteEntryExitRecord(toDeleteRecord, { onSuccess: mockSuccess });
        });

        await waitFor(() => expect(showSnackbarFn).toBeCalledWith("ra.common.deleteSuccess"));
    });

    it("should call onError and show snackbar with deleteFail message", async () => {
        mockInferMutation(false);

        const {
            result: { current },
        } = renderHook(() => useDeleteEntryExitRecord());

        current.deleteEntryExitRecord(toDeleteRecord, {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith(
            "ra.common.deleteFail: ra.manabie-error.unknown",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(false, true);

        const {
            result: { current },
        } = renderHook(() => useDeleteEntryExitRecord());

        current.deleteEntryExitRecord(toDeleteRecord, {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.deleteFail", "error");
    });
});
