import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { SnackbarActions } from "src/squads/payment/stores/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import useEnableManaEventEmitter from "../useEnableManaEventEmitter";
import useSnackbarManaEventEmitter from "../useSnackbarManaEventEmitter";

export interface UseShowSnackbarParams {
    message: string;
    options?: {
        persist?: boolean;
    };
}

export const sanitizerMsg = (message: UseShowSnackbarParams | string): UseShowSnackbarParams => {
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

    const isEnableManaEventEmitter = useEnableManaEventEmitter();
    const { manaEventEmitter } = useSnackbarManaEventEmitter();

    const addSnackbarByEventEmitter = useCallback(
        (
            message: string,
            options: UseShowSnackbarParams["options"],
            severity?: AlertBaseProps["severity"]
        ) => {
            window.warner?.log("addSnackbarByEventEmitter", message);

            manaEventEmitter.publish("addSnackbar", {
                message,
                options,
                severity: severity || "success",
            });
        },
        [manaEventEmitter]
    );

    const showSnackbar = useCallback(
        (params: UseShowSnackbarParams | string, severity?: AlertBaseProps["severity"]) => {
            const { message, options } = sanitizerMsg(params);
            if (isEnableManaEventEmitter) {
                return addSnackbarByEventEmitter(message, options, severity);
            }

            dispatch(
                SnackbarActions.showSnackbar({
                    message,
                    options,
                    severity,
                })
            );
        },
        [dispatch, isEnableManaEventEmitter, addSnackbarByEventEmitter]
    );

    return showSnackbar;
}

export default useShowSnackbar;
