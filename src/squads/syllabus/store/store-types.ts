import { History } from "history";

import { IDataProvider } from "../services/service-types";
import { AppState } from "./app/app-types";
import { LessonConvert } from "./lesson-convert/lesson-convert-types";
import { QuizState } from "./quiz/quiz-types";
import { SnackbarStateType } from "./snackbar/reducers";

export interface RootState {
    app: AppState;
    quiz: QuizState;
    lessonConvert: LessonConvert;
    snackbar: SnackbarStateType;
}

export interface GetMiddlewareOptions {
    dataProvider: any;
    history: History;
}

export interface ConfigureStoreOptions extends GetMiddlewareOptions {
    initialState?: RootState;
    dataProvider: IDataProvider;
}
