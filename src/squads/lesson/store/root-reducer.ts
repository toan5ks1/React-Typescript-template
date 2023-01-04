import { connectRouter } from "connected-react-router/immutable";
import { History } from "history";
import { combineReducers, CombinedState } from "redux";
import lessonConvertReducer from "src/squads/lesson/store/lesson-convert/reducer";
import { RootActionTypes } from "src/squads/lesson/store/root-type";
import snackbarReducer from "src/squads/lesson/store/snackbar/reducers";
import { RootState } from "src/squads/lesson/store/store-types";

export const getReduxReducers = (history: History, initialState: RootState | undefined) => {
    return (state: CombinedState<RootState> | undefined, action: any) => {
        const reducers = combineReducers<RootState>({
            router: connectRouter(history),
            snackbar: snackbarReducer,
            lessonConvert: lessonConvertReducer,
        });

        if (action.type === RootActionTypes.CLEAR_STATE) {
            return reducers(initialState, action);
        }

        return reducers(state, action);
    };
};
