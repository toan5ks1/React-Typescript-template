import { ModeOpenDialog } from "src/common/constants/enum";
import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { inferMutation } from "src/squads/timesheet/service/infer-service";
import timesheetService from "src/squads/timesheet/service/timesheet/timesheet-service";
import { NsTimesheetTimesheetService } from "src/squads/timesheet/service/timesheet/timesheet-service/types";
import {
    mockTimesheetUpsertInfoForm,
    mockUpdateTimesheetResponse,
    mockCreateTimesheetResponse,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import useTimesheetUpsert from "..";

import { UseMutationOptions } from "@manabie-com/react-utils";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/timesheet/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

const showSnackbar = jest.fn();

describe("useTimesheetUpsert create mode", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return correct data", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));
        const { result } = renderHook(() => useTimesheetUpsert({ mode: ModeOpenDialog.ADD }), {
            wrapper: TestCommonAppProvider,
        });

        const resp = await result.current.createTimesheet(
            {
                formData: mockTimesheetUpsertInfoForm,
            },
            {}
        );

        expect(resp).toBeUndefined();
        expect(typeof result.current.createTimesheet).toBe("function");
    });

    it("should return correct onSuccess when created timesheet successfully", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "timesheet";
                    action: keyof typeof timesheetService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        { data: UpsertTimesheetFormProps },
                        NsTimesheetTimesheetService.CreateTimesheetResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(
                                mockCreateTimesheetResponse,
                                {
                                    data: mockTimesheetUpsertInfoForm,
                                },
                                undefined
                            );
                        }),
                    };
                }
        );

        const { result } = renderHook(() => useTimesheetUpsert({ mode: ModeOpenDialog.ADD }), {
            wrapper: TestCommonAppProvider,
        });

        await act(async () => {
            await result.current.createTimesheet(
                {
                    formData: mockTimesheetUpsertInfoForm,
                },
                {}
            );
        });
        expect(showSnackbar).toBeCalledWith("You have created the timesheet successfully!");
    });

    it("should show error snackbar when create timesheet fails due to already existing timesheet for selected date", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest
                .fn()
                .mockRejectedValue(
                    new Error("Timesheet for the date selected is already created.")
                ),
        }));

        const { result } = renderHook(() => useTimesheetUpsert({ mode: ModeOpenDialog.ADD }), {
            wrapper: TestCommonAppProvider,
        });

        await act(() =>
            result.current.createTimesheet(
                {
                    formData: mockTimesheetUpsertInfoForm,
                },
                {}
            )
        );

        expect(showSnackbar).toBeCalledWith(
            "Timesheet for the date selected is already created.",
            "error"
        );
    });
});

describe("useTimesheetUpsert edit mode", () => {
    beforeEach(() => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));
    });

    it("should return correct data", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));
        const { result } = renderHook(() => useTimesheetUpsert({ mode: ModeOpenDialog.EDIT }), {
            wrapper: TestCommonAppProvider,
        });

        const resp = await result.current.createTimesheet(
            {
                formData: mockTimesheetUpsertInfoForm,
            },
            {}
        );

        expect(resp).toBeUndefined();
        expect(typeof result.current.updateTimesheet).toBe("function");
    });

    it("should return correct onSuccess when updated timesheet successfully", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "timesheet";
                    action: keyof typeof timesheetService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        { data: UpsertTimesheetFormProps },
                        NsTimesheetTimesheetService.UpdateTimesheetResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(
                                mockUpdateTimesheetResponse,
                                {
                                    data: mockTimesheetUpsertInfoForm,
                                },
                                undefined
                            );
                        }),
                    };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useTimesheetUpsert({ mode: ModeOpenDialog.EDIT }), {
            wrapper: TestCommonAppProvider,
        });

        await act(async () => {
            await result.current.updateTimesheet(
                {
                    formData: mockTimesheetUpsertInfoForm,
                },
                {}
            );
        });
        expect(showSnackbar).toBeCalledWith("You have edited the timesheet successfully!");
    });
});
