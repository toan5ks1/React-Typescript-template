import { TimeAutocompleteOption } from "src/squads/calendar/domains/Calendar/common/types";

export const createTimeList = (): TimeAutocompleteOption[] => {
    const timeList: TimeAutocompleteOption[] = [];
    const date = new Date();

    // Start from 00:00 AM
    date.setHours(0, 0, 0, 0);

    // Iterate to generate time list for a day (1440 minutes)
    for (let i = 0; i < 1440; i++) {
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        const today = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            Number(hour),
            Number(minute)
        );

        timeList.push({ label: `${hour}:${minute}`, value: today });
        date.setMinutes(date.getMinutes() + 1);
    }

    return timeList;
};

export const timeOptions = createTimeList();
