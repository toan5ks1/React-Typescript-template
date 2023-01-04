import { History } from "history";
import { IDataProvider } from "src/squads/payment/service/service-types";
import { AuthProviderType } from "src/squads/payment/typings/auth-provider";

import { MasterState } from "./master/types";
import { SnackbarStateType } from "./snackbar/types";

export interface RootState {
    router: any;
    snackbar: SnackbarStateType;
    master: MasterState;
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
