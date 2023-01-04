import { ShowSnackbarAction, ShowSnackbarTypes, SnackbarStateType } from "./types";

export const initialState: SnackbarStateType = {
    message: "",
    open: false,
    severity: "success",
};

function snackbarReducer(
    state: SnackbarStateType = initialState,
    action: ShowSnackbarAction
): SnackbarStateType {
    // TODO: redux isn't working now, need update next phase
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
