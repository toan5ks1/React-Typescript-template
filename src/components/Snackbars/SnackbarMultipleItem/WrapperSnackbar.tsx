import { ReactNode, useCallback, useEffect, useRef } from "react";

import { useEventCallback } from "@mui/material/utils";

import { CloseReason } from "./constants";
import { SnackbarKey, TransitionCloseHandler } from "./types";

export interface WrapperSnackbarProps {
    autoHideDuration?: number | null;
    children?: ReactNode;
    onClose: TransitionCloseHandler;
    open: boolean;
    snackKey: SnackbarKey;
}

const WrapperSnackbar = (props: WrapperSnackbarProps) => {
    const { children, autoHideDuration, onClose, open, snackKey } = props;

    const timerAutoHide = useRef<ReturnType<typeof setTimeout>>();

    const setAutoHideTimer = useEventCallback(
        (autoHideDurationParam: WrapperSnackbarProps["autoHideDuration"]) => {
            if (!autoHideDurationParam) {
                return;
            }
            timerAutoHide.current && clearTimeout(timerAutoHide.current);

            timerAutoHide.current = setTimeout(() => {
                onClose(null, CloseReason.TIMEOUT, snackKey);
            }, autoHideDurationParam);
        }
    );

    useEffect(() => {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }

        return () => {
            timerAutoHide.current && clearTimeout(timerAutoHide.current);
        };
    }, [open, autoHideDuration, setAutoHideTimer]);

    /**
     * Pause the timer when the user is interacting with the Snackbar
     * or when the user hide the window.
     */
    const handlePause = () => {
        timerAutoHide.current && clearTimeout(timerAutoHide.current);
    };

    /**
     * Restart the timer when the user is no longer interacting with the Snackbar
     * or when the window is shown back.
     */
    const handleResume = useCallback(() => {
        if (autoHideDuration != null) {
            setAutoHideTimer(autoHideDuration);
        }
    }, [autoHideDuration, setAutoHideTimer]);

    const handleMouseEnter = () => {
        handlePause();
    };

    const handleMouseLeave = () => {
        handleResume();
    };

    useEffect(() => {
        if (open) {
            window.addEventListener("focus", handleResume);
            window.addEventListener("blur", handlePause);

            return () => {
                window.removeEventListener("focus", handleResume);
                window.removeEventListener("blur", handlePause);
            };
        }
    }, [handleResume, open]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid="WrapperSnackbar__container"
        >
            {children}
        </div>
    );
};

export default WrapperSnackbar;
