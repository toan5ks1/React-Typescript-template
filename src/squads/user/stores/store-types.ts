import { History } from "history";
import { IDataProvider } from "src/squads/user/service/service-types";
import { AppState } from "src/squads/user/stores/app/app-types";
import { AuthProviderType } from "src/squads/user/typings/auth-provider";

import { SnackbarStateType } from "./snackbar/types";

export interface RootState {
    router: any;
    snackbar: SnackbarStateType;
    app: AppState;
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
