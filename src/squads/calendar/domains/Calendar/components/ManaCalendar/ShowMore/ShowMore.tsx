import TypographyBase from "src/components/Typographys/TypographyBase";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import { CalendarShowMoreProps } from "src/squads/calendar/domains/Calendar/types";

const ShowMore = (props: CalendarShowMoreProps) => {
    const { total, showMoreRef } = props;
    return (
        <TypographyBase ref={showMoreRef} data-total={total} sx={calendarStyles.showMore}>
            Show More
        </TypographyBase>
    );
};

export default ShowMore;
