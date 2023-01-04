import { AppError } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useEditEntryExitRecord, {
    EditEntryExitRecordParams,
} from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEditEntryExitRecord";

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
    const mockMutateData: NsStudentEntryExitService.UpdateEntryExitRequest = {
        entryexitId: 1,
    };
    const error = isAppError ? new AppError("editFail") : new Error("Mock edit record error");
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: {
                entity: "studentEntryExit";
                action: keyof typeof studentEntryExitService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsStudentEntryExitService.UpdateEntryExitRequest,
                    NsStudentEntryExitService.UpdateEntryExitResponse
                >
            ) => {
                return {
                    mutate: jest.fn(async () => {
                        isSuccess
                            ? await options?.onSuccess?.(
                                  {
                                      successful: true,
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

describe("useEditEntryExitRecord", () => {
    const mutateFn = jest.fn();
    const mockSuccess = jest.fn();
    const mockOnError = jest.fn();
    const showSnackbarFn = jest.fn();

    const entryDateTime = new Date("2022-03-02T09:00:00.000Z");
    const exitDateTime = new Date("2022-03-02T12:00:00.000Z");
    const studentId = "student01";

    const toEditRecord: EditEntryExitRecordParams = {
        updatedFormData: {
            entryDate: entryDateTime,
            entryTime: entryDateTime,
            exitTime: exitDateTime,
            studentId: studentId,
            notifyParents: true,
        },
        entryExitId: 1,
    };

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    _options?: UseMutationOptions<
                        NsStudentEntryExitService.UpdateEntryExitRequest,
                        NsStudentEntryExitService.UpdateEntryExitResponse
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
        } = renderHook(() => useEditEntryExitRecord());

        act(() => {
            current.editEntryExitRecord(toEditRecord, { onSuccess: mockSuccess });
        });

        expect(mutateFn).toBeCalledWith(
            {
                entryExitPayload: {
                    entryDateTime: entryDateTime,
                    exitDateTime: exitDateTime,
                    notifyParents: true,
                    studentId: studentId,
                },
                entryexitId: 1,
            },
            {
                onSuccess: mockSuccess,
            }
        );
    });

    it("should call onSuccess and show snackbar with editSuccess message", async () => {
        mockInferMutation(true);

        const {
            result: { current },
        } = renderHook(() => useEditEntryExitRecord());

        await act(async () => {
            await current.editEntryExitRecord(toEditRecord, { onSuccess: mockSuccess });
        });

        await waitFor(() => expect(showSnackbarFn).toBeCalledWith("ra.common.editedSuccess"));
    });

    it("should call onError and show snackbar with editedFail message", async () => {
        mockInferMutation(false);

        const {
            result: { current },
        } = renderHook(() => useEditEntryExitRecord());

        await act(async () => {
            await current.editEntryExitRecord(toEditRecord, {
                onSuccess: mockSuccess,
                onError: mockOnError,
            });
        });

        expect(showSnackbarFn).toBeCalledWith(
            "ra.common.editedFail: ra.manabie-error.unknown",
            "error"
        );
    });

    it("should call correct error message if there is app error", async () => {
        mockInferMutation(false, true);

        const {
            result: { current },
        } = renderHook(() => useEditEntryExitRecord());

        current.editEntryExitRecord(toEditRecord, {
            onSuccess: mockSuccess,
            onError: mockOnError,
        });

        expect(showSnackbarFn).toBeCalledWith("ra.manabie-error.editFail", "error");
    });
});
