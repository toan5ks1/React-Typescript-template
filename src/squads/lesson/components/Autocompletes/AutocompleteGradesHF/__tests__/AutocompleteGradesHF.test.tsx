import AutocompleteGradesHF from "src/squads/lesson/components/Autocompletes/AutocompleteGradesHF";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference");

describe("<AutocompleteGradesHF />", () => {
    let wrapper: RenderResult;
    const AutocompleteGrades = withReactHookForm(
        AutocompleteGradesHF,
        {
            name: "grades",
            disableClearable: false,
            disableCloseOnSelect: true,
            options: [{ id: "1", name: "Test" }],
        },
        {
            defaultValues: {
                grades: { id: "1", name: "Test" },
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <AutocompleteGrades />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("AutocompleteGradesHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});

describe("<AutocompleteGradesHF /> render with firstOptions", () => {
    let wrapper: RenderResult;

    it("should render correct option listing", async () => {
        const AutocompleteGrades = withReactHookForm(
            AutocompleteGradesHF,
            {
                name: "grades",
                disableClearable: false,
                disableCloseOnSelect: true,
                open: true,
                options: [{ id: "1", name: "Other" }],
                getOptionSelectedField: "id",
            },
            {
                defaultValues: {
                    grades: { id: "1", name: "Other" },
                },
            }
        );

        wrapper = render(
            <MuiPickersUtilsProvider>
                <AutocompleteGrades />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0]).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0].textContent).toEqual("Other");
    });

    it("should render correct option listing with undefined id", async () => {
        const AutocompleteGrades = withReactHookForm(
            AutocompleteGradesHF,
            {
                name: "grades",
                disableClearable: false,
                disableCloseOnSelect: true,
                open: true,
                options: [{ id: undefined, name: "All Grades" }],
                getOptionSelectedField: "name",
            },
            {
                defaultValues: {
                    grades: { id: undefined, name: "All Grades" },
                },
            }
        );

        wrapper = render(
            <MuiPickersUtilsProvider>
                <AutocompleteGrades />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0]).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0].textContent).toEqual(
            "All Grades"
        );
        expect(wrapper.getByTestId("AutocompleteBase__input")).toHaveValue("All Grades");
    });
});
