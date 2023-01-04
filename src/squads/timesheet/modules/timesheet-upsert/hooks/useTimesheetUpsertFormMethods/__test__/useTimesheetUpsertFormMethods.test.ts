import { UseFormReturn } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useTimesheetUpsertFormMethods from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsertFormMethods";

jest.mock("src/squads/timesheet/hooks/useTimesheetConfigs", () => ({
    __esModule: true,
    default: jest.fn(),
}));
describe("useTimesheetUpsertFormMethods", () => {
    beforeEach(() => {
        (useTimesheetConfigs as jest.Mock).mockImplementation(() => {
            return {
                data: [],
                isFetching: false,
                refetch: jest.fn(),
            };
        });
    });
    it("should return correct data in add new timesheet mode", async () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseFormReturn<UpsertTimesheetFormProps>> = renderHook(
            () => useTimesheetUpsertFormMethods(),
            { wrapper: TestCommonAppProvider }
        );

        expect(current.getValues()).toEqual({
            timesheetDate: null,
            otherWorkingHours: [],
        });
    });

    it("should return correct data in edit timesheet mode", async () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseFormReturn<UpsertTimesheetFormProps>> = renderHook(
            () => useTimesheetUpsertFormMethods(mockTimesheetData, ModeOpenDialog.EDIT),
            { wrapper: TestCommonAppProvider }
        );

        expect(current.getValues()).toEqual({
            timesheetId: mockTimesheetData.timesheet_id,
            timesheetDate: mockTimesheetData?.timesheet_date,
            staff: {
                id: mockTimesheetData?.staff_id,
                name: mockTimesheetData?.staff_name,
                email: mockTimesheetData?.staff_email,
            },
            location: {
                id: mockTimesheetData?.location_id,
                value: mockTimesheetData?.location_name,
            },
            remark: mockTimesheetData.remark,
            otherWorkingHours: [
                {
                    endTimeAutocomplete: {
                        label: "12:00",
                        value: new Date("2215-04-09T12:00:00.000Z"),
                    },
                    end_time: "2215-04-09T12:00:00+00:00",
                    other_working_hours_id: "other_working_hours_0",
                    remarks: "remark_content",
                    startTimeAutocomplete: {
                        label: "10:00",
                        value: new Date("2215-04-09T10:00:00.000Z"),
                    },
                    start_time: "2215-04-09T10:00:00+00:00",
                    timesheet_config_id: "timesheet_config_0",
                    timesheet_id: "timesheet_0",
                    total_hour: 120,
                    working_type: "config_value",
                },
            ],
        });
    });
});
