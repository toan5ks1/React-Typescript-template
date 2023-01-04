import FormSetOpenDayInfo from "src/squads/calendar/domains/Calendar/components/Forms/FormSetOpenDayInfo/FormSetOpenDayInfo";
import MuiPickersUtilsProvider from "src/squads/calendar/providers/MuiPickersUtilsProvider";

import {
    findByText,
    fireEvent,
    getByRole,
    render,
    RenderResult,
    screen,
} from "@testing-library/react";

const getDatePickerDialogAndInput = (
    wrapper: RenderResult
): { dialog: HTMLElement; input: HTMLInputElement } => {
    const datePickerInput = wrapper.getByTestId("DatePickerHF__input");
    expect(datePickerInput).toBeInTheDocument();

    fireEvent.click(datePickerInput);

    const dialogDatePicker = document.body.querySelector("div[role=dialog]");
    expect(dialogDatePicker).toBeInTheDocument();

    return { dialog: dialogDatePicker as HTMLElement, input: datePickerInput as HTMLInputElement };
};

describe("<FormSetOpenDayInfo />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <FormSetOpenDayInfo />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render <FormSetOpenDayInfo /> correctly", () => {
        expect(screen.getByTestId("DatePickerHF__input")).toBeInTheDocument();
        expect(screen.getByTestId("SelectHF__select")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteTimePickerHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Date")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Open Time")).toBeInTheDocument();
    });

    it("should open dialog calendar when click on text field of DatePickerHF", () => {
        const datePicker = screen.getByTestId("DatePickerHF__input");
        expect(datePicker).toBeInTheDocument();

        fireEvent.click(datePicker as HTMLElement);
        expect(document.body.querySelector("div[role=dialog]")).toBeInTheDocument();
    });

    it("should change date when click on date on the picker and submit OK button", async () => {
        const SELECTED_DATE = "20";
        const { input, dialog } = getDatePickerDialogAndInput(wrapper);
        const selectDate = await findByText(dialog, SELECTED_DATE);

        fireEvent.click(selectDate as HTMLButtonElement);

        const buttonOK = screen.getByRole("button", {
            name: /ok/i,
        });

        fireEvent.click(buttonOK as HTMLButtonElement);
        expect(input.value).toContain(SELECTED_DATE);
    });

    it("should open a listbox when click on Date Type", async () => {
        const selectDateType = wrapper.getByTestId("SelectHF__select");
        fireEvent.mouseDown(getByRole(selectDateType, "button"));
        const listbox = wrapper.queryByRole("listbox");
        expect(listbox).toBeInTheDocument();
        expect(listbox).not.toBeNull();
    });

    it("should render switch with label and default unchecked", () => {
        expect(wrapper.getByRole("checkbox")).not.toBeChecked();
    });
});
