import { DateTime } from "luxon";
import {
    TIMESHEET_LIMIT_SELECTABLE_MONTHS_IN_THE_FUTURE,
    TIMESHEET_START_DATE,
} from "src/squads/timesheet/common/constants/timesheet";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import {
    Timesheet_TimesheetManyReferenceQuery,
    Timesheet_TimesheetManyReferenceQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";
import { mockTimesheetListData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryExistedTimesheet from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet";

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
        () =>
            (
                _params: ListQuery<Timesheet_TimesheetManyReferenceQueryVariables>,
                options: UseQueryBaseOptions<Timesheet_TimesheetManyReferenceQuery["timesheet"]>
            ) => {
                if (isSuccess) {
                    if (!ranCallBack) {
                        options?.onSuccess?.(mockTimesheetListData);
                        ranCallBack = true;
                    }
                    return { data: mockTimesheetListData, isLoading: false };
                } else {
                    if (!ranCallBack) {
                        options?.onError?.(Error("Fake query error"));
                        ranCallBack = true;
                    }
                    return { data: [], isLoading: false };
                }
            }
    );
};

describe("useQueryExistedTimesheet", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();
    const fromDate = DateTime.now().plus({
        months: TIMESHEET_LIMIT_SELECTABLE_MONTHS_IN_THE_FUTURE,
    });
    const toDate = DateTime.fromJSDate(TIMESHEET_START_DATE);

    beforeEach(() => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should query success with correct data", () => {
        const {
            result: {
                current: { data },
            },
        } = renderHook(
            () =>
                useQueryExistedTimesheet({
                    staffId: "staff_0",
                    locationId: "location_0",
                    fromDate,
                    toDate,
                }),
            {
                wrapper: TranslationProvider,
            }
        );
        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data[0]).toMatchObject(mockTimesheetListData[0]);
    });

    it("should query fail", () => {
        mockUseQuery(false);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() =>
            useQueryExistedTimesheet({
                staffId: "staff_0",
                locationId: "location_0",
                fromDate,
                toDate,
            })
        );

        expect(warn).toBeCalledWith(
            "fetch existed timesheet list error: ",
            Error("Fake query error")
        );
        expect(showSnackbar).toBeCalledWith(
            "resources.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
