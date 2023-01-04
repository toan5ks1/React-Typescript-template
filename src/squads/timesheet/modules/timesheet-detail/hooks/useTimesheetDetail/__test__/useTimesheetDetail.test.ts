import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import {
    Timesheet_StaffOneQueryVariables,
    Timesheet_LocationOneQueryVariables,
    Timesheet_LocationOneQuery,
    Timesheet_StaffOneQuery,
} from "src/squads/timesheet/service/bob/bob-types";
import locationsService from "src/squads/timesheet/service/bob/locations-service";
import staffService from "src/squads/timesheet/service/bob/staff-service";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import lessonHoursService from "src/squads/timesheet/service/timesheet/lesson-hours-service";
import otherWorkingHoursService from "src/squads/timesheet/service/timesheet/other-working-hours-service";
import timesheetConfigService from "src/squads/timesheet/service/timesheet/timesheet-config-service";
import timesheetService from "src/squads/timesheet/service/timesheet/timesheet-service";
import {
    Timesheet_TimesheetOneQueryVariables,
    Timesheet_TimesheetOneQuery,
    Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables,
    Timesheet_TimesheetConfigListByKeyQueryVariables,
    Timesheet_OtherWorkingHoursByTimesheetIdQuery,
    Timesheet_TimesheetConfigListByKeyQuery,
    Timesheet_LessonHoursByTimesheetIdsQueryVariables,
    Timesheet_LessonListByLessonIdsQueryVariables,
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonListByLessonIdsQuery,
} from "src/squads/timesheet/service/timesheet/timesheet-types";
import {
    mockLessons,
    mockTimesheetLessonHours,
} from "src/squads/timesheet/test-utils/mocks/lesson";
import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { mockStaffListData } from "src/squads/timesheet/test-utils/mocks/staff";
import {
    createMockOtherWorkingHourListData,
    createMockTimesheetConfigListData,
    mockTimesheetListData,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { getFakeLocalUser } from "src/squads/timesheet/test-utils/mocks/user";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetDetail from "src/squads/timesheet/modules/timesheet-detail/hooks/useTimesheetDetail";

const mockUserProfile = getFakeLocalUser();

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
                entity,
                action,
            }: {
                entity: Parameters<typeof inferQuery>[0]["entity"];
                action:
                    | keyof typeof locationsService["query"]
                    | keyof typeof staffService["query"]
                    | keyof typeof otherWorkingHoursService["query"]
                    | keyof typeof timesheetConfigService["query"]
                    | keyof typeof lessonHoursService["query"]
                    | keyof typeof timesheetService["query"];
            }) =>
            (
                params: ListQuery<
                    Timesheet_StaffOneQueryVariables &
                        Timesheet_LocationOneQueryVariables &
                        Timesheet_TimesheetOneQueryVariables &
                        Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables &
                        Timesheet_TimesheetConfigListByKeyQueryVariables &
                        Timesheet_LessonHoursByTimesheetIdsQueryVariables &
                        Timesheet_LessonListByLessonIdsQueryVariables
                >,
                options: UseQueryBaseOptions<
                    | ArrayElement<Timesheet_LocationOneQuery["locations"]>
                    | ArrayElement<Timesheet_TimesheetOneQuery["timesheet"]>
                    | ArrayElement<Timesheet_StaffOneQuery["users"]>
                    | Timesheet_OtherWorkingHoursByTimesheetIdQuery["other_working_hours"]
                    | Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"]
                    | Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"]
                    | Timesheet_LessonListByLessonIdsQuery["lessons"]
                    | undefined
                >
            ) => {
                switch (entity) {
                    case "staff":
                        {
                            if (action === "timesheetGetStaffById") {
                                if (isSuccess) {
                                    const staff = mockStaffListData.find(
                                        (item) => item.user_id === params.filter?.staff_id
                                    );

                                    if (!ranCallBack) {
                                        options?.onSuccess?.(staff);
                                        ranCallBack = true;
                                    }
                                    return { data: staff, isLoading: false };
                                } else {
                                    if (!ranCallBack) {
                                        options?.onError?.(Error("Fake query error"));
                                        ranCallBack = true;
                                    }
                                    return { data: undefined, isLoading: false };
                                }
                            }
                        }
                        break;

                    case "location":
                        {
                            if (action === "timesheetGetLocationById") {
                                if (isSuccess) {
                                    const location = mockLocationListData.find(
                                        (item) => item.location_id === params.filter?.location_id
                                    );

                                    if (!ranCallBack) {
                                        options?.onSuccess?.(location);
                                        ranCallBack = true;
                                    }
                                    return { data: location, isLoading: false };
                                } else {
                                    if (!ranCallBack) {
                                        options?.onError?.(Error("Fake query error"));
                                        ranCallBack = true;
                                    }
                                    return { data: undefined, isLoading: false };
                                }
                            }
                        }
                        break;

                    case "otherWorkingHours":
                        {
                            if (action === "timesheetOtherWorkingHoursGetManyReference") {
                                if (isSuccess) {
                                    const otherWorkingHourListData =
                                        createMockOtherWorkingHourListData(
                                            params.filter?.timesheet_id!
                                        );
                                    if (!ranCallBack) {
                                        options?.onSuccess?.(otherWorkingHourListData);
                                        ranCallBack = true;
                                    }
                                    return { data: otherWorkingHourListData, isLoading: false };
                                } else {
                                    if (!ranCallBack) {
                                        options?.onError?.(Error("Fake query error"));
                                        ranCallBack = true;
                                    }
                                    return { data: undefined, isLoading: false };
                                }
                            }
                        }
                        break;
                    case "timesheetConfig":
                        {
                            if (action === "timesheetConfigGetListByKey") {
                                if (isSuccess) {
                                    const timesheetConfigListData =
                                        createMockTimesheetConfigListData("OTHER_WORKING_HOUR");
                                    if (!ranCallBack) {
                                        options?.onSuccess?.(timesheetConfigListData);
                                        ranCallBack = true;
                                    }
                                    return { data: timesheetConfigListData, isLoading: false };
                                } else {
                                    if (!ranCallBack) {
                                        options?.onError?.(Error("Fake query error"));
                                        ranCallBack = true;
                                    }
                                    return { data: undefined, isLoading: false };
                                }
                            }
                        }
                        break;
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
                        if (action === "timesheetGetTimesheetById") {
                            if (isSuccess) {
                                const timesheet = mockTimesheetListData.find(
                                    (item) => item.timesheet_id === params.filter?.timesheet_id
                                );

                                if (!ranCallBack) {
                                    options?.onSuccess?.(timesheet);
                                    ranCallBack = true;
                                }
                                return { data: timesheet, isLoading: false };
                            } else {
                                if (!ranCallBack) {
                                    options?.onError?.(Error("Fake query error"));
                                    ranCallBack = true;
                                }
                                return { data: undefined, isLoading: false };
                            }
                        }

                        break;
                    }
                }
            }
    );
};

describe("useTimesheetDetail", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should query success with correct data as Admin role", () => {
        const timesheetId = "timesheet_0";
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetDetail({ timesheetId, userProfile: mockUserProfile }), {
            wrapper: TranslationProvider,
        });
        const mockOtherWorkingHours = createMockOtherWorkingHourListData(timesheetId);

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data).toMatchObject({
            timesheet_id: "timesheet_0",
            timesheet_date: "2021/09/01",
            location_id: "location_0",
            staff_id: "staff_0",
            location_name: "Location 0",
            staff_name: "Staff 0",
            staff_email: "staff-0@manabie.com",
            other_working_hours: mockOtherWorkingHours,
        });
    });

    it("should query success with correct data as Staff role", () => {
        const timesheetId = "timesheet_0";
        const {
            result: {
                current: { data },
            },
        } = renderHook(
            () =>
                useTimesheetDetail({
                    timesheetId,
                    userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
                }),
            {
                wrapper: TranslationProvider,
            }
        );
        const mockOtherWorkingHours = createMockOtherWorkingHourListData(timesheetId);

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data).toMatchObject({
            timesheet_id: "timesheet_0",
            timesheet_date: "2021/09/01",
            location_id: "location_0",
            staff_id: "staff_0",
            location_name: "Location 0",
            other_working_hours: mockOtherWorkingHours,
        });
    });

    it("should query fail", () => {
        mockUseQuery(false);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetDetail({ timesheetId: "", userProfile: mockUserProfile }));

        expect(warn).toBeCalledWith("fetch timesheet detail error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "resources.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject({
            location_name: "",
            staff_email: "",
            staff_name: "",
            other_working_hours: [],
        });
    });
});
