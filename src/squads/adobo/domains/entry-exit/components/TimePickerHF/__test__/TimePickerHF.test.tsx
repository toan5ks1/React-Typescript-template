import { useForm } from "react-hook-form";
import { FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { TestHookFormProvider } from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import TimePickerHF, { TimePickerHFProps } from "../TimePickerHF";

import { fireEvent, getByText, render, RenderResult, screen, within } from "@testing-library/react";

const formatType: FormatDateOptions = "HH:mm";
const defaultDate = new Date(2021, 1, 5, 9, 35);
const HookFormComponent = (hfProps: { time: Date | null }) => {
    const method = useForm({
        defaultValues: {
            time: hfProps.time,
        },
    });
    const props: TimePickerHFProps = {
        name: "time",
        label: "time",
        InputProps: {
            id: "TimePickerHF__input",
            placeholder: "Please enter time",
            "data-testid": "TimePickerHF__timepicker",
        },
        InputLabelProps: {
            id: "TimePickerHF__label",
            "aria-label": "TimePickerHF__label",
        },
        toolbarFormat: formatType,
        onChange: jest.fn(),
        onAccept: jest.fn(),
    };
    return (
        <MuiPickersUtilsProvider>
            <TestHookFormProvider methodsOverride={method}>
                <TimePickerHF {...props} />
            </TestHookFormProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<TimePickerHF /> render label, defaultValue, name, placeholder", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent time={defaultDate} />);
    });

    it("should open dialog calendar when click on text field of timePicker", () => {
        const timePicker = wrapper.getByTestId("TimePickerHF__timepicker");

        expect(timePicker).toBeInTheDocument();

        const inputTimePicker = timePicker.querySelector("input");

        fireEvent.click(inputTimePicker as HTMLElement);
        expect(document.body.querySelector("div[role=dialog]")).toBeInTheDocument();
    });

    it("should render label/input and default value", () => {
        expect(screen.getByLabelText("TimePickerHF__label")).toHaveTextContent("time");
        expect(screen.getByPlaceholderText("Please enter time")).toBeInTheDocument();
        expect(screen.getByDisplayValue(formatDate(defaultDate, formatType))).toBeInTheDocument();
    });

    it("should change time when filling the input field on the picker and submit OK button", () => {
        const TARGET_TIME = "07:30";
        const timePicker = wrapper.getByTestId("TimePickerHF__timepicker") as HTMLInputElement;
        const inputTimePicker = timePicker.querySelector("input");
        fireEvent.click(inputTimePicker as HTMLElement);
        const dialog = wrapper.getByLabelText(/TimePickerHF__dialog/i);
        fireEvent.click(within(dialog).getByLabelText(/go to text input view/i));

        const dialogTimeInput = dialog.querySelector("input") as HTMLInputElement;
        expect(dialogTimeInput).toBeInTheDocument();

        fireEvent.change(dialogTimeInput, { target: { value: TARGET_TIME } });

        const buttonOK = getByText(dialog, "OK");
        fireEvent.click(buttonOK as HTMLButtonElement);

        expect(inputTimePicker).toHaveValue(TARGET_TIME);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<TimePickerHF /> defaultValue equal null", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<HookFormComponent time={null} />);
    });

    it("should exist value", () => {
        expect(screen.getByPlaceholderText("Please enter time")).toHaveAttribute("value");
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
