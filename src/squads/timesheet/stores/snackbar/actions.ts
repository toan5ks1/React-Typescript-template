import { NsSnackbarAction, ShowSnackbarTypes } from "./types";

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
};
