import { MouseEvent } from "react";

import clsx from "clsx";

import { FiberManualRecord } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import ChipBase from "../ChipBase";

const PREFIX = "ChipTimeLine";

const classes = {
    allDayTimeline: `${PREFIX}-allDayTimeline`,
    onDayTimeline: `${PREFIX}-onDayTimeline`,
    inPopup: `${PREFIX}-inPopup`,
};

const StyledChipBase = styled(ChipBase)(({ theme }) => {
    return {
        [`&.${classes.allDayTimeline}`]: {
            width: "100%",
            justifyContent: "flex-start",
            padding: theme.spacing(0, 1 / 2),
            "&:hover": {
                backgroundColor: theme.palette.blue?.[700],
            },
        },
        [`&.${classes.onDayTimeline}`]: {
            width: "100%",
            justifyContent: "flex-start",
            padding: 0,
            margin: 0,
            border: "none",
            borderRadius: "4px",
            "& svg": {
                color: "inherit",
                width: "6px",
            },
        },
        [`&.${classes.inPopup}`]: {
            "& svg": {
                color: theme.palette.primary.main,
                width: "9px",
            },
        },
    };
});

export interface ChipTimelineProps {
    label: string;
    onClick: (event: MouseEvent) => void;
    isInPopup?: boolean;
    variant: "all-day" | "on-day";
}

const ChipTimeLine = (props: ChipTimelineProps) => {
    const { label, onClick, isInPopup = false, variant } = props;

    const getClassName = () => {
        return variant === "all-day"
            ? classes.allDayTimeline
            : clsx(classes.onDayTimeline, isInPopup && classes.inPopup);
    };

    return (
        <StyledChipBase
            data-testid="ChipTimeLine__chip"
            className={getClassName()}
            icon={variant === "all-day" ? <></> : <FiberManualRecord />}
            color={variant === "all-day" ? "primary" : "default"}
            label={label}
            size="small"
            variant={variant === "on-day" ? "outlined" : "filled"}
            onClick={onClick}
        />
    );
};

export default ChipTimeLine;
