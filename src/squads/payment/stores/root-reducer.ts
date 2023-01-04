import { connectRouter } from "connected-react-router/immutable";
import { History } from "history";
import { combineReducers, CombinedState } from "redux";

import masterReducer from "./master";
import { RootActionTypes } from "./root-type";
import snackbarReducer from "./snackbar/reducers";
import { RootState } from "./store-types";

export const getReduxReducers = (history: History, initialState: RootState | undefined) => {
    return (state: CombinedState<RootState> | undefined, action: any) => {
        const reducers = combineReducers<RootState>({
            router: connectRouter(history),
            snackbar: snackbarReducer,
            master: masterReducer,
        });

        if (action.type === RootActionTypes.CLEAR_STATE) {
            return reducers(initialState, action);
        }

        return reducers(state, action);
    };
};
