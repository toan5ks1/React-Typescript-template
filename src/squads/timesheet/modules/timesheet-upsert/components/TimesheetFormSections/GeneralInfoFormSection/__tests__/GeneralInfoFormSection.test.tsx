import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { formatLongDate } from "src/squads/timesheet/common/utils/time";
import { selectFullDatePicker } from "src/squads/timesheet/test-utils/date-time-picker-helper";
import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { mockStaffListDataV2 } from "src/squads/timesheet/test-utils/mocks/staff";
import {
    defaultTimesheetUpsertInfoForm,
    mockTimesheetListData,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { getFakeLocalUser } from "src/squads/timesheet/test-utils/mocks/user";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import {
    GeneralInfoFormSection,
    GeneralInfoFormSectionProps,
} from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections";
import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryExistedTimesheet, {
    useQueryExistedTimesheetReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet";
import useQueryLocationList, {
    useQueryLocationListReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList";
import useQueryStaffList, {
    UseQueryStaffListReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

const mockUserProfile = getFakeLocalUser();

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
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

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Render components
type RenderFormTimesheetHookFormProps = GeneralInfoFormSectionProps & {
    defaultValues?: UpsertTimesheetFormProps;
};

const renderGeneralInfoFormSectionHookForm = (props: RenderFormTimesheetHookFormProps) => {
    const { locationId, staffId, userProfile, defaultValues } = props;

    const GeneralInfoFormSectionHookForm = withReactHookForm(
        GeneralInfoFormSection,
        { locationId, staffId, userProfile },
        { defaultValues: defaultValues }
    );

    return render(
        <TranslationProvider>
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <MuiPickersUtilsProvider>
                        <GeneralInfoFormSectionHookForm />
                    </MuiPickersUtilsProvider>
                </TestCommonAppProvider>
            </TestQueryWrapper>
        </TranslationProvider>
    );
};

// Test cases
describe("<GeneralInfoFormSection /> as Admin Role", () => {
    const showSnackbar = jest.fn();

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

        (useQueryExistedTimesheet as jest.Mock<useQueryExistedTimesheetReturn>).mockReturnValue({
            data: mockTimesheetListData.map(({ timesheet_id, timesheet_date }) => ({
                timesheet_id,
                timesheet_date,
            })),
            isFetching: false,
            refetch: jest.fn(),
        });
    });

    it("should show title", () => {
        renderGeneralInfoFormSectionHookForm({
            userProfile: mockUserProfile,

            defaultValues: defaultTimesheetUpsertInfoForm,
        });

        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const wrapper = renderGeneralInfoFormSectionHookForm({
            userProfile: mockUserProfile,

            defaultValues: defaultTimesheetUpsertInfoForm,
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct fields", () => {
        renderGeneralInfoFormSectionHookForm({
            userProfile: mockUserProfile,
            defaultValues: defaultTimesheetUpsertInfoForm,
        });
        expect(screen.getByTestId("GeneralInfoFormSection__timesheetDate")).toBeInTheDocument();
        expect(
            screen.getByTestId("TimesheetLocationAutocomplete__autocomplete")
        ).toBeInTheDocument();
        expect(screen.getByTestId("StaffAutocomplete__autocomplete")).toBeInTheDocument();
    });

    it("should disabled Date and Location fields when not have Staff value", async () => {
        renderGeneralInfoFormSectionHookForm({
            userProfile: mockUserProfile,
            defaultValues: defaultTimesheetUpsertInfoForm,
        });
        const datePickerField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");

        expect(datePickerField.querySelector("input")).toHaveAttribute("disabled");
        expect(locationField.querySelector("input")).toHaveAttribute("disabled");
    });

    it("should enabled Location field when have Staff value", async () => {
        renderGeneralInfoFormSectionHookForm({
            staffId: "staff_0",
            userProfile: mockUserProfile,
        });

        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");

        expect(locationField.querySelector("input")).not.toHaveAttribute("disabled");
    });

    it("should enabled Date field when have Staff and Location value", async () => {
        renderGeneralInfoFormSectionHookForm({
            staffId: "staff_0",
            locationId: "location_0",
            userProfile: mockUserProfile,
        });

        const datePickerField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");

        expect(datePickerField.querySelector("input")).not.toHaveAttribute("disabled");
    });

    it("should render correct values on each input when user type", async () => {
        const wrapper = renderGeneralInfoFormSectionHookForm({
            staffId: "staff_0",
            locationId: "location_0",
            userProfile: mockUserProfile,
        });

        const staffField = screen.getByTestId("StaffAutocomplete__autocomplete");
        const staffFieldInput = staffField.querySelector("input")!;
        const dateField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const dateFieldInput = dateField.querySelector("input")!;
        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");
        const locationFieldInput = locationField.querySelector("input")!;

        // Choose staff
        userEvent.type(staffFieldInput, "0");
        fireEvent.keyDown(staffField, { key: "ArrowDown" });
        fireEvent.keyDown(staffField, { key: "Enter" });

        //Choose timesheet location
        userEvent.type(locationFieldInput, "l");
        fireEvent.keyDown(locationField, { key: "ArrowDown" });
        fireEvent.keyDown(locationField, { key: "Enter" });

        // Choose timesheet date
        const now = new Date();

        await selectFullDatePicker(wrapper, dateField, now);

        expect(dateFieldInput).toHaveValue(formatLongDate(now));
        expect(staffFieldInput).toHaveValue("Staff 0");
        expect(locationFieldInput).toHaveValue("Location 0");
    });
});

describe("<GeneralInfoFormSection /> as Staff Role", () => {
    const showSnackbar = jest.fn();

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

        (useQueryExistedTimesheet as jest.Mock<useQueryExistedTimesheetReturn>).mockReturnValue({
            data: mockTimesheetListData.map(({ timesheet_id, timesheet_date }) => ({
                timesheet_id,
                timesheet_date,
            })),
            isFetching: false,
            refetch: jest.fn(),
        });
    });

    it("should show title", () => {
        renderGeneralInfoFormSectionHookForm({
            userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
            defaultValues: defaultTimesheetUpsertInfoForm,
        });

        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const wrapper = renderGeneralInfoFormSectionHookForm({
            userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
            defaultValues: defaultTimesheetUpsertInfoForm,
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly fields", async () => {
        renderGeneralInfoFormSectionHookForm({
            userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
        });
        const datePickerField = screen.getByTestId("GeneralInfoFormSection__timesheetDate");
        const locationField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");
        const staffNameValue = screen.getByTestId("GeneralInfoFormSection__generalStaffNameValue");
        const staffEmailValue = screen.getByTestId(
            "GeneralInfoFormSection__generalStaffEmailValue"
        );

        expect(staffNameValue).toHaveTextContent(mockUserProfile.name);
        expect(staffEmailValue).toHaveTextContent(mockUserProfile.email);
        expect(datePickerField.querySelector("input")).toHaveAttribute("disabled");
        expect(locationField.querySelector("input")).not.toHaveAttribute("disabled");
    });

    it("should render correct values on each input when user type", async () => {
        const wrapper = renderGeneralInfoFormSectionHookForm({
            locationId: "location_0",
            userProfile: { ...mockUserProfile, userGroup: "USER_GROUP_TEACHER" },
            defaultValues: defaultTimesheetUpsertInfoForm,
        });

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
    });
});
