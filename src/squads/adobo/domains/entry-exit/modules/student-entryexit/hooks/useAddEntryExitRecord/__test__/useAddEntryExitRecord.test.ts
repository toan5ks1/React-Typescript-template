import { AppError } from "src/internals/errors";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useAddEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useAddEntryExitRecord";

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
    const mockMutateData: NsStudentEntryExitService.CreateEntryExitRequest = {
        studentId: "student01",
        notifyParents: true,
    };
    const error = isAppError ? new AppError("addFail") : new Error("Mock add record error");
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: {
                entity: "studentEntryExit";
                action: keyof typeof studentEntryExitService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsStudentEntryExitService.CreateEntryExitRequest,
                    NsStudentEntryExitService.CreateEntryExitResponse
                >
            ) => {
                return {
                    mutate: jest.fn(async () => {
                        isSuccess
                            ? await options?.onSuccess?.(
                                  {
                                      successful: true,
                                      message: "",
                                      parentNotified: true,
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

describe("useAddEntryExitRecord", () => {
    const mutateFn = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const entryDateTime = new Date("2022-03-02T09:00:00.000Z");
    const exitDateTime = new Date("2022-03-02T12:00:00.000Z");
    const studentId = "student01";

    const toAddRecord: EntryExitRecordFormData = {
        entryDate: entryDateTime,
        entryTime: entryDateTime,
        exitTime: exitDateTime,
        studentId: "student01",
        notifyParents: true,
    };

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    _options?: UseMutationOptions<
                        NsStudentEntryExitService.CreateEntryExitRequest,
                        NsStudentEntryExitService.CreateEntryExitResponse
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
        } = renderHook(() => useAddEntryExitRecord());

        act(() => {
            current.addEntryExitRecord(toAddRecord, { onSuccess: mockSuccess });
        });

        expect(mutateFn).toBeCalledWith(
            {
                entryExitPayload: {
                    entryDateTime: entryDateTime,
                    exitDateTime: exitDateTime,
                    notifyParents: true,
                    studentId: studentId,
                },
                entryDateTime: entryDateTime,
                exitDateTime: exitDateTime,
                notifyParents: true,
                studentId: studentId,
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
        } = renderHook(() => useAddEntryExitRecord());

        await act(async () => {
            await current.addEntryExitRecord(toAddRecord, { onSuccess: mockSuccess });
        });

        await waitFor(() => expect(showSnackbarFn).toBeCalledWith("ra.common.createdSuccess"));
    });

    it("should call onError and show snackbar with createdFail message", async () => {
        mockInferMutation(false);

        const {
            result: { current },
        } = renderHook(() => useAddEntryExitRecord());

        await act(async () => {
            await current.addEntryExitRecord(toAddRecord, {
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
        } = renderHook(() => useAddEntryExitRecord());

        current.addEntryExitRecord(toAddRecord, {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.addFail", "error");
    });
});
