import { ReactNode } from "react";

import clsx from "clsx";

import { styled } from "@mui/material/styles";

export const SNACKBAR_INDENTS = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

const xsWidthMargin = 16;

const componentName = "SnackbarContainer";

const classes = {
    root: `${componentName}-root`,
    bottom: `${componentName}-bottom`,
    left: `${componentName}-left`,
};

const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {
        boxSizing: "border-box",
        display: "flex",
        maxHeight: "100%",
        position: "fixed",
        zIndex: theme.zIndex.snackbar,
        height: "auto",
        width: "auto",
        transition:
            "top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms",
        // container itself is invisible and should not block clicks, clicks should be passed to its children
        maxWidth: `calc(100% - ${SNACKBAR_INDENTS.view.default * 2}px)`,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            maxWidth: `calc(100% - ${xsWidthMargin * 2}px)`,
        },
    },

    [`&.${classes.bottom}`]: {
        bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: "column-reverse",
    },
    [`&.${classes.left}`]: {
        left: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up("sm")]: {
            alignItems: "flex-start",
        },
        [theme.breakpoints.down("sm")]: {
            left: `${xsWidthMargin}px`,
        },
    },
}));

const SnackbarContainer = (props: { children?: ReactNode | undefined }) => {
    return (
        <Root className={clsx(classes.left, classes.bottom, classes.root)}>{props.children}</Root>
    );
};

export default SnackbarContainer;
