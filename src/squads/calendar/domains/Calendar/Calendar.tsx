import { useEffect } from "react";

import { DateTime } from "luxon";
import { ERPModules } from "src/common/constants/enum";
import luxonLocalizer from "src/internals/localizer/luxon";
import { eventsTempData } from "src/squads/calendar/test-utils/schedule";

import { Box, ClickAwayListener, Popper } from "@mui/material";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperLookingFor from "src/squads/calendar/components/Wrappers/WrapperLookingFor";
import DrawerWithHeaderAndFooter from "src/squads/calendar/domains/Calendar/components/Drawers/DrawerWithHeaderAndFooter";
import FilterCalendarByLocation from "src/squads/calendar/domains/Calendar/components/Filters/FilterCalendarByLocation";
import FormSetOpenDayInfo from "src/squads/calendar/domains/Calendar/components/Forms/FormSetOpenDayInfo";
import CalendarDateHeader from "src/squads/calendar/domains/Calendar/components/ManaCalendar/CalendarDateHeader/CalendarDateHeader";
import CalendarEventWrapper from "src/squads/calendar/domains/Calendar/components/ManaCalendar/CalendarEventWrapper/CalendarEventWrapper";
import ShowMore from "src/squads/calendar/domains/Calendar/components/ManaCalendar/ShowMore/ShowMore";
import Toolbar from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/Toolbar";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import { Calendar as ManaCalendar } from "@manabie-com/mana-calendar";
import "@manabie-com/mana-calendar/lib/css/react-big-calendar.css";
import useCalendar from "src/squads/calendar/domains/Calendar/hooks/useCalendar";
import useResourceTranslate from "src/squads/calendar/hooks/useResourceTranslate";
import useTranslate from "src/squads/calendar/hooks/useTranslate";

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });
const popperModifiers = [
    {
        name: "offset",
        options: {
            offset: [-16, 8],
        },
    },
    {
        name: "flip",
        enabled: true,
        options: {
            altBoundary: true,
            rootBoundary: "document",
            padding: 8,
        },
    },
    {
        name: "preventOverflow",
        enabled: false,
        options: {
            altAxis: true,
            altBoundary: true,
            tether: true,
            rootBoundary: "document",
            padding: 8,
        },
    },
];

const Calendar = () => {
    const tSchedule = useResourceTranslate(ERPModules.SCHEDULE);
    const tCommon = useTranslate();
    const {
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
    } = useCalendar();

    useEffect(() => {
        const resizeListener = () => toggleOpenMoreEvents(false);
        window.addEventListener("resize", resizeListener);
        return () => window.removeEventListener("resize", resizeListener);
    }, [toggleOpenMoreEvents]);

    return (
        <Box>
            <BackdropLoading open={isLoading} />

            <TypographyPageTitle data-testid="Calendar__pageTitle" title={tSchedule("name")} />

            <FilterCalendarByLocation onChange={handleChangeLocation} />
            <WrapperLookingFor
                variant={!location ? "empty-icon" : "result"}
                content={tSchedule("name")}
                helperText={tSchedule("label.helperText")}
                height="page"
            >
                <Box
                    data-testid="Calendar__container"
                    sx={(theme) => calendarStyles.rootStyles(theme, fixWidth)}
                    mb={2}
                    mt={2}
                >
                    <ManaCalendar
                        events={eventsTempData}
                        localizer={localizer}
                        components={{
                            eventWrapper: CalendarEventWrapper,
                            toolbar: (props) => (
                                <Toolbar {...props} onChangeDate={() => fakeGetData()} />
                            ),
                            month: {
                                dateHeader: (props) => (
                                    <CalendarDateHeader
                                        dateSelected={dateSelected}
                                        handleOpenAndCloseDrawer={handleOpenAndCloseDrawer}
                                        {...props}
                                    />
                                ),
                            },
                        }}
                        messages={{
                            showMore: ({ total }) => (
                                <ShowMore showMoreRef={showMoreRef} total={total} />
                            ),
                        }}
                        collapse={openDrawer}
                        popup={false}
                        drilldownView={null}
                        onDrillDown={() => {}} // todo: disable date active when click show more events
                        onShowMore={handleShowMoreEvents}
                    />
                </Box>
            </WrapperLookingFor>

            <Popper
                anchorEl={showMoreRef?.current}
                placement="left-start"
                disablePortal={true}
                open={openMoreEvents}
                sx={{ zIndex: "tooltip" }}
                keepMounted
                modifiers={popperModifiers}
                data-testid="Calendar__popupMoreEvent"
            >
                <ClickAwayListener onClickAway={handleCloseShowMoreEvent}>
                    <Box width={444} boxShadow={24} borderRadius={1} bgcolor="background.paper">
                        <Box py={2} px={3} bgcolor="action.hover">
                            <TypographyHeader typography="h6" color="text.primary">
                                {DateTime.fromISO(titleShowMorePopup).toFormat("EEEE - yyyy/MM/dd")}
                            </TypographyHeader>
                        </Box>
                        <Box p={3} bgcolor="background.paper">
                            {eventsOnPopup.map((event, index) => {
                                const isEventDraft = event.resource?.status === "draft";
                                const firstItem = index === 0;
                                return (
                                    <Box
                                        key={`${event.start}-${index}`}
                                        sx={(theme) =>
                                            calendarStyles.calendarPopup.eventItem(
                                                theme,
                                                isEventDraft,
                                                firstItem
                                            )
                                        }
                                    >
                                        <TypographyBase variant="caption">
                                            {event.title}
                                        </TypographyBase>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Box display="flex" justifyContent="flex-end" p={3} pt={0}>
                            <ButtonPrimaryContained onClick={() => toggleOpenMoreEvents(false)}>
                                {tCommon("ra.action.close")}
                            </ButtonPrimaryContained>
                        </Box>
                    </Box>
                </ClickAwayListener>
            </Popper>
            <DrawerWithHeaderAndFooter
                open={openDrawer}
                title="Set Open Day Info"
                BackdropProps={{ invisible: true }}
                anchor="right"
                onCloseSidebar={() => handleOpenAndCloseDrawer(false)}
                onClose={() => handleOpenAndCloseDrawer(false)}
                variant="persistent"
                data-testid="Calendar__drawerWithHeaderAndFooter"
            >
                <FormSetOpenDayInfo />
            </DrawerWithHeaderAndFooter>
        </Box>
    );
};

export default Calendar;
