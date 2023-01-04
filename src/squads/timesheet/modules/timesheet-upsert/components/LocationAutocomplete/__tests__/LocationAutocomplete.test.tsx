import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";

import LocationAutocomplete, { LocationAutocompleteProps } from "../LocationAutocomplete";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryLocationList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList";
import { withReactHookForm } from "src/squads/timesheet/test-utils/HOCs";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderLocationAutocompleteHookForm = (props: LocationAutocompleteProps) => {
    const LocationAutocompleteHookForm = withReactHookForm(
        LocationAutocomplete,
        { ...props },
        {
            defaultValues: {
                timesheetDate: null,
            },
        }
    );

    return render(<LocationAutocompleteHookForm />);
};

describe("<LocationAutocomplete />", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
        (useQueryLocationList as jest.Mock).mockReturnValue({ data: mockLocationListData });
    });

    it("should match snapshot", async () => {
        const { container } = renderLocationAutocompleteHookForm({ disabled: false });

        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", async () => {
        renderLocationAutocompleteHookForm({ disabled: false });
        await waitFor(() =>
            expect(screen.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(
            screen.getByTestId("TimesheetLocationAutocomplete__autocomplete")
        ).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should reset input value when onBlur autocomplete", async () => {
        renderLocationAutocompleteHookForm({ disabled: false });
        const staffField = screen.getByTestId("TimesheetLocationAutocomplete__autocomplete");
        const staffFieldInput = staffField.querySelector("input")!;
        // enter input value
        userEvent.type(staffFieldInput, "type something");

        expect(staffFieldInput).toHaveValue("type something");

        // blur autocomplete
        fireEvent.blur(staffFieldInput);
        expect(staffFieldInput).toHaveValue("");
    });
});
