import AutocompleteAssignedStudentStatusHF from "src/squads/lesson/domains/AssignedStudentList/components/Autocompletes/AssignedStudentStatusAutocompleteHF";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("<AutocompleteAssignedStudentStatus />", () => {
    const AutocompleteStatus = withReactHookForm(
        AutocompleteAssignedStudentStatusHF,
        {
            name: "status",
            disableClearable: false,
            disableCloseOnSelect: true,
            options: [{ id: 1, name: "Test" }],
        },
        {
            defaultValues: {
                status: { id: 1, name: "Test" },
            },
        }
    );

    beforeEach(() => {
        render(
            <MuiPickersUtilsProvider>
                <AutocompleteStatus />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(screen.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(
            screen.getByTestId("AutocompleteAssignedStudentStatusHF__autocomplete")
        ).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(screen.getByLabelText("Clear")).toBeInTheDocument();
    });
});
