import { connectRouter } from "connected-react-router/immutable";
import { History } from "history";
import { combineReducers, CombinedState } from "redux";
import quizReducer from "src/squads/syllabus/store/quiz/reducer";

import appReducer from "./app";
import importUserReducer from "./import-user/reducer";
import lessonConvertReducer from "./lesson-convert/reducer";
import masterReducer from "./master";
import { RootActionTypes } from "./root-type";
import snackbarReducer from "./snackbar/reducers";
import { RootState } from "./store-types";

export const getReduxReducers = (history: History, initialState: RootState | undefined) => {
    return (state: CombinedState<RootState> | undefined, action: any) => {
        const reducers = combineReducers<RootState>({
            router: connectRouter(history),
            quiz: quizReducer,
            app: appReducer,
            lessonConvert: lessonConvertReducer,
            snackbar: snackbarReducer,
            master: masterReducer,
            importUser: importUserReducer,
        });

        if (action.type === RootActionTypes.CLEAR_STATE) {
            return reducers(initialState, action);
        }

        return reducers(state, action);
    };
};
