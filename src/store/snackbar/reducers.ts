import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import { ShowSnackbarAction, ShowSnackbarTypes } from "./actions";

export interface SnackbarStateType {
    message: string;
    open: boolean;
    severity?: AlertBaseProps["severity"];
    options?: {
        persist?: boolean;
    };
    closeAllSnackbarPersist?: boolean;
}

export const initialState: SnackbarStateType = {
    message: "",
    open: false,
    severity: "success",
    closeAllSnackbarPersist: false,
};

function snackbarReducer(
    state: SnackbarStateType = initialState,
    action: ShowSnackbarAction
): SnackbarStateType {
    switch (action.type) {
        case ShowSnackbarTypes.SHOW_SNACKBAR:
            return {
                open: true,
                ...action.payload,
            };
        case ShowSnackbarTypes.HIDE_SNACKBAR:
            return {
                open: false,
                message: "",
                closeAllSnackbarPersist: false,
            };
        case ShowSnackbarTypes.CLOSE_ALL_SNACKBAR_PERSIST:
            return {
                ...state,
                closeAllSnackbarPersist: true,
            };
        default:
            return state;
    }
}

export default snackbarReducer;
