import React, { useCallback, useRef, useState } from "react";

import { useToggle } from "react-use";
import { sleep } from "src/common/utils/tests";

import { Event as ManaEvent } from "@manabie-com/mana-calendar";

export interface UseCalendarTypeReturn {
    handleCloseShowMoreEvent: (event: MouseEvent | TouchEvent) => void;
    handleShowMoreEvents: (events: ManaEvent[], date: Date) => void;
    toggleOpenMoreEvents: (nextValue?: any) => void;
    handleOpenAndCloseDrawer: (isOpen: boolean, dateSelect?: string) => void;
    handleChangeLocation: (value: string) => Promise<void>;
    isLoading: boolean;
    fakeGetData: () => Promise<void>;
    titleShowMorePopup: string;
    fixWidth: string;
    eventsOnPopup: ManaEvent[];
    location: string;
    dateSelected: string;
    openMoreEvents: boolean;
    openDrawer: boolean;
    showMoreRef?: React.RefObject<HTMLSpanElement>;
}

export const useCalendar = (): UseCalendarTypeReturn => {
    const [fixWidth, setFixWidth] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [dateSelected, setDateSelected] = useState<string>("");
    const [titleShowMorePopup, setTitleShowMorePopup] = useState<string>("");
    const [openMoreEvents, toggleOpenMoreEvents] = useToggle(false);
    const [eventsOnPopup, setEventsOnPopup] = useState<ManaEvent[]>([]);
    const showMoreRef = useRef<HTMLSpanElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseShowMoreEvent = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (showMoreRef.current && showMoreRef.current.contains(event.target as HTMLElement)) {
                return;
            }

            toggleOpenMoreEvents(false);
        },
        [toggleOpenMoreEvents]
    );

    // TODO: will fix in the next epic
    const fakeGetData = async () => {
        setIsLoading(true);
        await sleep(2000);
        setIsLoading(false);
    };

    const handleOpenAndCloseDrawer = (isOpen: boolean, dateSelect = "") => {
        setOpenDrawer(isOpen);
        setFixWidth(isOpen ? "calc(100% - 348px)" : "100%");
        setDateSelected(!isOpen ? "" : dateSelect);
    };

    const handleShowMoreEvents = (events: ManaEvent[], date: Date) => {
        toggleOpenMoreEvents(true);
        setTitleShowMorePopup(date.toISOString());
        setEventsOnPopup(events);
    };

    const handleChangeLocation = async (value: string) => {
        setLocation(value);
        await fakeGetData();
    };
    return {
        fixWidth,
        location,
        openDrawer,
        dateSelected,
        titleShowMorePopup,
        openMoreEvents,
        toggleOpenMoreEvents,
        eventsOnPopup,
        showMoreRef,
        isLoading,
        handleCloseShowMoreEvent,
        fakeGetData,
        handleOpenAndCloseDrawer,
        handleShowMoreEvents,
        handleChangeLocation,
    };
};
export default useCalendar;
