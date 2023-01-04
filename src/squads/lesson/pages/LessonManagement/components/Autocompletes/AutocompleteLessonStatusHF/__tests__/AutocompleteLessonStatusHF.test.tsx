import { mockLessonStatusAutocompleteList } from "src/squads/lesson/test-utils/lesson-management";

import AutocompleteLessonStatusHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteLessonStatusHF";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("<AutocompleteLessonStatusHF />", () => {
    const AutocompleteLessonStatus = withReactHookForm(
        AutocompleteLessonStatusHF,
        {
            name: "status",
            disableClearable: false,
            disableCloseOnSelect: true,
            open: true,
            multiple: true,
            options: mockLessonStatusAutocompleteList,
        },
        {
            defaultValues: {
                status: [mockLessonStatusAutocompleteList[0]],
            },
        }
    );

    it("should render correct UI", async () => {
        render(
            <MuiPickersUtilsProvider>
                <AutocompleteLessonStatus />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() =>
            expect(screen.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(screen.getByTestId("AutocompleteLessonStatusHF__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(screen.getByTestId("ChipAutocomplete")).toHaveTextContent(
            mockLessonStatusAutocompleteList[0].name
        );
        expect(screen.getAllByTestId("AutocompleteBase__option")[0]).toHaveTextContent(
            mockLessonStatusAutocompleteList[0].name
        );
        expect(screen.getByLabelText("Clear")).toBeInTheDocument();
    });
});
