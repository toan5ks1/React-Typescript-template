import { eventsTempData } from "src/squads/calendar/test-utils/schedule";

import { act, renderHook } from "@testing-library/react-hooks";
import useCalendar from "src/squads/calendar/domains/Calendar/hooks/useCalendar";

const date = new Date();
describe("useCalendar should call successfully", () => {
    const runRenderHook = () => {
        return renderHook(() => useCalendar(), {});
    };

    it("should return match data", async () => {
        const { result } = runRenderHook();

        await act(async () => {
            await result.current.handleChangeLocation("location-1");
        });
        expect(result.current.location).toEqual("location-1");
        expect(result.current.isLoading).toEqual(false);

        //when drawer is close
        act(() => {
            result.current.handleOpenAndCloseDrawer(false);
        });
        expect(result.current.openDrawer).toEqual(false);
        expect(result.current.fixWidth).toEqual("100%");
        expect(result.current.dateSelected).toEqual("");

        //when drawer is open
        act(() => {
            result.current.handleOpenAndCloseDrawer(true, date.toDateString());
        });
        expect(result.current.openDrawer).toEqual(true);
        expect(result.current.fixWidth).toEqual("calc(100% - 348px)");
        expect(result.current.dateSelected).toEqual(date.toDateString());

        act(() => {
            result.current.handleShowMoreEvents(eventsTempData, date);
        });
        expect(result.current.openMoreEvents).toEqual(true);
        expect(result.current.titleShowMorePopup).toEqual(date.toISOString());
        expect(result.current.eventsOnPopup).toEqual(eventsTempData);

        act(() => {
            result.current.handleCloseShowMoreEvent({} as MouseEvent);
        });
        expect(result.current.openMoreEvents).toEqual(false);
    });
});
