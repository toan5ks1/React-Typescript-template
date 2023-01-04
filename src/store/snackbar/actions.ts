import { AlertBaseProps } from "src/components/Alerts/AlertBase";
import "src/components/Snackbars/SnackbarMultipleItem";

export enum ShowSnackbarTypes {
    SHOW_SNACKBAR = "SHOW_SNACKBAR",
    HIDE_SNACKBAR = "HIDE_SNACKBAR",
    CLOSE_ALL_SNACKBAR_PERSIST = "CLOSE_ALL_SNACKBAR_PERSIST",
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

    interface CloseAllPersistSnackbar {
        type: ShowSnackbarTypes.CLOSE_ALL_SNACKBAR_PERSIST;
    }
}

export const SnackbarActions = {
    showSnackbar(payload: NsSnackbarAction.ShowSnackbar["payload"]): NsSnackbarAction.ShowSnackbar {
        return {
            type: ShowSnackbarTypes.SHOW_SNACKBAR,
            payload,
        };
    },
    hideSnackbar(): NsSnackbarAction.HideSnackbar {
        return {
            type: ShowSnackbarTypes.HIDE_SNACKBAR,
        };
    },
    closeAllPersistSnackbar: (): NsSnackbarAction.CloseAllPersistSnackbar => {
        return {
            type: ShowSnackbarTypes.CLOSE_ALL_SNACKBAR_PERSIST,
        };
    },
};
