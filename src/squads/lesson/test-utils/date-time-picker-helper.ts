import { DateTime } from "luxon";

import {
    fireEvent,
    RenderResult,
    waitForElementToBeRemoved,
    within,
    findByText,
    waitFor,
    screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toNumber from "lodash/toNumber";

//Date picker helpers
export const datePickerRootSelector =
    'div[class="MuiPaper-root MuiDialog-paper MuiPickersModal-dialogRoot MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]';

export const selectedDateBtnSelector =
    'button[class="MuiButtonBase-root MuiIconButton-root MuiPickersDay-day MuiPickersDay-current MuiPickersDay-daySelected"]';

//Time picker helpers
export const timePickerRootSelector =
    'div[class="MuiPaper-root MuiDialog-paper MuiPickersModal-dialogRoot MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]';

type ClockButtonNthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 0;
type ClockButtonMinuteType = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 0;

export const selectTimeForTimePickerAMPM = async (
    wrapper: RenderResult,
    timePicker: HTMLElement,
    hour: ClockButtonNthType,
    minute: ClockButtonMinuteType, // Multiply with 5 to get end result
    meridiem: "AM" | "PM" // AM & PM stands for 'ante meridiem' and 'post meridiem' in Latin
) => {
    expect(timePicker).toBeInTheDocument();
    fireEvent.click(timePicker);

    const dialog = await screen.findByLabelText("TimePickerHF__dialog");

    // Select hour
    const buttonHour = wrapper.baseElement.querySelector(
        ".PrivateTimePickerToolbar-hourMinuteLabel > button:first-child"
    )!;

    expect(buttonHour).toBeInTheDocument();
    fireEvent.click(buttonHour);
    selectNthButtonOfClock(wrapper, hour);

    // Select minute
    const buttonMinute = wrapper.baseElement.querySelector(
        ".PrivateTimePickerToolbar-hourMinuteLabel > button:last-child"
    )!;
    expect(buttonMinute).toBeInTheDocument();
    fireEvent.click(buttonMinute);
    selectNthButtonOfClock(wrapper, convertMinuteTypeToNthChildType(minute));

    // Select meridiem
    const meridiemButton = within(dialog).getByText(meridiem);
    expect(meridiemButton).toBeInTheDocument();
    fireEvent.click(meridiemButton);
    expect(meridiemButton).toHaveClass("Mui-selected");

    // Select OK
    const buttonOK = within(dialog).getByText("OK");
    expect(buttonOK).toBeInTheDocument();
    expect(buttonOK).toHaveTextContent("OK");
    fireEvent.click(buttonOK);

    await waitForElementToBeRemoved(buttonOK);

    // Expect text field to have correct result
    let resultHourInNumber: number = hour;
    if (meridiem === "PM") resultHourInNumber += 12;
    const resultHourInString: string = addZeroInTheBeginningOfOneCharacterTime(resultHourInNumber);

    let resultMinuteInNumber: number = minute;
    if (resultMinuteInNumber === 60) resultMinuteInNumber = 0;

    const resultMinuteInString: string =
        addZeroInTheBeginningOfOneCharacterTime(resultMinuteInNumber);

    const resultTime = `${resultHourInString}:${resultMinuteInString}`;

    expect(timePicker).toHaveValue(resultTime);
};

export const selectDatePicker = async (
    wrapper: RenderResult,
    dataTestId: string | HTMLElement,
    selectDay: number
) => {
    const datePicker =
        typeof dataTestId === "string" ? wrapper.getByTestId(dataTestId) : dataTestId;
    expect(datePicker).toBeInTheDocument();

    // Open date picker dialog
    const buttonDatePicker = datePicker.querySelector("button");
    const inputDatePicker = within(datePicker).getByRole("textbox") as HTMLInputElement;
    userEvent.click(buttonDatePicker as HTMLButtonElement);
    const dialogDatePicker = document.body.querySelector("div[role=dialog]");
    expect(dialogDatePicker).toBeInTheDocument();

    // Select date
    if (dialogDatePicker) {
        const selectDate = await findByText(dialogDatePicker as HTMLElement, `${selectDay}`);
        userEvent.click(selectDate as HTMLButtonElement);
    }

    // Click Ok button
    const buttonOK = await findByText(dialogDatePicker as HTMLElement, "OK");
    userEvent.click(buttonOK as HTMLButtonElement);
    expect(inputDatePicker?.value).toContain(`${selectDay}`);

    await waitFor(() => expect(dialogDatePicker).not.toBeInTheDocument());
};

const convertMinuteTypeToNthChildType = (minute: ClockButtonMinuteType): ClockButtonNthType => {
    const result: ClockButtonNthType = (minute / 5) as ClockButtonNthType;
    return result;
};
const addZeroInTheBeginningOfOneCharacterTime = (n: number): string => {
    return n < 10 ? `0${n}` : `${n}`;
};

const selectNthButtonOfClock = (wrapper: RenderResult, n: ClockButtonNthType) => {
    // FIXME: if any way better than this hack
    // find the first node of picker view
    // mui v4 selector div[class="MuiPickersBasePicker-pickerView"] > div[class="MuiPickersClock-container"] > div[class="MuiPickersClock-clock"]
    // but in v5 we cant use the selector since className is generate by @emotion
    const clockList = wrapper.baseElement.querySelector("div[role='listbox']");
    const clockClickHandler = clockList!.parentNode!.firstChild;
    if (!clockClickHandler) return;
    expect(clockClickHandler).toBeInTheDocument();

    fireEvent.touchMove(clockClickHandler, {
        buttons: 1,
        changedTouches: [clockDimensionMapper[n]],
    });
};

export const selectFullDatePicker = async (
    wrapper: RenderResult,
    dataTestId: string | HTMLElement,
    date: Date
) => {
    const datePicker =
        typeof dataTestId === "string" ? wrapper.getByTestId(dataTestId) : dataTestId;
    expect(datePicker).toBeInTheDocument();

    const selectDateDay = date.getDate();
    const selectMonth = date.getMonth() + 1;
    const selectYear = date.getFullYear();

    // Open date picker dialog
    const buttonDatePicker = datePicker.querySelector("button") as HTMLElement;
    userEvent.click(buttonDatePicker);

    // Select year
    const currentYear = document.getElementsByClassName(
        "PrivatePickersFadeTransitionGroup-root"
    )[1] as HTMLElement;

    const numberCurrentYear = toNumber(currentYear.textContent);

    if (numberCurrentYear !== selectYear) {
        const buttonYear = wrapper.getByLabelText(/switch to year view/i);
        userEvent.click(buttonYear);

        const containerYears = document.querySelector(".MuiYearPicker-root") as HTMLElement;

        const expectYear = await within(containerYears).findByText(`${selectYear}`, {
            selector: "button",
        });

        userEvent.click(expectYear);
    }

    // Select Month
    const containerSwitchHeaderMonth = document.getElementsByClassName(
        "PrivatePickersFadeTransitionGroup-root"
    )[0] as HTMLElement;

    const textCurrentMonth = containerSwitchHeaderMonth.textContent;
    const currentMonthIndex = monthsOfYear.indexOf(textCurrentMonth!);

    if (textCurrentMonth !== monthsOfYear[date.getMonth()]) {
        const numberNeedChangeMonth = currentMonthIndex + 1 - selectMonth;

        const absMonth = Math.abs(numberNeedChangeMonth);
        const btnPreviousMonth = await wrapper.findByLabelText("Previous month");
        const btnNextMonth = await wrapper.findByLabelText("Next month");

        const btnClick = numberNeedChangeMonth > 0 ? btnPreviousMonth : btnNextMonth;

        for (let i = 0; i < absMonth; i++) userEvent.click(btnClick);
    }

    // select day
    const containerWeekDays = document.querySelector(
        ".PrivatePickersSlideTransition-root"
    ) as HTMLElement;

    const lineWeeks = containerWeekDays.querySelectorAll("div[role='row']");

    for (const date of lineWeeks) {
        const allButtonDate = date.querySelectorAll("button");
        for (let i = 0; i < allButtonDate.length; i++) {
            const textDate = allButtonDate[i].textContent;
            const className = allButtonDate[i].className;

            if (
                textDate === `${selectDateDay}` &&
                !className.includes("Mui-disabled MuiPickersDay-root") &&
                !className.includes("MuiPickersDay-hiddenDaySpacingFiller")
            ) {
                fireEvent.click(allButtonDate[i]);
            }
        }
    }

    // Click ok
    const footerPicker = document.getElementsByClassName(
        "MuiDialogActions-root MuiDialogActions-spacing"
    )[0] as HTMLElement;
    const buttonOKDialog = await within(footerPicker).findByText("OK");
    userEvent.click(buttonOKDialog);
};

export const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const clockDimensionMapper = {
    1: {
        clientX: 154,
        clientY: 31,
    },
    2: {
        clientX: 188,
        clientY: 64,
    },
    3: {
        clientX: 201,
        clientY: 110,
    },
    4: {
        clientX: 190,
        clientY: 153,
    },
    5: {
        clientX: 156,
        clientY: 188,
    },
    6: {
        clientX: 110,
        clientY: 198,
    },
    7: {
        clientX: 64,
        clientY: 188,
    },
    8: {
        clientX: 32,
        clientY: 155,
    },
    9: {
        clientX: 20,
        clientY: 109,
    },
    10: {
        clientX: 30,
        clientY: 61,
    },
    11: {
        clientX: 65,
        clientY: 28,
    },
    0: {
        clientX: 110,
        clientY: 20,
    },
};

export const selectDateForDatePicker = async (
    datePicker: HTMLElement,
    date: Date,
    isGoToNextMonth?: boolean
) => {
    userEvent.click(datePicker);

    const convertedDate = DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED); // e.g: Apr 29, 2022

    if (isGoToNextMonth) {
        const nextMonth = screen.getByTestId("ArrowRightIcon");
        userEvent.click(nextMonth);
    }

    const chosenDate = screen.getByLabelText(convertedDate, { selector: "button" });
    userEvent.click(chosenDate);

    const applyDateButton = screen.getByText("OK", { selector: "button" });
    userEvent.click(applyDateButton);

    await waitFor(() => {
        expect(screen.queryByLabelText("DatePickerHF__dialog")).not.toBeInTheDocument();
    });
    expect(datePicker).toHaveValue(DateTime.fromJSDate(date).toFormat("yyyy/MM/dd"));
};
