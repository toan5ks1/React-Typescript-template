import { ModeOpenDialog } from "src/common/constants/enum";
import { NsTimesheetTimesheetService } from "src/squads/timesheet/service/timesheet/timesheet-service/types";
import {
    createMockTimesheetConfigListData,
    mockCreateTimesheetResponse,
    mockTimesheetData,
    mockUpdateTimesheetResponse,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestHookFormProvider,
    TestingRouter,
} from "src/squads/timesheet/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import TimesheetUpsert, { TimesheetUpsertProps } from "../TimesheetUpsert";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useTimesheetUpsert, {
    UseUpsertTimesheetReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsert";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsert", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/hooks/useTimesheetConfigs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<TimesheetUpsert /> edit timesheet as Admin role", () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    const showSnackbar = jest.fn();
    const mockMutateFn = jest.fn();

    const renderComponent = (): RenderResult => {
        (useTimesheetUpsert as jest.Mock).mockImplementation(
            (): UseUpsertTimesheetReturn => ({
                createTimesheet: async (data, options) => {
                    await options?.onSuccess?.(
                        mockCreateTimesheetResponse,
                        {} as NsTimesheetTimesheetService.CreateTimesheetReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
                updateTimesheet: async (data, options) => {
                    await options?.onSuccess?.(
                        mockUpdateTimesheetResponse,
                        {
                            timesheetId: mockTimesheetData.timesheet_id,
                        } as NsTimesheetTimesheetService.UpdateTimesheetReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
            })
        );

        const props: TimesheetUpsertProps = {
            mode: ModeOpenDialog.EDIT,
            open: true,
            timesheet: mockTimesheetData,
            onClose,
            onSave,
        };

        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider>
                        <MuiPickersUtilsProvider>
                            <TestingRouter>
                                <TimesheetUpsert {...props} />
                            </TestingRouter>
                        </MuiPickersUtilsProvider>
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (useTimesheetConfigs as jest.Mock).mockImplementation(() => {
            return {
                data: createMockTimesheetConfigListData("OTHER_WORKING_HOUR"),
                isFetching: false,
                refetch: jest.fn(),
            };
        });
    });

    // TODO: fix uuid of field array mismatch
    it.skip("should match snapshot", () => {
        renderComponent();
        expect(screen.queryByTestId("DialogFullScreenHF__container")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent();
        expect(screen.getByText("Edit Timesheet")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByTestId("FormTimesheetInfo__form")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should open dialog cancel confirm and function onClose have been called", () => {
        renderComponent();

        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);
        const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(dialogConfirm).toBeInTheDocument();

        const buttonConfirm = within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonConfirm);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should render empty form with pre-populated genaral info", () => {
        renderComponent();

        const staffNameValue = screen.getByTestId("GeneralInfoSection__generalStaffNameValue");
        const staffEmailValue = screen.getByTestId("GeneralInfoSection__generalStaffEmailValue");
        const timesheetDateValue = screen.getByTestId(
            "GeneralInfoSection__generalTimesheetDateValue"
        );
        const timesheetLocationValue = screen.getByTestId(
            "GeneralInfoSection__generalTimesheetLocationValue"
        );

        expect(staffNameValue).toHaveTextContent(mockTimesheetData.staff_name);
        expect(staffEmailValue).toHaveTextContent(mockTimesheetData.staff_email);
        expect(timesheetLocationValue).toHaveTextContent(mockTimesheetData.location_name);
        expect(timesheetDateValue).toHaveTextContent(mockTimesheetData.timesheet_date);
    });

    it("should be call onSave and onClose fn when update timesheet successfully", async () => {
        renderComponent();
        userEvent.click(
            within(screen.getByTestId("DialogFullScreen__footer")).getByTestId(
                "FooterDialogConfirm__buttonSave"
            )
        );

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    formData: {
                        location: {
                            id: "location_0",
                            value: "Location 0",
                        },
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
                                workingTypeAutocomplete: {
                                    config_type: "OTHER_WORKING_HOUR",
                                    config_value: "config_value_0",
                                    timesheet_config_id: "timesheet_config_0",
                                },
                                working_type: "config_value",
                            },
                        ],
                        remark: "Remark 0",
                        staff: {
                            email: "staff-0@manabie.com",
                            id: "staff_0",
                            name: "Staff 0",
                        },
                        timesheetDate: "2021/09/01",
                        timesheetId: "timesheet_0",
                    },
                },
                { onSuccess: expect.any(Function) }
            );
        });
    });
});
