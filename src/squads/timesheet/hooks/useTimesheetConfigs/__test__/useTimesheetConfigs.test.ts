import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import timesheetConfigService from "src/squads/timesheet/service/timesheet/timesheet-config-service";
import {
    Timesheet_TimesheetConfigListByKeyQuery,
    Timesheet_TimesheetConfigListByKeyQueryVariables,
} from "src/squads/timesheet/service/timesheet/timesheet-types";
import { createMockTimesheetConfigListData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import useTimesheetConfigs from "../useTimesheetConfigs";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";

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
        ({}: {
                entity: Parameters<typeof inferQuery>[0]["entity"];
                action: keyof typeof timesheetConfigService["query"];
            }) =>
            (
                params: ListQuery<Timesheet_TimesheetConfigListByKeyQueryVariables>,
                options: UseQueryBaseOptions<
                    Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"] | undefined
                >
            ) => {
                if (isSuccess) {
                    const timesheetConfigListData = createMockTimesheetConfigListData(
                        params.filter?.config_type!
                    );
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
                    return { data: [], isLoading: false };
                }
            }
    );
};

describe("useTimesheetConfigs", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return list of timesheet config", () => {
        const configType = "OTHER_WORKING_HOUR";
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetConfigs(configType), {
            wrapper: TranslationProvider,
        });
        const mockTimesheetConfigList = createMockTimesheetConfigListData(configType);

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data).toMatchObject(mockTimesheetConfigList);
    });

    it("should query fail", () => {
        mockUseQuery(false);
        const configType = "OTHER_WORKING_HOUR";
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTimesheetConfigs(configType), {
            wrapper: TranslationProvider,
        });

        expect(warn).toBeCalledWith("fetch timesheet configs error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "Unable to load data, please try again! Fake query error",
            "error"
        );

        expect(data).toMatchObject([]);
    });
});
