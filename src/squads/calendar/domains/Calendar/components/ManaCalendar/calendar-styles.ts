import { Theme } from "@mui/material";
import { selectClasses } from "@mui/material/Select";

// style is follow Mui theme system, refer: https://manabie.atlassian.net/browse/LT-17993

const bgEventItemDraft = (isEventDraft: boolean, theme: Theme) =>
    isEventDraft ? theme.palette.primary.contrastText : theme.palette.success.light;

const colorEventItemDraft = (isEventDraft: boolean, theme: Theme) =>
    isEventDraft ? theme.palette.success.light : theme.palette.primary.contrastText;

const calendarStyles = {
    rootStyles: (theme: Theme, fixWidth: string) => ({
        width: fixWidth ? `${fixWidth}` : "100%",
        ".rbc-off-range-bg": {
            backgroundColor: "transparent",
        },
        ".rbc-month-view": {
            display: "inline-block",
        },
        ".rbc-month-row": {
            minHeight: "215px",
            paddingBottom: 4,
        },
        ".rbc-header": {
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
            typography: theme.typography.caption,
            color: theme.palette.text.secondary,
            textTransform: "uppercase",
            height: "auto",
            py: 1,
            px: 2,
        },
        ".rbc-event:focus, .rbc-day-slot .rbc-background-event:focus": {
            outline: "none",
        },
    }),
    eventWrapperStyles: (theme: Theme, isEventDraft: boolean) => ({
        ".rbc-event": {
            px: 0.5,
            py: 0,
            mt: 0.5,
            borderRadius: 1,
            typography: theme.typography.caption,
            color: colorEventItemDraft(isEventDraft, theme),
            backgroundColor: bgEventItemDraft(isEventDraft, theme),
            border: `1px solid ${theme.palette.success.light}`,
            "&.rbc-selected": {
                backgroundColor: bgEventItemDraft(isEventDraft, theme),
            },
        },
    }),
    calendarDateHeader: {
        dayLabel: (
            theme: Theme,
            isDateActive: boolean,
            isCurrent: boolean,
            isOffRange: boolean
        ) => {
            const colorIsOffRange = isOffRange
                ? theme.palette.text.disabled
                : theme.palette.text.primary;
            const borderColorLabel =
                !isCurrent || isDateActive ? "transparent" : "rgba(0, 0, 0, 0.23)";
            return {
                width: 24,
                height: 24,
                borderRadius: "100%",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: 1,
                backgroundColor: isDateActive ? theme.palette.primary.light : "transparent",
                border: `1px solid ${borderColorLabel}`,
                color: isDateActive ? theme.palette.primary.contrastText : colorIsOffRange,
            };
        },
        dayInfo: (theme: Theme, isDateActive: boolean) => ({
            mt: 0.5,
            height: 20,
            borderRadius: 1,
            px: 0.5,
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: theme.palette.text.disabled,
            backgroundColor: isDateActive ? "rgba(2, 136, 209, 0.04)" : "transparent",
            border: `1px solid ${isDateActive ? theme.palette.primary.light : "transparent"}`,
            typography: theme.typography.caption,
            "&:hover": {
                backgroundColor: isDateActive ? "rgba(2, 136, 209, 0.04)" : theme.palette.grey[100],
            },
        }),
    },
    showMore: (theme: Theme) => ({
        mt: 0.5,
        p: 0.5,
        borderRadius: 1,
        display: "flex",
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: "13px",
        textTransform: "capitalize",
        lineHeight: 1.69,
        letterSpacing: 0.46,
    }),
    calendarPopup: {
        eventItem: (theme: Theme, isEventDraft: boolean, firstItem: boolean) => {
            return {
                mt: firstItem ? 0 : 0.5,
                px: 0.5,
                borderRadius: 1,
                color: colorEventItemDraft(isEventDraft, theme),
                backgroundColor: bgEventItemDraft(isEventDraft, theme),
                border: `1px solid ${theme.palette.success.light}`,
            };
        },
    },
    calendarToolbar: {
        wrapper: (theme: Theme) => ({
            backgroundColor: theme.palette.grey["100"],
            border: `1px solid ${theme.palette.grey["300"]}`,
            borderBottom: 0,
            borderRadius: "4px 4px 0px 0px",
            px: 2,
            py: 1,
        }),
        selectCalendarView: (theme: Theme) => ({
            [`& .${selectClasses.select}`]: {
                py: 0.5,
                fontSize: 13,
                lineHeight: 1.69,
                color: theme.palette.text.primary,
                fontWeight: 500,
            },
        }),
        datePickerTextField: () => ({
            "& div": {
                pl: 0,
                mr: 1,
            },
            "& fieldset": {
                border: "none",
            },
        }),
    },
};

export default calendarStyles;
