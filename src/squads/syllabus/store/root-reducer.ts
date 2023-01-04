import { combineReducers, CombinedState } from "redux";

import appReducer from "./app";
import lessonConvertReducer from "./lesson-convert/reducer";
import quizReducer from "./quiz/reducer";
import { RootActionTypes } from "./root-type";
import snackbarReducer from "./snackbar/reducers";
import { RootState } from "./store-types";

export const getReduxReducers = (initialState: RootState | undefined) => {
    return (state: CombinedState<RootState> | undefined, action: any) => {
        const reducers = combineReducers<RootState>({
            quiz: quizReducer,
            app: appReducer,
            lessonConvert: lessonConvertReducer,
            snackbar: snackbarReducer,
        });

        if (action.type === RootActionTypes.CLEAR_STATE) {
            return reducers(initialState, action);
        }

        return reducers(state, action);
    };
};
