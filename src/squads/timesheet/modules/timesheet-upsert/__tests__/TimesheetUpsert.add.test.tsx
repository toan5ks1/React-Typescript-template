import { DateTime } from "luxon";
import { ModeOpenDialog } from "src/common/constants/enum";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { formatLongDate } from "src/squads/timesheet/common/utils/time";
import { NsTimesheetTimesheetService } from "src/squads/timesheet/service/timesheet/timesheet-service/types";
import { selectFullDatePicker } from "src/squads/timesheet/test-utils/date-time-picker-helper";
import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { mockStaffListDataV2 } from "src/squads/timesheet/test-utils/mocks/staff";
import {
    mockCreateTimesheetResponse,
    mockUpdateTimesheetResponse,
    mockTimesheetData,
    mockTimesheetUpsertInfoForm,
    createMockTimesheetConfigListData,
    mockTimesheetListData,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { getFakeLocalUser } from "src/squads/timesheet/test-utils/mocks/user";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestHookFormProvider,
} from "src/squads/timesheet/test-utils/providers";
import { checkErrorMessage } from "src/squads/timesheet/test-utils/utils";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import TimesheetUpsert, { TimesheetUpsertProps } from "../TimesheetUpsert";

import { fireEvent, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";
import useRedirect from "src/squads/timesheet/hooks/useRedirect";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTimesheetConfigs, {
    UseTimesheetConfigsReturn,
} from "src/squads/timesheet/hooks/useTimesheetConfigs";
import useQueryExistedTimesheet, {
    useQueryExistedTimesheetReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet";
import useQueryLocationList, {
    useQueryLocationListReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList";
import useQueryStaffList, {
    UseQueryStaffListReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList";
import useTimesheetUpsert, {
    UseUpsertTimesheetReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsert";

const mockUserProfile = getFakeLocalUser();

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/hooks/useRedirect", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/hooks/useGetLocalProfile", () => ({
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

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<TimesheetUpsert /> add new timesheet as Admin role", () => {
    const onClose = jest.fn();
    const mockMutateFn = jest.fn();
    const showSnackbar = jest.fn();

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
                        {} as NsTimesheetTimesheetService.UpdateTimesheetReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
            })
        );

        const props: TimesheetUpsertProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            timesheet: mockTimesheetData,
            onClose,
        };

        return render(
            <TranslationProvider>
                <TestCommonAppProvider>
                    <TestQueryWrapper>
                        <TestHookFormProvider>
                            <MuiPickersUtilsProvider>
                                <TimesheetUpsert {...props} />
                            </MuiPickersUtilsProvider>
                        </TestHookFormProvider>
                    </TestQueryWrapper>
                </TestCommonAppProvider>
            </TranslationProvider>
        );
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useQueryLocationList as jest.Mock<useQueryLocationListReturn>).mockReturnValue({
            data: mockLocationListData,
            isFetching: false,
            refetch: jest.fn(),
        });

        (useQueryStaffList as jest.Mock<UseQueryStaffListReturn>).mockReturnValue({
            data: mockStaffListDataV2,
            isFetching: false,
            refetch: jest.fn(),
        });

        (useGetLocalProfile as jest.Mock).mockReturnValue({ userProfile: mockUserProfile });

        (useTimesheetConfigs as jest.Mock<UseTimesheetConfigsReturn>).mockImplementation(() => {
            return {
                data: createMockTimesheetConfigListData("OTHER_WORKING_HOUR"),
                isFetching: false,
                refetch: jest.fn(),
            };
        });

        (useQueryExistedTimesheet as jest.Mock<useQueryExistedTimesheetReturn>).mockReturnValue({
            data: mockTimesheetListData.map(({ timesheet_id, timesheet_date }) => ({
                timesheet_id,
                timesheet_date,
            })),
            isFetching: false,
            refetch: jest.fn(),
        });
    });

    //TODO: after catch multiple error in https://manabie.atlassian.net/browse/LT-18801, @timesheet will fix under case
    it.skip("should match snapshot", () => {
        renderComponent();
        expect(screen.queryByTestId("DialogFullScreenHF__container")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent();
        expect(screen.getByText("Create Timesheet")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByTestId("FormTimesheetInfo__addGeneralInfoSection")).toBeInTheDocument();
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

    it("should render empty form", () => {
        renderComponent();

        const staffField = screen.getByTestId("StaffAutocomplete__autocomplete");
        const staffInput = staffField.querySelector("input");
        const timesheetDateField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const timesheetDateInput = timesheetDateField.querySelector("input");
        const timesheetLocationField = screen.getByTestId(
            "TimesheetLocationAutocomplete__autocomplete"
        );
        const timesheetLocationInput = timesheetLocationField.querySelector("input");

        expect(staffInput).toHaveValue("");
        expect(timesheetDateInput).toHaveValue("");
        expect(timesheetLocationInput).toHaveValue("");
        expect(timesheetDateInput).toHaveAttribute("disabled");
        expect(timesheetLocationInput).toHaveAttribute("disabled");
    });

    it("should render error messages input", async () => {
        renderComponent();
        const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonSave);

        // // Expect 3 errors are prompted (Staff, Timesheet Date, Timesheet Location)
        await checkErrorMessage(3, "This field is required");
    });

    it("should be call upsert mutation and correct redirect when create timesheet successfully", async () => {
        const mockHistoryPush = jest.fn();
        (useRedirect as jest.Mock).mockReturnValue({ push: mockHistoryPush });

        const wrapper = renderComponent();
        const staffField = screen.getByTestId("StaffAutocomplete__autocomplete");
        const staffFieldInput = staffField.querySelector("input")!;
        const dateField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const dateFieldInput = dateField.querySelector("input")!;
        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");
        const locationFieldInput = locationField.querySelector("input")!;
        // Choose staff
        userEvent.type(staffFieldInput, mockTimesheetUpsertInfoForm.staff?.name!);
        fireEvent.keyDown(staffField, { key: "ArrowDown" });
        fireEvent.keyDown(staffField, { key: "Enter" });

        //Choose timesheet location
        userEvent.type(locationFieldInput, mockTimesheetUpsertInfoForm.location?.value!);
        fireEvent.keyDown(locationField, { key: "ArrowDown" });
        fireEvent.keyDown(locationField, { key: "Enter" });

        // Choose timesheet date
        const now = new Date();

        await selectFullDatePicker(wrapper, dateField, now);

        expect(dateFieldInput).toHaveValue(formatLongDate(now));
        expect(staffFieldInput).toHaveValue(mockTimesheetUpsertInfoForm.staff?.name);
        expect(locationFieldInput).toHaveValue(mockTimesheetUpsertInfoForm.location?.value);

        userEvent.click(
            within(screen.getByTestId("DialogFullScreen__footer")).getByTestId(
                "FooterDialogConfirm__buttonSave"
            )
        );

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    formData: {
                        timesheetDate: DateTime.fromJSDate(now).startOf("day").toJSDate(),
                        staff: {
                            id: mockTimesheetUpsertInfoForm.staff?.id,
                            name: mockTimesheetUpsertInfoForm.staff?.name,
                            email: mockTimesheetUpsertInfoForm.staff?.email,
                        },
                        location: {
                            id: mockTimesheetUpsertInfoForm.location?.id,
                            value: mockTimesheetUpsertInfoForm.location?.value,
                        },
                        otherWorkingHours: [],
                        remark: "",
                    },
                },
                { onSuccess: expect.any(Function) }
            );
        });

        await waitFor(() => {
            expect(mockHistoryPush).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(mockHistoryPush).toHaveBeenCalledWith(
                `/timesheet/timesheet_management/${mockCreateTimesheetResponse.timesheetId}/show`
            );
        });
    });
});

describe("<TimesheetUpsert /> add new timesheet as Staff role", () => {
    const onClose = jest.fn();
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
                        {} as NsTimesheetTimesheetService.UpdateTimesheetReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
            })
        );

        const props: TimesheetUpsertProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            timesheet: mockTimesheetData,
            onClose,
        };

        return render(
            <TranslationProvider>
                <TestCommonAppProvider>
                    <TestQueryWrapper>
                        <TestHookFormProvider>
                            <MuiPickersUtilsProvider>
                                <TimesheetUpsert {...props} />
                            </MuiPickersUtilsProvider>
                        </TestHookFormProvider>
                    </TestQueryWrapper>
                </TestCommonAppProvider>
            </TranslationProvider>
        );
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useQueryLocationList as jest.Mock<useQueryLocationListReturn>).mockReturnValue({
            data: mockLocationListData,
            isFetching: false,
            refetch: jest.fn(),
        });

        (useQueryStaffList as jest.Mock<UseQueryStaffListReturn>).mockReturnValue({
            data: mockStaffListDataV2,
            isFetching: false,
            refetch: jest.fn(),
        });

        (useGetLocalProfile as jest.Mock).mockReturnValue({
            userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
        });

        (useTimesheetConfigs as jest.Mock<UseTimesheetConfigsReturn>).mockImplementation(() => {
            return {
                data: createMockTimesheetConfigListData("OTHER_WORKING_HOUR"),
                isFetching: false,
                refetch: jest.fn(),
            };
        });

        (useQueryExistedTimesheet as jest.Mock<useQueryExistedTimesheetReturn>).mockReturnValue({
            data: mockTimesheetListData.map(({ timesheet_id, timesheet_date }) => ({
                timesheet_id,
                timesheet_date,
            })),
            isFetching: false,
            refetch: jest.fn(),
        });
    });

    //TODO: after catch multiple error in https://manabie.atlassian.net/browse/LT-18801, @timesheet will fix under case
    it.skip("should match snapshot", () => {
        renderComponent();
        expect(screen.queryByTestId("DialogFullScreenHF__container")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent();
        expect(screen.getByText("Create Timesheet")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByTestId("FormTimesheetInfo__addGeneralInfoSection")).toBeInTheDocument();
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

    it("should render empty form with staff name and staff email is pre-populated", () => {
        renderComponent();

        const staffNameValue = screen.getByTestId("GeneralInfoFormSection__generalStaffNameValue");
        const staffEmailValue = screen.getByTestId(
            "GeneralInfoFormSection__generalStaffEmailValue"
        );
        const timesheetDateField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const timesheetDateInput = timesheetDateField.querySelector("input");
        const timesheetLocationField = screen.getByTestId(
            "TimesheetLocationAutocomplete__autocomplete"
        );
        const timesheetLocationInput = timesheetLocationField.querySelector("input");

        expect(staffNameValue).toHaveTextContent(mockUserProfile.name);
        expect(staffEmailValue).toHaveTextContent(mockUserProfile.email);
        expect(timesheetDateInput).toHaveValue("");
        expect(timesheetLocationInput).toHaveValue("");
        expect(timesheetDateInput).toHaveAttribute("disabled");
        expect(timesheetLocationInput).not.toHaveAttribute("disabled");
    });

    it("should render error messages input", async () => {
        renderComponent();
        const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(buttonSave);

        // // Expect 2 errors are prompted (Timesheet Date, Timesheet Location)
        await checkErrorMessage(2, "This field is required");
    });

    it("should be call upsert mutation and correct redirect when create timesheet successfully", async () => {
        const mockHistoryPush = jest.fn();
        (useRedirect as jest.Mock).mockReturnValue({ push: mockHistoryPush });

        const wrapper = renderComponent();
        const dateField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const dateFieldInput = dateField.querySelector("input")!;
        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");
        const locationFieldInput = locationField.querySelector("input")!;

        //Choose timesheet location
        userEvent.type(locationFieldInput, "l");
        fireEvent.keyDown(locationField, { key: "ArrowDown" });
        fireEvent.keyDown(locationField, { key: "Enter" });

        // Choose timesheet date
        const now = new Date();

        await selectFullDatePicker(wrapper, dateField, now);

        expect(dateFieldInput).toHaveValue(formatLongDate(now));
        expect(locationFieldInput).toHaveValue("Location 0");

        userEvent.click(
            within(screen.getByTestId("DialogFullScreen__footer")).getByTestId(
                "FooterDialogConfirm__buttonSave"
            )
        );

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    formData: {
                        timesheetDate: DateTime.fromJSDate(now).startOf("day").toJSDate(),
                        location: {
                            id: mockTimesheetUpsertInfoForm.location?.id,
                            value: mockTimesheetUpsertInfoForm.location?.value,
                        },
                        [TimesheetKeys.OTHER_WORKING_HOURS]: [],
                        remark: "",
                    },
                },
                { onSuccess: expect.any(Function) }
            );
        });

        await waitFor(() => {
            expect(mockHistoryPush).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(mockHistoryPush).toHaveBeenCalledWith(
                `/timesheet/timesheet_management/${mockCreateTimesheetResponse.timesheetId}/show`
            );
        });
    });
});
