import { AlertBaseProps } from "src/components/Alerts/AlertBase";

export enum ShowSnackbarTypes {
    SHOW_SNACKBAR = "SHOW_SNACKBAR",
    HIDE_SNACKBAR = "HIDE_SNACKBAR",
}

export interface ShowSnackbarAction {
    type: ShowSnackbarTypes;
    payload: {
        message: string;
        severity?: AlertBaseProps["severity"];
        options?: {
            persist?: boolean;
        };
    };
}

export declare namespace NsSnackbarAction {
    interface ShowSnackbar {
        type: ShowSnackbarTypes.SHOW_SNACKBAR;
        payload: ShowSnackbarAction["payload"];
    }
    interface HideSnackbar {
        type: ShowSnackbarTypes.HIDE_SNACKBAR;
    }
}

export interface SnackbarStateType {
    message: string;
    open: boolean;
    options?: {
        persist?: boolean;
    };
    severity?: AlertBaseProps["severity"];
}
