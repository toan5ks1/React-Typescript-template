import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import { CalendarDateHeaderProps } from "src/squads/calendar/domains/Calendar/types";

const today = new Date().toDateString();
export const CalendarDateHeader = (props: CalendarDateHeaderProps) => {
    const { label, date, dateSelected, isOffRange, handleOpenAndCloseDrawer } = props;
    const dateToString = date.toDateString();

    const isDateActive = dateToString === dateSelected;
    const isCurrent = today === dateToString;
    return (
        <Box data-date={label} width="100%" px={1} mt={0.5}>
            <Grid container direction="column">
                <Grid item>
                    <Box textAlign="center">
                        <TypographyBase
                            variant="body2"
                            data-testid="CalendarDateHeader__dayLabel"
                            sx={(theme) =>
                                calendarStyles.calendarDateHeader.dayLabel(
                                    theme,
                                    isDateActive,
                                    isCurrent,
                                    isOffRange
                                )
                            }
                        >
                            {label.replace(/^0/g, "")}
                        </TypographyBase>
                    </Box>
                </Grid>
                <Grid
                    item
                    data-testid="CalendarDateHeader__dayInfoWrap"
                    onClick={() => handleOpenAndCloseDrawer(true, dateToString)}
                >
                    <Box
                        data-testid="CalendarDateHeader__dayInfo"
                        sx={(theme) =>
                            calendarStyles.calendarDateHeader.dayInfo(theme, isDateActive)
                        }
                    >
                        <Box display="flex" alignItems="center">
                            <Box
                                width={8}
                                height={8}
                                borderRadius={1}
                                bgcolor={"transparent"}
                                border={(theme) => `1px solid ${theme.palette.text.secondary}`}
                            />
                            <Box mx={1}>-- : --</Box>
                        </Box>
                        <Box>--</Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CalendarDateHeader;
