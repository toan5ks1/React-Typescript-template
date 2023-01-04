import {
    Timesheet_LocationListByIdsQuery,
    Timesheet_LocationListByIdsQueryVariables,
    Timesheet_StaffListByIdsQuery,
    Timesheet_StaffListByIdsQueryVariables,
} from "src/squads/timesheet/service/bob/bob-types";
import locationsService from "src/squads/timesheet/service/bob/locations-service";
import staffService from "src/squads/timesheet/service/bob/staff-service";
import { inferQuery, inferQueryPagination } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import lessonHoursService from "src/squads/timesheet/service/timesheet/lesson-hours-service";
import otherWorkingHoursService from "src/squads/timesheet/service/timesheet/other-working-hours-service";
import timesheetService, {
    TimesheetListQueryV2Return,
} from "src/squads/timesheet/service/timesheet/timesheet-service";
import {
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonHoursByTimesheetIdsQueryVariables,
    Timesheet_LessonListByLessonIdsQuery,
    Timesheet_LessonListByLessonIdsQueryVariables,
    Timesheet_OtherWorkingHoursListByTimesheetIdsQuery,
    Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";
import {
    mockLessons,
    mockTimesheetLessonHours,
} from "src/squads/timesheet/test-utils/mocks/lesson";
import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { createMockPaginationWithTotalObject } from "src/squads/timesheet/test-utils/mocks/pagination";
import { mockStaffListData } from "src/squads/timesheet/test-utils/mocks/staff";
import {
    mockOtherWorkingHourTotalHourListData,
    mockTimesheetListData,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions, DataWithTotal } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryTimesheetList from "src/squads/timesheet/modules/timesheet-list/hooks/useQueryTimesheetList";

const mockPagination = createMockPaginationWithTotalObject();

jest.mock("src/squads/timesheet/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseQuery = (isSuccess: boolean) => {
    let ranCallBack = false;
    (inferQuery as jest.Mock).mockImplementation(
        ({
                action,
                entity,
            }: {
                entity: Parameters<typeof inferQuery>[0]["entity"];
                action:
                    | keyof typeof locationsService["query"]
                    | keyof typeof staffService["query"]
                    | keyof typeof lessonHoursService["query"]
                    | keyof typeof otherWorkingHoursService["query"];
            }) =>
            (
                params: ListQuery<
                    Timesheet_StaffListByIdsQueryVariables &
                        Timesheet_LocationListByIdsQueryVariables &
                        Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables &
                        Timesheet_LessonHoursByTimesheetIdsQueryVariables &
                        Timesheet_LessonListByLessonIdsQueryVariables
                >,
                options: UseQueryBaseOptions<
                    | Timesheet_StaffListByIdsQuery["users"]
                    | Timesheet_LocationListByIdsQuery["locations"]
                    | Timesheet_OtherWorkingHoursListByTimesheetIdsQuery["other_working_hours"]
                    | Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"]
                    | Timesheet_LessonListByLessonIdsQuery["lessons"]
                    | undefined
                >
            ) => {
                switch (entity) {
                    case "staff": {
                        if (isSuccess) {
                            const returnData = mockStaffListData.filter((item) =>
                                params?.filter?.staff_ids?.includes(item.user_id)
                            );
                            if (!ranCallBack) {
                                options?.onSuccess?.(returnData);
                                ranCallBack = true;
                            }
                            return { data: returnData, isLoading: false };
                        } else {
                            if (!ranCallBack) {
                                options?.onError?.(Error("Fake query error"));
                                ranCallBack = true;
                            }
                            return { data: [], isLoading: false };
                        }
                    }

                    case "otherWorkingHours": {
                        if (isSuccess) {
                            const returnData = mockOtherWorkingHourTotalHourListData.filter(
                                (item) => params?.filter?.timesheet_ids?.includes(item.timesheet_id)
                            );
                            if (!ranCallBack) {
                                options?.onSuccess?.(returnData);
                                ranCallBack = true;
                            }
                            return { data: returnData, isLoading: false };
                        } else {
                            if (!ranCallBack) {
                                options?.onError?.(Error("Fake query error"));
                                ranCallBack = true;
                            }
                            return { data: [], isLoading: false };
                        }
                    }

                    case "lessonHours": {
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

                    default: {
                        if (isSuccess) {
                            const returnData = mockLocationListData.filter((item) =>
                                params?.filter?.location_ids?.includes(item.location_id)
                            );

                            if (!ranCallBack) {
                                options?.onSuccess?.(returnData);
                                ranCallBack = true;
                            }
                            return { data: returnData, isLoading: false };
                        } else {
                            if (!ranCallBack) {
                                options?.onError?.(Error("Fake query error"));
                                ranCallBack = true;
                            }
                            return { data: [], isLoading: false };
                        }
                    }
                }
            }
    );
};

const mockUseQueryPagination = (isSuccess: boolean) => {
    let ranCallBack = false;
    (inferQueryPagination as jest.Mock).mockImplementation(
        (_: {
                entity: Parameters<typeof inferQueryPagination>[0]["entity"];
                action: keyof typeof timesheetService["query"];
            }) =>
            (
                _params: undefined,
                options: UseQueryBaseOptions<DataWithTotal<TimesheetListQueryV2Return | undefined>>
            ) => {
                if (isSuccess) {
                    if (!ranCallBack) {
                        options?.onSuccess?.({
                            data: mockTimesheetListData,
                            total: 10,
                        });
                        ranCallBack = true;
                    }

                    return {
                        result: {
                            isFetching: false,
                        },
                        data: {
                            data: mockTimesheetListData,
                            total: 10,
                        },
                        pagination: mockPagination,
                    };
                } else {
                    if (!ranCallBack) {
                        options?.onError?.(Error("Fake query error"));
                        ranCallBack = true;
                    }
                    return {
                        result: {
                            isFetching: false,
                        },
                        data: {
                            data: [],
                            total: 0,
                        },
                        pagination: {},
                    };
                }
            }
    );
};

describe("useQueryTimesheetList", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockUseQueryPagination(true);
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should query success with correct data as Admin role", () => {
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryTimesheetList(), {
            wrapper: TranslationProvider,
        });

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data[0]).toMatchObject({
            timesheet_id: "timesheet_0",
            timesheet_date: "2021/09/01",
            location_id: "location_0",
            staff_id: "staff_0",
            timesheet_status: "TIMESHEET_STATUS_DRAFT",
            location_name: "Location 0",
            staff_name: "Staff 0",
            staff_email: "staff-0@manabie.com",
            total_hour: mockOtherWorkingHourTotalHourListData
                .filter((item) => item.timesheet_id === "timesheet_0")
                .map((item) => item.total_hour)
                .reduce((prev, current) => prev + current, 0),
            number_of_lessons: 1,
            total_lesson_hours: 120,
        });
    });

    it("should query success with correct data as Staff role", () => {
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryTimesheetList("staff_0"), {
            wrapper: TranslationProvider,
        });

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data[0]).toMatchObject({
            timesheet_id: "timesheet_0",
            timesheet_date: "2021/09/01",
            location_id: "location_0",
            staff_id: "staff_0",
            location_name: "Location 0",
            total_hour: mockOtherWorkingHourTotalHourListData
                .filter((item) => item.timesheet_id === "timesheet_0")
                .map((item) => item.total_hour)
                .reduce((prev, current) => prev + current, 0),
            number_of_lessons: 1,
            total_lesson_hours: 120,
        });
    });

    it("should query fail", () => {
        mockUseQueryPagination(false);
        mockUseQuery(false);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryTimesheetList());

        expect(warn).toBeCalledWith("fetch timesheet list error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "resources.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
