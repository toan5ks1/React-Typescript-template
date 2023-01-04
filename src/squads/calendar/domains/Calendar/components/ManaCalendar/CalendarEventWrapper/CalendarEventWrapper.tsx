import { Box } from "@mui/material";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import { EventWrapperProps } from "@manabie-com/mana-calendar";

export interface CalendarEventWrapperProps extends Pick<EventWrapperProps, "children" | "event"> {}

const CalendarEventWrapper = ({ children, event }: CalendarEventWrapperProps) => {
    const isEventDraft = event.resource?.status === "draft";
    return (
        <Box
            data-testid="CalendarEventWrapper__wrapper"
            sx={(theme) => calendarStyles.eventWrapperStyles(theme, isEventDraft)}
        >
            {children}
        </Box>
    );
};

export default CalendarEventWrapper;
