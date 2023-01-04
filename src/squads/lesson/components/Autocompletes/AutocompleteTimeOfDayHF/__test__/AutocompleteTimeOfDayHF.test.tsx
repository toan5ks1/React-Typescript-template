import AutocompleteTimeOfDayHF from "src/squads/lesson/components/Autocompletes/AutocompleteTimeOfDayHF";

import { fireEvent, render, RenderResult, waitFor, within } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

describe("<AutocompleteTimeOfDayHF />", () => {
    let wrapper: RenderResult;
    const AutocompleteTimeOfDay = withReactHookForm(
        AutocompleteTimeOfDayHF,
        {
            name: "timePicker",
            disableClearable: false,
            disableCloseOnSelect: true,
            getOptionSelectedField: "value",
        },
        {
            defaultValues: {
                timePicker: null,
            },
        }
    );

    beforeEach(() => {
        wrapper = render(<AutocompleteTimeOfDay />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct the autocomplete with input", () => {
        expect(wrapper.getByTestId("AutocompleteTimeOfDayHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should render correct options each 15-minutes step", async () => {
        within(wrapper.getByTestId("AutocompleteTimeOfDayHF__autocomplete"))
            .getByTitle("Open")
            .click();
        await waitFor(() => {
            expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        });
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0].textContent).toEqual("00:00");
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[1].textContent).toEqual("00:15");

        const options = wrapper.getAllByTestId("AutocompleteBase__option");

        // options.length - 1 will cover the last 2 option in the list
        for (let i = 0; i < options.length - 1; i++) {
            const option1Minute = Number.parseInt(options[i].textContent!.split(":")[1]);
            const option2Minute = Number.parseInt(options[i + 1].textContent!.split(":")[1]);

            if (option2Minute === 0 && option1Minute === 45) {
                // Example: check from from 00:45 to 1:00
                expect(option2Minute - option1Minute).toEqual(-45);
            } else {
                // Example: check from from 00:30 to 00:45
                expect(option2Minute - option1Minute).toEqual(15);
            }
        }
    });

    it("should suggest correct option on correct time format input which is not divisible by minute step", () => {
        const autoCompleteInput = wrapper.getByTestId(
            "AutocompleteBase__input"
        ) as HTMLInputElement;

        // Correct format
        const inputTime = "12:12";

        expect(autoCompleteInput).toBeInTheDocument();
        // click into the component before fire event
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        expect(autoCompleteInput.value).toBe(inputTime);
        const options = wrapper.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(1);
        expect(options[0].textContent).toEqual(inputTime);

        fireEvent.click(options[0]);
        expect(autoCompleteInput).toHaveValue(inputTime);
    });

    it("should suggest correct option on typing hour", () => {
        const autoCompleteInput = wrapper.getByTestId(
            "AutocompleteBase__input"
        ) as HTMLInputElement;

        const inputHour = "12";
        const expectedMinutes = ["00", "15", "30", "45"];

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputHour } });
        const options = wrapper.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(4);

        // Each option have a step of 15 minute
        for (let i = 0; i < options.length; i++) {
            expect(options[i].textContent).toEqual(`${inputHour}:${expectedMinutes[i]}`);
        }
    });

    it("should suggest correct option on correct time format input which is divisible by minute step", () => {
        const autoCompleteInput = wrapper.getByTestId(
            "AutocompleteBase__input"
        ) as HTMLInputElement;

        // Correct format
        const inputTime = "12:00";

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        const options = wrapper.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(1);
        expect(options[0].textContent).toEqual(inputTime);

        fireEvent.click(options[0]);
        expect(autoCompleteInput).toHaveValue(inputTime);
    });

    it("should suggest no option on incorrect time format input", () => {
        const autoCompleteInput = wrapper.getByTestId(
            "AutocompleteBase__input"
        ) as HTMLInputElement;

        // Wrong format
        const inputTime = "12:0a";

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        expect(wrapper.getByText("No options")).toBeInTheDocument();
    });
});
