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
