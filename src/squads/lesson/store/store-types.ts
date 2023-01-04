import { History } from "history";
import { IDataProvider } from "src/squads/lesson/service/service-types";
import { SnackbarStateType } from "src/squads/lesson/store/snackbar/reducers";
import { AuthProviderType } from "src/squads/lesson/typings/auth-provider";
import { LessonConvert } from "src/store/lesson-convert/lesson-convert-types";

export interface RootState {
    router: any;
    snackbar: SnackbarStateType;
    lessonConvert: LessonConvert;
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
