import { inferQuery } from "src/squads/calendar//service/infer-query";
import { TestApp } from "src/squads/calendar/test-utils";
import { mockLocationTypes } from "src/squads/calendar/test-utils/location-types";
import { eventsTempData } from "src/squads/calendar/test-utils/schedule";

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar from "src/squads/calendar/domains/Calendar/Calendar";
import {
    useCalendar,
    UseCalendarTypeReturn,
} from "src/squads/calendar/domains/Calendar/hooks/useCalendar";

jest.mock("src/squads/calendar/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/calendar/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));
jest.mock("src/squads/calendar/domains/Calendar/hooks/useCalendar");

const dataMock: UseCalendarTypeReturn = {
    fixWidth: "",
    location: "",
    openDrawer: false,
    dateSelected: "",
    titleShowMorePopup: "",
    openMoreEvents: false,
    toggleOpenMoreEvents: jest.fn(),
    eventsOnPopup: [],
    showMoreRef: undefined,
    isLoading: false,
    handleCloseShowMoreEvent: jest.fn(),
    fakeGetData: jest.fn(),
    handleOpenAndCloseDrawer: jest.fn(),
    handleShowMoreEvents: jest.fn(),
    handleChangeLocation: jest.fn(),
};
const mockData = (overrideData: Partial<UseCalendarTypeReturn> = {}): UseCalendarTypeReturn => ({
    ...dataMock,
    ...overrideData,
});

const renderCalendar = () =>
    render(
        <TestApp>
            <Calendar />
        </TestApp>
    );
describe("<CalendarDateHeader />", () => {
    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(() => () => {
            return {
                data: mockLocationTypes,
                isLoading: false,
            };
        });
    });

    it("should render correctly when location no select", () => {
        (useCalendar as jest.Mock).mockImplementation(() => mockData());

        renderCalendar();
        expect(screen.getByTestId("Calendar__pageTitle")).toBeInTheDocument();
        expect(screen.getByTestId("SelectLocationType__select")).toBeInTheDocument();
        expect(screen.getByTestId("WrapperLookingFor__icon")).toBeInTheDocument();
    });

    it("should render correctly when location selected", () => {
        (useCalendar as jest.Mock).mockImplementation(() =>
            mockData({ location: "location-id-1" })
        );
        renderCalendar();
        expect(screen.getByTestId("Calendar__container")).toBeInTheDocument();
    });

    it("should render correctly when open popup show more events", () => {
        (useCalendar as jest.Mock).mockImplementation(() =>
            mockData({
                location: "location-id-1",
                eventsOnPopup: eventsTempData,
            })
        );

        renderCalendar();
        const popupMoreEvent = screen.getByTestId("Calendar__popupMoreEvent");
        expect(popupMoreEvent).toBeInTheDocument();

        const btnClose = within(popupMoreEvent).getByRole("button", {
            name: "Close",
            hidden: true,
        });
        userEvent.click(btnClose);
        expect(dataMock.toggleOpenMoreEvents).toBeCalled();
    });

    it("should render correctly when open drawer day info", () => {
        (useCalendar as jest.Mock).mockImplementation(() =>
            mockData({ location: "location-id-1", eventsOnPopup: eventsTempData, openDrawer: true })
        );

        renderCalendar();
        const drawerWithHeaderAndFooter = screen.getByTestId("Calendar__drawerWithHeaderAndFooter");
        const closeSidebar = screen.getByTestId("DrawerWithHeaderAndFooter__closeSidebar");
        const btnCancel = within(drawerWithHeaderAndFooter).getByRole("button", {
            name: "Cancel",
        });
        expect(drawerWithHeaderAndFooter).toBeInTheDocument();

        userEvent.click(btnCancel);
        userEvent.click(closeSidebar);
        expect(dataMock.handleOpenAndCloseDrawer).toBeCalled();
    });
    it("should call toggleOpenMoreEvents when user resize screen", () => {
        (useCalendar as jest.Mock).mockImplementation(() =>
            mockData({ location: "location-id-1", eventsOnPopup: eventsTempData })
        );

        renderCalendar();
        fireEvent(window, new Event("resize"));
        expect(dataMock.toggleOpenMoreEvents).toBeCalled();
    });
});
