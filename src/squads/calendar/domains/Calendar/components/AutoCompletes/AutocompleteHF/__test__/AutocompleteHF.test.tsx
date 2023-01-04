import { FieldValues, useFormContext } from "react-hook-form";
import { changeAutocompleteInput, getLatestCallParams } from "src/squads/calendar/test-utils/utils";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteHF";

import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/calendar/test-utils/TestHookFormProvider";

describe("<AutocompleteHF />", () => {
    let wrapper: RenderResult;

    const props: AutocompleteHFProps<FieldValues> = {
        name: "test",
        optionLabelKey: "name",
        options: [
            { id: 1, name: "AAA" },
            { id: 2, name: "B" },
        ],
        id: "autocomplete-id",
        multiple: false,
        onChange: jest.fn(),
        getOptionSelectedField: "id",
    };

    beforeEach(() => {
        wrapper = render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        test: props.options[0],
                    },
                }}
            >
                <AutocompleteHF {...props} />
            </TestHookFormProvider>
        );
    });

    it("should call onChange of autoComplete", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        changeAutocompleteInput("autocomplete-id", props.options[1].name);

        const [_, optionsCalled] = getLatestCallParams(props.onChange as jest.Mock);
        expect(optionsCalled).toEqual(props.options[1]);
    });
});

describe("<AutocompleteHF multiple/> should render chips correctly", () => {
    let wrapper: RenderResult;

    const props: AutocompleteHFProps<FieldValues> = {
        name: "test",
        optionLabelKey: "name",
        options: [
            { id: 1, name: "AAA" },
            { id: 2, name: "B" },
        ],
        id: "autocomplete-id",
        multiple: true,
        getOptionSelectedField: "id",
    };

    beforeEach(() => {
        wrapper = render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        test: [],
                    },
                }}
            >
                <AutocompleteHF {...props} />
            </TestHookFormProvider>
        );
    });

    it("should render chips of autocomplete", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        const autocomplete = wrapper.getByRole("combobox");

        autocomplete.focus();
        props.options.forEach(({ name }) => {
            fireEvent.change(autocomplete, { target: { value: name } });
            fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowDown" });
            fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Enter" });
        });

        expect(wrapper.getAllByTestId("ChipAutocomplete")).toHaveLength(2);
    });

    it("should NOT render chips of autocomplete", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        const autocomplete = wrapper.getByRole("combobox");

        autocomplete.focus();
        fireEvent.change(autocomplete, { target: { value: "A random word" } });
        fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Enter" });

        expect(wrapper.queryByTestId("ChipAutocomplete")).not.toBeInTheDocument();
    });
});

describe("<AutocompleteHF /> required error", () => {
    let wrapper: RenderResult;

    const props: AutocompleteHFProps<FieldValues> = {
        id: "test-autocomplete",
        optionLabelKey: "name",
        name: "name",
        label: "Label",
        options: [
            { id: 1, name: "A" },
            { id: 2, name: "B" },
        ],
        rules: {
            required: "Name is required",
        },
        getOptionSelectedField: "id",
    };

    beforeEach(() => {
        wrapper = render(
            <TestHookFormProvider
                methodsOverride={{
                    formState: {
                        errors: {
                            name: {
                                message: "Name is required",
                            },
                        },
                    },
                }}
                useFormOptions={{
                    defaultValues: {
                        name: null,
                    },
                    mode: "all",
                }}
            >
                <AutocompleteHF {...props} />
            </TestHookFormProvider>
        );
    });

    it("should exist error", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        const submit = screen.getByTestId("TextFieldHF__submit");
        userEvent.click(submit);

        expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });
});

describe("<AutocompleteHF /> render default value", () => {
    let wrapper: RenderResult;

    const props: AutocompleteHFProps<FieldValues> = {
        name: "test",
        optionLabelKey: "name",
        options: [
            { id: 1, name: "AAA" },
            { id: 2, name: "B" },
        ],
        id: "autocomplete-id",
        multiple: false,
        onChange: jest.fn(),
        getOptionSelectedField: "id",
    };
    const Component = () => {
        const {
            formState: { isDirty },
        } = useFormContext();

        return (
            <>
                <div data-testid="TestHookFormProvider__isDirty">{String(isDirty)}</div>
                <AutocompleteHF {...props} />
            </>
        );
    };

    it("should render default value and isDirty = false", async () => {
        wrapper = render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        test: props.options[0],
                    },
                }}
            >
                <Component />
            </TestHookFormProvider>
        );

        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("AutocompleteBase__input")).toHaveAttribute(
            "value",
            props.options[0].name
        );
        expect(wrapper.getByTestId("TestHookFormProvider__isDirty").textContent).toEqual("false");
    });
});
