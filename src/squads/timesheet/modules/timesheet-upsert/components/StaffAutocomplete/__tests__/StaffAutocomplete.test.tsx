import { mockStaffListDataV2 } from "src/squads/timesheet/test-utils/mocks/staff";

import StaffAutocomplete from "../StaffAutocomplete";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryStaffList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderStaffAutocompleteHookForm = () => {
    const StaffAutocompleteHookForm = withReactHookForm(
        StaffAutocomplete,
        {},
        {
            defaultValues: {
                timesheetDate: null,
            },
        }
    );

    return render(<StaffAutocompleteHookForm />);
};

describe("<StaffAutocomplete />", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
        (useQueryStaffList as jest.Mock).mockReturnValue({ data: mockStaffListDataV2 });
    });

    it("should match snapshot", async () => {
        const { container } = renderStaffAutocompleteHookForm();

        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", async () => {
        renderStaffAutocompleteHookForm();
        await waitFor(() =>
            expect(screen.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(screen.getByTestId("StaffAutocomplete__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should reset input value when onBlur autocomplete", async () => {
        renderStaffAutocompleteHookForm();
        const staffField = screen.getByTestId("StaffAutocomplete__autocomplete");
        const staffFieldInput = staffField.querySelector("input")!;
        // enter input value
        userEvent.type(staffFieldInput, "type something");

        expect(staffFieldInput).toHaveValue("type something");

        // blur autocomplete
        fireEvent.blur(staffFieldInput);
        expect(staffFieldInput).toHaveValue("");
    });
});
