import { CalendarEventProps } from "src/squads/calendar/domains/Calendar/types";

export const eventsTempData = [
    {
        title: "Tada",
        start: new Date("2022 07 01"),
        end: new Date("2022 07 05 10:23:59"),
        resource: {
            status: "draft",
        },
    },
    {
        title: "Tada Tada",
        start: new Date("2022 07 03"),
        end: new Date("2022 07 03"),
    },
    ...Array.from({ length: 8 }).map((_e, i) => {
        return {
            title: `Tada ${i}`,
            start: new Date("2022 07 01"),
            end: new Date(`2022 07 01 ${i}:23:59`),
        };
    }),
];

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
