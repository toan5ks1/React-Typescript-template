import { forwardRef } from "react";

import clsx from "clsx";

import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loading from "src/components/Loading";

const PREFIX = "IconButtonWithAnchorMenu";

const classes = {
    sizeSmall: `${PREFIX}-sizeSmall`,
    root: `${PREFIX}-root`,
    iconButton: `${PREFIX}-iconButton`,
};

const Root = styled("div")(({ theme }) => {
    return {
        [`& .${classes.sizeSmall}`]: {
            padding: theme.spacing(1.25),
        },
        [`&.${classes.root}`]: {
            "&:hover": {
                color: theme.palette.primary.main,
            },
        },
        [`& .${classes.iconButton}`]: {
            borderRadius: "8px",
            backgroundColor: theme.palette.grey[200],
        },
    };
});
Root.displayName = "IconButtonWithAnchorMenuRoot";

export interface IconButtonWithAnchorMenuProps extends IconButtonProps {
    variant?: "square" | "circular";
    loading?: boolean;
}

const IconButtonWithAnchorMenu = forwardRef<HTMLDivElement, IconButtonWithAnchorMenuProps>(
    (props, ref) => {
        const { classes: rops = {}, variant, loading, ...rest } = props;

        return loading ? (
            <Loading />
        ) : (
            <Root className={classes.root} ref={ref}>
                <IconButton
                    classes={{ sizeSmall: classes.sizeSmall, ...rops }}
                    className={clsx(variant === "square" ? classes.iconButton : "", classes.root)}
                    size="large"
                    {...rest}
                >
                    <MoreHoriz fontSize="small" />
                </IconButton>
            </Root>
        );
    }
);

export default IconButtonWithAnchorMenu;
