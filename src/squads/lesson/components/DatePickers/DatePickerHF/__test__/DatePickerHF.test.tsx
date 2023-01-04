import { useForm } from "react-hook-form";
import { FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";

import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import DatePickerHF from "../DatePickerHF";

import {
    findByText,
    fireEvent,
    getByText,
    render,
    RenderResult,
    screen,
    within,
} from "@testing-library/react";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

const defaultDate = new Date(2021, 1, 5, 9, 35);
const HookFormComponent = () => {
    const formatType: FormatDateOptions = "yyyy/LL/dd";

    const method = useForm({
        defaultValues: {
            date: defaultDate,
        },
    });
    const props = {
        name: "date",
        label: "Date",
        format: formatType,
        onChange: jest.fn(),
        onAccept: jest.fn(),
        InputProps: {
            placeholder: "Please enter date",
            "data-testid": "DatePickerHF__datepicker",
        },
    };
    return (
        <MuiPickersUtilsProvider>
            <TestHookFormProvider methodsOverride={method}>
                <DatePickerHF {...props} />
            </TestHookFormProvider>
        </MuiPickersUtilsProvider>
    );
};

const getDatePickerDialogAndInput = (
    wrapper: RenderResult
): { dialog: HTMLElement; input: HTMLInputElement } => {
    const datePicker = wrapper.getByTestId("DatePickerHF__datepicker");
    expect(datePicker).toBeInTheDocument();

    const buttonDatePicker = within(datePicker).getByTestId(/__openPickerButton/);
    fireEvent.click(buttonDatePicker as HTMLButtonElement); //open calendar popup

    const dialogDatePicker = wrapper.getByLabelText(/DatePickerHF__dialog/i);
    expect(dialogDatePicker).toBeInTheDocument();

    const inputDatePicker = wrapper.getByTestId("DatePickerHF__datepicker").querySelector("input");

    return { dialog: dialogDatePicker as HTMLElement, input: inputDatePicker as HTMLInputElement };
};

describe("<DatePickerHF /> render label, defaultValue, name, placeholder", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should open dialog calendar when click on text field of DatePicker", () => {
        const datePicker = wrapper.getByTestId("DatePickerHF__datepicker");

        expect(datePicker).toBeInTheDocument();

        const inputDatePicker = wrapper
            .getByTestId("DatePickerHF__datepicker")
            .querySelector("input");

        fireEvent.click(inputDatePicker as HTMLElement);
        expect(document.body.querySelector("div[role=dialog]")).toBeInTheDocument();
    });

    it("should exist default value", () => {
        expect(screen.getByDisplayValue(formatDate(defaultDate, "yyyy/LL/dd"))).toBeInTheDocument();
    });

    it("should exist label", () => {
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
    });

    it("should exist placeholder", () => {
        expect(screen.getByPlaceholderText("Please enter date")).toBeInTheDocument();
    });

    it("should onChange DatePicker", async () => {
        const SELECTED_DATE = "20";

        const datePicker = wrapper.getByTestId("DatePickerHF__datepicker");

        expect(datePicker).toBeInTheDocument();

        const buttonDatePicker = datePicker.querySelector("button");

        const inputDatePicker = wrapper
            .getByTestId("DatePickerHF__datepicker")
            .querySelector("input");

        fireEvent.click(buttonDatePicker as HTMLButtonElement); //open calendar popup

        const dialogDatePicker = document.body.querySelector("div[role=dialog]");
        expect(dialogDatePicker).toBeInTheDocument();

        if (dialogDatePicker) {
            const selectDate = await findByText(dialogDatePicker as HTMLElement, SELECTED_DATE);
            fireEvent.click(selectDate as HTMLButtonElement);
        }
        const buttonOK = await findByText(dialogDatePicker as HTMLElement, "ra.common.action.OK");
        fireEvent.click(buttonOK as HTMLButtonElement);
        expect(inputDatePicker?.value).toContain(SELECTED_DATE);
    });

    it("should change date when filling at the input field and submit OK button", () => {
        const TARGET_DATE = "2022/01/01";

        const { input, dialog } = getDatePickerDialogAndInput(wrapper);
        fireEvent.click(within(dialog).getByLabelText(/go to text input view/i));

        const dialogDateInput = within(dialog).getByTestId(/DatePickerHF__input/);
        fireEvent.change(dialogDateInput, { target: { value: TARGET_DATE } });

        const buttonOK = getByText(dialog, "ra.common.action.OK");
        fireEvent.click(buttonOK as HTMLButtonElement);

        expect(input).toHaveValue(TARGET_DATE);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<DatePickerHF /> defaultValue equal undefined", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent />);
    });

    it("should exist value", () => {
        expect(screen.getByPlaceholderText("Please enter date")).toHaveAttribute("value");
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
