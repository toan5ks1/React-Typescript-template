import { History } from "history";
import { IDataProvider } from "src/services/service-types";
import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";
import { AuthProviderType } from "src/typings/auth-provider";

import { AppState } from "./app/app-types";
import { ImportUserState } from "./import-user/types";
import { LessonConvert } from "./lesson-convert/lesson-convert-types";
import { MasterState } from "./master/types";
import { SnackbarStateType } from "./snackbar/reducers";

export interface RootState {
    router: any;
    app: AppState;
    quiz: QuizState;
    lessonConvert: LessonConvert;
    snackbar: SnackbarStateType;
    master: MasterState;
    importUser: ImportUserState;
}

export interface GetMiddlewareOptions {
    dataProvider: any;
    history: History;
    authProvider: AuthProviderType;
}

export interface ConfigureStoreOptions extends GetMiddlewareOptions {
    initialState?: RootState;
    dataProvider: IDataProvider;
}
