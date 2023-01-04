import { ShowSnackbarAction, ShowSnackbarTypes } from "src/squads/lesson/store/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

export interface SnackbarStateType {
    message: string;
    open: boolean;
    options?: {
        persist?: boolean;
    };
    severity?: AlertBaseProps["severity"];
}

export const initialState: SnackbarStateType = {
    message: "",
    open: false,
    severity: "success",
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
            };
        default:
            return state;
    }
}

export default snackbarReducer;
