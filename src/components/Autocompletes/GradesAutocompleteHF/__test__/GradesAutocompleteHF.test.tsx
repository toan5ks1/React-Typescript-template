import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import GradesAutocompleteHF from "../GradesAutocompleteHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/test-utils/HOCs";

jest.mock("src/hooks/useAutocompleteReference");

describe("<GradesAutocompleteHF />", () => {
    let wrapper: RenderResult;
    const GradesAutocomplete = withReactHookForm(
        GradesAutocompleteHF,
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
                <GradesAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("GradesAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});

describe("<GradesAutocompleteHF /> render with firstOptions", () => {
    let wrapper: RenderResult;

    it("should render correct option listing", async () => {
        const GradesAutocomplete = withReactHookForm(
            GradesAutocompleteHF,
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
                <GradesAutocomplete />
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
        const GradesAutocomplete = withReactHookForm(
            GradesAutocompleteHF,
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
                <GradesAutocomplete />
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
