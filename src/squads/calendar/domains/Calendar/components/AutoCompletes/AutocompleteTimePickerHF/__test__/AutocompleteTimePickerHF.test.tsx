import AutocompleteTimePickerHF from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteTimePickerHF";
import MuiPickersUtilsProvider from "src/squads/calendar/providers/MuiPickersUtilsProvider";

import { fireEvent, render, waitFor, within, screen } from "@testing-library/react";
import { withReactHookForm } from "src/squads/calendar/test-utils/HOCs";

describe("<AutocompleteTimePickerHF />", () => {
    const TimePickerAutocomplete = withReactHookForm(
        AutocompleteTimePickerHF,
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
        render(
            <MuiPickersUtilsProvider>
                <TimePickerAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct the autocomplete with input", () => {
        expect(screen.getByTestId("AutocompleteTimePickerHF__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should render correct options each 15-minutes step", async () => {
        within(screen.getByTestId("AutocompleteTimePickerHF__autocomplete"))
            .getByTitle("Open")
            .click();
        await waitFor(() => {
            expect(screen.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        });
        expect(screen.getAllByTestId("AutocompleteBase__option")[0].textContent).toEqual("00:00");
        expect(screen.getAllByTestId("AutocompleteBase__option")[1].textContent).toEqual("00:15");

        const options = screen.getAllByTestId("AutocompleteBase__option");

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
        const autoCompleteInput = screen.getByTestId("AutocompleteBase__input") as HTMLInputElement;

        // Correct format
        const inputTime = "12:12";

        expect(autoCompleteInput).toBeInTheDocument();
        // click into the component before fire event
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        expect(autoCompleteInput.value).toBe(inputTime);
        const options = screen.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(1);
        expect(options[0].textContent).toEqual(inputTime);

        fireEvent.click(options[0]);
        expect(autoCompleteInput).toHaveValue(inputTime);
    });

    it("should suggest correct option on typing hour", () => {
        const autoCompleteInput = screen.getByTestId("AutocompleteBase__input") as HTMLInputElement;

        const inputHour = "12";
        const expectedMinutes = ["00", "15", "30", "45"];

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputHour } });
        const options = screen.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(4);

        // Each option have a step of 15 minute
        for (let i = 0; i < options.length; i++) {
            expect(options[i].textContent).toEqual(`${inputHour}:${expectedMinutes[i]}`);
        }
    });

    it("should suggest correct option on correct time format input which is divisible by minute step", () => {
        const autoCompleteInput = screen.getByTestId("AutocompleteBase__input") as HTMLInputElement;

        // Correct format
        const inputTime = "12:00";

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        const options = screen.getAllByTestId("AutocompleteBase__option");

        expect(options.length).toEqual(1);
        expect(options[0].textContent).toEqual(inputTime);

        fireEvent.click(options[0]);
        expect(autoCompleteInput).toHaveValue(inputTime);
    });

    it("should suggest no option on incorrect time format input", () => {
        const autoCompleteInput = screen.getByTestId("AutocompleteBase__input") as HTMLInputElement;

        // Wrong format
        const inputTime = "12:0a";

        expect(autoCompleteInput).toBeInTheDocument();
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });

        expect(screen.getByText("No options")).toBeInTheDocument();
    });
});
