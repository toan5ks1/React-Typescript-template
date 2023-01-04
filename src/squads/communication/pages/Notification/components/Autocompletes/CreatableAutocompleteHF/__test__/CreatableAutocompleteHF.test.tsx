import { FieldValues } from "react-hook-form";
import { changeAutocompleteValue } from "src/squads/communication/test-utils/utils";

import CreatableAutocompleteHF, { CreatableAutocompleteHFProps } from "../CreatableAutocompleteHF";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider, {
    TestHookFormProviderProps,
} from "src/squads/communication/test-utils/TestHookFormProvider";

const defaultCreatableAutocompleteHFProps: CreatableAutocompleteHFProps<FieldValues> = {
    name: "creatableAutocomplete",
    optionLabelKey: "name",
    options: [
        { id: 1, name: "firstOption" },
        { id: 2, name: "secondOption" },
    ],
    multiple: false,
    onChange: jest.fn(),
    getOptionSelectedField: "id",
    inputValue: "",
};

const renderCreatableAutoCompleteHF = (
    props = defaultCreatableAutocompleteHFProps,
    useFormOptions: TestHookFormProviderProps["useFormOptions"]
) => {
    return render(
        <TestHookFormProvider useFormOptions={useFormOptions}>
            <CreatableAutocompleteHF {...props} data-testid="CreatableAutocompleteHF__root" />
        </TestHookFormProvider>
    );
};

describe("<CreatableAutocompleteHF />", () => {
    it("should match snapshot", () => {
        const wrapper = renderCreatableAutoCompleteHF(defaultCreatableAutocompleteHFProps, {
            defaultValues: {
                creatableAutocomplete: defaultCreatableAutocompleteHFProps.options[0],
            },
        });

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render origin default value", () => {
        renderCreatableAutoCompleteHF(
            {
                ...defaultCreatableAutocompleteHFProps,
                defaultValue: defaultCreatableAutocompleteHFProps.options[0].name,
            },
            {
                defaultValues: {
                    creatableAutocomplete: defaultCreatableAutocompleteHFProps.options[0],
                },
            }
        );

        const autocompleteChoices = screen.getByRole("combobox");

        expect(autocompleteChoices).toHaveValue(
            defaultCreatableAutocompleteHFProps.options[0].name
        );
    });

    it("should call onChange of autoComplete", () => {
        renderCreatableAutoCompleteHF(defaultCreatableAutocompleteHFProps, {
            defaultValues: {
                creatableAutocomplete: defaultCreatableAutocompleteHFProps.options[0],
            },
        });

        changeAutocompleteValue(
            "CreatableAutocompleteHF__root",
            defaultCreatableAutocompleteHFProps.options[1].name
        );

        expect(defaultCreatableAutocompleteHFProps.onChange).toBeCalledWith(
            expect.any(Object),
            defaultCreatableAutocompleteHFProps.options[1],
            "selectOption"
        );
    });

    it("should render chips of autocomplete", () => {
        renderCreatableAutoCompleteHF(
            { ...defaultCreatableAutocompleteHFProps, multiple: true },
            {
                defaultValues: {
                    creatableAutocomplete: [],
                },
            }
        );

        defaultCreatableAutocompleteHFProps.options.forEach(({ name }) => {
            changeAutocompleteValue("CreatableAutocompleteHF__root", name);
        });

        expect(screen.getAllByTestId("ChipAutocomplete")).toHaveLength(2);
    });

    it("should render chips of autocomplete when passing addedOption", () => {
        const thirdOptionName = "thirdOption";

        renderCreatableAutoCompleteHF(
            {
                ...defaultCreatableAutocompleteHFProps,
                multiple: true,
                addedOption: { id: 3, name: thirdOptionName },
            },
            {
                defaultValues: {
                    creatableAutocomplete: [],
                },
            }
        );

        defaultCreatableAutocompleteHFProps.options.forEach(({ name }) => {
            changeAutocompleteValue("CreatableAutocompleteHF__root", name);
        });

        changeAutocompleteValue("CreatableAutocompleteHF__root", thirdOptionName);

        // default options length + new added option
        expect(screen.getAllByTestId("ChipAutocomplete")).toHaveLength(
            defaultCreatableAutocompleteHFProps.options.length + 1
        );
    });

    it("should call onAddOption when clicking add option", () => {
        const addOptionMessagePrefix = "Add";
        const changedValue = "A random word";
        const mockOnAddOption = jest.fn();

        renderCreatableAutoCompleteHF(
            {
                ...defaultCreatableAutocompleteHFProps,
                options: [],
                inputValue: changedValue,
                multiple: true,
                addOptionMessagePrefix,
                onAddOption: mockOnAddOption,
                freeSolo: true,
            },
            {
                defaultValues: {
                    creatableAutocomplete: [],
                },
            }
        );

        const autocompleteChoices = screen.getByRole("combobox");

        userEvent.type(autocompleteChoices, changedValue);

        const addOptionChoice = screen.getByText(`${addOptionMessagePrefix} "${changedValue}"`);

        expect(addOptionChoice).toBeInTheDocument();
        userEvent.click(addOptionChoice);

        expect(mockOnAddOption).toBeCalledTimes(1);
    });
});
