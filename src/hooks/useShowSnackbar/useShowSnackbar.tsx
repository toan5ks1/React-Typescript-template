import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { SnackbarActions } from "src/store/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

export interface UseShowSnackbarParams {
    message: string;
    options?: {
        persist?: boolean;
    };
}

const sanitizerMsg = (message: UseShowSnackbarParams | string): UseShowSnackbarParams => {
    if (typeof message === "object") {
        return {
            ...message,
        };
    }
    return {
        message,
    };
};

// Show snackbar https://material-ui.com/components/snackbars/#snackbar
// Only works when wrapped with context
function useShowSnackbar() {
    const dispatch = useDispatch();
    const showSnackbar = useCallback(
        (params: UseShowSnackbarParams | string, severity?: AlertBaseProps["severity"]) => {
            const { message, options } = sanitizerMsg(params);
            dispatch(
                SnackbarActions.showSnackbar({
                    message,
                    options,
                    severity,
                })
            );
        },
        [dispatch]
    );

    return showSnackbar;
}

export default useShowSnackbar;
