import produce, { Draft } from "immer";

import { AppActionTypes, IAppActions } from "./actions";
import { AppState } from "./app-types";

export const initialState: AppState = {
    sidebarOpen: true,
    prevPathname: "",
    redirectAfterLogin: "/",
    redirectAfterLogout: "/login",
};

function reducer(state: AppState = initialState, action: IAppActions): AppState {
    switch (action.type) {
        case AppActionTypes.TOGGLE_SIDEBAR:
            return produce(state, (draft: Draft<AppState>) => {
                draft.sidebarOpen =
                    typeof action.payload.open !== "undefined"
                        ? action.payload.open
                        : !draft.sidebarOpen;
            });
        case AppActionTypes.SET_PREV_PATHNAME:
            return produce(state, (draft: Draft<AppState>) => {
                draft.prevPathname = action.payload.prevPathname;
            });
        default:
            return state;
    }
}

export default reducer;
