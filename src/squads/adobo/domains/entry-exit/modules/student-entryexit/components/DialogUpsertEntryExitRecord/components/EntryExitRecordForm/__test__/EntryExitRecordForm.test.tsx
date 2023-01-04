import { DateTime } from "luxon";
import { ModeOpenDialog } from "src/common/constants/enum";
import { formatDate, generateMockDateForTests } from "src/common/utils/time";
import { getMockEntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/test-utils/mocks/entry-exit";
import {
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/adobo/domains/entry-exit/providers/MuiPickersUtilsProvider";

import { EntryExitRecordFormProps } from "..";
import EntryExitRecordForm from "../EntryExitRecordForm";

import { within, render, screen, findByText, findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

const renderComponent = (props: EntryExitRecordFormProps) => {
    const { defaultValues, mode } = props;

    return render(
        <MuiPickersUtilsProvider>
            <TestQueryWrapper>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: defaultValues,
                    }}
                >
                    <EntryExitRecordForm mode={mode} defaultValues={defaultValues} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </MuiPickersUtilsProvider>
    );
};

describe("<EntryExitRecordForm />", () => {
    const mockDate = "2022-03-03T07:00:00.000Z";
    const mockExitDate = "2022-03-03T010:00:00.000Z";

    generateMockDateForTests(mockDate, Date);

    const props: EntryExitRecordFormProps = {
        mode: ModeOpenDialog.ADD,
        defaultValues: getMockEntryExitRecordFormData(mockDate),
    };

    it("should match snapshot in ADD mode", () => {
        const newProps: EntryExitRecordFormProps = {
            mode: ModeOpenDialog.ADD,
            defaultValues: {
                ...props.defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
            },
        };
        const wrapper = renderComponent(newProps);

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render entry date, entry time, and exit time input in ADD mode", () => {
        const newProps: EntryExitRecordFormProps = {
            mode: ModeOpenDialog.ADD,
            defaultValues: {
                ...props.defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
                exitTime: new Date(mockExitDate),
            },
        };

        renderComponent(newProps);

        expect(
            screen.getByTestId("EntryExitRecordForm__entryDatePicker").querySelector("input")
        ).toHaveValue(formatDate(props.defaultValues.entryDate, "yyyy/LL/dd"));
        expect(
            screen.getByTestId("EntryExitRecordForm__entryTimePicker").querySelector("input")
        ).toHaveValue(formatDate(props.defaultValues.entryTime, "HH:mm"));

        if (props.defaultValues.exitTime) {
            expect(
                screen.getByTestId("EntryExitRecordForm__exitTimePicker").querySelector("input")
            ).toHaveValue(formatDate(props.defaultValues.exitTime, "HH:mm"));
        }
    });

    it("should match snapshot in EDIT mode", () => {
        const newProps: EntryExitRecordFormProps = {
            mode: ModeOpenDialog.EDIT,
            defaultValues: {
                ...props.defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
            },
        };
        const wrapper = renderComponent(newProps);

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render entry date, entry time, and exit time input in EDIT mode", () => {
        const newProps: EntryExitRecordFormProps = {
            mode: ModeOpenDialog.EDIT,
            defaultValues: {
                ...props.defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
                exitTime: new Date(mockExitDate),
            },
        };

        renderComponent(newProps);

        const entryDatePicker = screen.getByTestId("EntryExitRecordForm__entryDatePicker");

        expect(entryDatePicker.querySelector("input")).toHaveValue(
            formatDate(props.defaultValues.entryDate, "yyyy/LL/dd")
        );

        expect(entryDatePicker.querySelector("input")).toHaveAttribute("disabled");

        expect(
            screen.getByTestId("EntryExitRecordForm__entryTimePicker").querySelector("input")
        ).toHaveValue(formatDate(props.defaultValues.entryTime, "HH:mm"));

        if (props.defaultValues.exitTime) {
            expect(
                screen.getByTestId("EntryExitRecordForm__exitTimePicker").querySelector("input")
            ).toHaveValue(formatDate(props.defaultValues.exitTime, "HH:mm"));
        }
    });
});

describe("<EntryExitRecordForm /> DatePickerHF disabled future dates validation", () => {
    const now = DateTime.now();
    const mockDate = formatDate(Date.now(), "yyyy/LL/dd");
    const mockExitDate = formatDate(Date.now(), "yyyy/LL/dd");
    const tomorrow = now.day + 1;
    const currentYear = now.year;

    const props: EntryExitRecordFormProps = {
        mode: ModeOpenDialog.ADD,
        defaultValues: getMockEntryExitRecordFormData(mockDate),
    };
    it("should not be able to select future dates in entry date in ADD mode", async () => {
        const newProps: EntryExitRecordFormProps = {
            mode: ModeOpenDialog.ADD,
            defaultValues: {
                ...props.defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
                exitTime: new Date(mockExitDate),
            },
        };

        renderComponent(newProps);
        const datePicker = screen.getByTestId("EntryExitRecordForm__entryDatePicker");
        expect(datePicker).toBeInTheDocument();

        const buttonDatePicker = screen.getByTestId("DatePickerHF__openPickerButton");
        userEvent.click(buttonDatePicker as HTMLButtonElement);

        const dialogDatePicker = screen.getByLabelText("DatePickerHF__dialog");
        expect(dialogDatePicker).toBeInTheDocument();

        if (now.daysInMonth > tomorrow) {
            const selectDate = await findByText(dialogDatePicker as HTMLElement, `${tomorrow}`);
            expect(selectDate).toBeDisabled();
        }

        const selectMonth = within(dialogDatePicker as HTMLElement).getByLabelText("Next month");
        expect(selectMonth).toBeDisabled();
        const selectPreviousMonth = within(dialogDatePicker as HTMLElement).getByLabelText(
            "Previous month"
        );
        expect(selectPreviousMonth).toBeEnabled();

        const selectYear = within(dialogDatePicker as HTMLElement).getByLabelText(
            "calendar view is open, switch to year view"
        );
        userEvent.click(selectYear);

        const currentYearButton = await findByRole(dialogDatePicker as HTMLElement, `button`, {
            name: `${currentYear}`,
        });
        expect(currentYearButton).toBeEnabled();

        const previousYearButton = await findByRole(dialogDatePicker as HTMLElement, `button`, {
            name: `${currentYear - 1}`,
        });
        expect(previousYearButton).toBeEnabled();

        const nextYearButton = screen.queryByDisplayValue(`${currentYear + 1}`);
        expect(nextYearButton).not.toBeInTheDocument();
    });
});
