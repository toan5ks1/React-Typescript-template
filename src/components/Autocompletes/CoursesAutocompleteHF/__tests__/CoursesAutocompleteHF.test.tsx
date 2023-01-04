import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import CoursesAutocompleteHF from "../CoursesAutocompleteHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/test-utils/HOCs";

jest.mock("src/hooks/useAutocompleteReference");

describe("<CoursesAutocompleteHF />", () => {
    let wrapper: RenderResult;
    const CoursesAutocomplete = withReactHookForm(
        CoursesAutocompleteHF,
        {
            name: "courses",
            disableClearable: false,
            disableCloseOnSelect: true,
            getOptionSelectedField: "value",
        },
        {
            defaultValues: {
                courses: [],
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <CoursesAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("CoursesAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });
});

describe("<CoursesAutocompleteHF /> render with firstOptions", () => {
    let wrapper: RenderResult;

    const CoursesAutocomplete = withReactHookForm(
        CoursesAutocompleteHF,
        {
            name: "courses",
            disableClearable: false,
            disableCloseOnSelect: true,
            open: true,
            firstOptions: [{ course_id: undefined, value: "All Courses" }],
            optionLabelKey: "value",
            getOptionSelectedField: "value",
        },
        {
            defaultValues: {
                courses: [],
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <CoursesAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct option listing", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0]).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0].textContent).toEqual(
            "All Courses"
        );
    });
});

describe("<CoursesAutocompleteHF /> render with defaultValue", () => {
    let wrapper: RenderResult;

    const CoursesAutocomplete = withReactHookForm(
        CoursesAutocompleteHF,
        {
            name: "courses",
            disableClearable: false,
            disableCloseOnSelect: true,
            open: false,
            options: [{ course_id: "1", value: "Courses A", name: "Courses A" }],
            firstOptions: [{ course_id: undefined, value: "All Courses", name: "All Courses" }],
        },
        {
            defaultValues: {
                courses: [{ course_id: undefined, value: "All Courses", name: "All Courses" }],
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <CoursesAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct defaultValue", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete").textContent).toEqual("All Course...");
    });
});
