import { cloneElement, ReactElement } from "react";

import clsx from "clsx";

import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const PREFIX = "EntityIcon";

const classes = {
    root: `${PREFIX}-root`,
    icon: `${PREFIX}-icon`,
};

const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        padding: theme.spacing(0, 1, 0, 0),
        display: "inline-block",
    },

    [`& .${classes.icon}`]: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0),
        width: 32,
        height: 32,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
        "&.disabled": {
            backgroundColor: theme.palette.grey[400],
        },
    },
}));

export {};

interface EntityIconProps {
    disabled?: boolean;
    children: ReactElement;
}

const EntityIcon = ({ disabled, children }: EntityIconProps) => {
    if (!children) return null;

    return (
        <Root className={classes.root} data-testid="EntityIcon__root">
            <IconButton
                className={clsx({ [classes.icon]: true, disabled })}
                disabled={disabled}
                tabIndex={-1}
                size="large"
            >
                {cloneElement(children, {
                    size: 32,
                    color: "common.white",
                })}
            </IconButton>
        </Root>
    );
};

export default EntityIcon;
