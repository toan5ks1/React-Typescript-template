import { CalendarEventProps } from "src/common/constants/types";

export function createFakeCalendarEventData(
    overrides: Partial<CalendarEventProps>
): CalendarEventProps {
    return {
        id: "id",
        allDay: true,
        start: new Date(2021, 1, 5, 12, 15),
        end: new Date(2021, 1, 12, 13, 0),
        brandId: "1",
        centerId: "1",
        metaData: {
            description: "",
            remark: "Test Meeting",
            title: "Event Title",
        },
        schedulePattern: {
            repeatOptionData: {
                count: 3,
                repeatType: "REPEAT_TYPE_NONE",
                until: new Date(2021, 1, 12, 13, 0),
            },
        },
        ...overrides,
    };
}
