import { History } from "history";
import { IDataProvider } from "src/squads/adobo/domains/entry-exit/services/service-types";
import { AppState } from "src/squads/adobo/domains/entry-exit/store/app/app-types";
import { SnackbarStateType } from "src/squads/adobo/domains/entry-exit/store/snackbar/types";
import { AuthProviderType } from "src/squads/adobo/domains/entry-exit/typings/auth-provider";

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
