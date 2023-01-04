import { FormatDateOptions } from "src/common/constants/enum";

import DatePickerHF, {
    DatePickerHFProps,
} from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/DatePickers/DatePickerHF";
import MuiPickersUtilsProvider from "src/squads/calendar/providers/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/calendar/test-utils/TestHookFormProvider";

const defaultDate = new Date(2022, 1, 5, 9, 35);
const formatType: FormatDateOptions = "yyyy/LL/dd";
const defaultProps: DatePickerHFProps = {
    name: "date",
    label: "Date",
    inputFormat: formatType,
    onChange: jest.fn(),
    onAccept: jest.fn(),
    InputProps: {
        placeholder: "Please enter date",
        "data-testid": "DatePickerHF__datepicker",
    },
};
const HookFormComponent = (props: DatePickerHFProps) => {
    return (
        <TranslationProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: {
                            date: defaultDate,
                        },
                    }}
                >
                    <DatePickerHF {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TranslationProvider>
    );
};

describe("<DatePickerHF /> handle action correctly", () => {
    it("should call onAccept onChange", () => {
        render(<HookFormComponent {...defaultProps} name={""} />);
        const dateInput = screen.getByTestId("DatePickerHF__input");
        userEvent.click(dateInput);
        const btnOk = screen.getByRole("button", { name: "OK" });

        expect(btnOk).toBeInTheDocument();
        userEvent.click(btnOk);
        expect(defaultProps.onAccept).toBeCalled();
        expect(defaultProps.onChange).toBeCalled();
    });
});

describe("<DatePickerHF /> render label, defaultValue, name, placeholder", () => {
    beforeEach(() => {
        render(<HookFormComponent {...defaultProps} />);
    });

    it("should open dialog calendar when click on text field of DatePicker", () => {
        const datePicker = screen.getByTestId("DatePickerHF__datepicker");

        expect(datePicker).toBeInTheDocument();

        const inputDatePicker = screen
            .getByTestId("DatePickerHF__datepicker")
            .querySelector("input");

        fireEvent.click(inputDatePicker as HTMLElement);
        expect(document.body.querySelector("div[role=dialog]")).toBeInTheDocument();
    });

    it("should exist label", () => {
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
    });

    it("should exist placeholder", () => {
        expect(screen.getByPlaceholderText("Please enter date")).toBeInTheDocument();
    });
});

describe("<DatePickerHF /> defaultValue equal undefined", () => {
    beforeEach(() => {
        render(<HookFormComponent {...defaultProps} />);
    });

    it("should exist value", () => {
        expect(screen.getByPlaceholderText("Please enter date")).toHaveAttribute("value");
    });
});
