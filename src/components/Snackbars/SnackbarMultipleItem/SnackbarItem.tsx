import { useState, useEffect, useRef } from "react";

import Collapse from "@mui/material/Collapse";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import AlertBase, { AlertBaseProps } from "src/components/Alerts/AlertBase";

import WrapperSnackbar, { WrapperSnackbarProps } from "./WrapperSnackbar";
import { CloseReason } from "./constants";
import { SnackbarMessage, TransitionHandlerProps } from "./types";

export interface SnackbarItemProps extends WrapperSnackbarProps, TransitionHandlerProps {
    variant: AlertBaseProps["severity"];
    message: SnackbarMessage;
}

const StyledCollapse = styled(Collapse)(({ theme }) => {
    return {
        marginTop: theme.spacing(2.5),
    };
});

const SnackbarItem = (props: SnackbarItemProps) => {
    const { open, variant, message, autoHideDuration, onClose, snackKey, onExited } = props;

    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [collapsed, setCollapsed] = useState(true);

    useEffect(
        () => (): void => {
            timeout.current && clearTimeout(timeout.current);
        },
        []
    );

    const handleExitedScreen = (): void => {
        timeout.current = setTimeout(() => {
            setCollapsed(!collapsed);
        }, 125);
    };

    return (
        <StyledCollapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            onExited={(node) => {
                onExited && onExited(node, snackKey);
            }}
        >
            <WrapperSnackbar
                autoHideDuration={autoHideDuration}
                open={open}
                onClose={onClose}
                snackKey={snackKey}
            >
                <Slide appear in={open} onExited={handleExitedScreen} direction="right">
                    <AlertBase
                        severity={variant}
                        onClose={(event) => {
                            onClose(event, CloseReason.INSTRUCTED, snackKey);
                        }}
                        data-testid="SnackbarBase__content"
                    >
                        {message}
                    </AlertBase>
                </Slide>
            </WrapperSnackbar>
        </StyledCollapse>
    );
};

export default SnackbarItem;
