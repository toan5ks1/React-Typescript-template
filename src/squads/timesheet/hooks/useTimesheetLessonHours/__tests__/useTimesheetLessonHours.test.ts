import { handleUnknownError } from "src/common/utils/error";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import lessonHoursService from "src/squads/timesheet/service/timesheet/lesson-hours-service";
import {
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonHoursByTimesheetIdsQueryVariables,
    Timesheet_LessonListByLessonIdsQuery,
    Timesheet_LessonListByLessonIdsQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";
import {
    mockLessonHours,
    mockLessons,
    mockTimesheetLessonHours,
} from "src/squads/timesheet/test-utils/mocks/lesson";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetLessonHours from "src/squads/timesheet/hooks/useTimesheetLessonHours/useTimesheetLessonHours";

jest.mock("src/squads/timesheet/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/common/utils/error", () => ({
    __esModule: true,
    default: jest.fn(),
    handleUnknownError: jest.fn(),
}));

const mockUseQuery = (isSuccess: boolean) => {
    let ranCallBack = false;
    (inferQuery as jest.Mock).mockImplementation(
        ({
                action,
            }: {
                entity: Parameters<typeof inferQuery>[0]["entity"];
                action: keyof typeof lessonHoursService["query"];
            }) =>
            (
                _params: ListQuery<
                    Timesheet_LessonHoursByTimesheetIdsQueryVariables &
                        Timesheet_LessonListByLessonIdsQueryVariables
                >,
                options: UseQueryBaseOptions<
                    | Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"]
                    | Timesheet_LessonListByLessonIdsQuery["lessons"]
                    | undefined
                >
            ) => {
                if (action === "timesheetLessonHoursGetManyReference") {
                    if (isSuccess) {
                        if (!ranCallBack) {
                            options?.onSuccess?.(mockTimesheetLessonHours);
                            ranCallBack = true;
                        }
                        return { data: mockTimesheetLessonHours, isLoading: false };
                    } else {
                        if (!ranCallBack) {
                            options?.onError?.(Error("Fake query error"));
                            ranCallBack = true;
                        }
                        return { data: [], isLoading: false };
                    }
                } else {
                    if (isSuccess) {
                        if (!ranCallBack) {
                            options?.onSuccess?.(mockLessons);
                            ranCallBack = true;
                        }
                        return { data: mockLessons, isLoading: false };
                    } else {
                        if (!ranCallBack) {
                            options?.onError?.(Error("Fake query error"));
                            ranCallBack = true;
                        }
                        return { data: [], isLoading: false };
                    }
                }
            }
    );
};

describe("useTimesheetLessonHours", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (handleUnknownError as jest.Mock).mockImplementation((err) => ({ message: err.message }));
    });

    it("should query success with correct data", () => {
        const timesheetId = "timesheet_0";
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetLessonHours({ timesheetIds: [timesheetId] }), {
            wrapper: TranslationProvider,
        });

        expect(handleUnknownError).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data).toMatchObject(mockLessonHours);
    });

    it("should query fail", () => {
        mockUseQuery(false);
        const timesheetId = "timesheet_0";

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetLessonHours({ timesheetIds: [timesheetId] }), {
            wrapper: TranslationProvider,
        });

        expect(handleUnknownError).toBeCalledTimes(1);
        expect(showSnackbar).toBeCalledWith(
            "Unable to load data, please try again! Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
