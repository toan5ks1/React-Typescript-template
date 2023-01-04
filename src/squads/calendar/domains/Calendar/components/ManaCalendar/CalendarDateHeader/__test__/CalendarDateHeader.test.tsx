import { TestThemeProvider } from "src/squads/calendar/test-utils";
import { hexToRgb } from "src/squads/calendar/test-utils/utils";
import { getThemeWithMuiV5 } from "src/styles";

import CalendarDateHeader from "src/squads/calendar/domains/Calendar/components/ManaCalendar/CalendarDateHeader";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarDateHeaderProps } from "src/squads/calendar/domains/Calendar/types";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });
const today = new Date().toDateString();

const props: CalendarDateHeaderProps = {
    dailyStatus: {},
    date: new Date(),
    dateSelected: "",
    handleOpenAndCloseDrawer: jest.fn(),
    isCurrent: false,
    isOffRange: false,
    label: "1",
    utilities: {},
};

const renderCalendarDateHeader = (props: CalendarDateHeaderProps) =>
    render(
        <TestThemeProvider>
            <CalendarDateHeader {...props} />
        </TestThemeProvider>
    );

describe("<CalendarDateHeader />", () => {
    it("should match style when isDateActive = true", () => {
        renderCalendarDateHeader({ ...props, dateSelected: today });

        const dayLabelEl = screen.getByTestId("CalendarDateHeader__dayLabel");
        const dayInfoEl = screen.getByTestId("CalendarDateHeader__dayInfo");

        const styleDayLabel = getComputedStyle(dayLabelEl);
        expect(styleDayLabel.backgroundColor).toEqual(hexToRgb(muiTheme.palette.primary.light));
        expect(styleDayLabel.color).toEqual(hexToRgb(muiTheme.palette.primary.contrastText));
        expect(styleDayLabel.border).toEqual("1px solid transparent");

        const styleDayInfo = getComputedStyle(dayInfoEl);
        expect(styleDayInfo.backgroundColor).toEqual("rgba(2, 136, 209, 0.04)");
        expect(styleDayInfo.color).toEqual(hexToRgb(muiTheme.palette.text.disabled));
        expect(styleDayInfo.border).toEqual(
            `1px solid ${muiTheme.palette.primary.light.toLowerCase()}`
        );
    });

    it("should match style when isDateActive = false", () => {
        renderCalendarDateHeader(props);

        const dayLabelEl = screen.getByTestId("CalendarDateHeader__dayLabel");
        const dayInfoEl = screen.getByTestId("CalendarDateHeader__dayInfo");

        const styleDayLabel = getComputedStyle(dayLabelEl);
        expect(styleDayLabel.backgroundColor).toEqual("transparent");
        expect(styleDayLabel.color).toEqual(hexToRgb(muiTheme.palette.text.primary));
        expect(styleDayLabel.border).toEqual("1px solid rgba(0, 0, 0, 0.23)");

        const styleDayInfo = getComputedStyle(dayInfoEl);
        expect(styleDayInfo.backgroundColor).toEqual("transparent");
        expect(styleDayInfo.color).toEqual(hexToRgb(muiTheme.palette.text.disabled));
        expect(styleDayInfo.border).toEqual("1px solid transparent");
    });

    it("should match style when isCurrent = true", () => {
        renderCalendarDateHeader(props);

        const dayLabelEl = screen.getByTestId("CalendarDateHeader__dayLabel");
        const styleDayLabel = getComputedStyle(dayLabelEl);
        expect(styleDayLabel.border).toEqual("1px solid rgba(0, 0, 0, 0.23)");
    });

    it("should match style when isCurrent = false", () => {
        renderCalendarDateHeader({ ...props, date: new Date(0) });

        const dayLabelEl = screen.getByTestId("CalendarDateHeader__dayLabel");
        const styleDayLabel = getComputedStyle(dayLabelEl);
        expect(styleDayLabel.border).toEqual("1px solid transparent");
    });

    it("should call action when dayInfoWrap click", () => {
        renderCalendarDateHeader({ ...props, date: new Date(0) });

        const dayInfoWrapEl = screen.getByTestId("CalendarDateHeader__dayInfoWrap");

        userEvent.click(dayInfoWrapEl);
        expect(props.handleOpenAndCloseDrawer).toBeCalled();
    });
});
